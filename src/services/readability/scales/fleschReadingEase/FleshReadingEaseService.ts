import ItextFeatures from "../../../../types/interfaces/ItextFeatures";
import fleschReadingEaseScoreTable from "./fleschReadingEaseScoreTable";

interface IUSschoolLevel {
  scoreSchoolLevel: string;
  scoreSchoolDescription: string;
}

class FleshReadingEaseService {
  static scoreToUSschoolLevel(score: number): IUSschoolLevel {
    let scoreSchoolLevel = "";
    let scoreSchoolDescription = "";
    const SCORE_TO_SCHOOL_LEVEL_MAX = 100;
    const SCORE_TO_SCHOOL_LEVEL_MIN = 0;
    if (score > SCORE_TO_SCHOOL_LEVEL_MAX) {
      scoreSchoolLevel = "Below 5th grade";
      scoreSchoolDescription = "Extremely easy to read.";
    } else if (score <= SCORE_TO_SCHOOL_LEVEL_MIN) {
      scoreSchoolLevel = "Professional";
      scoreSchoolDescription =
        "Extremely difficult to read. Best understood by university graduates.";
    } else {
      fleschReadingEaseScoreTable.forEach(
        ({ range, schoolLevel, description }) => {
          if (range.min < score && score <= range.max) {
            scoreSchoolLevel = schoolLevel;
            scoreSchoolDescription = description;
          }
        }
      );
    }

    return { scoreSchoolLevel, scoreSchoolDescription };
  }
  static fkGradeLevel(textFeatures: ItextFeatures): number {
    const { totNumWords, totNumSentences, totNumSyllables } = textFeatures;
    const DEFAULT_SCORE = Infinity;
    if (totNumWords > 0 && totNumSentences > 0) {
      const fkGradeLevelScore: number =
        206.835 -
        1.015 * (totNumWords / totNumSentences) -
        84.6 * (totNumSyllables / totNumWords);
      return fkGradeLevelScore;
    } else {
      return DEFAULT_SCORE;
    }
  }
}

export default FleshReadingEaseService;
