import { QuizSet, shuffleArray } from "@/scripts/helpers";
import { Html } from "@react-three/drei";
import { useMemo } from "react";

interface QuizModalProps {
    quizSet: QuizSet;
    onCorrect: () => void;
    onIncorrect: () => void;
}

export const QuizModal = ({ quizSet, onCorrect, onIncorrect }: QuizModalProps) => {
    const shuffledOptions = useMemo(() => shuffleArray(quizSet.options), [quizSet]);

    const handleAnswer = (isCorrect: boolean) => {
        if (isCorrect) {
            onCorrect();
        } else {
            onIncorrect();
        }
    };

    return (
        <Html position={[0, 0, 0]} center>
            <div className="quiz-modal pa-4 bg-white bord-r-25" 
                style={{
                    width: '300px',
                    background: 'rgba(255,255,255,0.25)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid #ffaa00',
                }}>
                <h3 className="tx-lg tx-bold py-2 tx-altfont-1 tx-center">{quizSet.question}</h3>
                <div className="flex-col flex-align-start gap-2">
                    {shuffledOptions.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleAnswer(option.correct)}
                            className="px-3 py-1 bg-b-10 noborder bord-r-10 opaci-chov--50 tx-mdl w-100 tx-start tx-altfont-1"
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