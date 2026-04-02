import React from 'react';
import { motion } from 'motion/react';
import { Thermometer, Wind, Zap, Settings, CheckCircle2 } from 'lucide-react';

const services = [
  {
    title: "Emergency Repair",
    description: "No AC or Heat? I'll trace the issue and get you back to comfort in no time. 45-minute average fix time for common issues.",
    icon: Thermometer,
    color: "bg-red-500/10 text-red-500",
  },
  {
    title: "Seasonal Maintenance",
    description: "Multi-point inspections to prevent future failures. Cleaning coils, checking pressure, and ensuring peak efficiency.",
    icon: Settings,
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    title: "System Consultation",
    description: "Honest options on repair vs. replace. I'll help you compare costs and find high-efficiency solutions that save you money.",
    icon: Wind,
    color: "bg-green-500/10 text-green-500",
  },
  {
    title: "Smart Home Integration",
    description: "Upgrading to modern inverter technology and smart home automation for ultimate control and energy savings.",
    icon: Zap,
    color: "bg-yellow-500/10 text-yellow-500",
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Expert Solutions for Every Home</h2>
          <p className="text-lg text-slate-600">
            Methodical, safety-oriented service designed to keep your family comfortable year-round.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
            >
              <div className={`w-14 h-14 rounded-xl ${service.color} flex items-center justify-center mb-6`}>
                <service.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                {service.description}
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-slate-500">
                  <CheckCircle2 size={16} className="text-blue-500" />
                  NATE Certified Work
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-500">
                  <CheckCircle2 size={16} className="text-blue-500" />
                  First-Time Fix Focus
                </li>
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
