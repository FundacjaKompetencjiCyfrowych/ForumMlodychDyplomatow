import { breadcrumbs } from "./breadcrumbs";
import category from "./category";
import division from "./division";
import event from "./event";
import { img, gradientImg } from "./img";
import { link, linkButton } from "./link";
import { pageBuilder } from "./pageBuilderType";
import { page } from "./pages/page";
import person from "./person";
import { personGroup } from "./personGroup";
import publications from "./publications";
import publicationType from "./publicationType";
import richText from "./richText";
import leadSection from "./sections/leadSection";
import postsSection from "./sections/postsSection";
import { sectionStructure } from "./sections/sections";
import seo from "./seo";
import settings from "./settings";
import navigation from "./singletons/navigation";
import { translations } from "./singletons/translations";
import { socials } from "./socials";
import tag from "./tag";
import tagCategory from "./tagCategory";

export const schemaTypes = [
  event,
  person,
  personGroup,
  division,
  publications,
  tag,
  tagCategory,
  category,
  settings,
  seo,
  richText,
  img,
  gradientImg,
  leadSection,
  postsSection,
  link,
  linkButton,
  pageBuilder,
  page,
  navigation,
  socials,
  publicationType,
  breadcrumbs,
  // sections defined separately
  ...sectionStructure,
  translations,
];
