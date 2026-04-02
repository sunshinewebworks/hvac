import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Mic, Send, X, Volume2, VolumeX, Loader2 } from 'lucide-react';
import { getMikeResponse, speakMikeResponse } from '../lib/gemini';
import { cn } from '../lib/utils';

export default function VoiceAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'mike'; text: string }[]>([
    { role: 'mike', text: "Hi, I'm Mike. Having some trouble with your AC or heating? I'm here to help." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    try {
      const mikeText = await getMikeResponse(userText);
      setMessages(prev => [...prev, { role: 'mike', text: mikeText }]);
      
      if (!isMuted) {
        const audio = await speakMikeResponse(mikeText);
        if (audio) {
          audio.play();
        }
      }
    } catch (error) {
      console.error("Mike's assistant error:", error);
      setMessages(prev => [...prev, { role: 'mike', text: "Sorry, I'm having a bit of trouble connecting. Give me a call directly if it's an emergency." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[350px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-blue-600 p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-white/20 bg-slate-100">
                  <img 
                    src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=100&h=100" 
                    alt="Mike Miller"
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h3 className="font-semibold leading-none">Mike Miller</h3>
                  <span className="text-xs text-blue-100">Senior Technician</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsMuted(!isMuted)}
                  className="rounded-lg p-1 hover:bg-white/10"
                >
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg p-1 hover:bg-white/10"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="h-80 overflow-y-auto bg-slate-50 p-4 space-y-4"
            >
              {messages.map((msg, i) => (
                <div 
                  key={i}
                  className={cn(
                    "flex flex-col max-w-[85%]",
                    msg.role === 'user' ? "ml-auto items-end" : "items-start"
                  )}
                >
                  <div className={cn(
                    "rounded-2xl px-4 py-2 text-sm shadow-sm",
                    msg.role === 'user' 
                      ? "bg-blue-600 text-white rounded-tr-none" 
                      : "bg-white text-slate-800 border border-slate-200 rounded-tl-none"
                  )}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center gap-2 text-slate-400 text-xs italic">
                  <Loader2 size={14} className="animate-spin" />
                  Mike is thinking...
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-slate-100 p-4 bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask Mike about your HVAC..."
                  className="flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-all hover:scale-110 hover:bg-blue-700 active:scale-95"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
  );
}
