import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import { CommentFragment$key } from "./__generated__/CommentFragment.graphql";

const CommentFragment = graphql`
  fragment CommentFragment on Comment {
    content
  }
`;

type Props = {
  comment: CommentFragment$key;
};

const Comment = ({ comment }: Props) => {
  const data = useFragment<CommentFragment$key>(CommentFragment, comment);
  return <div>{data.content}</div>;
};

export default Comment;
