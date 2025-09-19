// This file was fixed by following Husky's requirements

import React from "react";

interface Props {
  name: string;
  age: number;
}

const BadCodeExample = (props: Props) => {
  const { name, age } = props;

  return (
    <div className="p-4 border rounded">
      <h2 style={{ color: "red", fontSize: "18px" }}>Fixed Code Example</h2>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
    </div>
  );
};

export default BadCodeExample;
