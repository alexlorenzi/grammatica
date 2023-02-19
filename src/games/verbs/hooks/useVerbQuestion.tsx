import { useCallback, useEffect, useState } from "react";

import ItalianVerbsList from "italian-verbs-dict/dist/verbs.json";
import ItalianVerbsRanked from "./verbs-ranked.json";
import { VerbsInfo } from "italian-verbs-dict";
import { getConjugation } from "italian-verbs";

import { VerbQuestion } from "../types";

const Forms: VerbQuestion["form"][] = [
  { display: "Io", description: [1, "S"] },
  { display: "Tu", description: [2, "S"] },
  { display: "Lei", description: [3, "S"] },
  { display: "Noi", description: [1, "P"] },
  { display: "Voi", description: [2, "P"] },
  { display: "Loro", description: [3, "P"] },
];

const getRandom = (max: number): number => {
  return Math.floor(Math.pow(Math.random(), 2) * max);
};

const getQuestion = (): VerbQuestion => {
  const form = Forms[getRandom(Forms.length)];
  const target = ItalianVerbsRanked[getRandom(ItalianVerbsRanked.length)];
  return { form, target };
};

const getAnswer = (question: VerbQuestion): string => {
  return getConjugation(
    ItalianVerbsList as VerbsInfo,
    question.target.verb,
    "PRESENTE",
    ...question.form.description,
    {} as any
  );
};

const useVerbQuestion = () => {
  const [question, setQuestion] = useState<VerbQuestion>(getQuestion());
  const [answer, setAnswer] = useState<string>(getAnswer(question));
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const newQuestion = getQuestion();
    setQuestion(newQuestion);
    setAnswer(getAnswer(newQuestion));
  }, [count]);

  const next = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  return { question, answer, next };
};
export default useVerbQuestion;
