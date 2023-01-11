import React from "react";
import ReactDOM from "react-dom";
import { Button } from "../../Buttons";

export const Modal = ({ open, children, onClose, obj }) => {
  if (!open) return null;

  return ReactDOM.createPortal(
    <>
      <div
        className="fixed inset-0 z-50 m-0 bg-gray-500/10 p-0 backdrop-blur-sm"
        onClick={onClose}
      >
        <div
          className="fixed top-0 left-1/2 z-50 m-0 mb-auto flex h-screen w-full -translate-x-1/2 translate-y-0 rounded-lg border-2 bg-white lg:top-1/2 lg:h-fit lg:w-[50rem] lg:-translate-y-1/2"
          onClick={(e) => e.stopPropagation()}
        >
          <Button absolute type={"LOGO_BUTTON"} clickFunc={onClose}>
            close
          </Button>
          {children}
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};
