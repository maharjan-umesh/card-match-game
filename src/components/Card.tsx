interface CardProps {
  status: string;
  value: string;
  select: React.MouseEventHandler<HTMLDivElement>;
}

export default function Card({ status, value, select }: CardProps) {
  return (
    <div className={`card ${status}`} onClick={select}>
      {status === "facedown" ? "" : value}
    </div>
  );
}
