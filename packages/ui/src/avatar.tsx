import React from "react";

type AvatarProps = {
  name: string;
  src?: string;
  size?: number;
};

export const Avatar = ({ name, src, size = 36 }: AvatarProps) => {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <>
      <style>{`
        .avatar {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: ${size * 0.38}px;
          overflow: hidden;
          flex-shrink: 0;
          letter-spacing: 0.03em;
        }
        .avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}</style>
      <div
        className="avatar"
        style={{ width: size, height: size }}
        title={name}
      >
        {src ? <img src={src} alt={name} /> : initials}
      </div>
    </>
  );
};