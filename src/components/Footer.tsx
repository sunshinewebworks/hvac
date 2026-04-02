import React from 'react';
import { ShieldCheck, Facebook, Twitter, Instagram, Linkedin, MapPin } from 'lucide-react';
import ServiceMap from './ServiceMap';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                <ShieldCheck size={24} />
              </div>
              <div>
                <div className="font-bold text-xl text-white leading-none">Mike Miller</div>
                <div className="text-[10px] uppercase tracking-widest font-bold text-blue-500">The Solution</div>
              </div>
            </div>
            <p className="mb-8">
              NATE-certified senior HVAC technician dedicated to making homes comfortable and safe. Providing honest, methodical service for over 12 years.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                <Twitter size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><a href="#services" className="hover:text-blue-500 transition-colors">Services</a></li>
              <li><a href="#about" className="hover:text-blue-500 transition-colors">About Mike</a></li>
              <li><a href="#book" className="hover:text-blue-500 transition-colors">Book Online</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-white font-bold flex items-center gap-2">
                <MapPin size={20} className="text-blue-500" />
                Service Coverage
              </h4>
              <span className="text-xs text-slate-500">25-mile radius from Downtown</span>
            </div>
            <ServiceMap />
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <ul className="space-y-2">
                <li>• Downtown Metro</li>
                <li>• North Suburbs</li>
                <li>• West Hills</li>
              </ul>
              <ul className="space-y-2">
                <li>• South Valley</li>
                <li>• East Riverside</li>
                <li>• Surrounding Areas</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
          <div>© 2026 Mike "The Solution" Miller. All rights reserved.</div>
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-blue-500" />
            Licensed, Bonded & Insured
          </div>
        </div>
      </div>
    </footer>
  );
}

