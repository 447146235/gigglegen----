import React from 'react';
import { JokeData } from '../types';

interface JokeCardProps {
  data: JokeData;
}

export const JokeCard: React.FC<JokeCardProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl border-b-8 border-fun-yellow transform transition-all hover:scale-[1.02] duration-300 relative overflow-hidden group">
      <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-fun-yellow/20 w-24 h-24 rounded-full blur-xl"></div>
      
      <div className="mb-6">
        <h3 className="text-xl md:text-2xl font-display font-semibold text-gray-700 leading-relaxed">
          {data.setup}
        </h3>
      </div>
      
      <div className="bg-fun-yellow/10 p-6 rounded-2xl border-l-4 border-fun-yellow">
        <p className="text-2xl md:text-3xl font-display font-bold text-gray-800 text-center animate-bounce-slow">
          {data.punchline}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {data.tags.map((tag, idx) => (
          <span key={idx} className="bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full uppercase tracking-wider font-bold">
            #{tag}
          </span>
        ))}
      </div>
      
      <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    </div>
  );
};