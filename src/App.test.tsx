import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App with text ReadGauge', () => {
  render(<App />);
  const readgaugeTextElement = screen.getAllByText(/ReadGauge/i);
  expect(readgaugeTextElement[0]).toBeInTheDocument();
});
