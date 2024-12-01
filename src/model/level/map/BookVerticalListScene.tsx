"use client"
import { Canvas } from "@react-three/fiber";
import { useState, useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";
import { TIERPACK_LINKS, TIERPACK_NAMES, TIERPACK_REDIRECT_LINKS } from "@/../script/constant/DEFAULT_PACKS";
import { BookPortfolio } from "./BookPortfolio";
// import FixedScrollingCamera from "@/model/bit/camera/FixedScrollingCamera";
import Basic2DText from "@/model/bit/text/Basic2DText";
// import { LoadingFullScreen } from "@/model/tools/charts/LoadingFullScreen";

import Link from "next/link";
// import FontText from './FontText';
import * as THREE from 'three'

import { Box, Plane, Text } from '@react-three/drei';
import { MeshBasicMaterial, MeshStandardMaterial, Vector3 } from 'three';
import FixedScrollingCamera from "@/model/bit/camera/FixedScrollingCamera";
import { useQuizResults } from "@/SpawnContainer";
import { MapStairs } from "./MapStairs";
import { useLanguageContext } from "@/context/LanguageContext";

// export default Basic2DText

export function LoadingFullScreen() {
    return (<>
        <div className=" flex-center">
          <div className="flex-col h-min-50vh">
            
            <Link href="/" className="z-600 nodeco bg-w-10 bord-r-50 mt-3 opaci-chov--50 hover-3 " >
              <div className="tx-white 1 pa-2 ">Loading...</div>
            </Link>
          </div>
        </div>
    </>)
}

export default function BookVerticalListScene() {
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const [mounted, setMounted] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [confirmModal, setConfirmModal] = useState({ isVisible: false, message: '', symbols: '', onConfirm: () => {} });
  const { someValid, resetResults } = useQuizResults();
  const { tierpackNames } = useLanguageContext();
  useEffect(() => {
    setMounted(true);
  }, []);

  function generateBoxPositions(count: number, interval: number, zigzagAmplitude: number = 0) {
    const positions = [];
    for (let i = 0; i < count; i++) {
      // Oscillate between -amplitude and +amplitude in 5 steps
      const oscillationPhase = i % 8; // 4 steps up + 4 steps down
      const xPosition = oscillationPhase < 4 
        ? -zigzagAmplitude + (oscillationPhase * (2 * zigzagAmplitude) / 3)
        : zigzagAmplitude - ((oscillationPhase - 4) * (2 * zigzagAmplitude) / 3);
      positions.push([xPosition + 0.5, 0, i * interval]);
    }
    return positions
  }

  const boxPositions = generateBoxPositions(TIERPACK_LINKS.length, 2, 0.5);
  const extractSymbols = (url:any) => {
    try {
      const params = new URLSearchParams(url.split('?')[1]);
      const symbols:any = [];
  
      for (let i = 0; i <= 5; i++) {
        ['a', 'b', 'c', 'd', 'e'].forEach((prefix) => {
          const param = params.get(`${prefix}${i}`);
          if (param) {
            const decodedParam = JSON.parse(decodeURIComponent(param));
            if (decodedParam.symbol) {
              symbols.push(decodedParam.symbol);
            }
          }
        });
      }
  
      return symbols.join(', ');
    } catch (error) {
      console.error('Error extracting symbols:', error);
    }
    return '';
  };
  

  const openLinkInThisTab = (index: number): void => {
    if (index < 0 || index >= TIERPACK_LINKS.length) {
      console.error("Invalid index for TIERPACK_LINKS");
      return;
    }

    const url: string = TIERPACK_LINKS[index];
    const symbols = extractSymbols(url);
    const message = `Go to "${(tierpackNames[index] || 'Unnamed').replace("\n", " ")}" portfolio link?`;

    setConfirmModal({
      isVisible: true,
      symbols,
      message,
      onConfirm: () => {
        if (!TIERPACK_REDIRECT_LINKS[index]) { return }
        window.location.href = TIERPACK_REDIRECT_LINKS[index];
      }
    });
  };

  if (!mounted) return <LoadingFullScreen />;

  return (
    <section id="packFrame" className={`flex-col h-100 tx-altfont-4 bg-b-10 ${true ? "" : "nopointer"}`}>
      <div >
        <ConfirmModalContent
          isVisible={confirmModal.isVisible}
          message={confirmModal.message}
          symbols={confirmModal.symbols}
          onConfirm={confirmModal.onConfirm}
          onCancel={() => setConfirmModal({ ...confirmModal, isVisible: false })}
        />
      </div>
      {!confirmModal.isVisible &&
      <Canvas style={{ maxWidth: "100vw", height: "100%" }} shadows
        camera={{ 
          fov: 60, 
          position: [0, isSmallDevice ? 3.5 : 3, isSmallDevice ? -3 : -2] 
        }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <FixedScrollingCamera 
          dimensionThreshold={isSmallDevice ? 28 : 30} 
          scrollAxis="z"
        />
        <ambientLight intensity={0.9} />
        <Plane args={[3,200]} rotation={[-Math.PI/2,0,0]} receiveShadow position={[0,-0.17,-23.5]}>
          <meshStandardMaterial color="white"  emissive="#aaaaaa" />
        </Plane>
        {!!someValid &&
        <group onPointerDown={()=>{
          setResetting(true);
          resetResults();
          window.location.href = "/";
        }}>
          
        <Box position={[0, -0.5, 10]} >
          <meshStandardMaterial color="red" />
        </Box>
        <Basic2DText text={`${ resetting ? "Logging out..." : "Logout" }`}  rotation={[Math.PI/2, Math.PI, 0]}
        position={[0, -0.1, 9]}
        font={0.2}
        color="red"
          />
        </group>
        }

        <group rotation={[0, Math.PI / 4 * 3, 0]} position={[0.25, 1.8, 3]}>
          <MapStairs />
        </group>

        {/* <pointLight castShadow position={[-5, 4, -3]} intensity={50} /> */}
        {!someValid &&
        <group position={[-1.5,0,1.5]} rotation={[0.5,Math.PI,0]}> 
          <Basic2DText 
            text={`${"Scroll  or  Swipe \n  and"}`} 
            color="#333333" 
            emissive="#333333" 
            textAlign="center"
            font={0.2} 
            position={[-1.5, .75, 0]} 
            rotation={[0, 0, 0]} 
            hoverSpeed={2}
          />
          <Basic2DText text={`${"Click a RED Button"}`} color="#003366" emissive="#003366" textAlign="center"
            font={0.3} position={[-1.1, 0.4, 0.13]} rotation={[0, 0, 0]} hoverSpeed={2}
          />
          <Basic2DText text={`${"|\nv"}`} color="#000066" emissive="#003366" textAlign="center"
            font={0.3} position={[-2, -0.05, 0.2]} rotation={[0, 0, -.5]} hoverSpeed={2}
          />
        </group>
        }
        <group position={[0.25, 0, -0.25]} rotation={[0, Math.PI, 0]}>
          {boxPositions.map((position, index) => (
            <group key={index} position={[0.7, 0, 0]} rotation={[0, 0, 0]}>
              <BookPortfolio 
                state={{ index, position }} 
                calls={{ openLinkInThisTab }} 
              />
            </group>
          ))}
        </group>
      </Canvas>
      }
    </section>
  );
}

const ConfirmModalContent = ({ isVisible, message, symbols, onConfirm, onCancel }: any) => {
  if (!isVisible) return null;

  return (
    <div className="pos-abs top-50p w-300px z-800 bg-glass-10 bg-b-90 border-white tx-white pa-4 bord-r-15 translate-xy--50">
      <div className="confirm-modal-content">
        <div className="pb-4 tx-altfont-7 underline">Confirm Redirection</div>
        <div className="pb-4">{message}</div>
        <div className="bg-w-20 bord-r-15 pa-2 mb-4">
          <div className="pb-2">Tokens</div>
          <div className="pb-4 tx-altfont-7">{symbols.replaceAll("USDT", "")}</div>
        </div>
        <div className="flex gap-2">
        <button className="tx-lg px-2 py-2 bord-r-15 opaci-chov--50 bg-trans tx-white tx-altfont-7 noborder" onClick={onCancel}>Cancel</button>
        <button className="tx-lg px-2 py-2 bord-r-15 opaci-chov--50 tx-altfont-7 flex-1 noborder" onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
}


