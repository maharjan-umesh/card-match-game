import { useMemo } from "react";
import { TIMER } from "../constants/timer";

interface CountdownProps {
  size: number;
  timeRemaining: number;
}

export default function Countdown({
  size = 64,
  timeRemaining,
}: CountdownProps) {
  const ring = useMemo(() => size / 10, [size]);
  const xy = useMemo(() => size / 2, [size]);
  const radius = useMemo(() => (size - ring) / 2, [size, ring]);
  const circumference = useMemo(() => 2 * Math.PI * radius, [radius]);
  const offset = useMemo(
    () => (timeRemaining / TIMER) * circumference,
    [timeRemaining, circumference]
  );

  return (
    <div className="countdown-wrapper">
      <svg height={size} width={size}>
        <circle
          cx={xy}
          cy={xy}
          r={radius}
          stroke="#555"
          strokeWidth={ring}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - offset}
          strokeLinecap="round"
          fill="transparent"
        />
      </svg>
      <span className="timer">{timeRemaining}</span>
    </div>
  );
}
