import { Profile } from "./Profile";
import { v4 as uuid } from "uuid";
import React, { useEffect, useCallback } from "react";

let profiles = [
  {
    id: 1,
    name: "Jon Doe",
    title: "Web Developer",
    rating: 4.5,
    skills: ["Javascript", "React", "Node.js"],
  },
];

export function ProfileContainer() {
  return (
    <div>
      {profiles.map((prd) => (
        <Profile
          key={uuid()}
          title={prd.title}
          rating={4.3}
          price={39}
          size={"XL"}
        />
      ))}
    </div>
  );
}
