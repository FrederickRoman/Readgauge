import { render, screen } from "@testing-library/react";
import App from "../App";

describe("rendering App", () => {
  beforeEach(() => render(<App />));

  test("App renders", () => expect(<App />).toBeTruthy());

  test("App renders text ReadGauge", () => {
    const readgaugeTextElement = screen.getAllByText(/ReadGauge/i);
    expect(readgaugeTextElement[0]).toBeInTheDocument();
  });
});
