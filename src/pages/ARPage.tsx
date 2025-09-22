// src/pages/ARPage.tsx
import "aframe";
import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Scene, Entity } from "aframe-react";

const ARPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sceneRef = useRef<any>(null);

  useEffect(() => {
    const sceneEl = sceneRef.current?.el;
    if (sceneEl) {
      sceneEl.addEventListener("loaded", () => setIsLoaded(true));
    }
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Helmet>
        <script src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js"></script>
      </Helmet>

      {/* Tombol Kembali */}
      <Link to="/" className="absolute top-4 left-4 z-20 bg-sky-600 text-white px-4 py-2 rounded-md font-bold shadow-lg hover:bg-sky-700 transition">
        Kembali ke Menu
      </Link>

      {/* Overlay Loading */}
      {!isLoaded && (
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-70 z-10">
          <p className="text-white text-2xl font-bold animate-pulse">Memuat Komponen AR...</p>
          <p className="text-white text-lg mt-4">Pastikan Anda mengizinkan akses kamera.</p>
        </div>
      )}

      {/* Scene pakai aframe-react */}
      <Scene ref={sceneRef} embedded vr-mode-ui="enabled: false" arjs="sourceType: webcam; debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3;" style={{ width: "100%", height: "100%" }}>
        {isLoaded && (
          <Entity
            primitive="a-entity"
            position="0 1.5 -2"
            text={{
              value: "Arahkan kamera ke marker",
              align: "center",
              color: "#FFFFFF",
              width: 4,
            }}
          />
        )}

        <Entity primitive="a-marker" type="pattern" url="/assets/resistor.patt">
          <Entity gltf-model="url(/assets/resistor.glb)" scale="0.05 0.05 0.05" position="0 0 0" rotation="-90 0 0" />
          <Entity
            primitive="a-entity"
            text={{
              value: "Ini adalah Resistor.\nKomponen untuk menghambat arus listrik.",
              align: "center",
              color: "#FFFFFF",
              width: 2,
            }}
            position="0 0.2 0"
            rotation="-90 0 0"
          />
        </Entity>

        <Entity primitive="a-entity" camera />
      </Scene>
    </div>
  );
};

export default ARPage;
