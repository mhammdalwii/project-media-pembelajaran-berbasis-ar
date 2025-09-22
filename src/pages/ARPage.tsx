import "aframe";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Scene, Entity } from "aframe-react";

const ARPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const onLoaded = () => setIsLoaded(true);
    window.addEventListener("load", onLoaded);
    return () => window.removeEventListener("load", onLoaded);
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Helmet>
        <script src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js"></script>
        <style>{`
    html, body {
      margin: 0;
      padding: 0;
      overflow: hidden;
      height: 100%;
    }
    .a-canvas, .a-scene, canvas {
      position: fixed !important;
      top: 0;
      left: 0;
      width: 100% !important;
      height: 100% !important;
      object-fit: cover !important;
    }
    /* Fix untuk kamera feed di mobile */
    video, .a-video, #arjs-video, .arjs-video {
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      width: 100% !important;
      height: 100% !important;
      object-fit: cover !important;
      z-index: -1 !important;
    }
  `}</style>
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
      <Scene
        embedded
        vr-mode-ui="enabled: false"
        arjs="trackingMethod: best; sourceType: webcam; facingMode: environment; debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3; cameraParametersUrl=https://cdn.jsdelivr.net/gh/AR-js-org/AR.js/aframe/examples/marker-training/examples/CameraParameters/camera_para.dat"
        style={{ width: "100%", height: "100%" }}
      >
        {isLoaded && (
          <Entity
            position="0 1.5 -2"
            text={{
              value: "Arahkan kamera ke marker",
              align: "center",
              color: "#FFFFFF",
              width: 4,
            }}
          />
        )}

        {/* Marker */}
        <Entity primitive="a-marker" type="pattern" url="/assets/resistor.patt">
          <Entity gltf-model="url(/assets/resistor.glb)" scale="0.05 0.05 0.05" position="0 0 0" rotation="-90 0 0" />
          <Entity
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

        {/* Kamera */}
        <Entity primitive="a-entity" camera position="0 0 0" rotation="0 0 0" />
      </Scene>
    </div>
  );
};

export default ARPage;
