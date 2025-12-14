import {
  RiNextjsFill,
  RiReactjsFill,
  RiNodejsFill,
  RiTailwindCssFill,
} from "react-icons/ri";
import {
  SiTypescript,
  SiPostgresql,
  SiSanity,
  SiMdx,
  SiVercel,
  SiFigma,
} from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb";
import { FaGitAlt } from "react-icons/fa";
import { DiMsqlServer } from "react-icons/di";

type ToolboxGroup = {
  title: string;
  items: { label: string; icon: React.ReactNode }[];
};

const TOOLBOX: ToolboxGroup[] = [
  {
    title: "Frontend",
    items: [
      { label: "Next.js", icon: <RiNextjsFill /> },
      { label: "React", icon: <RiReactjsFill /> },
      { label: "TypeScript", icon: <SiTypescript /> },
      { label: "Tailwind CSS", icon: <RiTailwindCssFill /> },
      { label: "Framer Motion", icon: <TbBrandFramerMotion /> },
    ],
  },
  {
    title: "Backend & Data",
    items: [
      { label: "Node.js", icon: <RiNodejsFill /> },
      { label: "PostgreSQL", icon: <SiPostgresql /> },
      { label: "SQL Server", icon: <DiMsqlServer /> },
    ],
  },
  {
    title: "Content & CMS",
    items: [
      { label: "Sanity CMS", icon: <SiSanity /> },
      { label: "MDX", icon: <SiMdx /> },
    ],
  },
  {
    title: "Tooling",
    items: [
      { label: "Git", icon: <FaGitAlt /> },
      { label: "Vercel", icon: <SiVercel /> },
      { label: "Figma", icon: <SiFigma /> },
    ],
  },
];

export default function Toolbox() {
  return (
    <div className="grid gap-12 md:grid-cols-2 xl:grid-cols-4">
      {TOOLBOX.map((group) => (
        <div key={group.title}>
          <h3 className="mb-4 text-sm uppercase tracking-wider text-white/40">
            {group.title}
          </h3>

          <ul className="flex flex-wrap gap-2">
            {group.items.map((item) => (
              <li
                key={item.label}
                className="
                    inline-flex items-center gap-2
                    rounded-md border border-white/10
                    px-6 py-2 text-[clamp(1.5rem,2vw,3rem)]
                    text-white/70 transition hover:border-primary/40 hover:text-white
                  "
              >
                <span className="opacity-60 group-hover:opacity-100 transition">
                  {item.icon}
                </span>
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
