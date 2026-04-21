import React from "react";
import { Avatar } from "./avatar";

type SidebarItemProps = {
  name: string;
  lastMessage: string;
  time: string;
  unread?: number;
  isActive?: boolean;
  avatarSrc?: string;
  onClick?: () => void;
};

export const SidebarItem = ({
  name,
  lastMessage,
  time,
  unread,
  isActive,
  avatarSrc,
  onClick,
}: SidebarItemProps) => {
  return (
    <>
      <style>{`
        .sidebar-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          cursor: pointer;
          border-radius: 12px;
          transition: background 0.15s;
          position: relative;
        }
        .sidebar-item:hover { background: #f4f4f8; }
        .sidebar-item.active { background: #eef0ff; }
        .sidebar-item-info { flex: 1; min-width: 0; }
        .sidebar-item-top {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 6px;
        }
        .sidebar-item-name {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #1a1a2e;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .sidebar-item.active .sidebar-item-name { color: #6366f1; }
        .sidebar-item-time {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          color: #9ca3af;
          flex-shrink: 0;
        }
        .sidebar-item-preview {
          font-family: 'DM Sans', sans-serif;
          font-size: 12.5px;
          color: #9ca3af;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-top: 2px;
        }
        .unread-badge {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 10.5px;
          font-weight: 700;
          min-width: 18px;
          height: 18px;
          border-radius: 9px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0 5px;
          margin-top: 2px;
        }
      `}</style>
      <div
        className={`sidebar-item ${isActive ? "active" : ""}`}
        onClick={onClick}
      >
        <Avatar name={name} src={avatarSrc} size={42} />
        <div className="sidebar-item-info">
          <div className="sidebar-item-top">
            <span className="sidebar-item-name">{name}</span>
            <span className="sidebar-item-time">{time}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="sidebar-item-preview">{lastMessage}</span>
            {unread ? <span className="unread-badge">{unread}</span> : null}
          </div>
        </div>
      </div>
    </>
  );
};