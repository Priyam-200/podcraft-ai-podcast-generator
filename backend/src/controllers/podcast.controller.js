
import { generatePodcastScript } from "../services/sarvam.service.js";
import { generateSpeech } from "../services/tts.service.js";

export async function createScript(req, res) {
  try {
    const { topic, language, duration } = req.body;

    if (!topic?.trim()) {
      return res.status(400).json({
        error: "Please enter a podcast topic.",
      });
    }

    const script = await generatePodcastScript({
      topic: topic.trim(),
      language,
      duration: Number(duration) || 2,
    });

    if (!script || !script.trim()) {
      return res.status(502).json({
        error: "AI returned an empty script.",
      });
    }

    return res.json({
      success: true,
      script,
    });
  } catch (error) {
    console.error("Script generation failed:", error.message);

    return res.status(500).json({
      error: error.message || "Script generation failed.",
    });
  }
}

export async function createAudio(req, res) {
  try {
    const { text, language } = req.body;

    if (!text?.trim()) {
      return res.status(400).json({
        error: "Script text is required.",
      });
    }

    const languageCodes = {
      English: "en-IN",
      Hindi: "hi-IN",
      Bengali: "bn-IN",
      Tamil: "ta-IN",
      Telugu: "te-IN",
      Kannada: "kn-IN",
      Malayalam: "ml-IN",
      Marathi: "mr-IN",
    };

    const audio = await generateSpeech(
      text,
      languageCodes[language] || "en-IN"
    );

    return res.json({
      success: true,
      audio,
    });
  } catch (error) {
    console.error("Audio generation failed:", error.message);

    return res.status(500).json({
      error: error.message || "Audio generation failed.",
    });
  }
}
