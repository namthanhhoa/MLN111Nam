import React, { useState, useEffect, useRef } from "react";

const MouseCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [floatingHearts, setFloatingHearts] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const lastPositionRef = useRef({ x: 0, y: 0 });

  // Kiểm tra thiết bị mobile
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ) ||
        window.innerWidth <= 768 ||
        "ontouchstart" in window;
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Theo dõi chuột và tạo trái tim bay
  useEffect(() => {
    // Không chạy trên mobile
    if (isMobile) return;

    const updateMousePosition = (e) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      setMousePosition(newPosition);
      setIsVisible(true);

      // Tạo trái tim bay khi di chuyển đủ khoảng cách
      const distance = Math.sqrt(
        Math.pow(newPosition.x - lastPositionRef.current.x, 2) +
          Math.pow(newPosition.y - lastPositionRef.current.y, 2)
      );

      if (distance > 30) {
        // Khoảng cách tối thiểu 30px
        // Tạo trái tim mới
        const newHeart = {
          id: Date.now() + Math.random(),
          x: newPosition.x + (Math.random() - 0.5) * 40, // Random offset
          y: newPosition.y + (Math.random() - 0.5) * 40,
          opacity: 1,
          scale: 0.5 + Math.random() * 0.5, // Random scale 0.5-1
          emoji: Math.random() > 0.3 ? "💖" : Math.random() > 0.5 ? "💝" : "💕", // Random heart emojis
          velocityX: (Math.random() - 0.5) * 2, // Random horizontal velocity
          velocityY: -2 - Math.random() * 2, // Upward velocity
          rotation: Math.random() * 360, // Random rotation
        };

        setFloatingHearts((prev) => [...prev, newHeart]);
        lastPositionRef.current = newPosition;

        // Xóa trái tim sau 3 giây
        setTimeout(() => {
          setFloatingHearts((prev) =>
            prev.filter((heart) => heart.id !== newHeart.id)
          );
        }, 3000);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isMobile]);

  // Animation cho trái tim bay
  useEffect(() => {
    if (isMobile) return;

    const animateHearts = () => {
      setFloatingHearts((prev) =>
        prev
          .map((heart) => ({
            ...heart,
            x: heart.x + heart.velocityX,
            y: heart.y + heart.velocityY,
            opacity: Math.max(0, heart.opacity - 0.02), // Fade out dần
            scale: heart.scale + 0.01, // Scale up dần
            rotation: heart.rotation + 2, // Rotate
          }))
          .filter((heart) => heart.opacity > 0)
      );
    };

    const animationInterval = setInterval(animateHearts, 16); // ~60fps

    return () => clearInterval(animationInterval);
  }, [isMobile]);

  // Không render gì trên mobile
  if (isMobile || !isVisible) return null;

  return (
    <>
      {/* Floating hearts */}
      {floatingHearts.map((heart) => (
        <div
          key={heart.id}
          className="fixed pointer-events-none z-[9999] transition-all duration-100"
          style={{
            left: heart.x,
            top: heart.y,
            transform: `translate(-50%, -50%) scale(${heart.scale}) rotate(${heart.rotation}deg)`,
            opacity: heart.opacity,
            fontSize: "24px",
            textShadow: "0 0 10px rgba(255, 182, 193, 0.8)",
            animation: `heartPulse ${2 + Math.random()}s ease-in-out infinite`,
          }}
        >
          {heart.emoji}
        </div>
      ))}

      {/* Main cursor - trái tim chính theo chuột */}
      <div
        className="fixed pointer-events-none z-[9999] transition-all duration-75 ease-out"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: "translate(-50%, -50%) scale(1.2)",
        }}
      >
        <div
          className="relative"
          style={{
            fontSize: "20px",
            textShadow:
              "0 0 15px rgba(255, 182, 193, 1), 0 0 25px rgba(255, 105, 180, 0.6)",
            animation: "heartBeat 1.5s ease-in-out infinite",
            filter: "drop-shadow(0 0 8px rgba(255, 182, 193, 0.8))",
          }}
        >
          💖
        </div>
      </div>

      {/* CSS animations */}
      <style jsx>{`
        @keyframes heartBeat {
          0%,
          100% {
            transform: scale(1);
          }
          25% {
            transform: scale(1.1);
          }
          50% {
            transform: scale(1.05);
          }
          75% {
            transform: scale(1.15);
          }
        }

        @keyframes heartPulse {
          0%,
          100% {
            filter: brightness(1) hue-rotate(0deg);
          }
          50% {
            filter: brightness(1.3) hue-rotate(10deg);
          }
        }
      `}</style>
    </>
  );
};

export default MouseCursor;
