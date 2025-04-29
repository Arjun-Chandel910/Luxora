import React, { useState } from "react";
import FlashContext from "./FlashContext";
const FlashState = ({ children }) => {
  const [flash, setFlash] = useState({ type: "", message: "" });
  const showFlash = ({ success, message }) => {
    if (success == success) {
      //green
      setFlash({ type: "success", message });
    } else if (success == "normal") {
      //yellow
      setFlash({ type: "normal", message });
    } else {
      //red
      setFlash({ type: "error", message });
    }

    setTimeout(() => {
      setFlash({ type: "", message: "" });
    }, 3000);
  };

  return (
    <FlashContext.Provider value={{ showFlash, flash }}>
      {children}
    </FlashContext.Provider>
  );
};

export default FlashState;
