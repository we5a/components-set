import { newE2EPage } from '@stencil/core/testing';

describe('main-modal', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<main-modal></main-modal>');

    const element = await page.find('main-modal');
    expect(element).toHaveClass('hydrated');
  });
});
