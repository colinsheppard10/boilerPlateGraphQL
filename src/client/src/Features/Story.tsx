import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import { StoryFragment$key } from "./__generated__/StoryFragment.graphql";
import Comment from "./Comment";
import {
  CommentFragement$data,
  CommentFragement$key,
} from "./__generated__/CommentFragement.graphql";
import AddComment from "./AddComment";
import StoryCommentsSection from "./StoryCommentsSection";

const StoryFragement = graphql`
  fragment StoryFragment on Story {
    id
    title
    ...StoryCommentsSectionFragment
  }
`;

type Props = {
  story: StoryFragment$key;
  activeStoryId: string;
  setActiveStoryId: (a: string) => void;
};

const Story = ({ story, activeStoryId, setActiveStoryId }: Props) => {
  const data = useFragment(StoryFragement, story);
  const { id, title } = data;
  return (
    <li onClick={() => setActiveStoryId(id)}>
      <div>{`${title}`}</div>
      {id === activeStoryId && (
        <ul>
          <StoryCommentsSection story={data} />
          <AddComment storyId={id} />
        </ul>
      )}
    </li>
  );
};

export default Story;
