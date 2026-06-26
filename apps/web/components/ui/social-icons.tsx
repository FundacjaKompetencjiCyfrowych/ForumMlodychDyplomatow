import type { InferFragmentType } from "groqd";
import React from "react";
import {
  BsFacebook,
  BsInstagram,
  BsLinkedin,
  BsSpotify,
  BsTwitterX,
  BsYoutube,
} from "react-icons/bs";
import type { socialsFragment } from "../../sanity/queries/socialsFragment";
type Socials = Array<InferFragmentType<typeof socialsFragment>> | null | undefined;
type Props = {
  socials: Socials;
};
const icons = {
  facebook: <BsFacebook />,
  instagram: <BsInstagram />,
  linkedin: <BsLinkedin />,
  spotify: <BsSpotify />,
  twitter: <BsTwitterX />,
  youtube: <BsYoutube />,
} satisfies Record<Exclude<NonNullable<Socials>[number]["platform"], null>, React.ReactNode>;
export const SocialIcons = ({ socials }: Props) => {
  if (socials == null || socials.length === 0) return null;
  return (
    <div className="flex h-16 flex-row gap-1 text-[1.5rem] text-brand-red-900">
      {socials.map((social) => {
        if (social.platform === null || social.url === null) return null;
        const Icon = icons[social.platform];
        if (!Icon) return null;
        return (
          <a key={social.platform} href={social.url} target="_blank" rel="noopener noreferrer">
            {Icon}
          </a>
        );
      })}
    </div>
  );
};

export default SocialIcons;
