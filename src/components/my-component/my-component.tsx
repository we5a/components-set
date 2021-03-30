import { Component, Prop, h, Method } from '@stencil/core';
import { format } from '../../utils/utils';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class MyComponent {
  /**
   * The first name
   */
  @Prop() first: string;

  /**
   * The middle name
   */
  @Prop() middle: string;

  /**
   * The last name
   */
  @Prop() last: string;

  private getText(): string {
    return format(this.first, this.middle, this.last);
  }

  @Method()
  sayHello() {
    return Promise.resolve(45);
  }

  render() {
    return <div style={{textAlign: 'center'}}>Hello#, World! I'm from Stencil with love {this.getText()}</div>;
  }
}
