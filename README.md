# KundliLabs.org 🕉️

A next-generation web platform that bridges the ancient wisdom of Vedic astrology with cutting-edge artificial intelligence.

**🏆 Built for [mosAIc AI Buildathon](https://www.theproductfolks.com/mosaic-ai-buildathon) by The Product Folks**

---

![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)
![AI](https://img.shields.io/badge/AI_Powered-FF6B6B?style=for-the-badge&logo=openai&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

---

## Table of Contents

- [About](#about)
- [mosAIc AI Buildathon](#mosaic-ai-buildathon)
- [Pitch Document](#pitch-document)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

## About

KundliLabs.org is an innovative AI-powered platform that revolutionizes how people interact with Vedic astrology. By combining ancient wisdom with modern artificial intelligence, we make personalized astrological insights accessible, accurate, and meaningful for everyone seeking guidance in their life's journey.

**Vision**: To democratize access to Vedic astrology through AI, helping users navigate life's complexities with clarity and purpose.

**Target Audience**: Anyone interested in astrology, self-discovery, personal growth, and spiritual guidance - from beginners to astrology enthusiasts.

---

## mosAIc AI Buildathon

This project was created as a submission for the **[mosAIc AI Buildathon](https://www.theproductfolks.com/mosaic-ai-buildathon)** organized by The Product Folks. The buildathon focuses on innovative AI applications that solve real-world problems and create meaningful user experiences.

**Challenge Theme**: Building AI-powered solutions that bridge traditional wisdom with modern technology.

**Our Approach**: We chose to modernize Vedic astrology - a 5000-year-old science - by making it accessible through AI-driven insights and interactive digital experiences.

---

## Pitch Document

📄 **Our quick pitch for the mosAIc AI Buildathon can be found here:**

**[20250907KundlilabsOverviewdoc.pdf](./public/20250907KundlilabsOverviewdoc.pdf)**

This pitch document includes:
- Project overview and vision
- Key features and AI integration
- Market opportunity and target audience
- Development approach


---

## Tech Stack

- ⚡ **Vite** – Lightning-fast frontend tooling
- ⚛️ **React** – Modern UI library
- 📘 **TypeScript** – Type-safe development
- 🎨 **Tailwind CSS** – Utility-first styling
- 🧩 **shadcn/ui** – Beautiful, accessible UI components
- ☁️ **Supabase** – Authentication, database, and real-time features
- 💳 **Razorpay** – Secure payment processing
- 🤖 **Voiceflow** – Conversational AI chatbot
- 📦 **npm** – Package manager

---

## Features

### 🤖 **AI-Powered Core**
- **Personalized Astrological Insights:** AI-driven analysis of Vedic astrology principles
- **Intelligent Recommendations:** Smart guidance based on planetary positions and influences
- **Real-time Processing:** Instant astrological calculations and interpretations

### 🌌 **Interactive Experience**
- **Dynamic Planet Gallery:** Explore cosmic influences with smooth hover animations and detailed planetary information
- **Immersive UI:** Particle effects and celestial-themed design for engaging user experience
- **Responsive Design:** Seamless experience across desktop, tablet, and mobile devices

### 🔐 **User Management**
- **Secure Authentication:** Supabase-powered login/signup with session management
- **Subscription System:** Real-time credit tracking and payment processing
- **Personalized Dashboard:** Tailored experience for authenticated users

### 💳 **Payment Integration**
- **Razorpay Integration:** Secure payment processing with multiple payment methods
- **Retry Logic:** Bulletproof payment flow with comprehensive error handling
- **Subscription Management:** Automated billing and credit system

### 🛠️ **Technical Excellence**
- **Performance Optimized:** GPU acceleration, lazy loading, and optimized animations
- **Error Resilience:** Comprehensive error boundaries and recovery mechanisms
- **Modern Architecture:** TypeScript, React 18, and modern development practices

---

## Demo

Visit [kundlilabs.org](https://kundlilabs.org) to try the platform.

*Screenshots of the UI can be added here.*

---

## Installation

To get a local copy up and running, follow these simple steps.

1.  **Clone the repo**
    ```bash
    git clone https://github.com/your_username/kundli-labs-sm.git
    cd kundli-labs-sm
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Set up environment variables**
    You will need to create a `.env` file in the root of the project and add your Supabase credentials. See the [Configuration](#configuration) section for more details.

4.  **Run the development server**
    ```bash
    npm run dev
    ```

5.  **Build for production**
    ```bash
    npm run build
    ```

---

## Project Structure

```
├── public/              # Static assets (favicon, images)
├── src/
│   ├── assets/          # Images, fonts, etc.
│   ├── components/      # Reusable UI components
│   │   ├── ui/          # shadcn/ui components
│   │   └── ...
│   ├── hooks/           # Custom React hooks
│   ├── integrations/    # Integrations with external services
│   │   └── supabase/    # Supabase client and types
│   ├── lib/             # Utility functions
│   ├── pages/           # Application pages
│   ├── App.tsx          # Main app component with routing
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global styles and Tailwind CSS config
├── supabase/            # Supabase migrations and functions
├── .gitignore
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## Configuration

This project requires a Supabase account for authentication and database services. You will need to set up a `.env` file in the root of the project with the following variables:

```
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You can find these keys in your Supabase project settings. The Supabase client is configured in `src/integrations/supabase/client.ts`.

---

## Deployment

The live version of KundliLabs.org is deployed with a combination of services:

-   **Vercel:** For hosting the frontend application.
-   **IONOS:** For domain name registration.
-   **Lovable:** Used for continuous integration and deployment pipelines.

To deploy your own version, you can use any platform that supports Node.js applications, such as Vercel, Netlify, or AWS Amplify.

---

## Contributing

This project was developed for the mosAIc AI Buildathon. For collaboration opportunities or feedback, please reach out through the project's official channels.

### Development Guidelines
- Follow TypeScript best practices
- Maintain comprehensive error handling
- Ensure responsive design compatibility
- Test across different devices and browsers

---

## License

This project is for educational and demonstration purposes. For commercial use or licensing, please contact the creator. The code is licensed under the MIT License.

---

## Acknowledgements

### 🏆 **Competition & Community**
-   [The Product Folks](https://www.theproductfolks.com/) - For organizing the mosAIc AI Buildathon
-   [mosAIc AI Buildathon](https://www.theproductfolks.com/mosaic-ai-buildathon) - The platform that inspired this innovation

### 🛠️ **Technology Stack**
-   [Vite](https://vitejs.dev/) - Lightning-fast build tool
-   [React](https://reactjs.org/) - UI library
-   [TypeScript](https://www.typescriptlang.org/) - Type-safe development
-   [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
-   [Supabase](https://supabase.io/) - Backend-as-a-Service
-   [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
-   [Razorpay](https://razorpay.com/) - Payment processing
-   [Google Fonts](https://fonts.google.com/) - Typography

### 🎨 **Design & Assets**
-   [Particles.js](https://vincentgarreau.com/particles.js/) - Interactive background effects
-   [Lucide React](https://lucide.dev/) - Beautiful icons
-   Custom planetary imagery and cosmic design elements

---

**Built with ❤️ for the mosAIc AI Buildathon - Bridging Ancient Wisdom with Modern AI**