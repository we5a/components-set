import { newE2EPage } from '@stencil/core/testing';

describe('webcam-player', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<webcam-player></webcam-player>');

    const element = await page.find('webcam-player');
    expect(element).toHaveClass('hydrated');
  });
});
