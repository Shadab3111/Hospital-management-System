import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the hospital management homepage', () => {
  render(<App />);
  expect(
    screen.getByRole('heading', { name: /streamline your hospital management/i })
  ).toBeInTheDocument();
});
