import { useAuth } from "../../contexts/UserContext";
import React from "react";

type Props = {};

const Dashboard = (props: Props) => {
  const {
    currentUser,
    setCurrentUser,
    signinUsingEmail,
    signinUsingOAuth,
    signupUsingEmail,
  } = useAuth();
  console.log(currentUser);

  return <div>page</div>;
};

export default Dashboard;
