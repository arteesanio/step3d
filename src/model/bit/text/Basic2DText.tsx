import FontText from './FontText';
import * as THREE from 'three'

export function Basic2DText ({
  onClick= ()=> {},
  text="asd", position=new THREE.Vector3(), color , emissive="#000000", isSelected = false,font=0.35,
  ...props
}:any)  {

  const material = new THREE.MeshStandardMaterial({ color: color, emissive: emissive });



  return (
      <FontText
        receiveShadow
        // castShadow
        onClick={onClick}
        material={material}
        position={position}
        rotation={props.rotation || [-Math.PI/2,0,0]}
        // rotation={[-Math.PI/2,0,0]}
        // {...props,}
        font='/font.ttf'
        fontSize={font}
        maxWidth={100}
        lineHeight={1}
        letterSpacing={-0.06}
        textAlign="center"

      >
        {text}
      </FontText>
  );
};
export default Basic2DText