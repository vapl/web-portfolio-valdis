# Web Portfolio – Valdis Vascenkovs

Personal web portfolio built with **Next.js**, **TypeScript**, and **Tailwind CSS**, focused on showcasing real-world projects through detailed, design-driven case studies.

The site emphasizes:

- clear product thinking
- technical decision-making
- performance-aware frontend architecture
- end-to-end ownership of projects

This is not a template-based portfolio. Every section and component is custom-built.

---

## ✨ Features

- **Case study–driven content**

  - Projects are presented as structured case studies, not galleries
  - Focus on problem → solution → trade-offs → results

- **MDX-powered content**

  - Projects written in MDX for flexible composition
  - Content separated cleanly from presentation

- **Custom animation system**

  - Scroll-based hero animations using Framer Motion
  - Carefully tuned to avoid layout shift and performance issues

- **Reusable case study blocks**

  - Intro cards
  - Media sections
  - Phone showcases
  - Metrics
  - Decision-based blocks (scope, challenges, trade-offs)

- **Responsive and performance-aware**
  - Optimized images and media handling
  - Smooth animations without sacrificing readability

---

## 🧱 Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Content:** MDX
- **Icons:** React Icons
- **Deployment:** Vercel

---

## 🧠 Design Philosophy

- **Content first**

  - Layout supports the story, not the other way around

- **Trade-offs over buzzwords**

  - Decisions are explained, not hidden
  - MVP constraints are treated as intentional choices

- **Animation with restraint**

  - Used to guide attention, not to show off

- **Scalable structure**
  - New projects can be added without touching core layout logic

---

## 🚀 Running Locally

```bash
git clone https://github.com/vapl/web-portfolio-valdis.git
cd web-portfolio-valdis
npm install
npm run dev
```

## Verification

Use Node.js 20.9 or newer, as required by the image processing dependency.

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm audit
```

Contact route tests replace the email provider; they do not send email.
The deployed contact form needs `RESEND_API_KEY`, `CONTACT_FROM`, and
`CONTACT_TO` in the server environment. Without them, it returns a temporary
unavailability message and visitors can use the direct email link.

Dependency overrides keep Next.js on a patched PostCSS release and use the
patched selector parser for the typography plugin. Review them during future
dependency upgrades.

📫 Contact

If you want to discuss:
frontend architecture

case study presentation
or collaboration opportunities
You can reach me via the links on the website.

© Valdis Vascenkovs
