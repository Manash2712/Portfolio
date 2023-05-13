import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber"; // canvas is empty canvas which allows to place something on it
import { OrbitControls, Preload, useGLTF } from "@react-three/drei"; //these are helpers which allows us to draw on canvas

import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
    const computer = useGLTF("./desktop_pc/scene.gltf");
    return (
        <mesh>
            <hemisphereLight intensity={0.15} groundColor="black" />
            <pointLight intensity={1} />
            <spotLight
                position={[-20, 50, 10]}
                angle={0.12}
                penumbra={1}
                intensity={1}
                castShadow
                shadow-mapsize={1024}
            />
            <primitive
                object={computer.scene}
                scale={isMobile ? 0.6 : 0.7}
                position={isMobile ? [0, -3, -1.8] : [0, -3, -1.5]}
                rotation={[-0.01, -0.2, -0.1]}
            />
        </mesh>
    );
};

const ComputersCanvas = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Add a event listener for changes to the screen size
        const mediaQuery = window.matchMedia("(max-width: 500px)");

        // Set the initial value of the `isMobile` state variable
        setIsMobile(mediaQuery.matches);

        // Define a callback func to handle chanes to the media query
        const handleMediaQueryChange = (event) => {
            setIsMobile(event.matches);
        };

        // Add the callback func as a listener for changes to the media query
        mediaQuery.addEventListener("change", handleMediaQueryChange);

        // Remove the listener when the component is unmounted
        return () => {
            mediaQuery.removeEventListener("change", handleMediaQueryChange);
        };
    }, []);

    return (
        <Canvas
            frameloop="demand"
            shadows
            camera={{ position: [20, 3, 5], fov: 25 }}
            gl={{ preserveDrawingBuffer: true }}
        >
            <Suspense fallback={<CanvasLoader />}>
                <OrbitControls
                    enableZoom={false}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                />

                <Computers isMobile={isMobile} />
            </Suspense>
            <Preload all />
        </Canvas>
    );
};

export default ComputersCanvas;

{
    /* <Suspense fallback={<CanvasLoader />}> */
}
// hemisphereLight - Adding lights to the canvas
// gl={{ preserveDrawingBuffer: true }} // this needs to be there to properly render our model
// Suspense - this allows us to have loader while our component is loading
// PolarAngle - this allows us to only rotate at a particular angle
// OrbitControls - these controls will allow us to move loader left and right
