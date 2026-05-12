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
import publications from "./publications";
import tag from "./tag";
import tagCategory from "./tagCategory";

export const schemaTypes = [
  post,
  event,
  author,
  publications,
  tag,
  tagCategory,
  region,
  category,
  settings,
  home,
  seo,
  richText,
  img,
  leadSection,
  postsSection,
];
