import React, { useState } from 'react';
import { MemeData, ContentType, PageProps, GenerationStatus } from '../types';
import { generateMeme } from '../services/geminiService';
import { MemeCard } from '../components/MemeCard';
import { LoadingState } from '../components/LoadingState';

export const MemePage: React.FC<PageProps<MemeData>> = ({ history, addToHistory }) => {
  const [status, setStatus] = useState<GenerationStatus>('idle');

  const handleGenerate = async () => {
    setStatus('generating');
    try {
      const data = await generateMeme();
      addToHistory({
        id: crypto.randomUUID(),
        type: ContentType.MEME,
        timestamp: Date.now(),
        data
      });
      setStatus('success');
    } catch (e) {
      console.error(e);
      setStatus('error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-display font-bold text-gray-800 mb-2">梗图生成器</h2>
        <p className="text-gray-500">斗图必备，独一无二</p>
      </div>

      <button
        onClick={handleGenerate}
        disabled={status === 'generating'}
        className={`w-full py-4 rounded-2xl font-display font-bold text-xl text-white shadow-lg transform transition-all active:scale-95 ${
          status === 'generating' 
            ? 'bg-gray-300 cursor-not-allowed' 
            : 'bg-fun-purple hover:bg-purple-500'
        }`}
      >
        {status === 'generating' ? '正在绘图...' : '🎨 生成梗图'}
      </button>

      {status === 'generating' && <LoadingState />}

      {status === 'error' && (
        <div className="bg-red-100 text-red-700 p-4 rounded-xl text-center">
          生成失败，可能是AI画笔断了 😭
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {history.map(item => (
          <div key={item.id} className="animate-fade-in-up">
            <MemeCard data={item.data} />
          </div>
        ))}
      </div>
      
      {history.length === 0 && status !== 'generating' && (
          <div className="text-center py-10 opacity-40 col-span-full">
            <span className="text-6xl grayscale">🖼️</span>
            <p className="mt-4 font-bold">还没有梗图，快来生成第一张！</p>
          </div>
      )}
    </div>
  );
};