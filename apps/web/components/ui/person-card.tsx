import { SanityImage } from "@/sanity/image/SanityImage";
import Typography from "./typography";
import type { PersonCard as PersonCardType } from "../../sanity/queries/person";

export const PersonCard = ({ person }: { person: PersonCardType }) => {
  return (
    <div className="desktop:stretch flex w-full min-w-full flex-col items-center gap-4 rounded-sm bg-white desktop:min-w-0">
      <SanityImage
        image={person.img}
        className="aspect-square w-full max-w-100 object-cover desktop:max-w-74"
        sizes={{
          default: "400px",
          desktop: "300px",
        }}
      />
      <Typography variant="body-xl">{person.name}</Typography>
      <Typography variant="body-m" className="text-center whitespace-break-spaces text-gray-600">
        {person.title}
      </Typography>
      {/* TO DO Social Icons at person.socials[] */}
    </div>
  );
};

export default PersonCard;
