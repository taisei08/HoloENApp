"use client"
import { useEffect, useState } from 'react';

interface RoundGaugeProps {
  value: number;
}

const RoundGauge: React.FC<RoundGaugeProps> = ({ value }) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const radius = 12;
  const svgLength = 30

  useEffect(() => {
    let start = 0;
    const end = value;
    const animationDuration = 1000
    const increment = end / (animationDuration / 16); // フレームごとの増加量（60fps基準）

    const animate = () => {
      start += increment;
      if (start >= end) {
        start = end;
      }
      setAnimatedValue(start);
      if (start < end) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [value]);

  const getStrokeColor = () => {
    return animatedValue > 400 ? 'stroke-red-500' : 'stroke-green-500';
  };

  const strokeDasharray = 2 * Math.PI * radius;
  const strokeDashoffset = strokeDasharray - (animatedValue / 500) * strokeDasharray;

  return (
    <div className="flex justify-center items-center relative">
      <svg width={svgLength} height={svgLength} viewBox="0 0 30 30">
        <circle
          cx={svgLength / 2}
          cy={svgLength / 2}
          r={radius}
          className="stroke-gray-200"
          strokeWidth="5"
          fill="none"
        />
        <circle
          cx={svgLength / 2}
          cy={svgLength / 2}
          r={radius}
          className={`${getStrokeColor()}`}
          strokeWidth="5"
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform="rotate(-90 15 15)"
        />
      </svg>
      <div className="absolute text-center text-xs font-bold">
        {Math.round(animatedValue)}
      </div>
    </div>
  );
};

export default RoundGauge;
