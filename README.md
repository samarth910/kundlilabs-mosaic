# KundliLabs.org 🕉️

A next-generation web platform that bridges the ancient wisdom of Vedic astrology with cutting-edge artificial intelligence.

---

![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

---

## Table of Contents

- [About](#about)
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

KundliLabs.org is a platform designed to make the profound insights of Vedic astrology accessible to everyone. It provides personalized, accurate, and meaningful guidance to help users navigate life’s journey with clarity and purpose. The target audience is anyone interested in astrology, self-discovery, and personal growth. This project was built to modernize the way people interact with ancient wisdom, making it more engaging and user-friendly through technology.

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

- **AI-Powered Vedic Astrology:** Instantly receive personalized astrological insights.
- **Interactive Planet Gallery:** Explore the cosmic influences of all major planets.
- **Conversational AI Chatbot:** Get guidance from our AI astrologer, available 24/7.
- **Responsive Design:** A seamless experience on any device.
- **Secure Authentication:** Safe and secure user sign-up and login.
- **Reusable Components:** A modular and maintainable codebase.

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

Contributions are not open at this time. This section will be updated in the future.

---

## License

This project is for educational and demonstration purposes. For commercial use or licensing, please contact the creator. The code is licensed under the MIT License.

---

## Acknowledgements

-   [Vite](https://vitejs.dev/)
-   [React](https://reactjs.org/)
-   [Tailwind CSS](https://tailwindcss.com/)
-   [Supabase](https://supabase.io/)
-   [shadcn/ui](https://ui.shadcn.com/)
-   [Google Fonts](https://fonts.google.com/)