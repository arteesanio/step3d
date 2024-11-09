import { Cylinder, useTexture, Text, Box, RoundedBox } from "@react-three/drei";
import { useFrame, ThreeEvent } from "@react-three/fiber";
import { Connection, Transaction } from "@solana/web3.js";
import { useEffect, useRef, useState } from "react";

interface LevelWinProps {
    score: number;
    s__score: (score: number) => void;
    onToast: (message: string) => void;
}

export const LevelWinHeader:any = ({score}:{score:number}) => {
    if (score == 0) {
        return <>
            <h1 className="flex-col">
                <div className="tx-altfont-2 tx-xxl">Congrats!</div>
                <div className="tx-altfont-1">You&apos;ve Won!</div>
            </h1>
        </>;
    }
    if (score == 1) {
        return <>
            <h1 className="flex-col">
                <div className="tx-altfont-2 tx-xxl">Wait!</div>
                <div className="tx-altfont-1">The transaction is being processed...</div>
            </h1>
        </>;
    }
    return <h1 className="flex-col opaci-chov--50 z-100">
        <div className="tx-altfont-2 tx-xxl">Congrats!</div>
        <div className="tx-altfont-1 tx-lg">Tap here to go to next level!</div>
    </h1>
};
const verifyLevelProgression = () => {
    const level1Time = parseInt(localStorage.getItem('level1_completion') || '0');
    const level2Time = parseInt(localStorage.getItem('level2_completion') || '0');
    const level3Time = parseInt(localStorage.getItem('level3_completion') || '0');
    const level4Time = parseInt(localStorage.getItem('level4_completion') || '0');
    const level5Time = parseInt(localStorage.getItem('level5_completion') || '0');
    const level6Time = parseInt(localStorage.getItem('level6_completion') || '0');
    const level7Time = parseInt(localStorage.getItem('level7_completion') || '0');
    const level8Time = parseInt(localStorage.getItem('level8_completion') || '0');

    // Verify timestamps are in chronological order
    if (level1Time === 0 || level2Time === 0 || level3Time === 0 || 
        level4Time === 0 || level5Time === 0 || level6Time === 0 || 
        level7Time === 0 || level8Time === 0) {
        return false;
    }

    return (
        level1Time < level2Time &&
        level2Time < level3Time &&
        level3Time < level4Time &&
        level4Time < level5Time &&
        level5Time < level6Time &&
        level6Time < level7Time &&
        level7Time < level8Time
    );
};

