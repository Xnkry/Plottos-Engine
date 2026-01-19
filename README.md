# 📐 Plottos-Engine | AI-Driven Mathematical Visualization

![Plottos Showcase](assets/showcase.jpg)

**Plottos-Engine** is a high-performance mathematical visualization tool designed to bridge the gap between abstract functions and visual intuition. By combining a robust 2D Canvas plotting engine with LLM-powered analytical depth, it transforms equations into interactive structures.

## 🚀 Key Features

* **AI Analysis Engine:** Utilizes Groq (Llama 3.3-70b) for real-time, university-level functional analysis.
* **Formal Notation:** Integrated MathJax for professional, publication-quality LaTeX rendering.
* **Dynamic Plotting:** Custom translation layer handles complex domains, including natural logs (`ln`), common logs (`log`), and absolute values (`abs`).
* **Domain Intelligence:** Automatically manages vertical asymptotes and undefined regions to ensure stable rendering.
* **Futuristic UI:** Built with Tailwind CSS and Three.js for a fluid, high-tech user experience.

## 🛠️ Tech Stack

* **Frontend:** HTML5 Canvas, Tailwind CSS, Three.js
* **Inference:** Groq Cloud LPU (Ultra-fast LLM inference)
* **Math Rendering:** MathJax 3.0
* **Environment:** Arch Linux / Fish Shell development workflow

---

## 📖 User Guide & Math Syntax

To get the most out of the **Plottos Engine**, use the following syntax for your functions. The engine handles the translation to JavaScript `Math` methods automatically.

### 1. Supported Functions
| Function | Syntax | Description |
| :--- | :--- | :--- |
| **Natural Log** | `ln(x)` | Natural logarithm (base $e$). |
| **Common Log** | `log(x)` | Base-10 logarithm. |
| **Exponential** | `exp(x)` or `e^x` | Base-$e$ exponentiation. |
| **Absolute Value** | `abs(x)` | The magnitude of $x$ (converts negatives to positives). |
| **Square Root** | `sqrt(x)` | The principal square root of $x$. |
| **Trigonometry** | `sin(x)`, `cos(x)`, `tan(x)` | Standard trigonometric functions (radians). |

### 2. Important Notes for Users
* **Domain Restrictions:** For functions like `ln(x)` and `log(x)`, the engine only renders for $x > 0$. If the graph looks empty, check if your function is defined for the visible $x$-range.
* **Power Notation:** Use the `^` symbol for powers (e.g., `x^2` for $x$ squared). The engine translates this to the JavaScript exponentiation operator `**`.
* **Implicit Multiplication:** Ensure you use the `*` symbol for multiplication. Write `2*x` instead of `2x` to avoid syntax errors.
* **Asymptote Safety:** The engine is built to detect vertical asymptotes (like in $1/x$ or $\ln(x)$ as $x \to 0$) and will automatically "lift the pen" to prevent visual glitches.

---

## ⚙️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Xnkry/Plottos-Engine.git](https://github.com/Xnkry/Plottos-Engine.git)