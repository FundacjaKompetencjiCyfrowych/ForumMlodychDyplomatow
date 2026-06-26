"use client";

import { usePathname } from "next/navigation";
import { Link, type LinkProps } from "../ui/link";

export const HeaderTopLink = (props: LinkProps) => {
  const pathname = usePathname();

  return <Link {...props} currentPathname={pathname} />;
};
