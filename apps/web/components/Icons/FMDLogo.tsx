import React from "react";
import { Typography } from "../ui/typography";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

type LogoIconProps = {
  size: "s" | "m" | "l";
  className?: string;
};

const iconStyles = cva("", {
  variants: {
    size: {
      s: "h-4! w-2.75!",
      m: "h-6! w-4.25!",
      l: `h-8! w-5.75!`,
    },
  },
});

export const FMDLogoIcon = ({ size = "m", className }: LogoIconProps) => {
  return (
    <svg
      className={cn(iconStyles({ size, className }))}
      viewBox="0 0 23 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.3841 10.4318C22.6122 10.2121 23 10.369 23 10.681V32H7.35219e-05L22.3841 10.4318Z"
        fill="#61151A"
      />
      <path
        d="M0.615718 10.4308C0.387585 10.2113 0 10.3682 0 10.6802V30.8542L10.8979 20.3252L0.615718 10.4308Z"
        fill="#1B3153"
      />
      <path
        d="M19.2525 7.01971C19.2525 10.8966 16.0166 14.0394 12.025 14.0394C8.03337 14.0394 4.79751 10.8966 4.79751 7.01971C4.79751 3.14283 8.03337 0 12.025 0C16.0166 0 19.2525 3.14283 19.2525 7.01971Z"
        fill="#61151A"
      />
    </svg>
  );
};
type LogoProps = {
  size?: "s" | "m";
};

export const FMDLogo = ({ size = "m" }: LogoProps) => {
  return (
    <div className="flex items-baseline gap-1">
      <FMDLogoIcon size={size} />
      <Typography variant={`logo-${size}`} as="span">
        Forum Młodych Dyplomatów
      </Typography>
    </div>
  );
};
