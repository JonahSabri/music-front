export const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Animated Gradient Orbs */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-nebula/30 rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
      <div className="absolute top-0 -right-4 w-96 h-96 bg-supernova/30 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-galaxy/30 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
      
      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white/20 animate-float"
          style={{
            width: Math.random() * 4 + 2 + 'px',
            height: Math.random() * 4 + 2 + 'px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            animationDuration: Math.random() * 10 + 10 + 's',
            animationDelay: Math.random() * 5 + 's'
          }}
        />
      ))}
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }}></div>
    </div>
  );
};
