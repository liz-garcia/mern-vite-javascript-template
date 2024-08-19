import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

import useFetch from "../../hooks/useFetch.js";

const UserList = () => {
  const [users, setUsers] = useState(null);
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/user",
    (response) => {
      setUsers(response.result);
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
    content = <div>loading...</div>;
  } else if (error != null) {
    content = <div>Error: {error.toString()}</div>;
  } else {
    content = (
      <>
        <h1>These are the users</h1>
        <ul data-loaded={users != null}>
          {users &&
            users.map((user) => {
              return (
                <li key={user._id} data-element-id={user._id}>
                  {user.name} ({user.email})
                </li>
              );
            })}
        </ul>
        {/* <Link to="/user/create">
          <button>Create new user</button>
        </Link> */}
      </>
    );
  }

  return <div>{content}</div>;
};

export default UserList;
