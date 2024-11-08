export default function renderContent() {
    const html = `
    <style>
        .complex-bg {
            --color-bg-1: #1a1b26;
            --color-bg-2: #1f2937;
            --color-accent-1: #3730a3;
            --color-accent-2: #4338ca;
            --color-accent-3: #6366f1;
            background-image:
                radial-gradient(circle at top left, var(--color-accent-1), transparent 40%),
                radial-gradient(circle at top right, var(--color-accent-2), transparent 40%),
                radial-gradient(circle at bottom left, var(--color-accent-3), transparent 40%),
                linear-gradient(to bottom right, var(--color-bg-1), var(--color-bg-2));
            background-size: 200% 200%;
            animation: moveGradient 10s ease infinite;
        }

        @keyframes moveGradient {
            0% {
                background-position: 0% 0%;
            }

            50% {
                background-position: 100% 100%;
            }

            100% {
                background-position: 0% 0%;
            }
        }
    </style>

    <div class="complex-bg relative w-full h-full overflow-hidden">
        <div class="relative z-10 p-6">
            <div class="bg-gray-900/60 backdrop-blur-sm rounded-lg p-4">
                <h2 class="text-white text-2xl font-bold mb-2">Invest Smarter with Our AI-Robo Advisor!</h2>
                <p class="text-gray-300 mb-4">Get automated management, real-time insights, and personalized
                    advice.</p>
                <button
                    class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                    Try Now
                </button>
            </div>
        </div>
    </div>
    `;

    return $(html);
}