import Link from "next/link";
import Image from "next/image";

export default function HeaderLogo() {
  return (
    <Link href="/" className="fixed left-7 top-6 z-999">
      <Image
        src={"images/logo/vv-logo_1.svg"}
        alt="Logo"
        width={40}
        height={40}
        priority
        className="hover cursor-pointer"
      />
    </Link>
  );
}
