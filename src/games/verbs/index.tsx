import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import useVerbQuestion from "./hooks/useVerbQuestion";
import useTimer from "./hooks/useTimer";

import QuestionCard from "../../components/QuestionCard";
import Button from "../../components/Button";
import Card from "../../components/Card";

const Countdown = styled.div`
  background-color: #f6dc4f;
  position: absolute;
  top: 0;
  height: 0.75rem;
  width: ${({ max, value }: { max: number; value: number }) =>
    `${(value / max) * 100}%`};
  transition: width 1s;
`;

type GameState = "UNBEGUN" | "QUESTIONING" | "CORRECT" | "INCORRECT";

export const VerbGame = () => {
  const duration = 15;

  const { time, start } = useTimer({ duration });
  const { question, answer, next } = useVerbQuestion();
  const [gameState, setGameState] = useState<GameState>("UNBEGUN");

  const handleStart = useCallback(() => {
    setGameState("QUESTIONING");
    next();
    start();
  }, [next, start]);

  const handleGuess = useCallback(
    (guess: string) => {
      setGameState(
        guess.toLocaleLowerCase() === answer.toLocaleLowerCase()
          ? "CORRECT"
          : "INCORRECT"
      );
      setTimeout(handleStart, 2000);
    },
    [answer, handleStart]
  );

  useEffect(() => {
    if (!time) {
      setGameState("INCORRECT");
      setTimeout(handleStart, 2000);
    }
  }, [handleStart, time]);

  return (
    <Card>
      {gameState === "QUESTIONING" && (
        <>
          <Countdown max={duration} value={time} />
          <QuestionCard
            question={question}
            onGuess={handleGuess}
          ></QuestionCard>
        </>
      )}

      {gameState === "UNBEGUN" && (
        <Button type="button" value="Start new session" onClick={handleStart} />
      )}

      {gameState === "CORRECT" && <p>Correct!</p>}
      {gameState === "INCORRECT" && (
        <>
          <p style={{ textAlign: "center" }}>
            Wrong! <br />
            The correct answer is
            <br />
            <strong>{answer}</strong>
          </p>
        </>
      )}
    </Card>
  );
};
