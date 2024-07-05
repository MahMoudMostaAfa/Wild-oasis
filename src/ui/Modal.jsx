import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import { useClickOutside } from "../hooks/useClickOutside";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  position: absolute;
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

const ModelContext = createContext();

// function Model({ children }) {
//   const [openName, setOpenName] = useState("");
//   const close = () => setOpenName("");
//   const open = setOpenName;
// }

// function Open({ children, opens }) {}
// function Window({ children, name, onCloseModel }) {
//   return createPortal(
//     <Overlay>
//       <StyledModal>
//         <Button onClick={() => onCloseModel(false)}>
//           <HiXMark />
//         </Button>
//         <div>{children}</div>
//       </StyledModal>
//     </Overlay>,
//     document.body
//   );
// }

function Model({ children }) {
  const [openName, setOpenName] = useState("");

  const closeModel = () => setOpenName("");
  const openModel = setOpenName;
  return (
    <ModelContext.Provider value={{ openName, openModel, closeModel }}>
      {children}
    </ModelContext.Provider>
  );
}
function Open({ children, opens: opensName }) {
  const { openModel } = useContext(ModelContext);

  return cloneElement(children, { onClick: () => openModel(opensName) });
}
function Window({ children, name }) {
  const { openName, closeModel } = useContext(ModelContext);

  // useEffect(
  //   function () {
  //     function handleCLickOutside(e) {
  //       if (modelRef.current && !modelRef.current.contains(e.target)) {
  //         console.log("clicked outside");

  //         closeModel();
  //       }
  //     }
  //     document.addEventListener("click", handleCLickOutside, true);
  //     return () =>
  //       document.removeEventListener("click", handleCLickOutside, true);
  //   },
  //   [closeModel]
  // );
  // element , actionFunction
  const modelRef = useClickOutside(closeModel);
  if (name !== openName) return null;
  return createPortal(
    <Overlay>
      <StyledModal ref={modelRef}>
        <Button onClick={() => closeModel("")}>
          <HiXMark />
        </Button>
        <div>{cloneElement(children, { onCloseModel: closeModel })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}
Model.Open = Open;
Model.Window = Window;

export default Model;
