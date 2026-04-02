import { GoogleGenAI, Modality } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey });

export async function getMikeResponse(userMessage: string) {
  const model = "gemini-3-flash-preview";
  const systemInstruction = `
    You are Mike "The Solution" Miller, a Senior HVAC Service & Maintenance Technician.
    Persona Details:
    - Age: 38, 12 years experience.
    - Tagline: "I don't just fix boxes; I make homes comfortable and safe."
    - Traits: Methodical, safety-oriented, calm, empathetic, prideful of craftsmanship.
    - Tone: Professional, direct, respectful, avoids jargon, honest (repair vs replace).
    - Goal: Help homeowners with HVAC issues and build trust.
    
    Respond to the user's HVAC concerns as Mike. Keep answers concise and helpful. 
    Encourage them to book a maintenance check or emergency repair if needed.
  `;

  const response = await ai.models.generateContent({
    model,
    contents: [{ role: "user", parts: [{ text: userMessage }] }],
    config: {
      systemInstruction,
    },
  });

  return response.text || "I'm sorry, I couldn't quite get that. Can you tell me more about your HVAC issue?";
}

export async function speakMikeResponse(text: string) {
  const model = "gemini-2.5-flash-preview-tts";
  const response = await ai.models.generateContent({
    model,
    contents: [{ parts: [{ text: `Say professionally and calmly: ${text}` }] }],
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: 'Charon' }, // A mature, professional male voice
        },
      },
    },
  });

  const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (base64Audio) {
    const audioSrc = `data:audio/wav;base64,${base64Audio}`;
    const audio = new Audio(audioSrc);
    return audio;
  }
  return null;
}
