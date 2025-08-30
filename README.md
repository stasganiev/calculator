## Calculator — Liquid Glass UI

[EN|[RU](./README_RU.md)]

A responsive calculator with memory functions and client-side validation/formatting.  
Built with **vanilla HTML/CSS/JS**, featuring a “liquid glass” aesthetic (blur + custom filter) and a compact, mobile-first layout. :contentReference[oaicite:0]{index=0} :contentReference[oaicite:1]{index=1}

---

#### ✨ Features
- Basic operations: **add, subtract, multiply, divide** (=) :contentReference[oaicite:2]{index=2}
- Extra math: **square root**, **percentage**, **sign toggle (+/−)** :contentReference[oaicite:3]{index=3}
- **Memory** keys: `MC`, `MR`, `M+`, `M−` with on-screen memory indicator :contentReference[oaicite:4]{index=4} :contentReference[oaicite:5]{index=5}
- **Backspace**, **Clear (C)**, **Clear current (CA)** controls :contentReference[oaicite:6]{index=6} :contentReference[oaicite:7]{index=7}
- Smart output formatting (length cap / simple scientific hint) and input modes (waiting / number input / result) :contentReference[oaicite:8]{index=8}
- “Liquid glass” styling using `backdrop-filter` and custom filter hook, plus custom **Lekton** font and background image :contentReference[oaicite:9]{index=9}
- Mobile-first sizing via `vmin`, flexible keypad grid, hover/active feedback states :contentReference[oaicite:10]{index=10}

> Roadmap ideas from current notes: keyboard support, button icons, random background. :contentReference[oaicite:11]{index=11}

---

#### 🖼 UI Preview
The main screen shows the current value and a small **m:** memory readout. The keypad includes memory, clear, percent, sqrt, operations, digits, sign, decimal, and equals. :contentReference[oaicite:12]{index=12}

---

#### 🚀 Demo
[Live Demo:](https://stasganiev.github.io/calculator/)

---

#### 🛠 How to Run Locally
1) Clone the repo

```bash
git clone https://github.com/yourusername/calculator.git
cd calculator
```

2) Open index.html in a browser (no build step needed). index

#### 📂 Project Structure
```css
Copy
Edit
calculator/
│── index.html
│── css/
│   ├── normolize.css
│   └── style.css
│── js/
│   └── script.js
│── fonts/
│   ├── lekton-regular-webfont.woff2
│   ├── lekton-regular-webfont.woff
│   └── Lekton-Regular.ttf
│── img/
│   └── background-002.png
```

index.html preloads fonts, includes CSS & JS; style.css defines layout and glass effects; script.js wires keypad logic & display state. index style script

#### 🔍 Implementation Notes (Dev)
Event-driven keypad (data-key-code), centralized handler + state machine for display modes. script
numberPresentationForScreen trims/rounds and guards long outputs; error flow sets E. script
Memory stored in state; memory display auto-updates and hides when zero. script
Visuals: backdrop-filter: blur(...), filter hook url(#glass-distortion), tint & shine layers. style

#### 🧭 Roadmap
- Keyboard input mapping (digits/ops/enter/esc)
- Icon set for buttons
- Random background rotation
(see original TODO)

#### 📜 License
This project is licensed under the [MIT License](./LICENSE).
