
interface CGMLogoProps {
  size?: number;
  strokeWidth?: number;
  className?: string;
}

const CGMLogo = ({size = 100, strokeWidth = 3, className = ""}: CGMLogoProps) => {
  return (
    <div className={`relative ${className}`} style={{width: `${size}px`, height: `${size}px`}}>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <polygon
          points="50,15 85,32.5 85,67.5 50,85 15,67.5 15,32.5"
          fill="transparent"
          stroke="white"
          strokeWidth={strokeWidth}
        />
        <circle
          cx="50"
          cy="50"
          r="18"
          fill="black"
          stroke="white"
          strokeWidth={strokeWidth}
        />
      </svg>
    </div>
  );
};

export default CGMLogo; 