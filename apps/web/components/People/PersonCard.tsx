import type { InferFragmentType } from "groqd";
import type { personFragment } from "../../sanity/queries/person";
import { SanityImage } from "../../sanity/image/SanityImage";
import Typography from "../ui/typography";

export const PersonCard = ({ person }: { person: InferFragmentType<typeof personFragment> }) => {
  return (
    <div className="desktop:stretch flex w-full min-w-full flex-col items-center gap-4 desktop:min-w-0">
      <SanityImage
        image={person.img}
        className="aspect-square w-full max-w-100 object-cover desktop:max-w-74"
        sizes={{
          default: "400px",
          desktop: "300px",
        }}
      />
      <Typography variant="h5">{person.name}</Typography>
      <Typography variant="h6" className="text-gray-600">
        {person.title}
      </Typography>
    </div>
  );
};
