"use client";
import { useState, useEffect } from "react";

export const MyComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/v1/questions")
      .then((response) => {
        // Check if the response is successful, if so return the response's json
        if (response.ok) {
          return response.json();
        } else {
          throw Error(`Request rejected with status ${response.status}`);
        }
      })
      .then((result) => setData(result))
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []); // The empty array as dependency means this effect runs once after initial render

  return <div>{data ? JSON.stringify(data) : "Loading..."}</div>;
};
