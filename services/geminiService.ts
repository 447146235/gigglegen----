import { GoogleGenAI, Type } from "@google/genai";
import { ContentType, JokeData, MemeData, VideoData } from "../types";

// Helper to get AI instance
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

// Random topics to ensure variety (Localized for Chinese context)
// Updated with more Gen-Z/Internet specific humor
const topics = [
  "甲方改需求", "周一早八", "由于太饿不想说话", "无效社交", 
  "理发师的'一点点'", "刚发的工资", "期末周破防", 
  "减肥失败", "发际线后移", "老板的逻辑", "亲戚问工资",
  "凑满减", "健身房气氛组", "下班前五分钟", "屎山代码",
  "精神状态(发疯)", "演精神正常", "社恐vs社牛", "又菜又爱玩",
  "卡皮巴拉(情绪稳定)", "确诊为淡人", "MBTI", "已读乱回", "脆皮大学生"
];

const getRandomTopic = () => topics[Math.floor(Math.random() * topics.length)];

// --- JOKE GENERATION ---
export const generateJoke = async (): Promise<JokeData> => {
  const ai = getAI();
  const topic = getRandomTopic();
  
  // Enhanced prompt: STRICT brevity constraints
  const prompt = `你现在是“弱智吧”的资深吧主，也是一位冷笑话大王。
  请以"${topic}"为主题，创作一个**极短**的中文段子。
  
  必须严格遵守以下限制：
  1. **字数限制**：【铺垫】绝对不能超过15个字！【爆梗】绝对不能超过10个字！
  2. **风格**：要是“逻辑鬼才”、“废话文学”或者“脑筋急转弯”的反转。不要普通的叙述。
  3. **拒绝**：不要老套的谐音梗。
  4. 必须返回JSON格式。
  `;
  
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      temperature: 1.4, // Very high creativity for absurdity
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          setup: { type: Type.STRING, description: "铺垫 (Max 15 chars)" },
          punchline: { type: Type.STRING, description: "爆梗 (Max 10 chars)" },
          tags: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["setup", "punchline", "tags"]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("生成笑话失败");
  return JSON.parse(text) as JokeData;
};

// --- MEME GENERATION ---
export const generateMeme = async (): Promise<MemeData> => {
  const ai = getAI();
  const topic = getRandomTopic();

  // Step 1: Brainstorm concept - Focus on "Ugly-Cute" and "Sarcasm"
  const conceptPrompt = `你是一个网络梗图制造机。请围绕主题"${topic}"设计一个**丑萌**且**扎心**的梗图。

  返回JSON格式：
  1. "caption_cn": (中文) 
     - **字数**：4-6个字以内！越短越好！
     - **风格**：纯粹的情绪发泄、阴阳怪气或摆烂文学。
     - 例子："禁止焦绿"、"已老实"、"汗流浃背"、"想死"、"别管我"、"大脑离家出走"。
  
  2. "visual_prompt_en": (英文)
     - **画面风格强制**：'Terribly drawn', 'MS Paint style', 'Stick figure', 'Low quality meme'. 
     - **内容**：画面必须极其潦草、简陋，但是表情要极其传神（比如潦草的线条狗、流汗的熊猫头）。
     - 描述一个极其夸张的动作或表情来匹配文案。
  `;

  const conceptResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: conceptPrompt,
      config: {
        temperature: 1.3,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            visual_prompt_en: { type: Type.STRING },
            caption_cn: { type: Type.STRING }
          },
          required: ["visual_prompt_en", "caption_cn"]
        }
      }
  });

  const conceptText = conceptResponse.text;
  if (!conceptText) throw new Error("生成梗图灵感失败");
  
  const concept = JSON.parse(conceptText);
  
  // Step 2: Generate Image - Force "Bad Drawing" style
  // Adding specific keywords to force a "meme" look rather than a nice illustration
  const visualPrompt = `(A very ugly hand-drawn sketch in MS Paint style), ${concept.visual_prompt_en}, black lines on white background, crude drawing, minimalist, funny, meme aesthetic, masterpiece of bad art`;
  
  const funnyCaption = concept.caption_cn;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-image",
    contents: visualPrompt,
    config: {
      imageConfig: {
        aspectRatio: "1:1"
      }
    }
  });

  let imageUrl = "";
  
  if (response.candidates?.[0]?.content?.parts) {
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        imageUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
  }

  if (!imageUrl) throw new Error("生成图片失败");

  return {
    imageUrl,
    caption: funnyCaption
  };
};

// --- VIDEO GENERATION (Veo) ---
export const generateVideo = async (): Promise<VideoData> => {
  const win = window as any;

  // Check for paid key capability
  if (win.aistudio && await win.aistudio.hasSelectedApiKey()) {
     // Proceed
  } else if (win.aistudio) {
    await win.aistudio.openSelectKey();
  }

  const ai = getAI(); 
  const topic = getRandomTopic();
  
  // Refined video prompt for more slapstick/cartoon vibes
  const prompt = `A funny 3D cartoon video about ${topic}. Slapstick humor, exaggerated character movements, pixar style, cute and hilarious.`;

  let operation = await ai.models.generateVideos({
    model: 'veo-3.1-fast-generate-preview',
    prompt: prompt,
    config: {
      numberOfVideos: 1,
      resolution: '720p',
      aspectRatio: '16:9'
    }
  });

  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 5000));
    operation = await ai.operations.getVideosOperation({ operation: operation });
  }

  const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;
  
  if (!videoUri) throw new Error("视频生成失败");

  const fullVideoUrl = `${videoUri}&key=${process.env.API_KEY}`;

  return {
    videoUrl: fullVideoUrl,
    prompt: prompt
  };
};