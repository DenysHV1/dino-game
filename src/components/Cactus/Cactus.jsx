import "./cactus.css";

const Cactus = ({ move, cactusRef, speed }) => {
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
