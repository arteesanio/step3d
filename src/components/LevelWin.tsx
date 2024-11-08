import { Cylinder, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { clusterApiUrl, Connection, Transaction } from "@solana/web3.js";
import { useRef } from "react";

interface LevelWinProps {
    score: number;
    s__score: (score: number) => void;
    onToast: (message: string) => void;
}

export const LevelWin = ({ score, onToast }: LevelWinProps) => {
    const miniHdri = useTexture("./miniHdri.jpg");
    const $coin = useRef<any>(null);

    useFrame((_, delta) => {
        if (!$coin.current) return;
        // Rotate the coin continuously
        $coin.current.rotation.x += delta * 1.5;
        $coin.current.rotation.z += delta * 2;
        // Make the coin bounce up and down
        $coin.current.position.y = Math.sin(Date.now() * 0.002) * 0.5 + 1;
    });

    const handleCoinClick = async () => {
        try {
            const phantom = (window as any).phantom?.solana;
            console.log(phantom?.isConnected);
            if (!phantom?.isConnected) {
                alert("clicked");
                await phantom.connect();
                onToast("Please connect your Phantom wallet first!");
                return;
            }

            onToast("Preparing donation transaction...");

            const response = await fetch("/api/actions/donate", {
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
            
            onToast("Please approve the 0.01 SOL donation...");
            const signedTransaction = await phantom.signTransaction(transaction);
            console.log("Transaction signed:", signedTransaction);
            
            const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!);
            const signature = await connection.sendRawTransaction(signedTransaction.serialize());
            console.log("Transaction sent:", signature);
            
            onToast("Thank you for your donation! 🎉");
        } catch (error) {
            onToast("Error processing donation");
            console.error(error);
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
            <Cylinder 
                ref={$coin}
                args={[1, 1, 0.31]} 
                rotation={[Math.PI / 2, 0, 0]}
                position={[0, 1, 0]}
                onClick={handleCoinClick}
            >
                <meshMatcapMaterial matcap={miniHdri} color={"#ffee00"} />
            </Cylinder>
        </group>
    </>);
}; 