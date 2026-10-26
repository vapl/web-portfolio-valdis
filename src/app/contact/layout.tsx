import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Valdis Vascenkovs about internal tools, business automation, data integrations and web application development.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
