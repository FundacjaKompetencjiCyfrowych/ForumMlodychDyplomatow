import category from "./category";
import division from "./division";
import event from "./event";
import img from "./img";
import { link, linkButton } from "./link";
import { pageBuilder } from "./pageBuilderType";
import home from "./pages/home";
import { page } from "./pages/page";
import post from "./pages/post";
import person from "./person";
import { personGroup } from "./personGroup";
import publications from "./publications";
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
  post,
  event,
  person,
  personGroup,
  division,
  publications,
  tag,
  tagCategory,
  category,
  settings,
  home,
  seo,
  richText,
  img,
  leadSection,
  postsSection,
  link,
  linkButton,
  pageBuilder,
  page,
  navigation,
  socials,
  // sections defined separately
  ...sectionStructure,
  translations,
];
