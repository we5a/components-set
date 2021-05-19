import { newE2EPage } from '@stencil/core/testing';

describe('player-output', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<player-output></player-output>');

    const element = await page.find('player-output');
    expect(element).toHaveClass('hydrated');
  });
});
