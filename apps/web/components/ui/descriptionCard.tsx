import { SanityImage } from "../../sanity/image/SanityImage";
import type { ImgFragment } from "../../sanity/queries/imgFragment";
import Typography from "./typography";

type Props = {
  icon: ImgFragment | null;
  text: string | null;
};

export const DescriptionCard = ({ icon, text }: Props) => {
  return (
    <div className="flex w-full flex-col items-center gap-6 rounded-[8px] border border-blue-800 px-4 py-6">
      {/* TODO change this to some other icon component, this doesn't work with setting the color. Might need a separate icon schema */}
      {icon && <SanityImage image={icon} className="h-18 w-18" />}
      {text && (
        <Typography as="p" variant="h5" className="w-full text-center">
          {text}
        </Typography>
      )}
    </div>
  );
};
