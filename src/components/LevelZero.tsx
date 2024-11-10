import { Html, Cylinder, Box, useTexture, Plane } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import { Stairs } from "./Stairs";
import { QuizModal } from "./QuizModal";
import { levelZero_quizOptions } from "@/scripts/helpers";
import { BlockchainLink } from "./BlockchainLink";

interface LevelOneProps {
  score: number;
  s__score: (score: number) => void;
  onToast: (message: string) => void;
}
// tap the coin or lose
export const LevelZero = ({ score, s__score = () => { }, onToast = () => { } }: LevelOneProps) => {
  const solanaLogo = useTexture("./solana.png");
  const miniHdri = useTexture("./miniHdri.jpg");
  const MAX_VEL = -0.02;
  const [vel, s__vel] = useState(MAX_VEL);
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
      $box.current.position.z += 0.2;
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
      <BlockchainLink />
      {showQuiz && (
      <QuizModal
        quizSet={levelZero_quizOptions}
        onCorrect={handleCorrectAnswer}
        onIncorrect={handleIncorrectAnswer}
      />
    )}
    {score < -1 &&
      <Html position={[0, -1, 0]}>
        <h1 className="nowrap flex-col opaci-chov--50" onClick={onStepClick}
          style={{ textShadow: "-2px 2px 2px #110700", color: "#ffaa00" }}>
          <div>+1 Step!</div>
          <div className="tx-altfont-1 tx-md">Tap to claim!</div>
        </h1>
      </Html>
    }
    {score > -2 &&
      <Cylinder args={[0.5, 0.5, 0.1]} onClick={boxClick} ref={$box} rotation={[Math.PI / 2, 0, 0]}>
        <meshMatcapMaterial matcap={miniHdri} color={"#ffee00"} />
      </Cylinder>
    }
    <group position={[0, -0.5, 1]}>
      <Stairs />
    </group>

    {/* Floor */}
    <Box args={[0.5, 0.75, 0.5]} position={[0, -2.82, 0]}
      receiveShadow castShadow
      scale={[15.52, 1, 15.7]}>
      <meshStandardMaterial color="#aaaaaa" />
    </Box>

    {/* Solana Logo Plane */}
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

    <Box args={[0.5, 0.2, 0.5]} position={[0, -2.44, 0]}
      receiveShadow castShadow scale={[2.04, 1, 0.46]}>
      <meshStandardMaterial color="#666666" />
    </Box>
    <pointLight receiveShadow castShadow
      position={[2.9, -0.8, -3.28]} distance={20} intensity={80} />
    <pointLight receiveShadow castShadow
      position={[0, 3, 2]} distance={20} intensity={20} />
    <ambientLight intensity={0.75} />
  </>)
}
