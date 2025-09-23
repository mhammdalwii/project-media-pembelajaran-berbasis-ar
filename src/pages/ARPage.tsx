// src/pages/ARPage.tsx

import "aframe";
import { Scene, Entity } from "aframe-react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const ARPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [markerFound, setMarkerFound] = useState(false);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative", overflow: "hidden" }}>
      <Helmet>
        <script src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js"></script>
      </Helmet>

      <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none">
        <Link to="/" className="absolute top-4 left-4 bg-sky-600 text-white px-4 py-2 rounded-md font-bold shadow-lg hover:bg-sky-700 transition pointer-events-auto">
          Kembali
        </Link>

        {!isLoaded && (
          <div className="w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-70">
            <p className="text-white text-xl md:text-2xl font-bold animate-pulse">Memuat Komponen AR...</p>
          </div>
        )}

        {isLoaded && !markerFound && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-11/12 max-w-sm p-3 bg-black bg-opacity-60 rounded-lg text-center">
            <p className="text-white font-semibold text-sm md:text-base">Arahkan kamera ke marker untuk memulai</p>
          </div>
        )}

        {markerFound && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-11/12 max-w-sm p-4 bg-white bg-opacity-90 rounded-lg shadow-xl text-gray-800">
            <h3 className="font-bold text-lg md:text-xl border-b pb-2 mb-2">Resistor</h3>
            <p className="text-sm md:text-base">Ini adalah komponen elektronika yang berfungsi untuk menghambat dan mengatur arus listrik dalam suatu rangkaian.</p>
          </div>
        )}
      </div>

      <Scene
        embedded
        vr-mode-ui="enabled: false"
        arjs="sourceType: webcam; debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3;"
        style={{ width: "100%", height: "100%" }}
        // 3. Event 'loaded' ditangani langsung sebagai prop, lebih bersih!
        events={{ loaded: () => setIsLoaded(true) }}
      >
        {/* 4. Gunakan <Entity primitive="..."> untuk tag A-Frame yang tidak ada komponennya */}
        <Entity
          primitive="a-marker"
          type="pattern"
          url="/assets/resistor.patt"
          // 5. Event marker ditangani di sini, tidak perlu useEffect lagi
          events={{
            markerFound: () => setMarkerFound(true),
            markerLost: () => setMarkerFound(false),
          }}
        >
          {/* Model 3D menggunakan komponen Entity */}
          <Entity gltf-model="url(/assets/resistor.glb)" scale="0.05 0.05 0.05" position="0 0 0" rotation="-90 0 0" />
        </Entity>

        {/* Kamera */}
        <Entity camera />
      </Scene>
    </div>
  );
};

export default ARPage;
