import { useEffect } from "react";

import s from "./dino.module.css";

const Dino = ({ dinoRef, move, dinoClass, setDinoClass }) => {
  const handlerKeyDown = (e) => {
    e.preventDefault();
    if (e.key === " " || e.code === "Space") {
      setDinoClass(true);
    }
    if (e.key === "Shift" || e.code === "ShiftLeft") {
      setDinoClass(true);
    }
  };

  useEffect(() => {
    if (dinoClass) {
      setTimeout(() => {
        setDinoClass(false);
      }, 300);
    }
    if (dinoRef.current) {
      dinoRef.current.focus();
    }
  }, [dinoClass, dinoRef, setDinoClass]);

  return (
    <div
      tabIndex="1"
      ref={dinoRef}
      onKeyDown={handlerKeyDown}
      className={dinoClass || !move ? `${s.dino} ${s.jump}` : `${s.dino}`}
    ></div>
  );
};

export default Dino;
