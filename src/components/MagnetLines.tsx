import React, { useRef, useEffect } from "react";

interface MagnetLinesProps {
  rows?: number;
  columns?: number;
  containerSize?: string;
  lineColor?: string;
  lineWidth?: string;
  lineHeight?: string;
  baseAngle?: number;
  className?: string;
  style?: React.CSSProperties;
}

const MagnetLines: React.FC<MagnetLinesProps> = ({
  rows = 9,
  columns = 9,
  containerSize = "80vmin",
  lineColor = "#efefef",
  lineWidth = "2vmin",
  lineHeight = "3vmin",
  baseAngle = -10,
  className = "",
  style = {},
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const items = container.querySelectorAll("span");

    const onPointerMove = (pointer: { x: number; y: number }) => {
      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const centerX = rect.x + rect.width / 2;
        const centerY = rect.y + rect.height / 2;
        const b = pointer.x - centerX;
        const a = pointer.y - centerY;
        const c = Math.sqrt(a * a + b * b) || 1;
        const r =
          (Math.acos(b / c) * 180) / Math.PI * (pointer.y > centerY ? 1 : -1);
        (item as HTMLElement).style.setProperty("--rotate", `${r}deg`);
      });
    };

    const handlePointerMove = (e: PointerEvent) => {
      onPointerMove({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("pointermove", handlePointerMove);

    // Initial state: center pointer
    if (items.length) {
      const middleIndex = Math.floor(items.length / 2);
      const rect = items[middleIndex].getBoundingClientRect();
      onPointerMove({ x: rect.x, y: rect.y });
    }

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  const total = rows * columns;
  const spans = Array.from({ length: total }, (_, i) => (
    <span
      key={i}
      style={{
        // @ts-ignore
        "--rotate": `${baseAngle}deg`,
        backgroundColor: lineColor,
        width: lineWidth,
        height: lineHeight,
        borderRadius: "9999px",
        display: "block",
        transition: "transform 0.3s cubic-bezier(.4,0,.2,1)",
      }}
      className="will-change-transform"
    />
  ));

  return (
    <div
      ref={containerRef}
      className={`magnetLines-container pointer-events-none absolute inset-0 w-full h-full z-0 ${className}`}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        width: "100%",
        height: "100%",
        ...style,
      }}
    >
      {spans}
    </div>
  );
};

export default MagnetLines; 