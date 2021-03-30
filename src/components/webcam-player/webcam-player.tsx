import { Component, h, Element } from '@stencil/core';

@Component({
  tag: 'webcam-player',
  styleUrl: 'webcam-player.css',
  shadow: false,
})
export class WebcamPlayer {
  @Element() private hostElement: HTMLElement;
  private player: HTMLVideoElement;
  private cameraStream: any = null;
  private mediaSupport = 'mediaDevices' in navigator;

  componentDidLoad() {
    this.player = this.hostElement.querySelector('#player');
  }

  async handleStart() {
    if (this.mediaSupport && null == this.cameraStream) {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.cameraStream = mediaStream;
      this.player.srcObject = mediaStream;
      this.player.play();
    }
    else {
      alert('Your browser does not support media devices.');
      return;
    }
  }

  handleStop() {
    console.log('Stop streaming');
    if (null != this.cameraStream) {
      const track = this.cameraStream.getTracks()[0];
      track.stop();
      this.player.load();
      this.cameraStream = null;
    }
  }

  onPlay(e) {
    console.log('ON play', e);
  }

  render() {
    return (
      <div class="container">
        <div class="player-block">
          <video id="player" width="320" height="240" ></video>
        </div>
        <canvas id="overlay" width="320" height="240" />
        <div class="button-block">
          <button class="button button-start" onClick={this.handleStart.bind(this)}>Start Streaming</button>
          <button class="button button-stop" onClick={this.handleStop.bind(this)}>Stop Streaming</button>
        </div>
      </div>
    );
  }
}

// autoplay muted playsInline
