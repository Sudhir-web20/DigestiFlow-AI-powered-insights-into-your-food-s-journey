# DigestiFlow 🍃

**DigestiFlow** is a sleek, modern web application that leverages advanced AI to help users visualize and understand the human digestive timeline. By simply searching for any food, fruit, or drink, users receive immediate, layman-friendly insights into how long substances stay in the stomach and the duration of their total journey through the body.

## ✨ Features

- **Instant AI Analysis**: Real-time digestion estimates powered by Google Gemini.
- **Visual Gut Journey**: Clear breakdown of the "In Stomach" (acid breakdown) vs. "Total Journey" (full 30-foot path) phases.
- **AI-Generated Imagery**: Each food item features a unique, high-end minimalist photograph generated specifically for your search.
- **Smart Caching**: Integrated with TanStack Query for blazing-fast performance and instant history recall.
- **Sleek UI/UX**: A high-end, glassmorphic design built with Tailwind CSS, featuring smooth transitions and responsive layouts.
- **Nutritional Insights**: Automatically identifies key nutrients and provides a "Quick Fact" for every search.

## 🛠️ Tech Stack

- **Frontend**: React 19
- **State & Data Fetching**: TanStack Query (React Query)
- **Styling**: Tailwind CSS
- **AI Engine**: Google GenAI (Gemini API)
- **Image Generation**: Gemini 2.5 Flash Image

## 🚀 Getting Started

### Prerequisites

- A modern web browser.
- A Google Gemini API Key.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/digestiflow.git
   ```
2. Navigate to the project directory:
   ```bash
   cd digestiflow
   ```
3. Set up your environment variables:
   Create a `.env` file and add your Gemini API key:
   ```env
   API_KEY=your_gemini_api_key_here
   ```
4. Install dependencies and start the development server:
   ```bash
   npm install
   npm run dev
   ```

## 📋 Disclaimer

**DigestiFlow is for educational and informational purposes only.**
The data provided consists of AI-generated estimates and should not be considered professional medical advice. Digestion times vary significantly between individuals based on metabolism, age, activity level, and overall health. Always consult with a healthcare professional for medical concerns.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
