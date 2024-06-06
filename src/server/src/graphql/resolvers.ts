import { Story } from "../entity/Story";

export const formatComment = (comment) => ({
  node: comment,
  cursor: "okCursor",
});

export const formatStory = (story) => ({
  ...story,
  comments: {
    pageInfo: "okPageInfo",
    edges: story.comments.map((c) => formatComment(c)),
  },
});

export const storiesResolver = async () => {
  const rawStories = await Story.createQueryBuilder("story")
    .leftJoinAndSelect("story.comments", "comments")
    .getMany();

  return rawStories.map((story) => formatStory(story));
};
