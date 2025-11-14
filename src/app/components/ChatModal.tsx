import { useEffect, useRef, useState } from "react";
import "../styles/ChatModal.scss";
import { Bot, Forward } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ChatModalProps {
  closeModal: () => void;
  initialMessage?: string;
}

const ChatModal: React.FC<ChatModalProps> = ({
  closeModal,
  initialMessage,
}) => {
  const { t, i18n } = useTranslation();
  const hasProcessedInitialMessage = useRef(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: t("ai.startingMsg"),
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendToAI = async (text: string) => {
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply ?? t("ai.error") },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: t("ai.error") },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Only process if we have a message and haven't processed it yet
    if (initialMessage && !hasProcessedInitialMessage.current) {
      hasProcessedInitialMessage.current = true; // Mark as processed

      // Add the user message
      const userMessage = { role: "user", content: initialMessage };
      setMessages((prev) => [...prev, userMessage]);

      // Auto-send it to the AI
      sendToAI(initialMessage);
    }
  }, [initialMessage]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    sendToAI(input);
    setInput("");
  };

  return (
    <div
      className={`chat-modal-overlay ${
        i18n.language === "ar" ? "chat-modal-overlay--ar" : ""
      }`}
    >
      <div className="chat-modal">
        {/* Header */}
        <div className="chat-header">
          <div className="chat-title">
            <h2>{t("ai.title")}</h2>
          </div>
          <button className="close-btn" onClick={closeModal}>
            &times;
          </button>
        </div>

        <div className="chat-mood-container">
          <Bot />
        </div>

        {/* Messages */}
        <div className="chat-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`message ${msg.role}`}>
              {msg.content}
            </div>
          ))}
          {loading && (
            <div className="message assistant">{t("ai.writting")}</div>
          )}
        </div>

        {/* Input */}
        <div className="chat-input">
          <input
            type="text"
            placeholder={t("ai.placeholder")}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
          />
          <button onClick={handleSend}>
            <Forward size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
