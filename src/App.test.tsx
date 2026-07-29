import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it } from 'vitest';
import App from './App';

it('changes the expression when the feeling changes', async () => {
  const user = userEvent.setup();
  render(<App />);
  expect(screen.getByRole('textbox', { name: '投稿する文' })).toHaveValue('鉛のように身体が重い');
  await user.click(screen.getByLabelText('身体が軽い'));
  expect(screen.getByRole('textbox', { name: '投稿する文' })).toHaveValue('鉛のように身体が軽い');
});
