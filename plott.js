// --- FINAL STABLE CONFIGURATION ---
const API_URL = "https://api.groq.com/openai/v1/chat/completions";

function startPlotting() {
    const canvas = document.getElementById('plotCanvas');
    const input = document.getElementById('funcInput');
    const btn = document.getElementById('plotBtn');
    const explainBtn = document.getElementById('explainBtn');
    const aiBox = document.getElementById('aiResponse');

    if (!canvas || !input || !btn || !explainBtn) return;

    const ctx = canvas.getContext('2d');
    const config = {
        scale: 60,
        gridColor: 'rgba(255, 255, 255, 0.05)',
        axisColor: 'rgba(255, 255, 255, 0.2)',
        lineColor: '#00ff95'
    };

    // --- 1. PLOTTING ENGINE ---
    function draw() {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        const w = canvas.width, h = canvas.height;
        const cX = w / 2, cY = h / 2;

        ctx.clearRect(0, 0, w, h);

        ctx.strokeStyle = config.gridColor;
        ctx.lineWidth = 1;
        for(let x = cX % config.scale; x < w; x += config.scale) {
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
        }
        for(let y = cY % config.scale; y < h; y += config.scale) {
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
        }

        ctx.strokeStyle = config.axisColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, cY); ctx.lineTo(w, cY); 
        ctx.moveTo(cX, 0); ctx.lineTo(cX, h); 
        ctx.stroke();

        const userValue = input.value || "x";
        ctx.strokeStyle = config.lineColor;
        ctx.lineWidth = 3;
        ctx.beginPath();

        try {
            let preparedFunc = userValue.toLowerCase()
                .replace(/\babs\b/g, 'Math.abs')
                .replace(/\bln\b/g, 'Math.log')      
                .replace(/\blog\b/g, 'Math.log10')   
                .replace(/\be\b/g, 'Math.E')          
                .replace(/sin/g, 'Math.sin')
                .replace(/cos/g, 'Math.cos')
                .replace(/tan/g, 'Math.tan')
                .replace(/sqrt/g, 'Math.sqrt')
                .replace(/\^/g, '**');

            const f = new Function('x', `return ${preparedFunc};`);
            let started = false;
            
            for (let px = 0; px <= w; px++) {
                const x = (px - cX) / config.scale;
                let y = f(x); 
                const py = cY - (y * config.scale);

                if (isNaN(py) || !isFinite(py) || Math.abs(py) > h * 10) {
                    started = false; 
                    continue;
                }
                
                if (!started) { ctx.moveTo(px, py); started = true; }
                else { ctx.lineTo(px, py); }
            }
            ctx.stroke();
        } catch (e) { console.error("Math Error:", e); }
    }

    // --- 2. MATHEMATICAL AI ENGINE ---
    async function getAIAnalysis() {
        const userFunc = input.value;
        aiBox.innerHTML = `<div class="p-4 animate-pulse text-[#00ff95] font-mono text-[10px] uppercase text-center">Deriving Mathematical Proofs...</div>`;

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${GROQ_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: "llama-3.3-70b-versatile",
                    messages: [
                        {
                            role: "system",
                            content: "You are a Distinguished Professor. Provide deep analysis using FORMAL MATHEMATICAL NOTATION (LaTeX). Wrap all equations in double dollar signs $$ for display and single $ for inline. Use professional sections: Derivation, Domain, and Physical Behavior."
                        },
                        {
                            role: "user",
                            content: `Deeply analyze f(x) = ${userFunc} using formal math notation.`
                        }
                    ],
                    temperature: 0.2
                })
            });

            const data = await response.json();
            if (data.choices && data.choices[0].message) {
                const rawText = data.choices[0].message.content;
                
                // Formatter for Headers
                const formattedText = rawText
                    .replace(/\*\*(.*?)\*\*/g, '<b class="text-[#00ff95] block mt-8 mb-2 uppercase text-[10px] tracking-widest border-b border-[#00ff95]/10 pb-1">$1</b>') 
                    .replace(/\n/g, '<br>');

                aiBox.innerHTML = `
                    <div class="fade-in p-6 text-sm leading-[1.8] text-gray-300 font-normal h-full overflow-y-auto">
                        ${formattedText}
                    </div>
                `;

                // IMPORTANT: Tell MathJax to typeset the new content
                if (window.MathJax) {
                    MathJax.typesetPromise([aiBox]);
                }
            }
        } catch (error) {
            aiBox.innerHTML = `<div class="p-4 text-red-500 font-mono text-xs">Error: ${error.message}</div>`;
        }
    }

    btn.onclick = draw;
    explainBtn.onclick = getAIAnalysis;
    input.onkeypress = (e) => { if (e.key === 'Enter') draw(); };
    window.onresize = draw;
    draw(); 
}

window.addEventListener('load', startPlotting);