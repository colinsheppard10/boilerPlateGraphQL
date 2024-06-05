import { Suspense, useState } from "react";
import User from "./User";
import graphql from "babel-plugin-relay/macro";
import { useLazyLoadQuery } from "react-relay";
import { AppQuery as AppQueryType } from "./__generated__/AppQuery.graphql";
import AddUser from "./AddUser";

const AppQuery = graphql`
  query AppQuery {
    users {
      id
      ...UserFragment
    }
  }
`;

function App() {
  const data = useLazyLoadQuery<AppQueryType>(AppQuery, {});
  const users = data.users;

  return (
    <Suspense fallback={<div>loading...</div>}>
      <ul>
        {users.map((u) => {
          return <User key={u.id} user={u} />;
        })}
      </ul>
      <AddUser />
    </Suspense>
  );
}

export default App;
