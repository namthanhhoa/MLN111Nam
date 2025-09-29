import React, { useState, useEffect, useRef } from 'react';

const MouseCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trailImages, setTrailImages] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const imageCounterRef = useRef(1);

  // Kiểm tra thiết bị mobile
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                           window.innerWidth <= 768 ||
                           ('ontouchstart' in window);
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Bước 1: Di chuyển theo tọa độ chuột
  useEffect(() => {
    // Không chạy effects trên mobile
    if (isMobile) return;

    const updateMousePosition = (e) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      setMousePosition(newPosition);
      setIsVisible(true);

      // Bước 2: Chỉ tạo hình mới khi di chuyển đủ khoảng cách (50px)
      const distance = Math.sqrt(
        Math.pow(newPosition.x - lastPositionRef.current.x, 2) + 
        Math.pow(newPosition.y - lastPositionRef.current.y, 2)
      );

      if (distance > 50) { // Khoảng cách tối thiểu 50px
        // Bước 3: Tạo hình mới với thứ tự đúng (1->2->3->1...)
        const newImage = {
          id: Date.now(),
          x: newPosition.x,
          y: newPosition.y,
          imageNumber: imageCounterRef.current,
          opacity: 1,
          zIndex: imageCounterRef.current // Z-index tăng dần để đè đúng thứ tự
        };

        setTrailImages(prev => [...prev, newImage]);
        lastPositionRef.current = newPosition;

        // Cập nhật counter (1->2->3->1...)
        imageCounterRef.current = imageCounterRef.current === 3 ? 1 : imageCounterRef.current + 1;

        // Bước 4: Ẩn hình sau 1 giây
        setTimeout(() => {
          setTrailImages(prev => prev.filter(img => img.id !== newImage.id));
        }, 700); // Đã là 700ms (0.7s) như yêu cầu
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isMobile]);

  // Không render gì trên mobile
  if (isMobile || !isVisible) return null;

  return (
    <>
      {/* Hiển thị tất cả hình ảnh trail */}
      {trailImages.map((imageData) => (
        <div
          key={imageData.id}
          className="fixed pointer-events-none transition-opacity duration-300"
          style={{
            left: imageData.x,
            top: imageData.y,
            transform: 'translate(-50%, -50%)',
            zIndex: 9999 + imageData.zIndex, // Z-index tăng dần
            opacity: imageData.opacity
          }}
        >
          <img
            src={`/mouse/${imageData.imageNumber}.png`}
            alt={`Mouse cursor ${imageData.imageNumber}`}
            className="w-16 h-16 object-contain"
            style={{
              filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))',
              imageRendering: 'crisp-edges'
            }}
            draggable={false}
          />
        </div>
      ))}

      {/* Cursor chính luôn theo chuột (hình 1) */}
      <div
        className="fixed pointer-events-none z-[9999] transition-all duration-100 ease-out"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <img
          src="/mouse/1.png"
          alt="Main cursor"
          className="w-12 h-12 object-contain opacity-80"
          style={{
            filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.4))',
            imageRendering: 'crisp-edges'
          }}
          draggable={false}
        />
      </div>
    </>
  );
};

export default MouseCursor;
