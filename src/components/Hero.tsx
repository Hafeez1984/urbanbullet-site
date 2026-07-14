import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="parallax-section relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-block">
              <span className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-full text-sm font-semibold uppercase tracking-wider neon-cyan">
                New Collection 2024
              </span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black leading-tight orbitron">
              <span className="text-white">STREET</span><br />
              <span className="neon-purple">REVOLUTION</span>
            </h1>
            
            <p className="text-xl text-gray-400 max-w-lg leading-relaxed">
              Redefine your urban style with cutting-edge designs. Premium quality streetwear that merges technology and fashion.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a href="#products" className="cta-button px-8 py-4 rounded-full text-white font-bold text-lg orbitron flex items-center justify-center">
                SHOP NOW
                <i className="fas fa-arrow-right ml-2"></i>
              </a>
              <a href="#products" className="px-8 py-4 rounded-full border-2 border-gray-700 text-white font-bold text-lg hover:border-cyan-500 transition orbitron flex items-center justify-center">
                EXPLORE
              </a>
            </div>
            
            {/* Stats */}
            <div className="flex gap-8 pt-8">
              <div>
                <div className="text-4xl font-black neon-cyan orbitron">500+</div>
                <div className="text-gray-500 text-sm uppercase tracking-wider">Products</div>
              </div>
              <div>
                <div className="text-4xl font-black neon-purple orbitron">50K+</div>
                <div className="text-gray-500 text-sm uppercase tracking-wider">Customers</div>
              </div>
              <div>
                <div className="text-4xl font-black neon-cyan orbitron">98%</div>
                <div className="text-gray-500 text-sm uppercase tracking-wider">Satisfaction</div>
              </div>
            </div>
          </div>
          
          {/* Right Content - Featured Image */}
          <div className="relative float-animation">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-3xl blur-2xl opacity-30"></div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80" 
                alt="Featured Product" 
                className="relative rounded-3xl shadow-2xl w-full object-cover"
              />
            </div>
            
            {/* Floating Price Tag */}
            <div className="absolute -bottom-6 -left-6 bg-black border-2 border-cyan-500 rounded-2xl p-6 glow-cyan">
              <div className="text-sm text-gray-400 uppercase tracking-wider mb-1">Starting at</div>
              <div className="text-4xl font-black neon-cyan orbitron">$49.99</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;
