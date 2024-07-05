import { useEffect, useRef } from "react";

export function useClickOutside(actionFunction, listeningCapturing = true) {
  const modelRef = useRef();
  useEffect(
    function () {
      function handleCLickOutside(e) {
        if (modelRef.current && !modelRef.current.contains(e.target)) {
          // console.log("clicked outside");

          actionFunction?.();
        }
      }
      document.addEventListener(
        "click",
        handleCLickOutside,
        listeningCapturing
      );
      return () =>
        document.removeEventListener(
          "click",
          handleCLickOutside,
          listeningCapturing
        );
    },
    [actionFunction]
  );
  return modelRef;
}
