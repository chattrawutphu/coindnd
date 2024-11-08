export default function renderContent() {
    const html = `
    <style>
        @keyframes glowPulse {

            0%,
            100% {
                filter: drop-shadow(0 0 2px #3b82f6);
            }

            50% {
                filter: drop-shadow(0 0 8px #3b82f6);
            }
        }

        .logo-container {
            display: flex;
            align-items: center;
            border-radius: 12px;
        }

        .logo {
            width: 40px;
            height: 40px;
            margin-right: 15px;
            animation: glowPulse 2s infinite;
        }

        .brand-text {
            font-family: 'Arial', sans-serif;
            font-size: 32px;
            font-weight: bold;
            color: #ffffff;
            text-shadow: 0 0 2px rgba(59, 130, 246, 0.7);
            letter-spacing: 1px;
        }

        .coin-text {
            background: linear-gradient(45deg, #3b82f6, #8b5cf6);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .dnd-text {
            color: #93c5fd;
        }
    </style>

    <div class="logo-container">
        <svg class="logo" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" fill="#312e81" stroke="#3b82f6" stroke-width="5" />
            <path d="M30 50 L45 65 L75 35" stroke="#93c5fd" stroke-width="8" fill="none"
                stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <span class="brand-text">
            <span class="coin-text">Coin</span><span class="dnd-text">DnD</span>
        </span>
    </div>
    `;

    return $(html);
}