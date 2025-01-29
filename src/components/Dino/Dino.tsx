import { FC, KeyboardEvent, useEffect } from "react";

import s from "./dino.module.css";

interface IDinoProps {
  dinoRef: React.RefObject<HTMLDivElement>;
  move: boolean;
  dinoClass: boolean;
  setDinoClass: React.Dispatch<React.SetStateAction<boolean>>;
}

const Dino: FC<IDinoProps> = ({ dinoRef, move, dinoClass, setDinoClass }) => {
  const handlerKeyDown = (e: KeyboardEvent<HTMLDivElement>): void => {
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
      tabIndex={1}
      ref={dinoRef}
      onKeyDown={handlerKeyDown}
      className={dinoClass || !move ? `${s.dino} ${s.jump}` : `${s.dino}`}
    ></div>
  );
};

export default Dino;
