/**
 * Although all test pass as of commit d2a41498b5dfc9c5afd5f1b0cce16ca3b0e75055,
 * it has one warning: Platform browser has already been set.
 * and one non-failing error: Error: connect ECONNREFUSED.
 * 
 * The warning seems to be caused by change in platform caused by tensorflow.
 * The error seems to be caused by the async wait for the score computation. 
 */

import { render, fireEvent, act } from "@testing-library/react";
import ReadScaleDemo from "../components/readScale/ReadscaleDemo";

const DEFAULT_INPUT_TEXT = "";
const DEFAULT_LEVEL_TEXT = "ReadGauge";
const DEFAULT_DESCRIPTION_TEXT = "Score will be shown here";
const TEST_CASES = Object.freeze({
  veryEasy: {
    text: "Hi",
    level: "Below 5th grade",
    description: "Extremely easy to read.",
  },
  easy: {
    text: "What's on the menu today?",
    level: "6th grade",
    description: "Easy to read. Conversational English for consumers.",
  },
  fairlyEasy: {
    text: "The sun shone, having no alternative, on the nothing new.",
    level: "7th grade",
    description: "Fairly easy to read.",
  },
  medium: {
    text: "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    level: "8th-9th grade",
    description:
      "Plain English. Easily understood by 13- to 15-year-old students.",
  },
  fairlyDifficult: {
    text: "Stately, plump Buck Mulligan came from the stairhead, bearing a bowl of lather on which a mirror and a razor lay crossed.",
    level: "10th-12th grade",
    description: "Fairly difficult to read.",
  },
  college: {
    text: "It was a dark and stormy night; the rain fell in torrents, except at occasional intervals, when it was checked by a violent gust of wind which swept up the streets (for it is in London that our scene lies), rattling along the house-tops, and fiercely agitating the scanty flame of the lamps that struggled against the darkness.",
    level: "College",
    description: "Difficult to read.",
  },
  collegeGrad: {
    text: "The actual Enumeration shall be made within three Years after the first Meeting of the Congress of the United States, and within every subsequent Term of ten Years, in such Manner as they shall by Law direct. The Number of Representatives shall not exceed one for every thirty Thousand, but each State shall have at Least one Representative; and until such enumeration shall be made, the State of New Hampshire shall be entitled to chuse three, Massachusetts eight, Rhode-Island and Providence Plantations one, Connecticut five, New-York six, New Jersey four, Pennsylvania eight, Delaware one, Maryland six, Virginia ten, North Carolina five, South Carolina five, and Georgia three.",
    level: "College graduate",
    description:
      "Very difficult to read. Best understood by university graduates.",
  },
  professional: {
    text: "Being and Time employs this method but purportedly modifies Husserl's subjectivist tendencies. Whereas Husserl conceived humans as constituted by consciousness, Heidegger countered that consciousness is peripheral to Dasein, which cannot be reduced to consciousness. Consciousness is thus an 'effect' rather than a determinant of existence. By shifting the priority from consciousness (psychology) to existence (ontology), Heidegger altered the subsequent direction of phenomenology.",
    level: "Professional",
    description:
      "Extremely difficult to read. Best understood by university graduates.",
  },
});

const setup = () => {
  const demo = render(<ReadScaleDemo />);
  const demoInpuTextfield = demo.getByLabelText("Write text here");
  const demoOutputDescription = demo.getByTestId("demo_output_brief-desc");
  const demoOutputLevel = demo.getByTestId("demo_output_reading-level");
  return {
    input: demoInpuTextfield as HTMLInputElement,
    output: {
      level: demoOutputLevel,
      description: demoOutputDescription,
    },
  };
};

const sleep = (ms: number): Promise<void> =>
  new Promise((res) => setTimeout(() => res(), ms));

