import graphql from "babel-plugin-relay/macro";
import { useState } from "react";
import { useMutation } from "react-relay";

const AddUserMutation = graphql`
  mutation AddUserMutation($firstName: String!) {
    addUser(firstName: $firstName) {
      ...UserFragment
    }
  }
`;

const AddUser = () => {
  const [commitMutation, inFlight] = useMutation(AddUserMutation);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "blah not used",
    email: "blah not used",
  });

  const handleChange = (e: any, type: string) => {
    setUser((user) => {
      return { ...user, [type]: e.target.value };
    });
  };

  const handleClick = () => {
    console.log(JSON.stringify(user));
    commitMutation({
      variables: { ...user },
      onCompleted: (store) => {
        console.log(store)
      },
      updater: (store) => {
        const payload = store.getRootField('addUser');
        if (!payload) {
          console.error("No payload returned from mutation");
          return;
        }
        // payload here is the added user itself
        const newUser = payload;
  
        const root = store.getRoot();
        const users = root.getLinkedRecords('users') || [];

        debugger
        // try to get users.id and more from fragement
        
        const newUsers = [...users, newUser];
        root.setLinkedRecords(newUsers, 'users');
      },
    })
  };

  return (
    <div>
      <div>
        {`First Name: `}
        <input
          type="text"
          value={user.firstName}
          onChange={(e) => handleChange(e, "firstName")}
        />
      </div>
      <div>
        {`Last Name: `}
        <input
          type="text"
          value={user.lastName}
          onChange={(e) => handleChange(e, "lastName")}
        />
      </div>
      <div>
        {`Eamil: `}
        <input
          type="text"
          value={user.email}
          onChange={(e) => handleChange(e, "email")}
        />
      </div>
      <button onClick={handleClick}>Submit</button>
    </div>
  );
};

export default AddUser;
