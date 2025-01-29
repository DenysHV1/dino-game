import { FC, RefObject } from "react";
import { ICactusProps } from "../Cactus/Cactus";
import "./cactus2.css";

interface ICactus2Props extends ICactusProps {
  cactusRef2: RefObject<HTMLDivElement>;
}

const Cactus2: FC<ICactus2Props> = ({ move, cactusRef2, speed }) => {
  return (
    <>
      <div
        ref={cactusRef2}
        className={move ? `cactus2 ${speed}` : "cactus2Stop"}
      ></div>
    </>
  );
};

export default Cactus2;
