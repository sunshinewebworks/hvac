import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, ShieldCheck } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'About Mike', href: '#about' },
    { name: 'Book Now', href: '#book' },
  ];

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
      isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-6"
    )}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
            <ShieldCheck size={24} />
          </div>
          <div>
            <div className={cn("font-bold text-xl leading-none", isScrolled ? "text-slate-900" : "text-white")}>
              Mike Miller
            </div>
            <div className={cn("text-[10px] uppercase tracking-widest font-bold", isScrolled ? "text-blue-600" : "text-blue-400")}>
              The Solution
            </div>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a 
              key={link.name}
              href={link.href}
              className={cn(
                "font-medium hover:text-blue-500 transition-colors",
                isScrolled ? "text-slate-600" : "text-slate-200"
              )}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="tel:5550123"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95"
          >
            <Phone size={18} />
            (555) 012-3456
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className={cn("md:hidden p-2 rounded-lg", isScrolled ? "text-slate-900" : "text-white")}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-slate-100 shadow-xl p-6 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
          {navLinks.map(link => (
            <a 
              key={link.name}
              href={link.href}
              className="text-lg font-bold text-slate-900 py-2 border-b border-slate-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="tel:5550123"
            className="flex items-center justify-center gap-2 bg-blue-600 text-white py-4 rounded-xl font-bold mt-2"
          >
            <Phone size={20} />
            Call Mike Now
          </a>
        </div>
      )}
    </header>
  );
}
