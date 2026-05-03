'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#121212] font-sans text-[#E5D6C8] relative overflow-hidden py-12 px-6 lg:px-12">
      <div className="max-w-[1200px] mx-auto w-full">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#7D756B]/30 pb-6 mb-12">
          <Link href="/" className="flex items-center gap-2 text-[#7D756B] hover:text-[#E5D6C8] transition-colors uppercase tracking-[0.2em] text-xs">
            <ArrowLeft className="w-4 h-4" />
            BACK
          </Link>
          <div className="flex items-center gap-2 text-[#E5D6C8] uppercase tracking-[0.2em] text-xs">
            CONTACT US
          </div>
        </div>

        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-serif text-[#E5D6C8] uppercase tracking-[0.1em] mb-4 font-light">
            Get in Touch
          </h1>
          <p className="text-[#7D756B] text-xs uppercase tracking-[0.2em] max-w-xl mx-auto leading-relaxed">
            We are here to help you navigate your cosmic journey. Reach out to us for support, consultations, or inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Details */}
          <div className="flex flex-col justify-center space-y-12">
            
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-[#B78E28]/10 flex items-center justify-center shrink-0 border border-[#B78E28]/30">
                <Phone className="w-5 h-5 text-[#B78E28]" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-[#E5D6C8] font-serif text-xl tracking-widest uppercase mb-2">Call Us</h3>
                <p className="text-[#7D756B] text-[10px] uppercase tracking-[0.2em] mb-4">Available Mon-Sat, 10 AM to 7 PM</p>
                <div className="space-y-2">
                  <p className="text-[#E5D6C8] text-sm tracking-[0.1em]"><span className="text-[#7D756B] mr-2">Sales:</span> +91-9818999037</p>
                  <p className="text-[#E5D6C8] text-sm tracking-[0.1em]"><span className="text-[#7D756B] mr-2">Support:</span> +91-8604802202</p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-[#B78E28]/10 flex items-center justify-center shrink-0 border border-[#B78E28]/30">
                <Mail className="w-5 h-5 text-[#B78E28]" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-[#E5D6C8] font-serif text-xl tracking-widest uppercase mb-2">Email Us</h3>
                <p className="text-[#7D756B] text-[10px] uppercase tracking-[0.2em] mb-4">We typically respond within 24 hours.</p>
                <p className="text-[#E5D6C8] text-sm tracking-[0.1em]">support@astro.com</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-[#B78E28]/10 flex items-center justify-center shrink-0 border border-[#B78E28]/30">
                <MapPin className="w-5 h-5 text-[#B78E28]" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-[#E5D6C8] font-serif text-xl tracking-widest uppercase mb-2">Location</h3>
                <p className="text-[#7D756B] text-[10px] uppercase tracking-[0.2em] mb-4">Our spiritual headquarters</p>
                <p className="text-[#E5D6C8] text-sm tracking-[0.1em] leading-relaxed">
                  108 Cosmic Avenue,<br />
                  Spiritual District, New Delhi,<br />
                  India - 110001
                </p>
              </div>
            </div>

          </div>

          {/* Contact Form */}
          <div className="bg-[#121212] border border-[#7D756B]/30 p-8 lg:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
              <div className="w-[300px] h-[300px] rounded-full border border-white -top-20 -right-20 absolute" />
            </div>

            <h3 className="text-2xl font-serif text-[#E5D6C8] uppercase tracking-[0.1em] mb-8">Send a Message</h3>
            
            <form className="space-y-6 relative z-10" onSubmit={(e) => { e.preventDefault(); alert("Message Sent Successfully!"); }}>
              
              <div>
                <label className="block text-[#7D756B] text-[10px] uppercase tracking-[0.2em] mb-2">Full Name</label>
                <input 
                  type="text" 
                  className="w-full bg-transparent border-b border-[#7D756B]/30 pb-3 text-[#E5D6C8] text-sm focus:outline-none focus:border-[#B78E28] transition-colors"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label className="block text-[#7D756B] text-[10px] uppercase tracking-[0.2em] mb-2">Email Address</label>
                <input 
                  type="email" 
                  className="w-full bg-transparent border-b border-[#7D756B]/30 pb-3 text-[#E5D6C8] text-sm focus:outline-none focus:border-[#B78E28] transition-colors"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-[#7D756B] text-[10px] uppercase tracking-[0.2em] mb-2">Message</label>
                <textarea 
                  className="w-full bg-transparent border-b border-[#7D756B]/30 pb-3 text-[#E5D6C8] text-sm focus:outline-none focus:border-[#B78E28] transition-colors min-h-[100px] resize-none"
                  placeholder="How can we help you?"
                  required
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-[#B78E28] text-[#121212] hover:bg-[#E5D6C8] py-4 rounded-full text-xs uppercase tracking-widest transition-colors font-semibold flex justify-center items-center gap-3 mt-8"
              >
                Send Message <Send className="w-4 h-4" />
              </button>

            </form>
          </div>

        </div>
      </div>
    </main>
  );
}
