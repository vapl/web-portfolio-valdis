"use client";

import React from "react";
import CIcon from "@coreui/icons-react";

type CardProps = {
  title: string;
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  iconName?: any;
  sequence?: number;
  className?: string;
};

const ServiceCard: React.FC<CardProps> = ({
  title,
  description,
  iconName,
  sequence,
  className = "",
}) => {
  return (
    <div
      className={`relative h-80 items-center border border-white/10 p-6 pt-18 pb-18 rounded-xl hover:shadow-xl transition-transform hover:-translate-y-2 bg-black ${className}`}
    >
      {/* Content */}
      <div className="flex flex-col gap-2 z-10">
        <div className="mb-2">( {sequence} )</div>
        <h1 className="text-2xl md:text-3xl uppercase font-semibold text-text">
          {title}
        </h1>
        <p className="text-base text-gray-400">{description}</p>
      </div>

      {/* Background Icon */}
      {iconName && (
        <div className="absolute inset-0 right-3 bottom-3 flex items-end justify-end text-white/6 pointer-events-none">
          <CIcon icon={iconName} className="h-[80%] w-auto" />
        </div>
      )}
    </div>
  );
};

export default ServiceCard;
