import { newSpecPage } from '@stencil/core/testing';
import { PlayerOutput } from '../player-output';

describe('player-output', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [PlayerOutput],
      html: `<player-output></player-output>`,
    });
    expect(page.root).toEqualHtml(`
      <player-output>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </player-output>
    `);
  });
});
