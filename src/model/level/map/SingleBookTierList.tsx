"use client";
import { Box } from "@react-three/drei";
import React from 'react';
// import Basic2DText from "@/model/bit/text/Basic2DText";
import { TIERPACK_LINKS } from "@/../script/constant/DEFAULT_PACKS";
import Basic2DText from "@/model/bit/text/Basic2DText";


export const SingleBookTierList = ({ state }: any) => {
  return (<>
    {[...Array(5)].map((_, row) => {
      const selectedATier = TIERPACK_LINKS[state.index];
      const urlParams = new URLSearchParams(
        new URL(selectedATier, window.location.href).search
      );
      const Atokens: any = [];
      const Btokens: any = [];
      const Ctokens: any = [];
      const Dtokens: any = [];
      const Etokens: any = [];
      urlParams.forEach((value, key) => {
        if (key.toLowerCase().startsWith('a')) {
          try {
            const jsonValue = JSON.parse(value);
            if (jsonValue && jsonValue.symbol) {
              Atokens.push(jsonValue.symbol);
            }
          } catch (e) {
            // Handle any parsing errors
          }
        }
        if (key.toLowerCase().startsWith('b')) {
          try {
            const jsonValue = JSON.parse(value);
            if (jsonValue && jsonValue.symbol) {
              Btokens.push(jsonValue.symbol);
            }
          } catch (e) {
            // Handle any parsing errors
          }
        }
        if (key.toLowerCase().startsWith('c')) {
          try {
            const jsonValue = JSON.parse(value);
            if (jsonValue && jsonValue.symbol) {
              Ctokens.push(jsonValue.symbol);
            }
          } catch (e) {
            // Handle any parsing errors
          }
        }
        if (key.toLowerCase().startsWith('d')) {
          try {
            const jsonValue = JSON.parse(value);
            if (jsonValue && jsonValue.symbol) {
              Dtokens.push(jsonValue.symbol);
            }
          } catch (e) {
            // Handle any parsing errors
          }
        }
        if (key.toLowerCase().startsWith('e')) {
          try {
            const jsonValue = JSON.parse(value);
            if (jsonValue && jsonValue.symbol) {
              Etokens.push(jsonValue.symbol);
            }
          } catch (e) {
            // Handle any parsing errors
          }
        }
      });

      const tokenStringA = Atokens.join(' · ')?.replace(/USDT/g, "");
      const tokenStringB = Btokens.join(' · ')?.replace(/USDT/g, "");
      const tokenStringC = Ctokens.join(' · ')?.replace(/USDT/g, "");
      const tokenStringD = Dtokens.join(' · ')?.replace(/USDT/g, "");
      const tokenStringE = Etokens.join(' · ')?.replace(/USDT/g, "");

      return (
        <group key={row}>
          <Box args={[0.15, 0.12, 0.02]} position={[-0.7, 0.5 - 0.25 * row, 0.13]} castShadow receiveShadow>
            <meshStandardMaterial color={['red', 'gold', 'green', 'blue', 'purple'][row]} />
          </Box>
          <Box args={[0.85, 0.2, 0.05]} position={[-1, 0.5 - 0.25 * row, 0.1]} castShadow receiveShadow>
            <meshStandardMaterial color="black" />
          </Box>

          <group position={[-1.08, 0.5, 0]}>
            <Basic2DText text={`${tokenStringA}`} color="#fff" emissive="#fff" textAlign="start"
              font={0.12} position={[0, 0, 0.13]} rotation={[0, 0, 0]} />
          </group>
          <group position={[-1.08, 0.25, 0]}>
            <Basic2DText text={`${tokenStringB}`} color="#fff" emissive="#fff" textAlign="start"
              font={0.1} position={[0, 0, 0.13]} rotation={[0, 0, 0]} />
          </group>
          <group position={[-1.08, 0, 0]}>
            <Basic2DText text={`${tokenStringC}`} color="#fff" emissive="#fff" textAlign="start"
              font={0.09} position={[0, 0, 0.13]} rotation={[0, 0, 0]} />
          </group>
          <group position={[-1.08, -0.25, 0]}>
            <Basic2DText text={`${tokenStringD}`} color="#fff" emissive="#fff" textAlign="start"
              font={0.08} position={[0, 0, 0.13]} rotation={[0, 0, 0]} />
          </group>
          <group position={[-1.08, -0.5, 0]}>
            <Basic2DText text={`${tokenStringE}`} color="#fff" emissive="#fff" textAlign="start"
              font={0.07} position={[0, 0, 0.13]} rotation={[0, 0, 0]} />
          </group>
        </group>
      );
    })}
  </>);
};
