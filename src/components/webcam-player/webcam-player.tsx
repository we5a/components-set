import { Component, h, Element, getAssetPath, Event, EventEmitter, State, Host } from '@stencil/core';
import * as faceapi from 'face-api.js';
import uniqid from 'uniqid';

@Component({
  tag: 'webcam-player',
  styleUrl: 'webcam-player.css',
  shadow: false,
  assetsDirs: ['models']
})
export class WebcamPlayer {
  private player: HTMLVideoElement;
  private canvas: HTMLCanvasElement;
  private cameraStream: MediaStream = null;
  private mediaSupport = 'mediaDevices' in navigator;
  private predictedAges = [];
  private VIDEO_SIZE = { width: 320, height: 240 };
  private isCountdown: boolean = false;
  @Element() private hostElement: HTMLElement;
  @Event() screenshotReceived: EventEmitter;
  @State() highlightedPlayer: boolean = false;
  @State() outputMessage: string = '';
  isRecognizing: boolean = true;

  private readonly TINY_OPTIONS = {
    inputSize: 512,
    scoreThreshold: 0.5
  }

  opts = new faceapi.TinyFaceDetectorOptions(this.TINY_OPTIONS);

  componentDidLoad() {
    this.player = this.hostElement.querySelector('#player');
    this.canvas = this.hostElement.querySelector('#overlay');
  }

  async handleStart() {
    if (this.mediaSupport && null == this.cameraStream) {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: this.VIDEO_SIZE });
      this.cameraStream = mediaStream;
      this.player.srcObject = mediaStream;
      await this.player.play();

      await this.loadModels();
      console.log('Models loaded');
      this.isRecognizing = true;
      await this.onPlay();
    }
    else {
      alert('Your browser does not support media devices.');
      return;
    }
  }

  handleStop() {
    console.log('Stop streaming');
    this.isRecognizing = false;

    if (null != this.cameraStream) {
      const track = this.cameraStream.getTracks()[0];
      track.stop();
      this.player.load();
      this.cameraStream = null;

      this.clearCanvas(this.canvas);
    }
  }

  clearCanvas(canvas: HTMLCanvasElement) {
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  interpolateAgePredictions(age: number) {
    this.predictedAges = [age].concat(this.predictedAges).slice(0, 30)
    const avgPredictedAge = this.predictedAges.reduce((total, a) => total + a) / this.predictedAges.length
    return avgPredictedAge
  }

  async loadModels() {
    const modelPath = getAssetPath('./models');
    await faceapi.nets.tinyFaceDetector.loadFromUri(modelPath);
    await faceapi.nets.ageGenderNet.loadFromUri(modelPath);
  }

  async onPlay() {
    const result = await faceapi.detectSingleFace(this.player, this.opts)
      .withAgeAndGender()

    if (result) {
      faceapi.matchDimensions(this.canvas, this.player, true);
      faceapi.draw.drawDetections(this.canvas, result);

      const { age, gender, genderProbability } = result;
      const interpolatedAge = this.interpolateAgePredictions(age)

      new faceapi.draw.DrawTextField(
        [
          `${faceapi.utils.round(interpolatedAge, 0)} years`,
          `${gender} (${faceapi.utils.round(genderProbability)})`
        ],
        result.detection.box.bottomLeft
      ).draw(this.canvas);
    }

    if (this.isRecognizing) {
      setTimeout(() => {
        this.onPlay();
      });
    }
  }

  handleScreenshot() {
    console.log('Screenshot');
    if (!this.player.paused) {
      const base64 = this.takeScreenshot();
      this.screenshotReceived.emit({ id: uniqid(), image: base64 });
      this.blinkPlayer(0.25);
    }
  }

  takeScreenshot(outputType?: "canvas" | "base64") {
    const interimCanvas = document.createElement('canvas');
    interimCanvas.width = this.VIDEO_SIZE.width;
    interimCanvas.height = this.VIDEO_SIZE.height;
    const ctx = interimCanvas.getContext('2d');
    ctx.drawImage(this.player, 0, 0);
    switch (outputType) {
      case 'canvas':
        return interimCanvas;
      case 'base64':
        return interimCanvas.toDataURL('image/jpeg', 0.7);
      default:
        return interimCanvas.toDataURL('image/jpeg', 0.7);
    }
  }

  blinkPlayer(duration: number, periods: number = 1) {
    this.highlightedPlayer = true;

    const intervalId = setInterval(() => {
      this.highlightedPlayer = !this.highlightedPlayer;
    }, duration * 1000);

    setTimeout(() => {
      clearInterval(intervalId);
      this.highlightedPlayer = false;
    }, duration * 1000 * periods);
  }

  async sleep(time: number) {
    await new Promise((resolve) => {
      setTimeout(() => void resolve(null), time * 1000);
    });
  }

  async rememberFace() {
    console.log('Need to remember face');
    if (!this.isCountdown) {
      this.isCountdown = true;
      let count = 3;
      this.outputMessage = `Be near the cam, slightly rotate head ${count}...`;
      const interval = setInterval(() => {
        --count;
        this.outputMessage = `Be near the cam, slightly rotate head ${count}...`;
        if (count <= 0) {
          clearInterval(interval);
          this.isCountdown = false;
          this.outputMessage = '';
          console.log('Have to start screenshots...');
          this.takeScreenshotsSeries(5);
        }
      }, 1000);
    }
  }

  async takeScreenshotsSeries(shotNumber: number) {
    const screenshots: HTMLCanvasElement[] = [];

    const interval = setInterval(async () => {
      const shot = this.takeScreenshot('canvas');
      screenshots.push(shot as HTMLCanvasElement);
      this.blinkPlayer(0.25);
      if (screenshots.length === shotNumber) {
        this.createPerson(screenshots);
        clearInterval(interval);
      }
    }, 800);
  }

  async createPerson(shots: HTMLCanvasElement[]) {
    const images: string[] = [];
    const age = [];
    const gender = { male: 0, female: 0 }; 

    for await (const frame of shots) {
      const faceDetection = await faceapi.detectSingleFace(frame, this.opts)
        .withAgeAndGender();
      console.log('Face Detection', faceDetection);

      if (faceDetection) {
        age.push(Math.round(faceDetection.age));
        gender[faceDetection.gender] = gender[faceDetection.gender] + 1;
        const faceCanvas = await faceapi.extractFaces(frame, [faceDetection.detection]);
        const faceBase64 = faceCanvas[0].toDataURL('image/jpeg', 0.7);
        images.push(faceBase64);
      }
    }
    const person = {
      id: uniqid(),
      age: Math.round(age.reduce((acc, el) => acc + el) / age.length),
      gender: gender["male"] > gender["female"] ? "male" : "female",
      images 
    };
    console.log('Person', person);
    // show Name Modal here
  }

  render() {
    return (
      <Host>
        <div class="container">
          <div class="player-block">
            <video id="player" class={{ 'outlined': this.highlightedPlayer }} width="320" height="240" muted playsinline></video>
          </div>
          <canvas id="overlay" width="320" height="240" />
          <div class="button-block">
            <button class="player-button" onClick={this.handleStart.bind(this)}>Start Streaming</button>
            <button class="player-button" onClick={this.handleStop.bind(this)}>Stop Streaming</button>
            <button class="player-button" onClick={this.handleScreenshot.bind(this)}>Take Screenshot</button>
            <button class="player-button" onClick={this.rememberFace.bind(this)}>Remember Me</button>
          </div>
        </div>
        <player-output message={this.outputMessage}></player-output>
      </Host>
    );
  }
}
