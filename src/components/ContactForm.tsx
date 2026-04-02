import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'motion/react';
import { Send, Phone, Mail, MapPin } from 'lucide-react';

export default function ContactForm() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data: any) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Lead generated:', data);
    alert("Thanks! Mike will get back to you shortly.");
    reset();
  };

  return (
    <section id="book" className="py-24 bg-slate-900 text-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-bold mb-6">Ready for a Solution?</h2>
            <p className="text-xl text-slate-400 mb-12">
              Whether it's an emergency repair or a routine tune-up, I'm ready to help. Fill out the form and I'll be in touch.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-blue-600/20 flex items-center justify-center text-blue-500 border border-blue-500/20">
                  <Phone size={24} />
                </div>
                <div>
                  <div className="text-slate-400 text-sm">Call for Emergencies</div>
                  <div className="text-xl font-bold">(555) 012-3456</div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-blue-600/20 flex items-center justify-center text-blue-500 border border-blue-500/20">
                  <Mail size={24} />
                </div>
                <div>
                  <div className="text-slate-400 text-sm">Email Me</div>
                  <div className="text-xl font-bold">mike@thesolutionhvac.com</div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-blue-600/20 flex items-center justify-center text-blue-500 border border-blue-500/20">
                  <MapPin size={24} />
                </div>
                <div>
                  <div className="text-slate-400 text-sm">Service Area</div>
                  <div className="text-xl font-bold">Metro Area & Surrounding Suburbs</div>
                </div>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2 bg-white rounded-3xl p-8 md:p-12 text-slate-900"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold mb-2">Full Name</label>
                  <input 
                    {...register("name", { required: true })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none transition-colors"
                    placeholder="John Doe"
                  />
                  {errors.name && <span className="text-red-500 text-xs mt-1">Required</span>}
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Phone Number</label>
                  <input 
                    {...register("phone", { required: true })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none transition-colors"
                    placeholder="(555) 000-0000"
                  />
                  {errors.phone && <span className="text-red-500 text-xs mt-1">Required</span>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Service Type</label>
                <select 
                  {...register("service")}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none transition-colors bg-white"
                >
                  <option>Emergency Repair</option>
                  <option>Routine Maintenance</option>
                  <option>New System Consultation</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Message (Optional)</label>
                <textarea 
                  {...register("message")}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="Tell me about your HVAC issue..."
                />
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : (
                  <>
                    <Send size={20} />
                    Request Service
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
