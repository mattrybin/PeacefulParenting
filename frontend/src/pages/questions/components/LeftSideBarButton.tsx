import Link from "next/link";
import { Icons } from "shared/components/Icons";

export const LeftSideBarButton = ({
  name,
  iconWeight,
  iconVariant,
  href,
}: {
  name: any;
  iconWeight: any;
  iconVariant: any;
  href: any;
}) => (
  <div className="small:hidden desktop:block hover:bg-base-200 hover:cursor-pointer pr-6 p-2 text-xl first:mt-6">
    <Link className="flex items-center" href={href}>
      <Icons
        className="pr-2"
        weight={iconWeight}
        variant={iconVariant}
        size="8"
      />
      <span>{name}</span>
    </Link>
  </div>
);