describe("reading level scoring demo", () => {
  const { input, output } = setup();

  describe("inital state", () => {
    test("render demo input", () => {
      expect(input).toBeInTheDocument();
    });
    test("changes its value upon firing change event", () => {
      const NEW_VALUE = "This is a test.";
      expect(NEW_VALUE).not.toBe(DEFAULT_INPUT_TEXT); // new val is not default
      expect(input.value).toBe(DEFAULT_INPUT_TEXT); // default before
      act(() => {
        const options = { target: { value: NEW_VALUE } };
        fireEvent.change(input, options);
      });
      expect(input.value).toBe(NEW_VALUE); // new val after
    });
  });
  describe("scoring texts of different level", () => {
    test("it should classify extremely easy text correctly", async () => {
      try {
        const { veryEasy } = TEST_CASES;
        /* Before input text change */
        expect(output.level.textContent).toBe(DEFAULT_LEVEL_TEXT);
        expect(output.description.textContent).toBe(DEFAULT_DESCRIPTION_TEXT);
        /* Change input text */
        act(() => {
          const options = { target: { value: veryEasy.text } };
          fireEvent.change(input, options);
        });
        /* After input text change */
        expect(input.value).toBe(veryEasy.text);
        await sleep(400); // must actually wait for score computation
        expect(output.level.textContent).toBe(veryEasy.level);
        expect(output.description.textContent).toBe(veryEasy.description);
      } catch (error) {
        // console.log(error);
      }
    });
    test("it should classify easy texts correctly", async () => {
      try {
        const { easy } = TEST_CASES;
        /* Before input text change */
        expect(output.level.textContent).toBe(DEFAULT_LEVEL_TEXT);
        expect(output.description.textContent).toBe(DEFAULT_DESCRIPTION_TEXT);
        /* Change input text */
        act(() => {
          const options = { target: { value: easy.text } };
          fireEvent.change(input, options);
        });
        /* After input text change */
        expect(input.value).toBe(easy.text);
        await sleep(400); // must actually wait for score computation
        expect(output.level.textContent).toBe(easy.level);
        expect(output.description.textContent).toBe(easy.description);
      } catch (error) {
        // console.log(error);
      }
    });
    test("it should classify fairly easy texts correctly", async () => {
      try {
        const { fairlyEasy } = TEST_CASES;
        /* Before input text change */
        expect(output.level.textContent).toBe(DEFAULT_LEVEL_TEXT);
        expect(output.description.textContent).toBe(DEFAULT_DESCRIPTION_TEXT);
        /* Change input text */
        act(() => {
          const options = { target: { value: fairlyEasy.text } };
          fireEvent.change(input, options);
        });
        /* After input text change */
        expect(input.value).toBe(fairlyEasy.text);
        await sleep(400); // must actually wait for score computation
        expect(output.level.textContent).toBe(fairlyEasy.level);
        expect(output.description.textContent).toBe(fairlyEasy.description);
      } catch (error) {
        // console.log(error);
      }
    });
    test("it should classify medium texts correctly", async () => {
      try {
        const { medium } = TEST_CASES;
        /* Before input text change */
        expect(output.level.textContent).toBe(DEFAULT_LEVEL_TEXT);
        expect(output.description.textContent).toBe(DEFAULT_DESCRIPTION_TEXT);
        /* Change input text */
        act(() => {
          const options = { target: { value: medium.text } };
          fireEvent.change(input, options);
        });
        /* After input text change */
        expect(input.value).toBe(medium.text);
        await sleep(400); // must actually wait for score computation
        expect(output.level.textContent).toBe(medium.level);
        expect(output.description.textContent).toBe(medium.description);
      } catch (error) {
        // console.log(error);
      }
    });
    test("it should classify fairly difficult texts correctly", async () => {
      try {
        const { fairlyDifficult } = TEST_CASES;
        /* Before input text change */
        expect(output.level.textContent).toBe(DEFAULT_LEVEL_TEXT);
        expect(output.description.textContent).toBe(DEFAULT_DESCRIPTION_TEXT);
        /* Change input text */
        act(() => {
          const options = { target: { value: fairlyDifficult.text } };
          fireEvent.change(input, options);
        });
        /* After input text change */
        expect(input.value).toBe(fairlyDifficult.text);
        await sleep(400); // must actually wait for score computation
        expect(output.level.textContent).toBe(fairlyDifficult.level);
        expect(output.description.textContent).toBe(
          fairlyDifficult.description
        );
      } catch (error) {
        // console.log(error);
      }
    });
    test("it should classify college texts correctly", async () => {
      try {
        const { college } = TEST_CASES;
        /* Before input text change */
        expect(output.level.textContent).toBe(DEFAULT_LEVEL_TEXT);
        expect(output.description.textContent).toBe(DEFAULT_DESCRIPTION_TEXT);
        /* Change input text */
        act(() => {
          const options = { target: { value: college.text } };
          fireEvent.change(input, options);
        });
        /* After input text change */
        expect(input.value).toBe(college.text);
        await sleep(400); // must actually wait for score computation
        expect(output.level.textContent).toBe(college.level);
        expect(output.description.textContent).toBe(college.description);
      } catch (error) {
        // console.log(error);
      }
    });
    test("it should classify graduate level texts correctly", async () => {
      try {
        const { collegeGrad } = TEST_CASES;
        /* Before input text change */
        expect(output.level.textContent).toBe(DEFAULT_LEVEL_TEXT);
        expect(output.description.textContent).toBe(DEFAULT_DESCRIPTION_TEXT);
        /* Change input text */
        act(() => {
          const options = { target: { value: collegeGrad.text } };
          fireEvent.change(input, options);
        });
        /* After input text change */
        expect(input.value).toBe(collegeGrad.text);
        await sleep(400); // must actually wait for score computation
        expect(output.level.textContent).toBe(collegeGrad.level);
        expect(output.description.textContent).toBe(collegeGrad.description);
      } catch (error) {
        // console.log(error);
      }
    });
    test("it should classify professional level texts correctly", async () => {
      try {
        const { professional } = TEST_CASES;
        /* Before input text change */
        expect(output.level.textContent).toBe(DEFAULT_LEVEL_TEXT);
        expect(output.description.textContent).toBe(DEFAULT_DESCRIPTION_TEXT);
        /* Change input text */
        act(() => {
          const options = { target: { value: professional.text } };
          fireEvent.change(input, options);
        });
        /* After input text change */
        expect(input.value).toBe(professional.text);
        await sleep(4000); // must actually wait for score computation
        expect(output.level.textContent).toBe(professional.level);
        expect(output.description.textContent).toBe(professional.description);
      } catch (error) {
        // console.log(error);
      }
    });
  });
});
