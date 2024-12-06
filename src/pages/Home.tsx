import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import logo from "../assets/logo.svg";
import partner from "../assets/partner.svg";

export function Home() {
  const [username, setUsername] = useState('');
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();

  const createRoom = () => {
    const newRoomId = Math.random().toString(36).substring(2, 8);
    navigate(`/lobby/${newRoomId}`);
  };

  const joinRoom = () => {
    if (roomId) {
      navigate(`/lobby/${roomId}`);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 p-4">
      <div className="flex justify-between items-center p-4">
        <img src={logo} alt="" className='w-12 h-12'/>
         <img src={partner} alt="" className='w-10 h-10 rounded-lg' />
      </div>

  
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="w-full max-w-md space-y-12">
          <div className="space-y-4 flex flex-col justify-center items-center">
            <img src={logo} alt="" className='w-60 h-60' />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-[90%] px-4 py-3 bg-white/5 rounded-2xl text-white placeholder-zinc-500 mx-auto"
              placeholder="Usuário"
            />
            <input
              type="text"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="w-[90%] px-4 py-3 bg-white/5 rounded-2xl text-white placeholder-zinc-500 mx-auto"
              placeholder="Senha"
            />
          </div>

          <div className="space-y-5 flex flex-col items-center">
            <Button
              onClick={createRoom}
              className="w-[90%] p-3 bg-zinc-100 text-zinc-900 hover:bg-red-hat-700 hover:text-zinc-50 rounded-2xl"
            >
              Criar Sala
            </Button>
            <Button
              onClick={joinRoom}
              variant="secondary"
              className="w-[90%] p-3 bg-zinc-100 text-zinc-900 hover:bg-red-hat-700 hover:text-zinc-50 rounded-2xl"
            >
              Entrar na Sala
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
