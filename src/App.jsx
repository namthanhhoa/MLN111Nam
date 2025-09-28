import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Experience } from "./components/Experience";
import { UI } from "./components/UI";
import MouseCursor from "./components/MouseCursor";
import "./test-models.js"; // Import test models để có thể dùng trong console
// import TestGemini from "./TestGemini";

function App() {
  return (
    <>
      {/* Custom mouse cursor */}
      <MouseCursor />

      {/* <TestGemini /> */}
      <UI />
      <Loader />
      <Canvas
        shadows={false} // Tắt shadows hoàn toàn
        camera={{
          position: [-0.5, 1, window.innerWidth > 800 ? 4 : 9],
          fov: 45,
        }}
        style={{ cursor: "none" }} // Ẩn cursor mặc định
      >
        <group position-y={0}>
          <Suspense fallback={null}>
            <Experience />
          </Suspense>
        </group>
      </Canvas>
    </>
  );
}

export default App;
