import React from "react";

type Props = {
  size?: number;
  stroke?: number;
  className?: string;
};

export default function Spinner({
  size = 18,
  stroke = 3,
  className = "",
}: Props) {
  return (
    <span className="flex items-center justify-center">
      <span
        aria-label="Loading"
        aria-live="polite"
        role="status"
        style={{
          width: size,
          height: size,
          borderWidth: stroke,
          verticalAlign: "middle",
        }}
        className={`inline-block rounded-full animate-spin border-current border-t-transparent ${className}`}
      />
    </span>
  );
}
