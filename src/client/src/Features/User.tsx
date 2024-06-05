import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import { UserFragment$key } from "./__generated__/UserFragment.graphql";

const UserFragement = graphql`
  fragment UserFragment on User {
    id
    firstName
    lastName
    email
    admin
  }
`;


type Props = {
  user: UserFragment$key;
};

function User({user}: Props) {
  const data = useFragment(
    UserFragement,
    user,
  );
  const {firstName, lastName} = data
  return <li>{`${firstName} ${lastName}`}</li>
}

export default User;
