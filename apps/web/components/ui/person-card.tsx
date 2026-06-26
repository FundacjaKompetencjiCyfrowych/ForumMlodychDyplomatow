import { SanityImage } from "@/sanity/image/SanityImage";
import Typography from "./typography";
import type { PersonCard as PersonCardType } from "../../sanity/queries/person";
import SocialIcons from "./social-icons";

export const PersonCard = ({ person }: { person: PersonCardType }) => {
  return (
    <div className="desktop:stretch flex w-full min-w-full flex-col items-center rounded-sm bg-white desktop:w-60">
      <SanityImage
        image={person.img}
        className="aspect-square w-full max-w-60 object-cover"
        sizes={{
          default: "400px",
          desktop: "300px",
        }}
      />
      <div className="flex flex-col items-center gap-6 p-6">
        <div className="flex flex-col gap-4 text-gray-900">
          <Typography variant="body-xl" className="text-center">
            {person.name}
          </Typography>
          <Typography variant="body-m" className="text-center whitespace-break-spaces">
            {person.title}
          </Typography>
        </div>
        <SocialIcons socials={person.socials} />
      </div>
    </div>
  );
};

export default PersonCard;
