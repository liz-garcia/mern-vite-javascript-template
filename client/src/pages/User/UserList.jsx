import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

import useFetch from "../../hooks/useFetch.js";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/user",
    (response) => {
      setUsers(response.result);
      setIsLoaded(true);
    }
  );

  useEffect(() => {
    performFetch();

    return cancelFetch;

    // TODO Add explanation for the following:
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let content = null;

  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (error) {
    content = <div>Error: {error.toString()}</div>;
  } else if (
    !isLoading &&
    isLoaded &&
    Array.isArray(users) &&
    users.length === 0
  ) {
    content = <div>No users found.</div>;
  } else if (users.length > 0) {
    content = (
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    );
  } else {
    content = <div>Loading...</div>;
  }

  return (
    <>
      <h1>These are the users</h1>
      <div>{content}</div>
      {/* <Link to="/user/create">
          <button>Create new user</button>
        </Link> */}
    </>
  );
};

export default UserList;
