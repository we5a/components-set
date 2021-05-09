import { Component, h, Element, getAssetPath } from '@stencil/core';
import * as faceapi from 'face-api.js';

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
  public screenshots: string[] = [];
  @Element() private hostElement: HTMLElement;
  isRecognizing: boolean = true;

  private readonly TINY_OPTIONS = {
    inputSize: 512,
    scoreThreshold: 0.5
  }

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
    const opts = new faceapi.TinyFaceDetectorOptions(this.TINY_OPTIONS);
    const result = await faceapi.detectSingleFace(this.player, opts)
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

  takeScreenshot() {
    console.log('Screenshot');
    if (!this.player.paused) {
      const interimCanvas = document.createElement('canvas');
      interimCanvas.width = this.VIDEO_SIZE.width;
      interimCanvas.height = this.VIDEO_SIZE.height;
      const ctx = interimCanvas.getContext('2d');
      ctx.drawImage(this.player, 0, 0);
      const base64 = interimCanvas.toDataURL('image/jpeg', 0.7);
      this.screenshots.push(base64);
      return base64;
    }
  }

  render() {
    return (
      <div class="container">
        <div class="player-block">
          <video id="player" width="320" height="240" muted playsinline></video>
        </div>
        <canvas id="overlay" width="320" height="240" />
        <div class="button-block">
          <button class="player-button" onClick={this.handleStart.bind(this)}>Start Streaming</button>
          <button class="player-button" onClick={this.handleStop.bind(this)}>Stop Streaming</button>
          <button class="player-button" onClick={this.takeScreenshot.bind(this)}>Take Screenshot</button>
        </div>
      </div>
    );
  }
}
