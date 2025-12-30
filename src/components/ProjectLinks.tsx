type Props = {
  liveUrl: string;
  githubUrl: string;
};

export function ProjectLinks({ liveUrl, githubUrl }: Props) {
  if (!liveUrl && !githubUrl) return null;

  return (
    <div className="mt-6 flex gap-4">
      {liveUrl && (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex text-nowrap items-center gap-2 rounded-md border border-white/20 px-4 text-xm hover:border-primary transition"
        >
          Live website ↗
        </a>
      )}

      {githubUrl && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex text-nowrap items-center gap-2 rounded-md border border-white/10 px-4 py-2 text-sm text-white/70 hover:text-white hover:border-white/30 transition"
        >
          Source code
        </a>
      )}
    </div>
  );
}
