import { useEffect, useRef, useState } from "react";
import "./App.css";
import Cactus from "./components/Cactus/Cactus";
import Dino from "./components/Dino/Dino";
import Cactus2 from "./components/Cactus2/Cactus2";

function App() {
  //main
  const [move, setMove] = useState(false);
  const [countInterval, setCountInterval] = useState(0);
  const [gameOverModal, setGameOverModal] = useState(false);

  //events
  const [background, setBackground] = useState("");
  const [speed, setSpeed] = useState(`speed1`);
  const [lvl, setLvl] = useState("Lvl: 1");
  const [record, setRecord] = useState(() => {
    const saveRecord = localStorage.getItem("record");
    return saveRecord ? JSON.parse(saveRecord) : 0;
  });

  //positions el
  const [dinoPosition, setDinoPosition] = useState(0);
  const [cactusPosition, setCactusPosition] = useState(0);
  const [cactus2Position, setCactus2Position] = useState(0);

  //elements
  const dinoRef = useRef(null);
  const cactusRef = useRef(null);
  const cactusRef2 = useRef(null);

  const resetGame = () => {
    setBackground("");
    setCountInterval(0);
    setSpeed("speed1");
    setLvl("Lvl: 1");
    setDinoPosition(0);
    setCactusPosition(0);
    setCactus2Position(0);
  };

  //START/STOP
  const handlerToggleMove = () => {
    setMove(!move);
    setGameOverModal(false);
    resetGame();
    if (dinoRef.current) {
      dinoRef.current.focus();
    }
  };

  //events settings
  useEffect(() => {
    if (!move) return;
    const timer = setInterval(() => {
      setCountInterval((prevCount) => (prevCount += 1));
      if (countInterval > record) {
        setRecord(countInterval);
        localStorage.setItem("record", JSON.stringify(record));
      }
    }, 1000);

    if (countInterval > 10 && countInterval < 60) {
      setBackground("linear-gradient(180deg,#4cd65c,#6bdc2e,#9afb4b)");
      setLvl("Lvl: 2");
    } else if (countInterval >= 60 && countInterval < 120) {
      setBackground("linear-gradient(90deg,#00bff0,#00d8eb)");
      setSpeed("speed2");
      setLvl("Lvl: 3");
    } else if (countInterval >= 120 && countInterval < 300) {
      setBackground("linear-gradient(90deg,#d357fe,#be38f3,#7a219e)");
      setSpeed("speed3");
      setLvl("Lvl: 4");
    } else if (countInterval >= 300) {
      setBackground("linear-gradient(90deg,#f10e42,#d8005a,#b7006b)");
      setSpeed("speed4");
      setLvl("Lvl: infinity");
    } else {
      setBackground("");
      setLvl("Lvl: 1");
    }

    return () => clearTimeout(timer);
  }, [countInterval, move, record, speed]);
  //game over settings
  useEffect(() => {
    const dino = parseInt(
      window.getComputedStyle(dinoRef.current).getPropertyValue("top")
    );
    const cactus = parseInt(
      window.getComputedStyle(cactusRef.current).getPropertyValue("left")
    );
    let cactus2 = null;
    if (countInterval > 10) {
      cactus2 = parseInt(
        window.getComputedStyle(cactusRef2.current).getPropertyValue("left")
      );
    }

    const time = setInterval(() => {
      setDinoPosition(dino);
      setCactusPosition(cactus);
      if (cactus2) {
        setCactus2Position(cactus2);
      }
    }, 10);

    if (cactusPosition < 50 && cactusPosition > 0 && dinoPosition >= 140) {
      setMove(false);
      setGameOverModal(true);
      resetGame();
    }

    if (cactus2Position < 50 && cactus2Position > 0 && dinoPosition >= 140) {
      setMove(false);
      setGameOverModal(true);
      resetGame();
    }

    return () => clearTimeout(time);
  }, [dinoPosition, cactusPosition, countInterval, cactus2Position]);

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
      <p className="lvl">{lvl}</p>
      <p className="timer">{countInterval}</p>
      <p className="record">Record: {record}</p>
      <Dino dinoRef={dinoRef} move={move} />
      <Cactus move={move} cactusRef={cactusRef} speed={speed} />
      {countInterval > 10 && (
        <Cactus2 move={move} cactusRef2={cactusRef2} speed={speed} />
      )}
    </div>
  );
}

export default App;
