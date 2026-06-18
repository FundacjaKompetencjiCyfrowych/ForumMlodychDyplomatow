import { DeepGet } from "@/lib/types";
import { SanityImage } from "@/sanity/image/SanityImage";
import { PageBuilderSectionProps } from "@/sanity/queries/pageBuilder";
import Typography from "./typography";

type Person = DeepGet<PageBuilderSectionProps<"peopleSection">, "data.people.members">;

const PersonCard = ({ person }: { person: Person }) => {
  // w
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
      <Typography variant="h5">{person.name}</Typography>
      {/* Because of Maciek's new version of personSchema, I need to change it accordingly after merging it together. */}
      {/* <Typography variant="h6" className="text-gray-600">
        {person.title}
      </Typography> */}
      {/* TO DO Social Icons at person.socials[] */}
    </div>
  );
};

export default PersonCard;
