import { Html, Cylinder, Box, useTexture, Plane } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useContext, useRef, useState } from "react";
// import { Stairs } from "./Stairs";
// import { QuizModal } from "./QuizModal";
// import { GameContext } from "../../script/state/GameContext";
import { levelSeven_quizOptions } from "@/scripts/helpers";
import { QuizModal } from "@/model/bit/text/QuizModal";
import { Stairs } from "@/model/core/Stairs";
import { GameContext } from "../../../../script/state/GameContext";

interface LevelSevenProps {
    score: number;
    s__score: (score: number) => void;
    onToast: (message: string) => void;
}

const MAX_VEL = -0.02;
const SCORE_CONDITIONS = {
    GAME_OVER: -1,
    PROCEED_TO_NEXT_LEVEL: -9,
    SHOW_QUIZ_THRESHOLD: 7,
    WIN_THRESHOLD: 9,
    POINTS_PER_CLICK: 2,
} as const;

const ROUTES = {
    NEXT_LEVEL: "/?lvl=8",
} as const;

export const LevelSeven = ({ score, s__score = () => { }, onToast = () => { } }: LevelSevenProps) => {
    const solanaLogo = useTexture("./solana.png");
    const miniHdri = useTexture("./miniHdri.jpg");
    const [vel, s__vel] = useState(MAX_VEL);
    const [showQuiz, s__showQuiz] = useState(false);
    const [completedQuiz, s__completedQuiz] = useState(false);
    const $box: any = useRef(null);
    const { hasCompletedAllLevels } = useContext(GameContext);
    const [rotSpeed] = useState((Math.random() - 0.5) * 0.05);
    const finishGame = () => {
        if (score == 0) { s__score(-1) } else {
            if (-score < SCORE_CONDITIONS.PROCEED_TO_NEXT_LEVEL) {
                s__score(-score)
            } else {
                s__score(-1)
            }
        }
    }

    const boxClick = () => {
        if (score === SCORE_CONDITIONS.GAME_OVER) {
            return window.location.reload()
        }
        if (score < SCORE_CONDITIONS.PROCEED_TO_NEXT_LEVEL) {
            return window.location.href = ROUTES.NEXT_LEVEL
        }

        s__vel((velocity) => (velocity + 0.04))
        if (score >= SCORE_CONDITIONS.SHOW_QUIZ_THRESHOLD) {
            if (completedQuiz) {
                finishGame();
                return
            }
            s__showQuiz(true);
            return;
        }
        if (score > SCORE_CONDITIONS.WIN_THRESHOLD) {
            s__score(score + SCORE_CONDITIONS.POINTS_PER_CLICK)
            finishGame();
            onToast("You Win!");
            return
        }
        s__score(score + SCORE_CONDITIONS.POINTS_PER_CLICK)
    }

    const handleCorrectAnswer = () => {
        s__showQuiz(false);
        onToast("Correct! Keep going!");
        s__score(score + SCORE_CONDITIONS.POINTS_PER_CLICK);
        s__completedQuiz(true);
        if ($box.current) {
            // $box.current.position.z += (0.2)*4;
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
            // $box.current.rotation.z += rotSpeed
        }
        if ($box.current.position.y < -2 && score >= 0) { 
            // onToast("You Lose!"); 
            finishGame() 
        }
        if (vel <= MAX_VEL) { return }
        s__vel(vel - 0.001)
    })

    const onStepClick = () => {
        localStorage.setItem('level7_completion', Date.now().toString());
        return window.location.href = ROUTES.NEXT_LEVEL
    }

    return (<>
        {showQuiz && (
            <QuizModal
                quizSet={levelSeven_quizOptions}
                onCorrect={handleCorrectAnswer}
                onIncorrect={handleIncorrectAnswer}
                levelName="Level Seven"
            />
        )}
        {score < SCORE_CONDITIONS.PROCEED_TO_NEXT_LEVEL &&
            <Html position={[0, -1, 0]}>
                <button className="tx-lgx nowrap flex-col opaci-chov--50" onClick={onStepClick}
                style={{ textShadow: "-1px 1px 1px #110700", color: "#14B7E7" }}>
                <div className="tx-altfont-2 ">+1 Point!</div>
                <div style={{color: "#ff9900"}} className="tx-altfont-1 tx-md">Tap to continue!</div>
                </button>
            </Html>
        }
        {score > SCORE_CONDITIONS.PROCEED_TO_NEXT_LEVEL &&
            <Cylinder args={[0.5, 0.5, 0.1]} onClick={boxClick} ref={$box} rotation={[Math.PI / 2, 0, 0]}>
                <meshMatcapMaterial matcap={miniHdri} color={"#ffdd00"} />
            </Cylinder>
        }
        <group position={[0, -0.5, 1]}>
            <Stairs brightColors={false} activatedSteps={[0,1,2,3]} />
        </group>

        <Box args={[0.5, 0.75, 0.5]} position={[0, -2.82, 0]}
            receiveShadow castShadow
            scale={[15.52, 1, 15.7]}>
            <meshStandardMaterial color="#aaaaaa" />
        </Box>

        {!!hasCompletedAllLevels && <Plane
            args={[5, 5]}
            position={[0, -2.44, -1.75]}
            rotation={[-Math.PI / 2, 0, 0]}
            receiveShadow scale={[0.5, 0.5, 1]}
        >
            <meshBasicMaterial
                map={solanaLogo}
                transparent={true}
                opacity={0.25}
            />
        </Plane>}

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