import graphql from "babel-plugin-relay/macro";
import { useState } from "react";
import { useMutation } from "react-relay";

const AddStoryMutation = graphql`
  mutation AddStoryMutation($title: String!) {
    addStory(title: $title) {
      ...StoryFragment
    }
  }
`;

const defaultStory = {
  title: "",
}
const AddStory = () => {
  const [commitMutation, inFlight] = useMutation(AddStoryMutation);
  const [story, setStory] = useState(defaultStory);

  const handleChange = (e: any, type: string) => {
    setStory((story) => {
      return { ...story, [type]: e.target.value };
    });
  };

  const handleClick = () => {
    commitMutation({
      variables: { ...story },
      onCompleted: (store) => {
        setStory(defaultStory)
      },
      updater: (store) => {
        const payload = store.getRootField('addStory');
        if (!payload) {
          console.error("No payload returned from mutation");
          return;
        }
        // payload here is the added story itself
        const newStory = payload;
        const root = store.getRoot();
        const stories = root.getLinkedRecords('stories') || [];
        const newStorys = [...stories, newStory];
        root.setLinkedRecords(newStorys, 'stories');
      },
    })
  };

  return (
    <div>
      <div>
        {`Title: `}
        <input
          type="text"
          value={story.title}
          onChange={(e) => handleChange(e, "title")}
        />
      </div>
      <button onClick={handleClick}>Submit</button>
    </div>
  );
};

export default AddStory;
