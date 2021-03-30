import { newSpecPage } from '@stencil/core/testing';
import { WebcamPlayer } from '../webcam-player';

describe('webcam-player', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [WebcamPlayer],
      html: `<webcam-player></webcam-player>`,
    });
    expect(page.root).toEqualHtml(`
      <webcam-player>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </webcam-player>
    `);
  });
});
