import { Story } from "../entity/Story";
import { Comment } from "../entity/Comment";
import { formatComment, formatStory } from "./resolvers";

export const addStoryMutation = async (_, { title }) => {
  try {
    const story = new Story();
    story.title = title;
    return await story.save();
  } catch (error) {
    console.log(error);
  }
};

export const addCommentMutation = async (_, { storyId, content }) => {
  try {
    const comment = new Comment();
    comment.content = content;
    const story = await Story.createQueryBuilder("story")
      .where(`story.id = :storyId`, { storyId })
      .getOne();
    comment.story = story;
    await comment.save();

    return {
      commentEdge: formatComment(comment)
    }
  } catch (error) {
    console.log(error);
  }
};