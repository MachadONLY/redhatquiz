import { create } from 'zustand';

interface Player {
  id: string;
  name: string;
  score: number;
}

interface GameState {
  roomId: string | null;
  players: Player[];
  currentQuestion: number;
  isHost: boolean;
  setRoomId: (roomId: string) => void;
  setPlayers: (players: Player[]) => void;
  setCurrentQuestion: (questionNumber: number) => void;
  setIsHost: (isHost: boolean) => void;
}

export const useGameStore = create<GameState>((set) => ({
  roomId: null,
  players: [],
  currentQuestion: 0,
  isHost: false,
  setRoomId: (roomId) => set({ roomId }),
  setPlayers: (players) => set({ players }),
  setCurrentQuestion: (questionNumber) => set({ currentQuestion: questionNumber }),
  setIsHost: (isHost) => set({ isHost }),
}));