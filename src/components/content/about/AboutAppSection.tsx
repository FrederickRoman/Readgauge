import FleschKincaidGradeFormula from "../../../assets/img/FleschKincaidGradeFormula.svg";
import SyllablesPredDemo from "../../demo/syllableCountPrediction/SyllablesPredDemo";

function AboutAppSection(): JSX.Element {
  return (
    <section>
      <h2>How does it work?</h2>
      <div>
        <h3>TLDR</h3>
        <div>
          <p>
            It calculates the reading level using a modified version the
            Flesch-Kincaid grade level formula.
          </p>
          <p>
            It's just like that formula; but instead of using a look-up table to
            get the syllable length of each word, it uses a neural network that
            runs on your browser to predict it.
          </p>
        </div>
        <h3>Brief Explanation</h3>
        <div>
          <p>
            Neuro-Flesch calculates the reading level using a modified version
            the Flesch-Kincaid grade level formula.
          </p>
          <figure style={{ margin: 5 }}>
            <img
              src={FleschKincaidGradeFormula}
              alt="Flesch Kincaid Grade Formula"
              style={{ width: "min(75vw, 500px)" }}
            />
            <figcaption style={{ fontSize: "0.75em" }}>
              Flesch Kincaid Grade Formula (Wikipedia)
            </figcaption>
          </figure>
          <p>
            The key difference is that in Neuro-Flesch the total number of
            syllables is <b>predicted</b> rather looked up in a dictionary.
          </p>
          <SyllablesPredDemo/>
        </div>
      </div>
    </section>
  );
}

export default AboutAppSection;
