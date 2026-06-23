import { q } from "../groqd";
import { Socials } from "../typegen";

export const socialsFragment = q.fragment<Socials[number]>().project((sub) => ({
  _key: true,
  platform: sub.field("platform"),
  url: true,
}));
