import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/Button";
import logo from "../assets/logo.svg";

const MOCK_PLAYERS = [
  { id: "1", name: "Gabriel", avatar: "👨" },
  { id: "2", name: "Renata", avatar: "👩" },
  { id: "3", name: "Tavares", avatar: "🐱" },
  { id: "4", name: "João", avatar: "👧" },
];

export function Lobby() {
  const navigate = useNavigate();
  const { roomId } = useParams();

  const startGame = () => {
    navigate(`/game/${roomId}`);
  };

  return (
    <div className="min-h-screen bg-zinc-100 flex flex-col">
      <div className="flex justify-between items-center p-4">
        <img src={logo} alt="Logo" className="w-12 h-12" />
        <div className="text-zinc-900 font-bold text-sm">
          Aguardando jogadores...
        </div>
      </div>

      <div className="flex-1 p-4">
        <div className="space-y-4">
          {MOCK_PLAYERS.map((player) => (
            <div
              key={player.id}
              className="flex items-center p-4 bg-zinc-900 rounded-lg"
            >
              <span className="mr-3 text-red-600 bg-red-600 rounded-full p-2">
                {player.avatar}
              </span>
              <span className="text-white">{player.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 flex flex-col items-center">
        <Button
          onClick={startGame}
          className="w-[90%] p-3 rounded-2xl bg-red-hat-600 hover:bg-red-hat-700 text-white transform hover:scale-105 transition-all duration-300 animate-pulse"
        >
          Iniciar Jogo
        </Button>
      </div>
    </div>
  );
}
