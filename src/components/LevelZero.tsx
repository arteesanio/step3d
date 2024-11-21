import { Html, Cylinder, Box, useTexture, Plane } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState, useEffect, useContext } from "react";
import { Stairs } from "./Stairs";
import { QuizModal } from "./QuizModal";
import { levelZero_quizOptions } from "@/scripts/helpers";
import { BlockchainLink } from "./BlockchainLink";
import { GameContext } from "../../script/state/GameContext";

interface LevelOneProps {
  score: number;
  s__score: (score: number) => void;
  onToast: (message: string) => void;
}
// tap the coin or lose
export const LevelZero = ({ score, s__score = () => { }, onToast = () => { } }: LevelOneProps) => {
  const { hasCompletedAllLevels } = useContext(GameContext);

  const solanaLogo = useTexture("./solana.png");
  const miniHdri = useTexture("./miniHdri.jpg");
  const MAX_VEL = -0.005;
  const [vel, s__vel] = useState(MAX_VEL);
  const [rotSpeed] = useState((Math.random() - 0.5) * 0.05);
  const [showQuiz, s__showQuiz] = useState(false);
  const $box: any = useRef(null);

  useEffect(() => {
    localStorage.setItem('gameStartTime', Date.now().toString());
  }, []);

  const finishGame = () => {
    if (score == 0) { s__score(-1) } else { s__score(-score) }
  }

  const boxClick = () => {
    if (score == -1) {
      return window.location.reload()
    }
    if (score < -1) {
      return window.location.href = "/win"
    }

    s__vel((velocity) => (velocity + 0.04))
    if (score == 0) {
      s__showQuiz(true);
      return;
    }
    if (score > 0) {
      s__score(score + 2)
      finishGame();
      onToast("You Win!");
      return
    }
    s__score(score + 2)
  }

  const handleCorrectAnswer = () => {
    s__showQuiz(false);
    onToast("Correct! Keep going!");
    s__score(score + 2);
    if ($box.current) {
      // $box.current.position.z += 0.2;
    }
  };

  const handleIncorrectAnswer = () => {
    s__showQuiz(false);
    onToast("Try again!");
    finishGame();
  };

  useFrame(() => {
    if (showQuiz) { return }
    if (score < 0) { return }
    if (!$box.current) { return }
    if ($box.current.position.y > -2) {
      $box.current.position.y += vel
      $box.current.rotation.z += rotSpeed
    }
    if ($box.current.position.y < -2 && score >= 0) { onToast("You Lose!"); finishGame() }
    if (vel <= MAX_VEL) { return }
    s__vel(vel - 0.001)
  })

  const onStepClick = () => {
    const params = new URLSearchParams(window.location.search);
    const currentLvl = params.get('lvl');
    if (!currentLvl) {
      return window.location.href = "/?lvl=1";
    }
    const nextLevel = parseInt(currentLvl) + 1;
    return window.location.href = `/?lvl=${nextLevel}`;
  }

  return (<>
      {showQuiz && (
      <QuizModal
        quizSet={levelZero_quizOptions}
        onCorrect={handleCorrectAnswer}
        onIncorrect={handleIncorrectAnswer}
      />
    )}
    {score < -1 && <>
      <Html position={[0, -1, 0]}>
        <h1 className="nowrap flex-col opaci-chov--50" onClick={onStepClick}
          style={{ textShadow: "-1px 1px 1px #110700", color: "#14B7E7" }}>
          <div className="tx-altfont-2 ">+1 Point!</div>
          <div style={{color: "#ff9900"}} className="tx-altfont-1 tx-md">Tap to continue!</div>
        </h1>
      </Html>
      
      {/* <group position={[0, -0.5, 1]} >
        <Stairs  brightColors={false} activatedSteps={[0,]} />
      </group> */}
    </>}
    {false && hasCompletedAllLevels && score === 0 && (
      <Box 
        args={[0.2, 0.2, 0.2]} 
        position={[-2, 0, 0]}
        onClick={() => window.location.href = "/win"}
      >
        <meshStandardMaterial color="#0066ff" />
        <Html position={[0, 0.75, 0]}>
          <div className="tx-altfont-1 tx-center">
            {/* <div>You've completed all levels!</div> */}
            <div className="tx-sm">Tap to claim rewards</div>
          </div>
        </Html>
      </Box>
    )}
    { score > -2 && (
      <Cylinder args={[0.5, 0.5, 0.1]} onClick={boxClick} ref={$box} rotation={[Math.PI / 2, 0, 0]}>
        <meshMatcapMaterial matcap={miniHdri} color={"#ffee00"} />
      </Cylinder>
    )}

    {/* Floor */}
    <Box args={[0.5, 0.75, 0.5]} position={[0, -2.82, 0]}
      receiveShadow castShadow
      scale={[15.52, 1, 15.7]}>
      <meshStandardMaterial color="#aaaaaa" />
    </Box>

    {/* Solana Logo Plane */}
    {!!hasCompletedAllLevels && (
      <Plane
        args={[5, 5]}
      position={[0, -2.44, -1.75]}
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow scale={[0.5, 0.5, 1]}
    >
      <meshBasicMaterial
        map={solanaLogo}
        transparent={true}
        opacity={0.15}
      />
    </Plane>
)}






    {/* <BlockchainLink /> */}
    <Cylinder args={[0.5, 0.6, 0.2, 12, 1]} position={[0, -2.44, 0]}
      receiveShadow castShadow scale={[1, 1, 1]}>
      <meshStandardMaterial color="#666666" />
    </Cylinder>






    <pointLight receiveShadow castShadow
      position={[2.9, -0.8, -3.28]} distance={20} intensity={80} />
    <pointLight receiveShadow castShadow
      position={[0, 3, 2]} distance={20} intensity={20} />
    <ambientLight intensity={0.75} />
  </>)
}
