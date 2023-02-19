import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { VerbQuestion } from "../../games/verbs/types";

import Button from "../Button";

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 3rem;
`;

const Question = styled.p`
  text-align: center;
  margin: 0;
`;

const QuestionHighlight = styled.span`
  text-decoration: underline;
  text-decoration-style: dashed;
  text-underline-offset: 0.5rem;
`;

const Input = styled.input`
  font-family: ${({ theme }) => theme.typography.family};
  font-size: 3rem;
  background-color: transparent;
  border: ${({ theme }) => theme.shape.border};
  text-align: center;
  outline: none;
  width: 100%;
  box-sizing: border-box;
  :focus {
    outline: ${({ theme }) => `5px solid ${theme.palette.info}`};
  }
  @media only screen and (max-width: 600px) {
    font-size: 1.5rem;
  }
`;

const Popover = styled.div`
  position: absolute;
  z-index: 10;
  background-color: ${({ theme }) => theme.palette.info};
  border: ${({ theme }) => theme.shape.border};
  padding: 1rem;
  font-size: 1rem;
`;

type CardProps = {
  question: VerbQuestion;
  onGuess: (guess: string) => void;
};
const QuestionCard = ({ question, onGuess }: CardProps) => {
  const [guess, setGuess] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);
  const hintRef = useRef<HTMLSpanElement>(null);
  const [showHint, setShowHint] = useState<
    { x: number; y: number } | undefined
  >();

  useEffect(() => {
    setGuess("");
  }, [question]);

  const handleShowHint = (e: React.MouseEvent<HTMLFormElement>) => {
    if (e.target === hintRef.current) {
      setShowHint({ x: e.clientX, y: e.clientY });
    } else {
      setShowHint(undefined);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onGuess(guess);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  return (
    <Form onSubmit={handleSubmit} onClick={handleShowHint}>
      <Question>
        What is the{" "}
        <QuestionHighlight>{question.form.display}</QuestionHighlight> form of{" "}
        <br />
        <QuestionHighlight ref={hintRef} style={{ cursor: "help" }}>
          {question.target.translation}
        </QuestionHighlight>
        ?
      </Question>
      {!!showHint && (
        <Popover style={{ top: showHint.y, left: showHint.x }}>
          {question.target.verb}
        </Popover>
      )}
      <Input
        ref={inputRef}
        autoComplete="off"
        spellCheck="false"
        name="guess"
        value={guess}
        onChange={({ target: { value } }) => setGuess(value)}
      />
      <Button disabled={!guess?.length} value="Guess" />
    </Form>
  );
};

export default QuestionCard;
