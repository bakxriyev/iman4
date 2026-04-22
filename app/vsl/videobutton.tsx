"use client";

export default function VideoButton() {
  const handleClick = () => {
    window.open(
      "https://t.me/iman_ahmedovnaa_bot?start=start",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div style={{ width: 340, height: 70 }}>
      <button
        onClick={handleClick}
        className="btn-3d"
        style={{ fontSize: 16 }}
      >
        VIDEODARSNI KO'RISH
        <span className="wiggle" style={{ fontSize: 18 }}>
          →
        </span>
      </button>
    </div>
  );
}