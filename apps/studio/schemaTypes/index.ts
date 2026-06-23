import category from "./category";
import event from "./event";
import post from "./pages/post";
import person from "./person";
import home from "./pages/home";
import settings from "./settings";
import seo from "./seo";
import img from "./img";
import richText from "./richText";
import leadSection from "./sections/leadSection";
import postsSection from "./sections/postsSection";
import { link, linkButton } from "./link";
import { pageBuilder } from "./pageBuilderType";
import { page } from "./pages/page";
import navigation from "./singletons/navigation";
import { sectionStructure } from "./sections/sections";
import division from "./division";
import publications from "./publications";
import tag from "./tag";
import tagCategory from "./tagCategory";
import { footer } from "./singletons/footer";
import { translations } from "./singletons/translations";
import { personGroup } from "./personGroup";
import { socials } from "./socials";

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
  footer,
  socials,
  // sections defined separately
  ...sectionStructure,
  translations,
];
