"use client";
import { Box, Cylinder, RoundedBox } from "@react-three/drei";
import * as THREE from 'three';
import { TIERPACK_NAMES, TIERPACK_COLORS, TIERPACK_IMAGES } from "@/../script/constant/DEFAULT_PACKS";
import { Suspense, forwardRef, useImperativeHandle, useRef, useState } from "react";
import React from 'react';
import { HoverSelector } from "@/model/tools/HoverSelector";
// import PickBookCover from "@/model/level/pick/PickBookCover";
import { BookImagePlane } from "./BookImagePlane";
import { SingleBookTierList } from "./SingleBookTierList";
import Basic2DText from "@/model/bit/text/Basic2DText";
import { useQuizResults } from "@/SpawnContainer";
import { useLanguageContext } from "@/context/LanguageContext";
// import Basic2DText from "@/model/bit/text/Basic2DText";


export const BookPortfolio = forwardRef(({ state, calls }: any)=> {
  const { tierpackNames } = useLanguageContext();
  const { quizResults, allValid } = useQuizResults();
    const $hoverSelector = useRef<any>(null);
  const [isSelected, s__isSelected] = useState(false);
  const [reachedEnd, s__reachedEnd] = useState(false);
  const [fullSpinCount, s__fullSpinCount] = useState(0);

  const [isMoonSpinActive, s__isMoonisSpinActive] = useState(false);
  const triggerIsActionActive = () => {
    s__isSelected(!isMoonSpinActive)
    s__isMoonisSpinActive(!isMoonSpinActive)
  };
  const triggerSelectCube = (e:any) => {
    e.stopPropagation();
    
    if ($hoverSelector.current) {
      $hoverSelector.current.triggerClickStart();
    }
    s__isSelected(true)
  }
  const triggerFullSpinCount = (val:any) => {
    console.log("triggerFullSpinCount", val);
    s__fullSpinCount(val);
  }

  useImperativeHandle(state.ref, () => ({
    isSelected,
    triggerSelectCube,
    triggerFullSpinCount,
    isMoonSpinActive,
    triggerIsActionActive,
    reachedEnd,
    fullSpinCount,
  }));

  return (<>
    <group position={new THREE.Vector3(...state.position)}>
      <group position={[0,-0.41,0]}>
        {/* button-to-book connector tubes/pipes */}
        {/* <Box  position={[0,0.2,-0.05]} args={[0.2,0.2,0.28]} >
          <meshStandardMaterial color={"white"} />
        </Box>
        <Box position={[-0.5,0.2,-0.1]} args={[1,0.1,0.1]} >
          <meshStandardMaterial color={"white"} />
        </Box> */}
      </group>
      <group rotation={[-Math.PI/2, 0, 0]} position={[0,-0.1,0]}>
      <HoverSelector
        isEnabled={!isSelected}
        ref={$hoverSelector}
        sceneState={{}}
        {...{
          sceneCalls: { audioNotification: (arg1: any, arg2: any) => { } },
          isActionActive: isMoonSpinActive,
          s__isActionActive: triggerIsActionActive,
          s__reachedEnd: s__reachedEnd,
          fullSpinCount: fullSpinCount, 
          s__fullSpinCount: triggerFullSpinCount,
        }}
        triggerModel={<>
          {/* big red button */}
          <group position={[-1,0.2,0]} >
            <Cylinder args={[0.25,0.25,0.3,24,1]} position={[0,0,(!isMoonSpinActive && !reachedEnd) ? -0.02 : -0.1]}
              rotation={[Math.PI/2, 0, 0]}
            >
              <meshStandardMaterial color={(!isMoonSpinActive && !reachedEnd) && allValid ? "red" : "grey"} />
            </Cylinder>
            <RoundedBox position={[0,0,-0.1]} args={[0.75,0.75,0.25]} >
              <meshStandardMaterial color={"white"} />
            </RoundedBox>
          </group>
        </>}
      >

        <group position={[0,0,-0.14]} >
          {/* <RoundedBox castShadow receiveShadow args={[1, 1.5, 0.2]}>
            <meshStandardMaterial color={!!isSelected ? "lightgrey" : "white"} />
          </RoundedBox> */}
          <group position={[0, 0, 0.13]} rotation={[Math.PI / 2, 0, 0]}>
          {/* <Basic2DText text={`${TIERPACK_NAMES[state.index] || 'Book'}`} color={TIERPACK_COLORS[state.index][2]} emissive={TIERPACK_COLORS[state.index][2]}
              font={0.17} position={[0, 0, -0.45]} 
            /> */}
            {tierpackNames?.[state?.index] && 
            <Basic2DText 
              text={`${tierpackNames[state.index] || 'Book'}`} 
              color={TIERPACK_COLORS[state.index][2]} 
              emissive={TIERPACK_COLORS[state.index][2]}
              font={0.17} 
              position={[-.95, -0.05, -0.84]} 
            />
          }
            <Suspense fallback={<group> <Box args={[0.1,0.1,0.1]}></Box> </group>}>
              {/* <BookImagePlane src={TIERPACK_IMAGES[state.index]} position={[0, 0.001, 0.05]} /> */}
            </Suspense>
            {/* <Basic2DText text={`#0${state.index}`} color="#666" emissive="#000"
              font={0.3} position={[0.18, 0, 0.6]}
            />
            <Basic2DText text={`Stage`} color="#333" emissive="#000"
              font={0.1} position={[-0.24, 0, 0.6]}
            /> */}
          </group>
          <group scale={[1, 1, 1]} rotation={[Math.PI / 2, 0, Math.PI / 2]}
            position={[0.48, -0.24, 0]}
          >
            {/* <Box args={[0.3,0.5,0.5]} position={[0,0.5,-0.2]}>
              <meshStandardMaterial color={!!isSelected ? TIERPACK_COLORS[state.index][0] : TIERPACK_COLORS[state.index][1]} />
            </Box> */}
            {/* <PickBookCover color={!!isSelected ? TIERPACK_COLORS[state.index][0] : TIERPACK_COLORS[state.index][1]} /> */}
          </group>
        </group>







        {isSelected && (<group position={[1,0,0]} rotation={[0.5,0,0]} >
        { (
          <group position={[0, 0.03, -0.13]} rotation={[0.2,0,0]}>
            <group position={[-1, .72, 0]}>
              <Basic2DText text={`Click to Start lvl ${state.index}`} color="#000" emissive="#000" textAlign="start"
                font={0.075} position={[0, 0, 0.115]} rotation={[0, 0, 0]} 
              />
            </group>
            <Box args={[0.8, 0.2, 0.02]} position={[-1, .7, 0.1]} castShadow receiveShadow>
              <meshStandardMaterial color="lightgrey" />
            </Box>
          </group>
        )}
        { (
          <group onPointerDown={(e:any) => {e.stopPropagation();calls.openLinkInThisTab(state.index)}}>
            <Box args={[0.88, 1.28, 0.02]} position={[-1, 0, 0.1]} castShadow receiveShadow>
              <meshStandardMaterial color="grey" />
            </Box>
            <SingleBookTierList state={state} />
            
          </group>
          )}
        </group>)}










        </HoverSelector>
      </group>
    </group>
  </>);
})


BookPortfolio.displayName = 'BookPortfolio';

export default BookPortfolio;

