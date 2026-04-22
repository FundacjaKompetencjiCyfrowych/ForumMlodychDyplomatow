import category from "./category";
import post from "./pages/post";
import author from "./author";
import home from "./pages/home";
import settings from "./settings";
import seo from "./seo";
import img from "./img";
import richText from "./richText";
import leadSection from "./sections/leadSection";
import postsSection from "./sections/postsSection";
import { link } from "./link";
import { pageBuilder } from "./pageBuilderType";
import { page } from "./pages/page";
import navigation from "./singletons/navigation";

export const schemaTypes = [
  post,
  author,
  category,
  settings,
  home,
  seo,
  richText,
  img,
  leadSection,
  postsSection,
  link,
  pageBuilder,
  page,
  navigation,
];
