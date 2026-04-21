"use client";
import React, { useState, useRef } from "react";

type ChatInputProps = {
  onSend: (message: string) => void;
  placeholder?: string;
};

export const ChatInput = ({
  onSend,
  placeholder = "Type a message…",
}: ChatInputProps) => {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setValue("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = () => {
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = "auto";
      ta.style.height = Math.min(ta.scrollHeight, 120) + "px";
    }
  };

  return (
    <>
      <style>{`
        .chat-input-bar {
          display: flex;
          align-items: flex-end;
          gap: 10px;
          padding: 14px 18px;
          background: #ffffff;
          border-top: 1px solid #f0f0f5;
        }
        .chat-textarea {
          flex: 1;
          resize: none;
          border: 1.5px solid #e5e7eb;
          border-radius: 14px;
          padding: 10px 14px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14.5px;
          line-height: 1.5;
          color: #1a1a2e;
          background: #f9f9fb;
          outline: none;
          transition: border-color 0.18s, box-shadow 0.18s;
          min-height: 44px;
          max-height: 120px;
          overflow-y: auto;
        }
        .chat-textarea::placeholder { color: #b0b3be; }
        .chat-textarea:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.12);
          background: #fff;
        }
        .send-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: transform 0.15s, opacity 0.15s;
        }
        .send-btn:hover { transform: scale(1.07); }
        .send-btn:active { transform: scale(0.95); opacity: 0.85; }
        .send-btn svg { width: 18px; height: 18px; fill: #fff; }
      `}</style>
      <div className="chat-input-bar">
        <textarea
          ref={textareaRef}
          className="chat-textarea"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          rows={1}
        />
        <button className="send-btn" onClick={handleSend} aria-label="Send">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </div>
    </>
  );
};