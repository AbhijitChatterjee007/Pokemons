// R3F
import {useFrame } from "react-three-fiber";
import { Html, useProgress, useGLTFLoader } from "drei";
import React, { useRef, useEffect} from "react";

// React Spring
import { a, useTransition } from "@react-spring/web";
//Intersection Observer
import { useInView } from "react-intersection-observer";
import  {Section} from './section'


const Model = ({ url, scale }) => {
    const gltf = useGLTFLoader(url, true);
    return <primitive object={gltf.scene} dispose={null} scale={scale} />;
  }
  
  export const Lights = () => {
    return (
      <>
        {/* Ambient Light illuminates lights for all objects */}
        <ambientLight intensity={0.3} />
        {/* Diretion light */}
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight
          castShadow
          position={[0, 10, 0]}
          intensity={1.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        {/* Spotlight Large overhead light */}
        <spotLight intensity={1} position={[1000, 0, 0]} castShadow />
      </>
    );
  };
  
  export const HTMLContent = ({
    domContent,
    children,
    bgColor,
    modelPath,
    position,
    scale
  }) => {
    const ref = useRef();
    useFrame(() => (ref.current.rotation.y += 0.01));
    const [refItem, inView] = useInView({
      threshold: 0,
    });
    useEffect(() => {
      inView && (document.body.style.background = bgColor);
    }, [inView]);
    return (
      <Section factor={1.5} offset={1}>
        <group position={[0, position, 0]}>
          <mesh ref={ref} position={[0, -35, 0]}>
            <Model url={modelPath} scale= {scale}/>
          </mesh>
          <Html fullscreen portal={domContent}>
            <div ref={refItem} className='container'>
              <h1 className='title'>{children}</h1>
            </div>
          </Html>
        </group>
      </Section>
    );
  };
  
 export const Loader = () => {
    const { active, progress } = useProgress();
    const transition = useTransition(active, {
      from: { opacity: 1, progress: 0 },
      leave: { opacity: 0 },
      update: { progress },
    });
    return transition(
      ({ progress, opacity }, active) =>
        active && (
          <a.div className='loading' style={{ opacity }}>
            <div className='loading-bar-container'>
              <a.div className='loading-bar' style={{ width: progress }}></a.div>
            </div>
              <h2>Please be patient while the content is still loading. It typically takes a minute to load for the first time</h2>
          </a.div>
        )
    );
  }