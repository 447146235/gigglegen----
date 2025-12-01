import React, { useState, useEffect } from 'react';

const funnyMessages = [
  "正在给AI讲笑话，试图逗笑它...",
  "正在教机器人如何幽默...",
  "正在从云端下载快乐...",
  "正在咨询脱口秀大王...",
  "正在合成多巴胺...",
  "正在打磨每一个像素...",
  "正在叫醒服务器里的小仓鼠...",
  "正在为你酝酿一个神转折...",
];

export const LoadingState: React.FC = () => {
  const [message, setMessage] = useState(funnyMessages[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessage(funnyMessages[Math.floor(Math.random() * funnyMessages.length)]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-12 bg-white/50 backdrop-blur-sm rounded-3xl border-2 border-dashed border-gray-300">
      <div className="text-6xl animate-bounce mb-6">🤪</div>
      <div className="w-full max-w-xs bg-gray-200 rounded-full h-2.5 mb-4 overflow-hidden">
        <div className="bg-fun-blue h-2.5 rounded-full animate-[wiggle_1s_ease-in-out_infinite] w-full origin-left transform scale-x-50"></div>
      </div>
      <p className="font-display text-xl text-gray-600 text-center animate-pulse">
        {message}
      </p>
    </div>
  );
};