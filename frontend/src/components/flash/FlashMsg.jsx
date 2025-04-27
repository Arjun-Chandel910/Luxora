import React, { useContext } from "react";
import FlashContext from "../../context/FlashContext";

const FlashMsg = () => {
  const { flash } = useContext(FlashContext);

  if (!flash.type) return null;
  return (
    <div className="w-full text-center">
      {flash.type === "success" ? (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-[1000] bg-green-500 text-white font-bold  w-1/3 py-3 px-5 rounded-md shadow-lg">
          ✓ {flash.message}
        </div>
      ) : (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-[1000] bg-rose-500 text-white font-bold w-1/3  py-3 px-5 rounded-md shadow-lg">
          ! {flash.message}
        </div>
      )}
    </div>
  );
};

export default FlashMsg;
