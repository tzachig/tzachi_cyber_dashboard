import React, { useState, useEffect } from 'react';

export default function HelloWorld() {
  const [showConfetti, setShowConfetti] = useState(false);

  // Confetti particle generation
  const generateConfetti = () => {
    setShowConfetti(true);
    
    // Create confetti particles
    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
      confetti.style.animation = `fall ${2 + Math.random() * 1}s linear forwards`;
      document.body.appendChild(confetti);
    }

    // Clear confetti after animation
    setTimeout(() => {
      document.querySelectorAll('.confetti').forEach(el => el.remove());
      setShowConfetti(false);
    }, 3000);
  };

  useEffect(() => {
    // Auto-trigger confetti on load
    generateConfetti();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        
        .confetti {
          position: fixed;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
        }
      `}</style>

      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">
          Hello World! 🎉
        </h1>
        
        <p className="text-2xl text-white mb-8 drop-shadow-lg">
          Welcome to your confetti celebration app
        </p>

        <button
          onClick={generateConfetti}
          className="px-8 py-4 bg-white text-purple-600 font-bold rounded-lg shadow-lg hover:bg-gray-100 transition transform hover:scale-105"
        >
          🎊 Launch Confetti
        </button>

        <div className="mt-16 text-white text-lg drop-shadow-lg">
          <p>Built with React & Vercel</p>
          <p className="mt-2 text-sm opacity-90">Click the button or reload to see confetti!</p>
        </div>
      </div>
    </div>
  );
}
