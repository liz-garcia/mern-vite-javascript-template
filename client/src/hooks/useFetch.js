// * useFetch hook designed by HackYourFuture
// * HYF final-project-template: https://github.com/HackYourFuture/final-project-template
// Slight modifications done to make it work with Vite.
// Also modified the use of AbortController for scenarios where Double Rendering of Effects make take place. This bug was identified with React.StrictMode on main.jsx.

/**
 * Our useFetch hook should be used for all communication with the server.
 *
 * route - This is the route you want to access on the server. It should NOT include the /api part, so should be /user or /user/{id}
 * onReceived - a function that will be called with the response of the server. Will only be called if everything went well!
 *
 * Our hook will give you an object with the properties:
 *
 * -----> isLoading - true if the fetch is still in progress
 * -----> error - will contain an Error object if something went wrong
 * -----> performFetch - this function will trigger the fetching. It is up to the user of the hook to determine when to do this!
 * -----> cancelFetch - this function will cancel the fetch, call it when your component is unmounted
 */

import { useState, useEffect, useRef } from "react";

const useFetch = (route, onReceived) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  if (route.includes("api/")) {
    // We add this check here to provide a better error message if you accidentally add the api part
    // As an error that happens later because of this can be very confusing!
    throw Error(
      "When using the useFetch hook, the route should not include the /api/ part"
    );
  }

  // * We will store the AbortController in a ref so that it persists across renders
  const controllerRef = useRef(null);

  const performFetch = (options) => {
    setError(null);
    setIsLoading(true);

    // * Create a new AbortController for each fetch
    // * We use the AbortController which is supported by all modern browsers to handle cancellations.
    // For more info: https://developer.mozilla.org/en-US/docs/Web/API/AbortController
    const controller = new AbortController();
    controllerRef.current = controller;
    const signal = controller.signal;

    const baseOptions = {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    };

    // * Import VITE_BASE_URL
    const baseURL = import.meta.env.VITE_BASE_URL;

    // * We add the /api subsection here to make it a single point of change if our configuration changes
    const url = `${baseURL}/api${route}`;

    const fetchData = async () => {
      try {
        const res = await fetch(url, { ...baseOptions, ...options, signal });

        if (!res.ok) {
          throw new Error(
            `Fetch for ${url} returned an invalid status (${
              res.status
            }). Received: ${JSON.stringify(res)}`
          );
        }

        const jsonResult = await res.json();

        if (jsonResult.success === true) {
          onReceived(jsonResult);
        } else {
          throw new Error(
            jsonResult.msg ||
              `The result from our API did not have an error message. Received: ${JSON.stringify(jsonResult)}`
          );
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  };

  const cancelFetch = () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return cancelFetch;
  }, []);

  return { isLoading, error, performFetch, cancelFetch };
};

export default useFetch;
