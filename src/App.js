import React, { useRef, useEffect, useState, Suspense } from "react";
import "./App.scss";
//Components
import Header from "./components/header";
// Page State
import state from "./components/state";

import {go,bulbasaur, cubone} from './RenderUtils'

// R3F
import { Canvas} from "react-three-fiber";
import {HTMLContent,Lights, Loader} from './components/RenderComponents'
export default function App() {
  const [events, setEvents] = useState();
  const domContent = useRef();
  const scrollArea = useRef();
  const onScroll = (e) => (state.top.current = e.target.scrollTop);
  useEffect(() => void onScroll({ target: scrollArea.current }), []);

  return (
    <>
      <Header />
      {/* R3F Canvas */}
      <Canvas
        concurrent
        colorManagement
        camera={{ position: [0, 0, 120], fov: 70 }}>
        {/* Lights Component */}
        <Lights />
        <Suspense fallback={null}>
          <HTMLContent
            domContent={domContent}
            bgColor={go.bgColor}
            modelPath={go.modelPath}
            position={250}
            scale={[0.16,0.2,0.16]}>
            <span>Like Pokemons?</span>
            <span>Who doesn't?</span>
          </HTMLContent>
          <HTMLContent
            domContent={domContent}
            bgColor={bulbasaur.bgColor}
            modelPath={bulbasaur.modelPath}
            position={0}
            scale={[0.3,0.3,0.3]}>
            <span>Here's</span>
            <span>Bulbasaur for you!</span>
          </HTMLContent>
          <HTMLContent
            domContent={domContent}
            bgColor={cubone.bgColor}
            modelPath={cubone.modelPath}
            position={-250}>
            <span>And yes</span>
            <span>we even got</span>
            <span>monochrome Cubone!</span>
          </HTMLContent>
        </Suspense>
      </Canvas>
      <Loader />
      <div
        className='scrollArea'
        ref={scrollArea}
        onScroll={onScroll}
        {...events}>
        <div style={{ position: "sticky", top: 0 }} ref={domContent} />
        <div style={{ height: `${state.pages * 100}vh` }} />
      </div>
    </>
  );
}
