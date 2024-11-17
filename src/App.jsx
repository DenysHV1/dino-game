import { useEffect, useRef, useState } from "react";
import "./App.css";
import Cactus from "./components/Cactus/Cactus";
import Dino from "./components/Dino/Dino";

function App() {
  const [move, setMove] = useState(false);
  const [countInterval, setCountInterval] = useState(50);

  const [background, setBackground] = useState("");
  const [speed, setSpeed] = useState(`0.2s`);

  const [dinoPosition, setDinoPosition] = useState(0);
  const [cactusPosition, setCactusPosition] = useState(0);

  const [gameOverModal, setGameOverModal] = useState(false);

  const dinoRef = useRef(null);
  const cactusRef = useRef(null);

  const handlerToggleMove = () => {
    setMove(!move);
    setGameOverModal(false);
    setBackground("");
    setCountInterval(50);
    if (dinoRef.current) {
      dinoRef.current.focus();
    }
  };

  useEffect(() => {
    if (!move) return;
    const timer = setInterval(() => {
      setCountInterval((prevCount) => (prevCount += 1));
    }, 1000);

    if (countInterval > 10 && countInterval < 60) {
      setBackground("linear-gradient(180deg,#4cd65c,#6bdc2e,#9afb4b)");
    } else if (countInterval >= 60 && countInterval < 120) {
      setBackground("linear-gradient(90deg,#00bff0,#00d8eb)");
      setSpeed("1.2s");
    } else if (countInterval >= 120 && countInterval < 300) {
      setBackground("linear-gradient(90deg,#d357fe,#be38f3,#7a219e)");
      setSpeed("1.0s");
    } else if (countInterval >= 300) {
      setBackground("linear-gradient(90deg,#f10e42,#d8005a,#b7006b)");
      setSpeed("0.6s");
    } else {
      setBackground("");
    }

    return () => clearTimeout(timer);
  }, [countInterval, move, background, speed]);

  useEffect(() => {
    const dino = parseInt(
      window.getComputedStyle(dinoRef.current).getPropertyValue("top")
    );
    const cactus = parseInt(
      window.getComputedStyle(cactusRef.current).getPropertyValue("left")
    );

    const time = setInterval(() => {
      setDinoPosition(dino);
      setCactusPosition(cactus);
    }, 10);

    if (cactusPosition < 50 && cactusPosition > 0 && dinoPosition >= 140) {
      setCountInterval(0);
      setBackground("");
      setMove(false);
      setGameOverModal(true);
    }

    return () => clearTimeout(time);
  }, [dinoPosition, cactusPosition, countInterval, speed]);

  return (
    <div className="game" style={{ backgroundImage: background }}>
      {gameOverModal && <p className="game-over">GAME OVER!</p>}
      <button
        className="startBtn"
        onClick={() => {
          handlerToggleMove();
        }}
      >
        {move ? "Stop" : "Start"}
      </button>
      <p className="timer">{countInterval}</p>
      <Dino dinoRef={dinoRef} move={move} />
      <Cactus move={move} cactusRef={cactusRef} speed={speed} />
    </div>
  );
}

export default App;
