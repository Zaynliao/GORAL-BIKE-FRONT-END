import { Canvas } from '@react-three/fiber';
import React, { useRef, useState, Suspense } from 'react';
import BikeModel from './OBJ/Bike';
import { HexColorPicker } from 'react-colorful';
import { proxy, useSnapshot } from 'valtio';
import { Link } from 'react-router-dom';

import { Ground } from './Ground';
import { FloatingGrid } from './FloatingGrid';
import {
  CubeCamera,
  Environment,
  OrbitControls,
  PerspectiveCamera,
  Stars,
} from '@react-three/drei';

const state = proxy({
  current: null,
  items: {
    Frame_MAT: '#fff',
    Saddle_MAT: '#fff',
    Metal_MAT: '#fff',
    DerailleurRear_MAT: '#fff',
    Crankset_MAT: '#fff',
    Pedal_MAT: '#fff',
    Chain_MAT: '#fff',
    Cage_MAT: '#fff',
    Bottle_MAT: '#fff',
    Brakes_MAT: '#fff',
    PaintBlack_MAT: '#fff',
    Wheels_MAT: '#fff',
    Computer_MAT: '#fff',
    HandlebarTape_MAT: '#fff',
    Shifters_MAT: '#fff',
    Cassette_MAT: '#fff',
  },
});

function Picker() {
  const snap = useSnapshot(state);
  return (
    <section
      className="fixed-top"
      style={{
        display: snap.current ? 'block' : 'none',
      }}
    >
      <section className="d-flex justify-content-start align-items-center gap-3">
        <HexColorPicker
          className="m-5"
          color={snap.items[snap.current]}
          onChange={(color) => (state.items[snap.current] = color)}
        />
        <h1
          className=""
          style={{
            color: state.items[snap.current],
          }}
        >
          {snap.current}
        </h1>
      </section>
    </section>
  );
}

function BikeShow() {
  return (
    <>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />
      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />
      <CubeCamera resolution={256} frames={Infinity}>
        {(texture) => (
          <>
            <Environment map={texture} />
            <BikeModel state={state} />
          </>
        )}
      </CubeCamera>
      <ambientLight intensity={0.7} />
      <spotLight
        color={[1, 0.25, 0.7]}
        intensity={1.5}
        angle={0.6}
        penumbra={0.5}
        position={[5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={2}
        angle={0.6}
        penumbra={0.5}
        position={[-5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />

      <Ground />
      <FloatingGrid />
    </>
  );
}
export default function Custom() {
  return (
    <Suspense fallback={null}>
      <Picker />

      <div className="vh-100 bg-black row justify-content-end p-0 m-0">
        {/* <button className="btn btn-dark text-muted w-5 m-3" onClick={() => {}}>
          清空
        </button> */}
        <Link
          to="/homepage"
          className="fixed-top ms-auto btn btn-black text-muted w-5 m-3"
          onClick={() => {
            document.body.style.cursor = '';
          }}
        >
          返回首頁
        </Link>

        <Canvas>
          <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />

          <BikeShow />
        </Canvas>
      </div>
    </Suspense>
  );
}