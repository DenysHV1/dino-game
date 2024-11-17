import css from "./Cactus.module.css";

const Cactus = ({ move, cactusRef, speed}) => {

  // const style = {
  //   animationDuration: `2s`,
  //   animationName: "move",
  //   animationTimingFunction: "linear",
  //   animationIterationCount: "infinite",
  // };

  return (
    <>
      <div ref={cactusRef} className={move ? `${css.cactus}` : css.cactusStop}></div>
    </>
  );
};

export default Cactus;
