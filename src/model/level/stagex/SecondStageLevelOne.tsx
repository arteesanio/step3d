import { Html, Cylinder, Box, useTexture, Plane } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState, useEffect, useContext } from "react";
import { secondStage_levelOne } from "@/scripts/helpers";
import { GameContext } from "../../../../script/state/GameContext";
import { QuizModal } from "@/model/bit/text/QuizModal";
import { BlockchainLink } from "@/model/core/BlockchainLink";
import { Stairs } from "@/model/core/Stairs";
// import { Stairs } from "./Stairs";
// import { QuizModal } from "./QuizModal";
// import { BlockchainLink } from "./BlockchainLink";
// import { GameContext } from "../../script/state/GameContext";

interface SecondStageLevelOneProps {
  score: number;
  s__score: (score: number) => void;
  onToast: (message: string) => void;
}

export const SecondStageLevelOne = ({ score, s__score = () => { }, onToast = () => { } }: SecondStageLevelOneProps) => {
  const { hasCompletedAllLevels } = useContext(GameContext);

  const solanaLogo = useTexture("./solana.png");
  const miniHdri = useTexture("./miniHdri.jpg");
  const MAX_VEL = -0.015;
  const [vel, s__vel] = useState(MAX_VEL);
  const [showQuiz, s__showQuiz] = useState(false);
  const $box: any = useRef(null);
  const [clickCount, s__clickCount] = useState(0);

  const finishGame = () => {
    if (score == 0) { s__score(-1) } else { s__score(-score) }
  }

  const boxClick = () => {
    if (score == -1) {
      return window.location.reload()
    }
    if (score < -1) {
      return window.location.href = "/learn?lvl=2"; // Go to level 2 of stage 2
    }

    s__vel((velocity) => (velocity + 0.04))
    s__clickCount(prev => prev + 1);

    if (clickCount < 1) { // Need two clicks before showing quiz
      onToast("Click again!");
      return;
    }

    if (score == 0) {
      s__showQuiz(true);
      return;
    }
    if (score > 0) {
      s__score(score + 2)
      finishGame();
      onToast("Level Complete!");
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

  return (<>
    {showQuiz && (
      <QuizModal
        quizSet={secondStage_levelOne}
        onCorrect={handleCorrectAnswer}
        onIncorrect={handleIncorrectAnswer}
      />
    )}
    { score > -2 && (
      <Cylinder args={[0.5, 0.5, 0.1]} onClick={boxClick} ref={$box} rotation={[Math.PI / 2, 0, 0]}>
        <meshMatcapMaterial matcap={miniHdri} color={"#00aaff"} />
      </Cylinder>
    )}
    <group position={[0, -0.5, 1]}>
      <Stairs />
    </group>

    <Box args={[0.5, 0.75, 0.5]} position={[0, -2.82, 0]}
      receiveShadow castShadow
      scale={[15.52, 1, 15.7]}>
      <meshStandardMaterial color="#aaaaaa" />
    </Box>

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

    <BlockchainLink />
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