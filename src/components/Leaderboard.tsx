import React from "react";
import confetti from "canvas-confetti";
import { Player } from "../types";

interface LeaderboardProps {
  players: Player[];
}

export function Leaderboard({ players }: LeaderboardProps) {
  React.useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  const sortedPlayers = [...players]
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return (
    <div className="min-h-screen w-full bg-zinc-900">
      <div className="flex flex-col items-center justify-center p-4">
        <h2 className="text-4xl font-bold text-white mb-8">🏆 Top 3 🏆</h2>
        <div className="flex flex-col gap-4 w-full max-w-md">
          {sortedPlayers.map((player, index) => (
            <div
              key={player.id}
              className="flex items-center justify-between p-4 bg-red-hat-600 rounded-lg animate-fade-in"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">
                  {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
                </span>
                <span className="text-xl text-white">{player.name}</span>
              </div>
              <span className="text-xl font-bold text-white">
                {player.score}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
