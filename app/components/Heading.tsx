"use client";

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  uppercase?: boolean;
}

const Heading: React.FC<HeadingProps> = ({
  title,
  subtitle,
  center,
  uppercase,
}) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <div className="text-2xl font-bold">{title}</div>
      <div
        className={`font-light text-neutral-500 mt-2 ${
          uppercase && "uppercase"
        }`}
      >
        {subtitle}
      </div>
    </div>
  );
};

export default Heading;
