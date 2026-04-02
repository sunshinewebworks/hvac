import React from 'react';
import { motion } from 'motion/react';
import { Award, Heart, Shield, Star } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2 relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800" 
                alt="Mike Miller - HVAC Technician"
                className="w-full h-auto"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl" />
            
            <div className="absolute bottom-8 left-8 bg-white p-6 rounded-2xl shadow-xl z-20 border border-slate-100">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex text-yellow-400">
                    {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
                  <div className="text-sm font-bold text-slate-900">500+ Happy Clients</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Meet Mike "The Solution" Miller</h2>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              I started as an apprentice straight out of trade school and spent the last 12 years mastering the craft. I've worked in 130°F attics and freezing crawlspaces, and I know exactly what it takes to keep a system running smoothly.
            </p>
            
            <div className="space-y-6 mb-10">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <Award size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">NATE Certified Expert</h4>
                  <p className="text-slate-600 text-sm">Highest industry standard for technical excellence and safety.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <Heart size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Empathetic Service</h4>
                  <p className="text-slate-600 text-sm">I understand the stress of a broken system. I'm here to solve the problem, not sell you parts.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <Shield size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Honest Consultation</h4>
                  <p className="text-slate-600 text-sm">I'll give you the straight facts on whether a repair is worth it or if it's time for an upgrade.</p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-slate-900 rounded-3xl text-white">
              <p className="italic text-lg mb-4">
                "Mike is the only tech we trust. He explained the issue with our blower motor clearly and fixed it the first time. No pushy sales, just great work."
              </p>
              <div className="font-bold">— Sarah J., Homeowner</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
