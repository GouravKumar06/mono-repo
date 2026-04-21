import React from "react";
import { Avatar } from "./avatar";

type ChatBubbleProps = {
  message: string;
  sender: string;
  timestamp: string;
  isSelf?: boolean;
  avatarSrc?: string;
};

export const ChatBubble = ({
  message,
  sender,
  timestamp,
  isSelf = false,
  avatarSrc,
}: ChatBubbleProps) => {
  return (
    <>
      <style>{`
        .bubble-wrapper {
          display: flex;
          align-items: flex-end;
          gap: 10px;
          max-width: 72%;
          animation: bubbleIn 0.22s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @keyframes bubbleIn {
          from { opacity: 0; transform: translateY(10px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
        .bubble-wrapper.self {
          flex-direction: row-reverse;
          margin-left: auto;
        }
        .bubble-content {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .bubble-wrapper.self .bubble-content {
          align-items: flex-end;
        }
        .bubble-text {
          padding: 11px 16px;
          border-radius: 18px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14.5px;
          line-height: 1.55;
          word-break: break-word;
          position: relative;
        }
        .bubble-text.other {
          background: #ffffff;
          color: #1a1a2e;
          border-bottom-left-radius: 4px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.08);
        }
        .bubble-text.self {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: #ffffff;
          border-bottom-right-radius: 4px;
        }
        .bubble-meta {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .bubble-sender {
          font-family: 'DM Sans', sans-serif;
          font-size: 11.5px;
          font-weight: 600;
          color: #6366f1;
        }
        .bubble-time {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          color: #9ca3af;
        }
      `}</style>
      <div className={`bubble-wrapper ${isSelf ? "self" : ""}`}>
        <Avatar name={sender} src={avatarSrc} size={32} />
        <div className="bubble-content">
          {!isSelf && (
            <div className="bubble-meta">
              <span className="bubble-sender">{sender}</span>
              <span className="bubble-time">{timestamp}</span>
            </div>
          )}
          <div className={`bubble-text ${isSelf ? "self" : "other"}`}>
            {message}
          </div>
          {isSelf && <span className="bubble-time">{timestamp}</span>}
        </div>
      </div>
    </>
  );
};