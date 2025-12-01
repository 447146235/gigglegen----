import React, { useState } from 'react';
import { VideoData, ContentType, PageProps, GenerationStatus } from '../types';
import { generateVideo } from '../services/geminiService';
import { VideoCard } from '../components/VideoCard';
import { LoadingState } from '../components/LoadingState';

export const VideoPage: React.FC<PageProps<VideoData>> = ({ history, addToHistory }) => {
  const [status, setStatus] = useState<GenerationStatus>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleGenerate = async () => {
    setStatus('generating');
    setErrorMsg(null);
    try {
      const data = await generateVideo();
      addToHistory({
        id: crypto.randomUUID(),
        type: ContentType.VIDEO,
        timestamp: Date.now(),
        data
      });
      setStatus('success');
    } catch (error: any) {
      console.error(error);
      setStatus('error');
      setErrorMsg("生成失败");
      if (error.message?.includes("key")) {
         setErrorMsg("请选择一个有效的付费项目 API Key 以生成视频。");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-display font-bold text-gray-800 mb-2">爆笑短片</h2>
        <p className="text-gray-500">Veo 模型驱动，好莱坞级制作</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800 mb-4">
        ℹ️ 视频生成需要付费 API Key，生成过程约需 1-2 分钟，请耐心等待。
      </div>

      <button
        onClick={handleGenerate}
        disabled={status === 'generating'}
        className={`w-full py-4 rounded-2xl font-display font-bold text-xl text-white shadow-lg transform transition-all active:scale-95 ${
          status === 'generating' 
            ? 'bg-gray-300 cursor-not-allowed' 
            : 'bg-fun-red hover:bg-red-500'
        }`}
      >
        {status === 'generating' ? '正在拍摄中...' : '🎬 开始拍摄'}
      </button>

      {status === 'generating' && <LoadingState />}

      {status === 'error' && (
        <div className="bg-red-100 text-red-700 p-4 rounded-xl text-center">
          {errorMsg || "拍摄出了点问题 😭"}
        </div>
      )}

      <div className="space-y-8">
        {history.map(item => (
          <div key={item.id} className="animate-fade-in-up">
            <VideoCard data={item.data} />
          </div>
        ))}
      </div>

      {history.length === 0 && status !== 'generating' && (
          <div className="text-center py-10 opacity-40">
            <span className="text-6xl grayscale">📹</span>
            <p className="mt-4 font-bold">片场已就绪，等待导演开机！</p>
          </div>
      )}
    </div>
  );
};