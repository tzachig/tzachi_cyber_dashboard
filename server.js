const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Index route - serves HTML with React app
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Hello World Confetti</title>
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body>
      <div id="root"></div>
      <script>
        // Confetti animation
        function generateConfetti() {
          for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = \`hsl(\${Math.random() * 360}, 100%, 50%)\`;
            confetti.style.animation = \`fall \${2 + Math.random() * 1}s linear forwards\`;
            document.body.appendChild(confetti);
          }
          setTimeout(() => {
            document.querySelectorAll('.confetti').forEach(el => el.remove());
          }, 3000);
        }
        
        // Auto-trigger on load
        window.addEventListener('load', generateConfetti);
      </script>
      <style>
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
      </style>
      <div class="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
        <div class="text-center">
          <h1 class="text-6xl font-bold text-white mb-4 drop-shadow-lg">Hello World! 🎉</h1>
          <p class="text-2xl text-white mb-8 drop-shadow-lg">Welcome to your confetti celebration app</p>
          <button onclick="generateConfetti()" class="px-8 py-4 bg-white text-purple-600 font-bold rounded-lg shadow-lg hover:bg-gray-100 transition transform hover:scale-105">
            🎊 Launch Confetti
          </button>
          <div class="mt-16 text-white text-lg drop-shadow-lg">
            <p>Built with Express & Vercel</p>
            <p class="mt-2 text-sm opacity-90">Click the button or reload to see confetti!</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `);
});

// API Routes
app.get('/api/hello', (req, res) => {
  res.json({
    message: 'Hello from the server!',
    timestamp: new Date(),
    confetti: true,
  });
});

app.get('/api/confetti', (req, res) => {
  res.json({
    colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'],
    particles: 100,
    duration: 3000,
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', app: 'hello-world-confetti' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api/hello`);
});
