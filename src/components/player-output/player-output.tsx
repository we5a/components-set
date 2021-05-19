import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'player-output',
  styleUrl: 'player-output.css',
  shadow: true,
})
export class PlayerOutput {
  @Prop({reflect: true}) message: string;

  render() {
    return (
      <Host>
        {this.message}
        {/* <slot></slot> */}
      </Host>
    );
  }

}
