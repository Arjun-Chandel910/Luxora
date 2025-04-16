import React, { useContext } from "react";
import FlashContext from "../../context/FlashContext";

const FlashMsg = () => {
  const { flash } = useContext(FlashContext);

  console.log(flash.type);
  if (!flash.type) return null;
  return (
    <div className="w-full text-center py-2">
      {flash.type === "success" ? (
        <div className="border-1 border-green-500 w-1/3 mx-auto py-2 px-4 rounded-md shadow-md mb-4">
          {flash.message}
        </div>
      ) : (
        <div className="border-1 border-rose-500 w-1/3 mx-auto py-2 px-4 rounded-md shadow-md mb-4">
          {flash.message}
        </div>
      )}
    </div>
  );
};

export default FlashMsg;
