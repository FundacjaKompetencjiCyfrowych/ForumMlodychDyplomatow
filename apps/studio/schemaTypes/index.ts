import category from "./category";
import event from "./event";
import post from "./pages/post";
import region from "./region";
import author from "./author";
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

export const schemaTypes = [
  post,
  event,
  author,
  region,
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
];
