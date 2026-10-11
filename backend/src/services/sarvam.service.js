export async function generatePodcastScript({
  topic,
  language = "English",
  duration = 2,
}) {
  const apiKey = process.env.SARVAM_API_KEY;

  if (!apiKey) {
    throw new Error("SARVAM_API_KEY is missing in backend .env");
  }

  const response = await fetch(
    "https://api.sarvam.ai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-subscription-key": apiKey,
      },
      body: JSON.stringify({
        model: "sarvam-105b",
        temperature: 0.3,
        max_tokens: 4000,
        reasoning_effort: null,
        messages: [
          {
            role: "system",
            content:
              "You are a professional podcast scriptwriter. Write the actual podcast script, not advice. Include a catchy title, an engaging introduction, alternating dialogue between Host A and Host B, examples, and a conclusion. Return plain text.",
          },
          {
            role: "user",
            content:
              `Write a complete ${duration}-minute podcast script about "${topic}" in ${language}. Use two hosts and natural conversational dialogue. Start writing the script immediately.`,
          },
        ],
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error("Sarvam API error:", JSON.stringify(data));
    throw new Error(
      data.error?.message || `Sarvam API returned HTTP ${response.status}`
    );
  }

  const choice = data.choices?.[0];
  const script = choice?.message?.content?.trim();

  if (!script) {
    console.error(
      "Sarvam returned no visible script:",
      JSON.stringify({
        finish_reason: choice?.finish_reason,
        message: choice?.message,
        usage: data.usage,
      })
    );

    throw new Error(
      `Empty AI response (finish reason: ${choice?.finish_reason || "unknown"}). Check the backend terminal.`
    );
  }

  return script;
}