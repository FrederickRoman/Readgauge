type range = {
  min: number;
  max: number;
};

type freScoreDescription = {
  range: range;
  schoolLevel: string;
  description: string;
};

const fleschReadingEaseScoreTable: readonly freScoreDescription[] = [
  {
    range: { min: 90, max: 100 },
    schoolLevel: "5th grade",
    description:
      "Very easy to read. Easily understood by an average 11-year-old student.",
  },
  {
    range: { min: 80, max: 90 },
    schoolLevel: "6th grade",
    description: "Easy to read. Conversational English for consumers.",
  },
  {
    range: { min: 70, max: 80 },
    schoolLevel: "7th grade",
    description: "Fairly easy to read.",
  },
  {
    range: { min: 60, max: 70 },
    schoolLevel: "8th-9th grade",
    description:
      "Plain English. Easily understood by 13- to 15-year-old students.",
  },
  {
    range: { min: 50, max: 60 },
    schoolLevel: "10th-12th grade",
    description: "Fairly difficult to read.",
  },
  {
    range: { min: 30, max: 50 },
    schoolLevel: "College",
    description: "Difficult to read.",
  },
  {
    range: { min: 10, max: 30 },
    schoolLevel: "College graduate",
    description:
      "Very difficult to read. Best understood by university graduates.",
  },
  {
    range: { min: 0, max: 10 },
    schoolLevel: "Professional",
    description:
      "Extremely difficult to read. Best understood by university graduates.",
  },
];

export default fleschReadingEaseScoreTable;
