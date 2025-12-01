import React from 'react';
import { ContentType } from '../types';

interface NavbarProps {
  currentView: ContentType;
  onViewChange: (view: ContentType) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onViewChange }) => {
  const navItems = [
    { type: ContentType.JOKE, label: '段子', icon: '🤣' },
    { type: ContentType.MEME, label: '表情包', icon: '🖼️' },
    { type: ContentType.VIDEO, label: '视频', icon: '🎬' },
  ];

  return (
    <>
      {/* Desktop Top Nav */}
      <nav className="hidden md:block fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md shadow-sm z-50 transition-all">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎭</span>
            <span className="text-xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-fun-purple to-fun-blue">
              GiggleGen
            </span>
          </div>
          <div className="flex gap-2">
            {navItems.map((item) => (
              <button
                key={item.type}
                onClick={() => onViewChange(item.type)}
                className={`px-6 py-2 rounded-full font-bold transition-all duration-200 ${
                  currentView === item.type
                    ? 'bg-fun-blue text-white shadow-md transform scale-105'
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                {item.icon} {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50 border-t border-gray-100 pb-safe">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => (
            <button
              key={item.type}
              onClick={() => onViewChange(item.type)}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
                currentView === item.type ? 'text-fun-blue' : 'text-gray-400'
              }`}
            >
              <span className={`text-2xl transition-transform duration-200 ${currentView === item.type ? 'scale-125' : ''}`}>
                {item.icon}
              </span>
              <span className="text-[10px] font-bold">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
};