export const LevelWin = ({ score, s__score, onToast }: LevelWinProps) => {
    const miniHdri = useTexture("./miniHdri.jpg");
    const $coin = useRef<any>(null);
    const $box = useRef<any>(null);
    const [txSignature, setTxSignature] = useState<string | null>(null);
    const [showVerifyButton, setShowVerifyButton] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const [wndwTg, s__wndwTg] = useState<any>(null);
    const [telegram_id, s__telegram_id] = useState<any>(null);
    const setTelegram = async () => {
        // @ts-ignore: expect error cuz of unkonwn telegram object inside window context
        const wwwTg = window?.Telegram?.WebApp
        console.log("wwwTg", wwwTg);
        s__wndwTg(wwwTg)
        console.log("wwwTg?.initDataUnsafe?.user?.id", wwwTg?.initDataUnsafe?.user);
        s__telegram_id(wwwTg?.initDataUnsafe?.user?.id)
        console.log("*****************************************", );
    }

    useFrame((_, delta) => {
        if (isVerified && $coin.current) {
            // Coin animation
            $coin.current.rotation.x += delta * 1.5;
            $coin.current.rotation.z += delta * 2;
            $coin.current.position.y = Math.sin(Date.now() * 0.002) * 0.5 + 1;
        } else if (!isVerified && $box.current) {
            // Box animation
            $box.current.rotation.y += delta * 0.5 + (isProcessing ? 0.05 : 0);
            $box.current.rotation.x = Math.sin(Date.now() * 0.001) * 0.4 ;
            $box.current.position.y = Math.sin(Date.now() * 0.002) * 0.2 + 1 ;
        }
    });

    const verifyTransaction = async () => {
        if (!txSignature) return;
        
        try {
            const phantom = (window as any).phantom?.solana;
            onToast("Verifying transaction...");
            // to make quiz_results join the levels times by  a comma and just send a string
            console.log("txSignature", txSignature);
            const level1Time = parseInt(localStorage.getItem('level1_completion') || '0');
            const level2Time = parseInt(localStorage.getItem('level2_completion') || '0');
            const level3Time = parseInt(localStorage.getItem('level3_completion') || '0');
            const level4Time = parseInt(localStorage.getItem('level4_completion') || '0');
            const level5Time = parseInt(localStorage.getItem('level5_completion') || '0');
            const level6Time = parseInt(localStorage.getItem('level6_completion') || '0');
            const level7Time = parseInt(localStorage.getItem('level7_completion') || '0');
            const level8Time = parseInt(localStorage.getItem('level8_completion') || '0');
            const quiz_results = `${level1Time},${level2Time},${level3Time},${level4Time},${level5Time},${level6Time},${level7Time},${level8Time}`;
            const validationResponse = await fetch("/api/actions/memo/validate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    signature: txSignature,
                    sol_address: phantom.publicKey.toString(),
                    quiz_results: quiz_results,
                    telegram_id: telegram_id,
                    tg_name: wndwTg?.initDataUnsafe?.user?.username
                })
            });

            const validationResult = await validationResponse.json();

            if (validationResult.valid) {
                onToast("Memo successfully verified! 🎉");
                setShowVerifyButton(false);
                setIsVerified(true);
                s__score(score + 1);
            } else {
                onToast("Transaction not confirmed yet. Try again.");
            }
        } catch (error) {
            onToast("Error verifying transaction");
            console.error(error);
        }
    };
    useEffect(() => {
        setTelegram();
    }, []);
    const verifyTransactionByTgId = async () => {
        if (!telegram_id) {
            console.log("Telegram ID not found!");
            onToast("Telegram ID not found!");
            return;
        }

        try {
            onToast("Verifying completion...");
            
            // Get all level completion times
            const level1Time = parseInt(localStorage.getItem('level1_completion') || '0');
            const level2Time = parseInt(localStorage.getItem('level2_completion') || '0');
            const level3Time = parseInt(localStorage.getItem('level3_completion') || '0');
            const level4Time = parseInt(localStorage.getItem('level4_completion') || '0');
            const level5Time = parseInt(localStorage.getItem('level5_completion') || '0');
            const level6Time = parseInt(localStorage.getItem('level6_completion') || '0');
            const level7Time = parseInt(localStorage.getItem('level7_completion') || '0');
            const level8Time = parseInt(localStorage.getItem('level8_completion') || '0');
            
            const quiz_results = `${level1Time},${level2Time},${level3Time},${level4Time},${level5Time},${level6Time},${level7Time},${level8Time}`;

            const validationResponse = await fetch("/api/actions/memo/validate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    telegram_id: telegram_id,
                    quiz_results: quiz_results,
                    tg_name: wndwTg?.initDataUnsafe?.user?.username
                })
            });

            const validationResult = await validationResponse.json();

            if (validationResult.valid) {
                onToast("Completion verified successfully! 🎉");
                setShowVerifyButton(false);
                setIsVerified(true);
                s__score(score + 1);
            } else {
                onToast("Verification failed. Please try again.");
            }
        } catch (error) {
            onToast("Error during verification");
            console.error(error);
        }
    }
    const handleBoxClick = async () => {

        
        // @ts-ignore: expect error cuz of unkonwn telegram object inside window context
        const wwwTg = window?.Telegram?.WebApp
        console.log("wwwTg", wwwTg);
        // s__wndwTg(wwwTg)
        console.log("wwwTg?.initDataUnsafe?.user?.id", wwwTg?.initDataUnsafe?.user);


        console.log("verifyLevelProgression!");
        if (!verifyLevelProgression()) {
            console.log("Invalid level progression detected!");
            onToast("Invalid level progression detected!");
            return;
        }

        if (isProcessing || showVerifyButton) {
            verifyTransaction();
            return;
        };
        
        setIsProcessing(true);
        try {
            const phantom = (window as any).phantom?.solana;
            if (!phantom?.isConnected) {
                await phantom.connect();
            }
            console.log("telegram_id", telegram_id);
            console.log("phantom.publicKey.toString()", phantom.publicKey.toString());
            if (!phantom.publicKey.toString()) {
                if (!telegram_id) {
                    alert("Failed to connect. Please try again.");
                    return;
                } else {
                    console.log("verifyTransactionByTgId");
                    verifyTransactionByTgId();
                    return;
                }
            }

            onToast("Preparing memo transaction...");
            s__score(score + 1);
            const response = await fetch("/api/actions/memo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    account: phantom.publicKey.toString()
                })
            });

            if (!response.ok) {
                throw new Error("Failed to create transaction");
            }

            const txData = await response.json();
            
            const transaction = Transaction.from(Buffer.from(txData.transaction, 'base64'));
            
            onToast("Please approve the memo transaction...");
            const signedTransaction = await phantom.signTransaction(transaction);
            console.log("Transaction signed:", signedTransaction);
            
            const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!);
            const signature = await connection.sendRawTransaction(signedTransaction.serialize());
            console.log("Transaction sent:", signature);
            
            setTxSignature(signature);
            setShowVerifyButton(true);
            onToast("Transaction sent! Click verify button when ready.");

        } catch (error) {
            onToast("Error processing memo");
            console.error(error);
        } finally {
            setIsProcessing(false);
        }
    };

    return (<>
        <pointLight 
            position={[3, 3, 3]} 
            intensity={100} 
            castShadow
        />
        <ambientLight intensity={0.5} />
        <group position={[0, -1.5, 0]}>
            {isVerified ? (
                <Cylinder 
                    ref={$coin}
                    args={[1, 1, 0.31]} 
                    rotation={[Math.PI / 2, 0, 0]}
                    position={[0, 1, 0]}
                >
                    <meshMatcapMaterial matcap={miniHdri} color={"#ffee00"} />
                </Cylinder>
            ) : (
                <RoundedBox
                    ref={$box}
                    args={[1, 1, 1]}
                    position={[0, 1, 0]}
                    onClick={handleBoxClick}
                >
                    <meshStandardMaterial 
                        color={isProcessing || showVerifyButton ? "#777777" : "#997755"} 
                        transparent
                        opacity={isProcessing || showVerifyButton ? 0.7 : 1}
                    />
                </RoundedBox>
            )}
            
            {showVerifyButton && (
                <group position={[0, 2.5, 0]} onClick={verifyTransaction}>
                    <Text
                        position={[0, 0, 0]}
                        fontSize={0.2}
                        color="grey"
                        anchorX="center"
                        anchorY="middle"
                        userData={{ clickable: true }}
                    >
                        Tap to Verify Transaction
                    </Text>
                </group>
            )}
        </group>
    </>);
}; 