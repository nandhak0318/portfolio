// import * as THREE from 'three'
// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(
//   75,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   1000
// );
// camera.position.set(0, 0, 50);

// const renderer = new THREE.WebGLRenderer({ antialias: true });
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.getElementById("skills").appendChild(renderer.domElement);
// const light = new THREE.AmbientLight(  ); // soft white light
// scene.add( light );
// function addSkillSphere(x, y, z, texturePath) {
//   const geometry = new THREE.SphereGeometry(5, 32, 32);
//   const texture = new THREE.TextureLoader().load(texturePath);
//   const material = new THREE.MeshBasicMaterial({ map: texture });
//   const sphere = new THREE.Mesh(geometry, material);
//   sphere.position.set(x, y, z);
//   scene.add(sphere);
// }

// addSkillSphere(0, 0, 0, "./txt.jpg");
// addSkillSphere(15, 0, 0, "./txt.jpg");
// addSkillSphere(-15, 0, 0, "./txt.jpg");
// // add more spheres for additional skills



// function animate() {
//   requestAnimationFrame(animate);

//   // rotate the spheres
//   scene.children.forEach((child) => {
//     child.rotation.x += 0.01;
//     child.rotation.y += 0.01;
//   });

//   // render the scene
//   renderer.render(scene, camera);
// }

// animate();
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import {
  Decal,
  Float,
  OrbitControls,
  Preload,
  useTexture,
} from "@react-three/drei";
import { Html, useProgress } from "@react-three/drei";

const CanvasLoader = () => {
  const { progress } = useProgress();
  return (
    <Html
      as='div'
      center
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <span className='canvas-loader'></span>
      <p
        style={{
          fontSize: 14,
          color: "#F1F1F1",
          fontWeight: 800,
          marginTop: 40,
        }}
      >
        {progress.toFixed(2)}%
      </p>
    </Html>
  );
};



const Ball = (props) => {
  const [decal] = useTexture([props.imgUrl]);

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color='#fff8eb'
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={1}
          map={decal}
          flatShading
        />
      </mesh>
    </Float>
  );
};

const BallCanvas = ({ icon }) => {
  return (
    <Canvas
      frameloop='demand'
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={false} />
        <Ball imgUrl={`./tech/${icon}.png`} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

const technologies = [
  {
    name: "HTML 5",
    icon: "html",
  },
  {
    name: "CSS 3",
    icon: "css",
  },
  {
    name: "JavaScript",
    icon: "javascript",
  },
  {
    name: "TypeScript",
    icon: "typescript",
  },
  {
    name: "React JS",
    icon: "reactjs",
  },
 
  {
    name: "Node JS",
    icon: "nodejs",
  },
  {
    name: "MongoDB",
    icon: "mongodb",
  },
  {
    name: "git",
    icon: "git",
  },
  {
    name: "figma",
    icon: "figma",
  },
  {
    name: "docker",
    icon: "docker",
  },
];

const Tech = () => {
  return (
    <div className='skill-sec'> 
      {technologies.map((technology) => (
        <div className='w-28 h-28' key={technology.name}>
          <BallCanvas icon={technology.icon} />
        </div>
      ))}
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("skills-sec")).render(
  <React.StrictMode>
    <Tech />
  </React.StrictMode>
);