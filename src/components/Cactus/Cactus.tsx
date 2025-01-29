import { FC, RefObject } from "react";
import "./cactus.css";

export interface ICactusProps {
  move: boolean;
  cactusRef?: RefObject<HTMLDivElement>;
  speed: string;
}

const Cactus: FC<ICactusProps> = ({ move, cactusRef, speed }) => {
  return (
    <>
      <div
        ref={cactusRef}
        className={move ? `cactus ${speed}` : "cactusStop"}
      ></div>
    </>
  );
};

export default Cactus;
