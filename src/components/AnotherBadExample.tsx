// This component demonstrates code issues that Husky pre-commit hooks would catch

import React from "react";

// Missing interface/type definitions - TypeScript would complain
const AnotherBadExample = (props) => {
  // Unused variables - linter would catch this

  // Console.log statements - should be removed before commit
  console.log("Debug info:", props);
  console.error("This should not be in production");

  // Inconsistent spacing and formatting - Prettier would fix this
  const handleClick = () => {
    alert("clicked");
  };

  // Missing dependency in useEffect (if we had one)
  React.useEffect(() => {
    // This would trigger ESLint exhaustive-deps warning
    document.title = props.title;
  }, [props.title]); // Missing props.title dependency

  // Inline styles instead of CSS classes - code review would catch this
  const badStyling = {
    color: "red",
    fontSize: "20px",
    marginTop: "10px",
  };

  // Missing accessibility attributes
  return (
    <div style={badStyling}>
      <h2>Bad Code Example</h2>
      <button onClick={handleClick}>Click me</button>
      <img src={props.imageUrl} />
      <input type="text" placeholder="Enter something" />
      {/* TODO: Fix this later - comments like this should be addressed */}
      <div>
        {props.data.map((item) => (
          <span>{item}</span>
        ))}
      </div>
    </div>
  );
};

export default AnotherBadExample;
