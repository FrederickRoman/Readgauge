import { render } from "@testing-library/react";
import Home from "../pages/Home";

describe("rendering Home page with main elements", () => {
  beforeEach(() => render(<Home />));

  test("renders Home", () => expect(<Home />).toBeTruthy());

  test("renders Home with hero banner", () => {
    const banner = document.querySelector('div#hero-banner[role="banner"]');
    expect(banner).toBeInTheDocument();
  });

  test("renders Home with app's description introduction", () => {
    const intro = document.querySelector('section#app-description-intro');
    expect(intro).toBeInTheDocument();
  });

  test("renders Home page with reading level scoring demo section", () => {
    const demo = document.querySelector("section#reading-level-scoring-demo");
    expect(demo).toBeInTheDocument();
  });
});
