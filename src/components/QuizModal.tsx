import { QuizSet, shuffleArray } from "@/scripts/helpers";
import { Html } from "@react-three/drei";
import { useMemo } from "react";

interface QuizModalProps {
    quizSet: QuizSet;
    onCorrect: () => void;
    onIncorrect: () => void;
    levelName?: string;
}

export const QuizModal = ({ quizSet, onCorrect, onIncorrect, levelName = "" }: QuizModalProps) => {
    const shuffledOptions = useMemo(() => shuffleArray(quizSet.options), [quizSet]);

    const handleAnswer = (isCorrect: boolean) => {
        if (isCorrect) {
            onCorrect();
        } else {
            onIncorrect();
        }
    };

    return (
        <Html position={[0, 0, 0]} center className="bg-b-10 pa-2 bord-r-25"
            style={{
                boxShadow: '0 10px 5px -2px #77777777',
                backdropFilter: 'blur(5px)',
            }}
        >
            <div className="quiz-modal pa-4 pt-2 bg-white bord-r-25" 
                style={{
                    width: '300px',
                    background: 'rgba(255,255,255,0.25)',
                    boxShadow: '0 0 10px 0 #00a0ff55',
                    backdropFilter: 'blur(5px)',
                    border: '1px solid #00a0ff',
                }}>
                <h3 className="tx-lg tx-bold py-2 tx-altfont-1 tx-center">
                    {!!levelName && <div className="tx-sm pb-2 tx-shadow-1 tx-ls-2" style={{ color: "#ffaa00" }}>{levelName}</div>}
                    {quizSet.question}
                </h3>
                <div className="flex-col flex-align-start gap-2">
                    {shuffledOptions.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleAnswer(option.correct)}
                            className="px-3 py-1 bg-b-50 tx-white tx-shadow-2 noborder bord-r-10 opaci-chov--50 tx-mdl w-100 tx-start tx-altfont-1"
                            style={{
                                transition: 'all 0.2s',
                            }}
                        >
                            {option.text}
                        </button>
                    ))}
                </div>
            </div>
        </Html>
    );
}; 