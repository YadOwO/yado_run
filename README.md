<div align="center">
  <h1>yado_run</h1>
  <p>
    <strong>Constructing Order in a Chaotic Web.</strong>
  </p>
  
  <p>
    <a href="https://yado.run">Visit Site (Coming Soon)</a> • 
    <a href="#-architecture">Architecture</a> • 
    <a href="#-design-system">Design System</a>
  </p>

  <br />

  <img src="https://img.shields.io/badge/Stack-Next.js_14-000000?style=flat-square" alt="Next.js" />
  <img src="https://img.shields.io/badge/Style-Tailwind_CSS-000000?style=flat-square" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Motion-Framer_Motion-000000?style=flat-square" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/License-MIT-gray?style=flat-square" alt="License" />

</div>

<br />

> "When I am silent, I feel full."
>
> — A digital exploration of identity, craft, and rhythm.

## 01. Philosophy

**yado_run** is not just a portfolio; it is a manifestation of order. 

It rejects the noise of the modern web in favor of **silence** and **clarity**. The interface is designed to be a "Scroll Reveal" narrative, where content only appears when the user is ready to receive it.

## 02. Architecture

This project is built with a strict focus on performance (0 CLS) and interaction physics.

### The Stack
- **Core:** React 19 (via Next.js / Vite)
- **Styling:** Tailwind CSS (Utility-first)
- **Physics:** Framer Motion (Spring-based animations)
- **Intelligence:** Gemini API (Dynamic quote generation)

### Key Features
- **The "Apple Spring":** A unified global constant (`stiffness: 150`, `damping: 20`) ensuring every interaction feels physical and premium.
- **Dynamic Hero:** The introductory text cycles through generated philosophical quotes, blending tech terminology with stoic realism.
- **Dark Mode:** A floating, glassmorphism-based toggle that respects system preferences.

## 03. Design System

Adhering to a strict adaptation of Apple's Human Interface Guidelines.

| Token | Value | Context |
| :--- | :--- | :--- |
| **Typography** | `San Francisco` / `Inter` | System stack priority. |
| **Surface** | `backdrop-blur-xl` | Floating elements (Nav, Pills). |
| **Color (Light)** | `#F5F5F7` | Background (Off-white). |
| **Color (Dark)** | `#1D1D1F` | Background (Deep Gray). |
| **Interaction** | `Spring Physics` | No linear transitions. |

## 04. Running Locally

To build order from source:

```bash
# Clone the repository
git clone git@github.com:YadOwO/yado_run.git

# Install dependencies
pnpm install

# Run development server
pnpm dev