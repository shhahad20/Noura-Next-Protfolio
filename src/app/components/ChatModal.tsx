"use client";
import { useEffect, useRef, useState } from "react";
import "../styles/ChatModal.scss";
import { Bot, Forward } from "lucide-react";
import { useTranslation } from "react-i18next";
import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";

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

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: t("ai.startingMsg"),
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const lastCallRef = useRef(0);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendToAI = async (text: string) => {
    const now = Date.now();
    const timeSinceLastCall = now - lastCallRef.current;

    // Increase minimum time between calls
    if (timeSinceLastCall < 3000) {
      const waitTime = 3000 - timeSinceLastCall;
      await new Promise((resolve) => setTimeout(resolve, waitTime));
    }

    lastCallRef.current = Date.now();
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
      console.error("Error communicating with AI:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: t("ai.error") },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialMessage && !hasProcessedInitialMessage.current) {
      hasProcessedInitialMessage.current = true;
      const userMessage = { role: "user", content: initialMessage };
      setMessages((prev) => [...prev, userMessage]);

      setTimeout(() => {
        sendToAI(initialMessage);
      }, 500);
    }
  }, [initialMessage]);

  const handleSend = () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    sendToAI(input);
    setInput("");
  };
  const [retryAfter, setRetryAfter] = useState(0);

  // Countdown for rate limit
  useEffect(() => {
    if (retryAfter > 0) {
      const timer = setInterval(() => {
        setRetryAfter((prev) => Math.max(0, prev - 1));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [retryAfter]);

  // Custom markdown components with proper typing
  const markdownComponents: Components = {
    p: ({ children }) => <p className="message-paragraph">{children}</p>,
    strong: ({ children }) => (
      <strong className="message-bold">{children}</strong>
    ),
    ul: ({ children }) => <ul className="message-list">{children}</ul>,
    ol: ({ children }) => <ol className="message-list-ordered">{children}</ol>,
    li: ({ children }) => <li className="message-list-item">{children}</li>,
    a: ({ children, href }) => (
      <a
        className="message-link"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    code: ({ children, className }) => {
      const isInline = !className;
      return isInline ? (
        <code className="message-code-inline">{children}</code>
      ) : (
        <code className="message-code-block">{children}</code>
      );
    },
  };

  return (
    <div
      className={`chat-modal-overlay ${
        i18n.language === "ar" ? "chat-modal-overlay--ar" : ""
      }`}
      onClick={closeModal}
    >
      <div className="chat-modal" onClick={(e) => e.stopPropagation()}>
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
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={markdownComponents}
              >
                {msg.content}
              </ReactMarkdown>
            </div>
          ))}
          {loading && (
            <div className="message assistant">
              <div className="message-content typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="chat-input">
          <input
            type="text"
            placeholder={
              retryAfter > 0 ? `Wait ${retryAfter}s...` : t("ai.placeholder")
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
            disabled={retryAfter > 0}
          />
          <button  onClick={handleSend}
            disabled={loading || retryAfter > 0 || !input.trim()}
            className={loading || retryAfter > 0 ? "disabled" : ""}>
            <Forward size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
