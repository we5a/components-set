import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'player-output',
  styleUrl: 'player-output.css',
  shadow: true,
})
export class PlayerOutput {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
