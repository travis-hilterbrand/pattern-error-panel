import { useState } from "react";

export const Panel2 = () => {
  const [hasError, setHasError] = useState(false);
  if (hasError) {
    throw new Error("GlobalError");
  }

  return (
    <div
      style={{
        background: "teal",
        color: "white",
        padding: 8,
        textAlign: "center",
      }}
    >
      Panel 2
      <hr />
      <button onClick={() => setHasError(true)}>Trigger global error</button>
    </div>
  );
};
