
import { useState } from "react";
import {
  Mic,
  Headphones,
  Sparkles,
  LoaderCircle,
  FileAudio,
  Download,
  Play,
  Languages,
} from "lucide-react";
import "./App.css";

const API_URL = "http://localhost:5000/api/podcast";

const languages = {
  English: "en-IN",
  Hindi: "hi-IN",
  Tamil: "ta-IN",
  Telugu: "te-IN",
  Bengali: "bn-IN",
  Kannada: "kn-IN",
  Malayalam: "ml-IN",
  Marathi: "mr-IN",
};

export default function App() {
  const [topic, setTopic] = useState("");
  const [language, setLanguage] = useState("English");
  const [duration, setDuration] = useState("2");
  const [script, setScript] = useState("");
  const [audio, setAudio] = useState("");
  const [loading, setLoading] = useState(false);
  const [audioLoading, setAudioLoading] = useState(false);
  const [error, setError] = useState("");

  async function generatePodcast() {
    if (!topic.trim()) {
      setError("Please enter a podcast topic.");
      return;
    }

    setLoading(true);
    setError("");
    setScript("");
    setAudio("");

    try {
      const response = await fetch(`${API_URL}/script`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: topic.trim(),
          language,
          duration: Number(duration),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Script generation failed.");
      }

      if (!data.script?.trim()) {
        throw new Error("The AI returned an empty script.");
      }

      setScript(data.script);
    } catch (err) {
      setError(err.message || "Could not generate script.");
    } finally {
      setLoading(false);
    }
  }

  
async function generateAudio() {
  if (!script.trim()) {
    setError("Generate a script first.");
    return;
  }

  setAudioLoading(true);
  setError("");
  setAudio("");

  try {
    const url = "http://localhost:5000/api/podcast/audio";

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: script, language }),
    });

    // Read response as text first, so HTML doesn't cause a JSON parsing error.
    const raw = await response.text();
    console.log("Audio API status:", response.status);
    console.log("Audio API response:", raw);

    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      throw new Error(
        `Backend returned HTML/text instead of JSON (HTTP ${response.status}). Check the backend URL and route.`
      );
    }

    if (!response.ok) {
      throw new Error(data.error || "Audio generation failed.");
    }

    if (!data.audio) {
      throw new Error(data.error || "No audio returned by Sarvam.");
    }

    const binary = atob(data.audio);
    const bytes = new Uint8Array(binary.length);

    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }

    const blob = new Blob([bytes], { type: "audio/wav" });
    setAudio(URL.createObjectURL(blob));
  } catch (err) {
    console.error("Audio generation error:", err);
    setError(err.message || "Could not generate audio.");
  } finally {
    setAudioLoading(false);
  }
}


  function downloadScript() {
    const blob = new Blob([script], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "podcast-script.txt";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="app-shell">
      <nav className="navbar">
        <a className="brand" href="/">
          <span className="brand-icon"><Mic size={22} /></span>
          <span>PodCraft<span className="brand-dot">.</span></span>
        </a>
        <div className="nav-tag">
          <span className="status-dot" />
          Powered by Sarvam AI
        </div>
      </nav>

      <section className="hero">
        <div className="eyebrow">
          <Sparkles size={15} /> YOUR AI-POWERED AUDIO STUDIO
        </div>
        <h1>Ideas into <span>conversations.</span></h1>
        <p className="hero-description">
          Turn any topic into an engaging podcast script.
          Choose your language, set the duration, and let AI do the creative work.
        </p>
      </section>

      <section className="workspace">
        <div className="generator-card">
          <div className="card-heading">
            <div className="heading-icon"><Headphones size={21} /></div>
            <div>
              <h2>Create your episode</h2>
              <p>Tell us what your podcast should be about.</p>
            </div>
          </div>

          <label htmlFor="topic">PODCAST TOPIC</label>
          <textarea
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. How artificial intelligence is changing our daily lives..."
            rows={5}
          />

          <div className="field-grid">
            <div className="field">
              <label htmlFor="language"><Languages size={14} /> LANGUAGE</label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                {Object.keys(languages).map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="duration"><Play size={14} /> EPISODE LENGTH</label>
              <select
                id="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              >
                <option value="1">1 minute</option>
                <option value="2">2 minutes</option>
                <option value="3">3 minutes</option>
                <option value="5">5 minutes</option>
              </select>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button
            className="generate-button"
            onClick={generatePodcast}
            disabled={loading || audioLoading}
          >
            {loading ? (
              <><LoaderCircle className="spin" size={19} /> Creating script...</>
            ) : (
              <><Sparkles size={19} /> Generate podcast script <span>→</span></>
            )}
          </button>

          <p className="privacy-note">Your ideas, your voice. Start creating for free.</p>
        </div>

        <div className="preview-card">
          <div className="preview-header">
            <div>
              <div className="preview-label">YOUR WORKSPACE</div>
              <h2>Episode preview</h2>
            </div>
            <div className="preview-icon"><FileAudio size={22} /></div>
          </div>

          {script ? (
            <div className="script-result">
              <div className="result-topline">
                <span className="result-badge">
                  <span className="status-dot" /> SCRIPT READY
                </span>
                <button className="download-button" onClick={downloadScript}>
                  <Download size={15} /> Download script
                </button>
              </div>

              <div className="script-content">{script}</div>

              <button
                className="generate-button"
                onClick={generateAudio}
                disabled={audioLoading}
              >
                {audioLoading ? (
                  <><LoaderCircle className="spin" size={19} /> Generating audio...</>
                ) : (
                  <><Mic size={19} /> Generate Podcast Audio <span>→</span></>
                )}
              </button>

              {audio && (
                <div style={{ marginTop: 16 }}>
                  <audio controls src={audio} style={{ width: "100%" }}>
                    Your browser does not support audio playback.
                  </audio>
                  <a
                    href={audio}
                    download="podcast-audio.wav"
                    className="download-button"
                    style={{
                      display: "inline-flex",
                      marginTop: 12,
                      textDecoration: "none",
                    }}
                  >
                    <Download size={15} /> Download audio
                  </a>
                </div>
              )}
            </div>
          ) : (
            <div className="empty-preview">
              <div className="wave-art">
                {Array.from({ length: 29 }, (_, i) => (
                  <span key={i} style={{ height: `${12 + ((i * 17 + 13) % 38)}px` }} />
                ))}
              </div>
              <div className="empty-icon"><Mic size={25} /></div>
              <h3>Your next great episode starts here</h3>
              <p>Enter a topic and generate your first AI podcast script. Your results will appear here.</p>
              <div className="feature-pills">
                <span><Sparkles size={13} /> AI-written scripts</span>
                <span><Languages size={13} /> Multiple languages</span>
              </div>
            </div>
          )}

          <div className="preview-footer">
            <span><span className="status-dot" /> AI studio ready</span>
            <span>Made for storytellers</span>
          </div>
        </div>
      </section>

      <footer className="page-footer">
        <span>PodCraft © 2026</span>
        <span>Imagine it. Script it. Share it.</span>
      </footer>
    </main>
  );
}
