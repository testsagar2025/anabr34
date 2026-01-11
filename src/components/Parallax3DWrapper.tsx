import { useState, useEffect, useRef, ReactNode } from 'react';

interface Parallax3DWrapperProps {
  children: ReactNode;
  intensity?: number;
  className?: string;
  perspective?: number;
  popOut?: boolean;
}

const Parallax3DWrapper = ({ 
  children, 
  intensity = 15, 
  className = '',
  perspective = 1000,
  popOut = false
}: Parallax3DWrapperProps) => {
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;
      
      const rotateY = (mouseX / (rect.width / 2)) * intensity;
      const rotateX = -(mouseY / (rect.height / 2)) * intensity;
      
      setTransform({ rotateX, rotateY });
    };

    const handleMouseLeave = () => {
      setTransform({ rotateX: 0, rotateY: 0 });
      setIsHovering(false);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
      container.addEventListener('mouseenter', () => setIsHovering(true));
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
        container.removeEventListener('mouseenter', () => setIsHovering(true));
      }
    };
  }, [intensity]);

  return (
    <div 
      ref={containerRef}
      className={`relative ${className}`}
      style={{ 
        perspective: `${perspective}px`,
        transformStyle: 'preserve-3d'
      }}
    >
      <div
        className="transition-transform duration-200 ease-out"
        style={{
          transform: `
            rotateX(${transform.rotateX}deg) 
            rotateY(${transform.rotateY}deg)
            ${popOut && isHovering ? 'translateZ(50px) scale(1.02)' : 'translateZ(0)'}
          `,
          transformStyle: 'preserve-3d',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Parallax3DWrapper;
