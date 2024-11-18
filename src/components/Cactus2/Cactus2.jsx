import "./cactus2.css";

const Cactus2 = ({ move, cactusRef2, speed }) => {
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
