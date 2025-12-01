import React, { useState } from 'react';
import { JokeData, ContentType, PageProps, GenerationStatus } from '../types';
import { generateJoke } from '../services/geminiService';
import { JokeCard } from '../components/JokeCard';
import { LoadingState } from '../components/LoadingState';

export const JokePage: React.FC<PageProps<JokeData>> = ({ history, addToHistory }) => {
  const [status, setStatus] = useState<GenerationStatus>('idle');
  
  const handleGenerate = async () => {
    setStatus('generating');
    try {
      const data = await generateJoke();
      addToHistory({
        id: crypto.randomUUID(),
        type: ContentType.JOKE,
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
        <h2 className="text-3xl font-display font-bold text-gray-800 mb-2">每日一笑</h2>
        <p className="text-gray-500">AI 讲段子，认真你就输了</p>
      </div>

      <button
        onClick={handleGenerate}
        disabled={status === 'generating'}
        className={`w-full py-4 rounded-2xl font-display font-bold text-xl text-yellow-900 shadow-lg transform transition-all active:scale-95 ${
          status === 'generating' 
            ? 'bg-gray-300 cursor-not-allowed' 
            : 'bg-fun-yellow hover:bg-yellow-400'
        }`}
      >
        {status === 'generating' ? '正在憋大招...' : '✨ 讲个笑话'}
      </button>

      {status === 'generating' && <LoadingState />}
      
      {status === 'error' && (
        <div className="bg-red-100 text-red-700 p-4 rounded-xl text-center">
          生成失败，请重试 😭
        </div>
      )}

      <div className="space-y-6">
        {history.map(item => (
          <div key={item.id} className="animate-fade-in-up">
            <JokeCard data={item.data} />
          </div>
        ))}
        {history.length === 0 && status !== 'generating' && (
          <div className="text-center py-10 opacity-40">
            <span className="text-6xl grayscale">🎭</span>
            <p className="mt-4 font-bold">这里空空如也，快点上面的按钮！</p>
          </div>
        )}
      </div>
    </div>
  );
};