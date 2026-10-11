# 🎙️ PodCraft AI — AI Podcast Generator

**Turn your ideas into podcasts with AI.**

PodCraft AI is an AI-powered web application that generates podcast scripts from user-provided topics and converts them into audio using Sarvam AI. Users can select their preferred language and podcast duration, generate scripts, listen to the resulting audio, and download their podcasts.

## ✨ Features

- 📝 AI-powered podcast script generation
- 🌐 Multilingual support
- 🔊 Text-to-speech audio generation
- ⏱️ Customizable podcast duration
- ▶️ Audio playback directly in the browser
- 📥 Download generated podcast audio
- 🎨 Modern, dark-themed user interface

## 🛠️ Tech Stack

**Frontend**
- React.js
- Vite
- JavaScript
- CSS

**Backend**
- Node.js
- Express.js
- REST APIs

**AI Integration**
- Sarvam AI for script generation and text-to-speech

## 📁 Project Structure

```text
ai-podcast-generator/
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   └── services/
│   ├── package.json
│   └── .env
├── .gitignore
└── README.md
```

## ⚙️ Prerequisites

- Node.js (LTS recommended)
- npm
- Sarvam AI API key

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Priyam-200/podcraft-ai-podcast-generator.git
cd podcraft-ai-podcast-generator
```

### 2. Set Up the Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the backend directory:

```env
PORT=5000
SARVAM_API_KEY=your_sarvam_api_key
```

Replace `your_sarvam_api_key` with your actual API key. Never share or commit your API key.

Start the backend using the development script configured in `package.json`, for example:

```bash
npm run dev
```

### 3. Set Up the Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed in the terminal, usually `http://localhost:5173`.

**Note:** Adjust the folder paths and commands if your actual project structure or npm scripts differ.

## 🔄 How It Works

1. Enter a podcast topic.
2. Select the preferred language and duration.
3. Generate a podcast script using AI.
4. Convert the script into audio.
5. Listen to the generated podcast.
6. Download the audio for later use.

## 🔐 Environment Variables

| Variable | Description |
|---|---|
| `PORT` | Backend server port |
| `SARVAM_API_KEY` | API key for Sarvam AI |
| `VITE_API_URL` | Optional frontend API base URL |

**Security:** Keep API keys and other secrets on the backend. Never expose them in frontend code or commit `.env` files to GitHub.

## 🚀 Future Enhancements

- Multiple AI-generated voices
- Two-host conversational podcasts
- Podcast history and saved episodes
- Background music and sound effects
- Audio editing and trimming
- User authentication and personalized libraries

## 🤝 Contributing

Contributions and suggestions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push your branch.
5. Submit a pull request.

## 📄 License

A license has not yet been specified. Add a `LICENSE` file if you decide to distribute this project under a particular open-source license.

---

**Built with ❤️ using React, Node.js, Express.js, and Sarvam AI.**
