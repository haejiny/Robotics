
import React, { useState, useEffect } from 'react';
import { geminiService } from './services/geminiService';
import { Feature, ChatMessage } from './types';

// Components
const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 glass-nav px-6 py-4 flex justify-between items-center">
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-black rounded-sm flex items-center justify-center">
        <div className="w-4 h-4 border-2 border-white rotate-45"></div>
      </div>
      <span className="text-xl font-bold tracking-tighter uppercase">HexaCore</span>
    </div>
    <div className="hidden md:flex space-x-10 text-sm font-medium tracking-wide uppercase">
      <a href="#technology" className="hover:text-neutral-500 transition-colors">Technology</a>
      <a href="#showcase" className="hover:text-neutral-500 transition-colors">Showcase</a>
      <a href="#advisor" className="hover:text-neutral-500 transition-colors">AI Advisor</a>
      <a href="#contact" className="hover:text-neutral-500 transition-colors">Enterprise</a>
    </div>
    <div className="flex items-center space-x-4">
      <button className="text-sm font-semibold hover:opacity-70 transition-opacity">Log in</button>
      <button className="bg-black text-white px-6 py-2.5 text-sm font-semibold rounded-full hover:bg-neutral-800 transition-colors">
        Inquire Now
      </button>
    </div>
  </nav>
);

const Hero = () => (
  <section className="pt-32 pb-20 px-6 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-vh-90">
    <div className="space-y-8 max-w-2xl">
      <h1 className="text-6xl md:text-8xl font-serif leading-tight">
        Evolution in <br />
        <span className="italic">Motion.</span>
      </h1>
      <p className="text-xl text-neutral-600 leading-relaxed font-light">
        Introducing the HexaCore Walking Transporter. Designed for the world's most 
        unforgiving terrains where wheels fail and tracks falter. Precision-engineered 
        autonomy for the industrial frontier.
      </p>
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <button className="bg-[#ff5a00] text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-orange-200 hover:scale-105 transition-transform">
          Explore Specifications
        </button>
        <button className="border border-black px-8 py-4 rounded-full font-bold hover:bg-black hover:text-white transition-all">
          View Use Cases
        </button>
      </div>
    </div>
    <div className="relative h-[500px] lg:h-[650px] w-full rounded-2xl overflow-hidden shadow-2xl bg-neutral-100">
      <iframe 
        title="Walking Cargo Transporter" 
        className="w-full h-full border-0"
        allowFullScreen
        allow="autoplay; fullscreen; xr-spatial-tracking"
        src="https://sketchfab.com/models/4a9fd4f85a494f2593db2773a44bd18e/embed?autostart=1&ui_controls=0&ui_theme=dark"
      />
    </div>
  </section>
);

const Features = () => {
  const features: Feature[] = [
    {
      title: "All-Terrain Hexa-Link",
      description: "6-legged synchronized locomotion ensuring stability on 45° slopes and shifting sands.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      )
    },
    {
      title: "Bio-Mimetic Balance",
      description: "Advanced gyroscopic sensors mimicking insectoid biological resilience in real-time.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "Cognitive Autonomy",
      description: "Edge-AI processing for instant obstacle avoidance and path optimization without cloud dependency.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    }
  ];

  return (
    <section id="technology" className="py-24 px-6 lg:px-20 bg-white">
      <div className="mb-16">
        <h2 className="text-4xl md:text-5xl font-serif mb-4">Engineering excellence.</h2>
        <p className="text-neutral-500 max-w-xl">Every component is crafted for durability and high-performance output in extreme environments.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {features.map((f, i) => (
          <div key={i} className="robot-card p-8 border border-neutral-100 rounded-2xl hover:border-neutral-300 transition-all bg-[#faf9f6]">
            <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mb-6">
              {f.icon}
            </div>
            <h3 className="text-2xl font-serif mb-4">{f.title}</h3>
            <p className="text-neutral-600 leading-relaxed font-light">{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const AdvisorSection = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    const reply = await geminiService.askTechnicalAdvisor(input);
    setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    setIsLoading(false);
  };

  return (
    <section id="advisor" className="py-24 px-6 lg:px-20">
      <div className="bg-black text-white rounded-3xl p-8 lg:p-16 grid grid-cols-1 lg:grid-cols-2 gap-12 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/20 blur-[100px]"></div>
        <div className="space-y-6 z-10">
          <h2 className="text-4xl lg:text-5xl font-serif">Consult our <br /><span className="italic text-orange-500">Technical Advisor.</span></h2>
          <p className="text-neutral-400 max-w-md font-light">
            Have questions about the mechanics, fuel efficiency, or integration? 
            Ask our AI-powered expert for immediate technical insights.
          </p>
          <div className="h-64 overflow-y-auto space-y-4 pr-4 custom-scrollbar">
            {messages.length === 0 && (
              <div className="text-neutral-600 italic text-sm">Awaiting your inquiry...</div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${m.role === 'user' ? 'bg-orange-600 text-white' : 'bg-neutral-800 text-neutral-200'}`}>
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && <div className="text-xs text-orange-500 animate-pulse">Calculating response...</div>}
          </div>
          <div className="flex space-x-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about leg articulation or load capacity..."
              className="flex-1 bg-neutral-900 border border-neutral-700 rounded-full px-6 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors"
            />
            <button 
              onClick={handleSend}
              className="bg-white text-black px-6 py-3 rounded-full font-bold text-sm hover:bg-neutral-200 transition-colors"
            >
              Send
            </button>
          </div>
        </div>
        <div className="hidden lg:flex items-center justify-center relative">
          <div className="w-full h-full bg-gradient-to-br from-neutral-800 to-black rounded-2xl flex items-center justify-center p-8 border border-neutral-700">
             <div className="text-center space-y-4">
                <div className="w-24 h-24 border-2 border-orange-500 rounded-full mx-auto flex items-center justify-center animate-spin-slow">
                  <div className="w-16 h-16 border-t-2 border-white rounded-full"></div>
                </div>
                <div className="text-neutral-500 font-mono text-xs uppercase tracking-widest">A.D.V.I.S.O.R Connected</div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer id="contact" className="py-20 px-6 lg:px-20 border-t border-neutral-100">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-1 md:col-span-2 space-y-6">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-black rounded-sm"></div>
          <span className="text-lg font-bold tracking-tighter uppercase">HexaCore Dynamics</span>
        </div>
        <p className="text-neutral-500 max-w-sm font-light">
          Defining the next century of logistical autonomy. Based in Zurich, serving the global frontier.
        </p>
      </div>
      <div className="space-y-4">
        <h4 className="font-bold text-sm uppercase tracking-wider">Company</h4>
        <ul className="space-y-2 text-sm text-neutral-600">
          <li><a href="#" className="hover:text-black">About Us</a></li>
          <li><a href="#" className="hover:text-black">Careers</a></li>
          <li><a href="#" className="hover:text-black">Sustainability</a></li>
        </ul>
      </div>
      <div className="space-y-4">
        <h4 className="font-bold text-sm uppercase tracking-wider">Contact</h4>
        <ul className="space-y-2 text-sm text-neutral-600">
          <li>Press: media@hexacore.io</li>
          <li>Sales: enterprise@hexacore.io</li>
          <li>Support: +41 44 123 4567</li>
        </ul>
      </div>
    </div>
    <div className="mt-20 pt-8 border-t border-neutral-100 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-400 uppercase tracking-widest">
      <p>© 2025 HexaCore Dynamics. All rights reserved.</p>
      <div className="flex space-x-8 mt-4 md:mt-0">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <AdvisorSection />
      <Footer />
    </div>
  );
}
