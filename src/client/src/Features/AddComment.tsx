import graphql from "babel-plugin-relay/macro";
import { useMutation } from "react-relay";
import { useState } from "react";

const AddCommentMutation = graphql`
  mutation AddCommentMutation($storyId: ID!, $content: String!) {
    addComment(storyId: $storyId, content: $content) {
      commentEdge {
        node {
          id
          content
        }
        cursor
      }
    }
  }
`;

const AddComment = ({ storyId }: { storyId: string }) => {
  const [commitMutation, inFlight] = useMutation(AddCommentMutation);
  const [content, setContent] = useState("");

  const handleClick = () => {
    commitMutation({
      variables: {
        storyId,
        content
      },
      onCompleted: (store) => {setContent("")},
      updater: store => {
        const payload = store.getRootField('addComment');
        const newCommentEdge = payload!.getLinkedRecord('commentEdge');
        const storyProxy = store.get(storyId);
        
        const commentsConnection = storyProxy!.getLinkedRecord('comments');
        const edges = commentsConnection!.getLinkedRecords('edges') || [];
  
        const newEdges = [...edges, newCommentEdge];
        commentsConnection!.setLinkedRecords(newEdges, 'edges');
      },
    })
  }

  return (
    <div>
    <input
      type="text"
      value={content}
      onChange={(e) => setContent(e.target.value)}
    />
    <button onClick={handleClick}>Submit</button>
    </div>
  );
};

export default AddComment;