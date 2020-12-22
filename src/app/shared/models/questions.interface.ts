export interface Answer {
  title: string;
  value: number;
}

export interface Question {
  title: string;
  answers: Answer[];
}

export interface Questions {
  questions: Question[];
}
