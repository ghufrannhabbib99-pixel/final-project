const { chatWithAI } = require("./ai.service");

const chat = async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        message: "Message is required",
      });
    }

    const reply = await chatWithAI(message.trim(), history);

    res.json({
      reply,
    });
  } catch (error) {
    console.error("AI Error:", error);

    res.status(500).json({
      message: "Failed to get AI response",
    });
  }
};

module.exports = {
  chat,
};