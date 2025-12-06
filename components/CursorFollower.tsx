
import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const SEGMENT_COUNT = 12;

const CursorFollower: React.FC = () => {
  const { theme } = useTheme();
  const segmentsRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Physics state: points representing the joints of the chain
  // points[0] is the head (mouse), points[1] follows points[0], etc.
  const points = useRef(Array.from({ length: SEGMENT_COUNT }, () => ({ x: -100, y: -100 })));
  const mouse = useRef({ x: -100, y: -100 });

  useEffect(() => {
    let requestRef: number;

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      // Initialize positions on first move to prevent flying in from corner
      if (points.current[0].x === -100) {
        points.current.forEach(p => {
          p.x = e.clientX;
          p.y = e.clientY;
        });
      }
    };

    const animate = () => {
      // 1. Update Head (points[0]) to Mouse
      // Smooth follow for head (0.4 factor for responsiveness)
      const head = points.current[0];
      head.x += (mouse.current.x - head.x) * 0.4; 
      head.y += (mouse.current.y - head.y) * 0.4;

      // 2. Update trailing points (Chain Physics)
      for (let i = 1; i < SEGMENT_COUNT; i++) {
        const curr = points.current[i];
        const prev = points.current[i - 1];
        
        const dx = prev.x - curr.x;
        const dy = prev.y - curr.y;
        
        // Move towards previous point with drag easing
        // 0.35 provides a nice whip-like trail effect
        curr.x += dx * 0.35;
        curr.y += dy * 0.35;
      }

      // 3. Update DOM transforms
      // Each segment 'i' represents the line connecting points[i] and points[i+1]
      // We render SEGMENT_COUNT - 1 segments
      for (let i = 0; i < SEGMENT_COUNT - 1; i++) {
        const segment = segmentsRefs.current[i];
        if (!segment) continue;

        const p1 = points.current[i]; // Front (Head side)
        const p2 = points.current[i + 1]; // Back (Tail side)

        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);

        // Transform logic:
        // Position at p1 (Head side of segment)
        // Transform Origin is Left Center (0 50%)
        // Rotate to point towards p2
        // Scale X to match the distance
        // Minimum scale 1 to prevent disappearing
        const scale = Math.max(dist, 1);
        
        segment.style.transform = `translate3d(${p1.x}px, ${p1.y}px, 0) rotate(${angle}deg) scaleX(${scale})`;
      }

      requestRef = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    requestRef = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(requestRef);
    };
  }, []);

  return (
    <>
      {Array.from({ length: SEGMENT_COUNT - 1 }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { segmentsRefs.current[i] = el; }}
          className="fixed top-0 left-0 pointer-events-none z-[9999]"
          style={{
            width: '1px', // Base unit for scaling, acts as length multiplier
            height: '3px', // Thickness of the trail
            backgroundColor: '#4b6bfb',
            // Fade out opacity towards the tail
            opacity: (theme === 'dark' ? 0.8 : 0.6) * (1 - i / (SEGMENT_COUNT - 1)), 
            transformOrigin: '0 50%', // Pin left side (at p1)
            // Add glow to the first few segments for "head" brightness
            boxShadow: i < 3 ? '0 0 8px rgba(75, 107, 251, 0.8)' : 'none',
            willChange: 'transform',
            borderRadius: '1.5px'
          }}
        />
      ))}
    </>
  );
};

export default CursorFollower;
