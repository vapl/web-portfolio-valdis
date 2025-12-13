import Link from "next/link";
import { motion } from "framer-motion";

type ProjectLink = {
  slug: string;
  title: string;
};

type Props = {
  prev?: ProjectLink;
  next?: ProjectLink;
};

export function ProjectPagination({ prev, next }: Props) {
  return (
    <div className="flex mt-16 mb-32 items-center justify-between gap-8 border-t border-white/10 pt-12">
      {prev ? (
        <motion.div initial="rest" whileHover="hover" animate="rest">
          <Link
            href={`/projects/${prev.slug}`}
            className="group flex flex-col gap-2 items-start"
          >
            <span className="text-sm text-white/40">Previous project</span>
            <motion.span
              variants={{
                rest: { x: 0 },
                hover: { x: -4 },
              }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="text-lg font-medium group-hover:underline"
            >
              ← {prev.title}
            </motion.span>
          </Link>
        </motion.div>
      ) : (
        <div />
      )}

      {next ? (
        <motion.div initial="rest" whileHover="hover" animate="rest">
          <Link
            href={`/projects/${next.slug}`}
            className="group flex flex-col gap-2 items-end"
          >
            <span className="text-sm text-white/40">Next project</span>
            <motion.span
              variants={{
                rest: { x: 0 },
                hover: { x: 4 },
              }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="text-lg font-medium group-hover:underline"
            >
              {next.title} →
            </motion.span>
          </Link>
        </motion.div>
      ) : (
        <div />
      )}
    </div>
  );
}
