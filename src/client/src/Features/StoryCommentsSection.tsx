import graphql from "babel-plugin-relay/macro";
import * as React from "react";
import { useFragment } from "react-relay";
import type { StoryCommentsSectionFragment$key } from "./__generated__/StoryCommentsSectionFragment.graphql";
import Comment from "./Comment";

export type Props = {
  story: StoryCommentsSectionFragment$key;
};

const StoryCommentsSectionFragment = graphql`
  fragment StoryCommentsSectionFragment on Story {
    comments {
      pageInfo
      edges {
        node {
          id
          ...CommentFragment
        }
      }
    }
  }
`;

const StoryCommentsSection = ({ story }: Props) => {
  const data = useFragment<StoryCommentsSectionFragment$key>(
    StoryCommentsSectionFragment,
    story
  );
  return (
    <div>
      {data?.comments?.edges?.map((edge: any) => {
        return <Comment key={edge?.node.id} comment={edge.node} />
      })}
    </div>
  );
};

export default StoryCommentsSection;
