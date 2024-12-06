import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Timer } from '../components/Timer';
import { Leaderboard } from '../components/Leaderboard';
import { QUESTIONS } from '../data/questions';
import { useGameStore } from '../store/game-store';
import logo from "../assets/logo.svg";

export function Game() {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [showFinalRound, setShowFinalRound] = useState(false);
  const { players, setPlayers } = useGameStore();

  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === QUESTIONS.length - 1;

  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleTimeUp();
    }
  }, [timeLeft, showResult]);

  const handleTimeUp = () => {
    setShowResult(true);
    if (isLastQuestion) {
      setTimeout(() => {
        setShowFinalRound(true);
        setTimeout(() => {
          setGameEnded(true);
        }, 3000);
      }, 2000);
    } else {
      setTimeout(nextQuestion, 2000);
    }
  };

  const calculateScore = (timeRemaining: number, isCorrect: boolean) => {
    if (!isCorrect) return 0;
    return Math.round((timeRemaining / 15) * 1000);
  };

  const handleAnswer = (index: number) => {
    if (!showResult) {
      setSelectedAnswer(index);
      setShowResult(true);
      
      const score = calculateScore(timeLeft, index === currentQuestion.correct);
      setPlayers(
        players.map(player => 
          player.id === 'current' 
            ? { ...player, score: player.score + score }
            : player
        )
      );

      if (isLastQuestion) {
        setTimeout(() => {
          setShowFinalRound(true);
          setTimeout(() => {
            setGameEnded(true);
          }, 3000);
        }, 2000);
      } else {
        setTimeout(nextQuestion, 2000);
      }
    }
  };

  const nextQuestion = () => {
    setCurrentQuestionIndex(prev => prev + 1);
    setTimeLeft(15);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  if (gameEnded) {
    return <Leaderboard players={players} />;
  }

  if (showFinalRound) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-4 animate-bounce">
            Resultado Final!
          </h1>
          <p className="text-2xl text-red-hat-300">
            Vamos Ver Nossos Vencedores...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900 flex flex-col items-center">
      <div className="w-full p-4 flex justify-between items-center">
      <img src={logo} alt="Logo" className="w-12 h-12" />
        <div className="text-white text-sm font-bold">Questão {currentQuestionIndex + 1}/6</div>
      </div>

      <div className="p-4 flex flex-col justify-center items-center w-[90%]">
        <Timer timeLeft={timeLeft} total={15} />

        <h2 className="text-2xl font-bold text-white my-8 text-center">
          {currentQuestion.question}
        </h2>

        <div className="space-y-5">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={showResult}
              className={`w-full p-4 rounded-lg text-left transition-colors ${
                showResult
                  ? index === currentQuestion.correct
                    ? 'bg-green-500 text-white'
                    : index === selectedAnswer
                    ? 'bg-red-500 text-white'
                    : 'bg-red-hat-500/20 text-white'
                  : 'bg-red-hat-500/20 text-white hover:bg-red-hat-500/30'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}