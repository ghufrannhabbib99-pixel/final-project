import { useState } from "react";
import api from "../../services/api";
import "./AI.css";

const suggestions = [
  "أريد هدية عراقية مميزة",
  "اقترحلي منتجات حسب ميزانيتي",
  "أريد أبحث عن حرفي مناسب",
  "ساعدني أختار منتج تراثي",
];

const renderAssistantMessage = (content) => {
  if (!content) return null;

  const lines = content.split("\n");

  return lines.map((line, index) => {
    const parts = line.split(/(\*\*.*?\*\*)/g);

    return (
      <div key={index} style={{ marginBottom: "8px" }}>
        {parts.map((part, partIndex) => {
          if (
            part.startsWith("**") &&
            part.endsWith("**")
          ) {
            return (
              <strong key={partIndex}>
                {part.slice(2, -2)}
              </strong>
            );
          }

          return (
            <span key={partIndex}>
              {part}
            </span>
          );
        })}
      </div>
    );
  });
};

function AI() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const text = message.trim();

    if (!text || loading) return;

    const userMessage = {
      role: "user",
      content: text,
    };

    const history = messages.map((item) => ({
      role: item.role,
      content: item.content,
    }));

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    setMessage("");
    setLoading(true);

    try {
      const data = await api.ai.chat({
        message: text,
        history,
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            data.reply ||
            "عذرًا، ما حصلت رد من المساعد.",
        },
      ]);
    } catch (error) {
      console.error("AI chat error:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "عذرًا، صار خطأ بالاتصال بالمساعد. حاول مرة ثانية.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestion = (text) => {
    setMessage(text);
  };

  return (
    <main className="ai-page">
      <section className="ai-hero">
        <div className="ai-pattern" />

        <div className="ai-content">
          <span className="ai-badge">
            مساعد الحرفا الذكي
          </span>

          <h1>
            اكتشف عالم الحرف
            <br />
            <span>
              بمساعدة الذكاء الاصطناعي
            </span>
          </h1>

          <p>
            اسألني عن المنتجات، الحرفيين، الهدايا، أو أي شيء
            يتعلق بالحرف العراقية والتراث المحلي.
          </p>
        </div>
      </section>

      <section className="ai-chat-section">
        <div className="ai-chat-card">
          {messages.length === 0 ? (
            <div className="ai-empty">
              <div className="ai-icon">
                ✦
              </div>

              <h2>
                شلون أگدر أساعدك؟
              </h2>

              <p>
                اكتب سؤالك أو اختار أحد الاقتراحات حتى نبدأ.
              </p>

              <div className="ai-suggestions">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() =>
                      handleSuggestion(suggestion)
                    }
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="ai-messages">
              {messages.map((item, index) => (
                <div
                  key={`${item.role}-${index}`}
                  className={`ai-message ${
                    item.role === "user"
                      ? "ai-message-user"
                      : "ai-message-assistant"
                  }`}
                >
                  <div className="ai-message-label">
                    {item.role === "user"
                      ? "أنت"
                      : "الحرفا AI"}
                  </div>

                  <div className="ai-message-content">
                    {item.role === "assistant"
                      ? renderAssistantMessage(
                          item.content
                        )
                      : item.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="ai-message ai-message-assistant">
                  <div className="ai-message-label">
                    الحرفا AI
                  </div>

                  <div className="ai-message-content">
                    جاري التفكير...
                  </div>
                </div>
              )}
            </div>
          )}

          <form
            className="ai-input-area"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              placeholder="اكتب سؤالك هنا..."
              disabled={loading}
            />

            <button
              type="submit"
              aria-label="إرسال"
              disabled={loading}
            >
              ↑
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default AI;