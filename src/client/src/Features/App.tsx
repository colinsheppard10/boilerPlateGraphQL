import { Suspense, useState } from "react";
import graphql from "babel-plugin-relay/macro";
import { useLazyLoadQuery } from "react-relay";
import { AppQuery as AppQueryType } from "./__generated__/AppQuery.graphql";
import Story from "./Story";
import AddStory from "./AddStory";

const AppQuery = graphql`
  query AppQuery {
    stories {
      id
      ...StoryFragment
    }
  }
`;

function App() {
  const data = useLazyLoadQuery<AppQueryType>(AppQuery, {});
  const stories = data.stories;

  const [activeStoryId, setActiveStoryId] = useState("");

  return (
    <Suspense fallback={<div>loading...</div>}>
      <ul>
        {stories.map((s) => {
          return (
            <Story
              key={s.id}
              story={s}
              activeStoryId={activeStoryId}
              setActiveStoryId={setActiveStoryId}
            />
          );
        })}
      </ul>
      <AddStory />
    </Suspense>
  );
}

export default App;
