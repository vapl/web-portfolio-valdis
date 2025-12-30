type DecisionItem = {
  title: string;
  decision: string;
  tradeoff: string;
  invert?: boolean;
};

export function DecisionBlock({
  eyebrow,
  title,
  items,
  invert = false,
}: {
  eyebrow: string;
  title: string;
  items: DecisionItem[];
  invert?: boolean;
}) {
  const textDim = invert ? "text-white/70" : "text-zinc-600";
  return (
    <section className="relative py-10 md:py-16 w-full">
      <div className="w-full md:max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className={`mb-3 text-md text-muted tracking-wide ${textDim}`}>
            {eyebrow}
          </p>
          <h2
            className="font-medium tracking-[-0.02em]
                text-[clamp(2.25rem,6vw,4.25rem)]
                leading-[0.95]"
          >
            {title}
          </h2>
        </div>

        {/* Decisions */}
        <div className="space-y-12">
          {items.map((item, i) => (
            <div
              key={i}
              className="relative rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur"
            >
              <h3 className="text-xl font-medium mb-4">{item.title}</h3>

              <div className="grid md:grid-cols-2 gap-6 text-sm leading-relaxed">
                <div>
                  <p className="text-muted mb-1">Decision</p>
                  <p>{item.decision}</p>
                </div>

                <div>
                  <p className="text-muted mb-1">Trade-off</p>
                  <p>{item.tradeoff}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
