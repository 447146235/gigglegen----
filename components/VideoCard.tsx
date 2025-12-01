import React from 'react';
import { VideoData } from '../types';

interface VideoCardProps {
  data: VideoData;
}

export const VideoCard: React.FC<VideoCardProps> = ({ data }) => {
  return (
    <div className="bg-black rounded-3xl overflow-hidden shadow-2xl border-4 border-fun-red transform transition-all hover:scale-[1.01] duration-300">
      <div className="relative aspect-video w-full bg-gray-900">
        <video 
          src={data.videoUrl} 
          controls 
          autoPlay 
          loop 
          muted 
          className="w-full h-full object-contain"
        />
      </div>
      <div className="p-4 bg-gray-800">
        <p className="text-gray-300 text-sm font-mono">
          <span className="text-fun-red font-bold">提示词:</span> {data.prompt}
        </p>
      </div>
    </div>
  );
};