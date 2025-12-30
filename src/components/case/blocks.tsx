import Section from "./Section";
import Media from "./Media";
import IntroCard from "./IntroCard";
import PhoneShowcase from "./PhoneShowcase";
import { DecisionBlock } from "./DecisionBlock";

export const PullQuote = ({ children }: { children: React.ReactNode }) => {
  return (
    <blockquote className="text-2xl md:text-3xl font-medium border-l-4 pl-5 my-8 border-white/30">
      {children}
    </blockquote>
  );
};

export const Metrics = ({
  items,
}: {
  items: { label: string; value: string }[];
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 my-6">
      {items.map((m) => (
        <div
          key={m.label}
          className="rounded-2xl border border-white/15 p-4 bg-white/[0.03] shadow-sm"
        >
          <div className="text-2xl md:text-3xl font-bold tracking-tight">
            {m.value}
          </div>
          <div className="text-xs text-text/60 mt-1">{m.label}</div>
        </div>
      ))}
    </div>
  );
};

export { Section, Media, IntroCard, PhoneShowcase, DecisionBlock };
