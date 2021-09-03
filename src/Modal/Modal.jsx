import React, { useEffect } from "react";
import s from "../Modal/Modal.module.css";

export default function Modal(props) {
  useEffect(() => {
    window.addEventListener("keydown", hendelKeyDown);
    return () => {
      window.removeEventListener("keydown", hendelKeyDown);
    };
  });

  const hendelKeyDown = (e) => {
    if (e.code === "Escape") {
      props.showModal();
    }
  };

  const hideModal = (e) => {
    if (e.currentTarget === e.target) {
      props.showModal();
    }
  };

  return (
    <div className={s.Overlay} onClick={hideModal}>
      <div className={s.Modal}>
        <img src={props.props} alt="" />
      </div>
    </div>
  );
}
