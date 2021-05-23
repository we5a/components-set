import { newSpecPage } from '@stencil/core/testing';
import { MainModal } from '../main-modal';

describe('main-modal', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MainModal],
      html: `<main-modal></main-modal>`,
    });
    expect(page.root).toEqualHtml(`
      <main-modal>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </main-modal>
    `);
  });
});
