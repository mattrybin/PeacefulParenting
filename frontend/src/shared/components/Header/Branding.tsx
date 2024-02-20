import Link from "next/link";

export const HeaderBranding = () => (
  <Link
    href={"/"}
    className="font-semibold gap-[1px] flex text-lg transition hover:text-primary"
  >
    <span>PeacefulParenting</span>
    <span className="text-base-300">.ai</span>
  </Link>
);
