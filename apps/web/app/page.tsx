"use client";

import { useState, useRef, useEffect } from "react";
import { ChatBubble } from "@repo/ui/chat-bubble";
import { ChatInput  } from "@repo/ui/chat-input";
import { SidebarItem } from "@repo/ui/sidebar-item";
import {  Avatar } from "@repo/ui/avatar";

import styles from "./chat.module.css";

type Message = {
  id: number;
  text: string;
  sender: string;
  timestamp: string;
  isSelf: boolean;
};

type Contact = {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread?: number;
  messages: Message[];
};

const CONTACTS: Contact[] = [
  {
    id: 1,
    name: "Priya Sharma",
    lastMessage: "Sounds good! Let's sync tomorrow.",
    time: "10:42 AM",
    unread: 2,
    messages: [
      { id: 1, text: "Hey Gourav! How's the RSC project going?", sender: "Priya Sharma", timestamp: "10:30 AM", isSelf: false },
      { id: 2, text: "Going really well! Just finished the metro train SVG animation 🚂", sender: "You", timestamp: "10:33 AM", isSelf: true },
      { id: 3, text: "That sounds awesome! Can't wait to see it live.", sender: "Priya Sharma", timestamp: "10:38 AM", isSelf: false },
      { id: 4, text: "Sounds good! Let's sync tomorrow.", sender: "Priya Sharma", timestamp: "10:42 AM", isSelf: false },
    ],
  },
  {
    id: 2,
    name: "Arjun Dev",
    lastMessage: "The API is live now.",
    time: "9:15 AM",
    messages: [
      { id: 1, text: "Morning! The AWS RDS instance is up.", sender: "Arjun Dev", timestamp: "9:10 AM", isSelf: false },
      { id: 2, text: "The API is live now.", sender: "Arjun Dev", timestamp: "9:15 AM", isSelf: false },
    ],
  },
  {
    id: 3,
    name: "Meera Joshi",
    lastMessage: "Check the Figma link I sent.",
    time: "Yesterday",
    messages: [
      { id: 1, text: "Hi! Here's the updated design for the solar park page.", sender: "Meera Joshi", timestamp: "Yesterday", isSelf: false },
      { id: 2, text: "Check the Figma link I sent.", sender: "Meera Joshi", timestamp: "Yesterday", isSelf: false },
    ],
  },
  {
    id: 4,
    name: "Rahul Nair",
    lastMessage: "Done, deployed to prod ✅",
    time: "Mon",
    messages: [
      { id: 1, text: "Hey, can you review the PR when free?", sender: "Rahul Nair", timestamp: "Mon", isSelf: false },
      { id: 2, text: "Sure! Looks clean. Merging now.", sender: "You", timestamp: "Mon", isSelf: true },
      { id: 3, text: "Done, deployed to prod ✅", sender: "Rahul Nair", timestamp: "Mon", isSelf: false },
    ],
  },
];

export default function ChatPage() {
  const [contacts, setContacts] = useState(CONTACTS);
  const [activeId, setActiveId] = useState(1);
  const [search, setSearch] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const active = contacts.find((c) => c.id === activeId)!;

  const filtered = contacts.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [active?.messages]);

  const handleSend = (text: string) => {
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const newMsg: Message = {
      id: Date.now(),
      text,
      sender: "You",
      timestamp: now,
      isSelf: true,
    };
    setContacts((prev) =>
      prev.map((c) =>
        c.id === activeId
          ? { ...c, messages: [...c.messages, newMsg], lastMessage: text, time: now }
          : c
      )
    );
  };

  const handleSelect = (id: number) => {
    setActiveId(id);
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unread: undefined } : c))
    );
  };

  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h1 className={styles.sidebarTitle}>Messages</h1>
          <div className={styles.searchBox}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              className={styles.searchInput}
              placeholder="Search conversations…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.sidebarList}>
          {filtered.map((c) => (
            <SidebarItem
              key={c.id}
              name={c.name}
              lastMessage={c.lastMessage}
              time={c.time}
              unread={c.unread}
              isActive={c.id === activeId}
              onClick={() => handleSelect(c.id)}
            />
          ))}
        </div>
      </aside>

      {/* Chat Area */}
      <main className={styles.chatArea}>
        <header className={styles.chatHeader}>
          <Avatar name={active.name} size={40} />
          <div className={styles.chatHeaderInfo}>
            <p className={styles.chatHeaderName}>{active.name}</p>
            <span className={styles.chatHeaderStatus}>
              <span className={styles.onlineDot} /> Online
            </span>
          </div>
          <div className={styles.chatHeaderActions}>
            <button className={styles.iconBtn} aria-label="Call">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.18 6.18l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2.02z" />
              </svg>
            </button>
            <button className={styles.iconBtn} aria-label="Video">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
              </svg>
            </button>
            <button className={styles.iconBtn} aria-label="Info">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            </button>
          </div>
        </header>

        <div className={styles.messagesArea}>
          <div className={styles.dateDivider}><span>Today</span></div>
          {active.messages.map((msg) => (
            <ChatBubble
              key={msg.id}
              message={msg.text}
              sender={msg.sender}
              timestamp={msg.timestamp}
              isSelf={msg.isSelf}
            />
          ))}
          <div ref={bottomRef} />
        </div>

        <ChatInput onSend={handleSend} />
      </main>
    </div>
  );
}