"use client";
import { useLoader } from '@react-three/fiber';
import { TextureLoader, Texture } from 'three';
import React from 'react';



export interface BookImagePlaneProps {
  src: string;
  position: [number, number, number];
}

export const BookImagePlane: React.FC<BookImagePlaneProps> = ({ src, position, }) => {
  const texture: Texture = useLoader(TextureLoader, src);

  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry args={[0.5, 0.5]} />
      <meshStandardMaterial map={texture} transparent={true} />
    </mesh>
  );
};
