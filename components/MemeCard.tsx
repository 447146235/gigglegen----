import React from 'react';
import { MemeData } from '../types';

interface MemeCardProps {
  data: MemeData;
}

export const MemeCard: React.FC<MemeCardProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-3xl p-4 shadow-xl border-b-8 border-fun-purple transform transition-all hover:scale-[1.02] duration-300">
      <div className="aspect-square w-full rounded-2xl overflow-hidden bg-gray-100 mb-4 border-4 border-black">
        <img 
          src={data.imageUrl} 
          alt="Generated Meme" 
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <p className="text-center font-display font-bold text-xl text-gray-800 italic">
        "{data.caption}"
      </p>
    </div>
  );
};