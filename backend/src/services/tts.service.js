
export async function generateSpeech(text, language = "en-IN") {
  const chunks = text.match(/[\s\S]{1,500}/g) || [];
  const audioChunks = [];

  for (const chunk of chunks) {
    const response = await fetch(
      "https://api.sarvam.ai/text-to-speech",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-subscription-key": process.env.SARVAM_API_KEY,
        },
        body: JSON.stringify({
          inputs: [chunk],
          target_language_code: language,
          speaker: "shubh",
          model: "bulbul:v3",
          enable_preprocessing: true,
          speech_sample_rate: 24000,
          output_audio_codec: "wav",
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Sarvam TTS error:", data);
      throw new Error(
        data.error?.message ||
        JSON.stringify(data) ||
        "Speech generation failed"
      );
    }

    if (!data.audios?.[0]) {
      throw new Error("Sarvam returned no audio.");
    }

    audioChunks.push(data.audios[0]);
  }

  // Return every audio segment for frontend playback.
  return audioChunks;
}
