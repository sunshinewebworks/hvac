import React from 'react';
import { motion } from 'motion/react';
import { Phone, Calendar, ShieldCheck, Clock } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1581094288338-2314dddb7ecb?auto=format&fit=crop&q=80&w=1920" 
          alt="HVAC Technician at work"
          className="h-full w-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 text-sm font-medium mb-6">
              <ShieldCheck size={16} />
              NATE Certified Senior Technician
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
              I don't just fix boxes; I make homes <span className="text-blue-500">comfortable and safe.</span>
            </h1>
            <p className="text-xl text-slate-300 mb-10 max-w-lg">
              Mike "The Solution" Miller. 12 years of expert HVAC maintenance, repair, and honest advice for your home.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="tel:5550123"
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-blue-600/20"
              >
                <Phone size={20} />
                Emergency Repair
              </a>
              <a 
                href="#book"
                className="flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 active:scale-95"
              >
                <Calendar size={20} />
                Schedule Tune-up
              </a>
            </div>

            <div className="mt-12 flex items-center gap-8 text-slate-400">
              <div className="flex items-center gap-2">
                <Clock size={20} className="text-blue-500" />
                <span>Fast Response</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={20} className="text-blue-500" />
                <span>100% Guaranteed</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Badge for Mobile */}
      <div className="absolute bottom-10 right-6 hidden lg:block">
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl"
        >
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl">
              12
            </div>
            <div>
              <div className="text-white font-bold">Years Experience</div>
              <div className="text-slate-400 text-sm">In Residential HVAC</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
