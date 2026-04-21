export const sectionTypes = ["leadSection", "postsSection"] as const;
export const sections = sectionTypes.map((type) => ({ type }));
