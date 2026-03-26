type TypeCardProps = {
  name: string;
  jp: string;
  cn: string;
  color: string;
  icon: string;
  className?: string;
};

function TypeCard({ name, jp, cn, color, icon, className = '' }: TypeCardProps) {
  return (
    <div
      className={`${color} flex gap-2 h-full w-full flex-col items-center justify-center rounded-xl p-4 outline-2 outline-black dark:outline-white ${className}`}
    >
      <div className="w-full h-full">
        <img src={icon} />
      </div>
      <div className="flex flex-col">
        <span className="font-bold">{name}</span>
        <span className="text-xs opacity-50">{cn}</span>
        <span className="text-xs opacity-50">{jp}</span>
      </div>
    </div>
  );
}

export default TypeCard;
