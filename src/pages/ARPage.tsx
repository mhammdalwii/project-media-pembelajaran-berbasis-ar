import "aframe";
import { Scene, Entity } from "aframe-react";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import styles from "./ARPage.module.css";

const ARPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [markerFound, setMarkerFound] = useState(false);

  // iOS Safari viewport fix
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    setVh();
    window.addEventListener("resize", setVh);
    return () => window.removeEventListener("resize", setVh);
  }, []);

  return (
    <div className={styles.container}>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, viewport-fit=cover" />
        <script src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js"></script>
      </Helmet>

      {/* Lapisan AR */}
      <Scene
        embedded
        renderer="logarithmicDepthBuffer: true;"
        vr-mode-ui="enabled: false"
        arjs="sourceType: webcam; facingMode: environment; detectionMode: mono; debugUIEnabled: false;"
        className={styles.scene}
        events={{ loaded: () => setIsLoaded(true) }}
      >
        <Entity
          primitive="a-marker"
          type="pattern"
          url="/assets/resistor.patt"
          events={{
            markerFound: () => setMarkerFound(true),
            markerLost: () => setMarkerFound(false),
          }}
        >
          <Entity gltf-model="url(/assets/resistor.glb)" scale="0.05 0.05 0.05" position="0 0 0" rotation="-90 0 0" />
        </Entity>
        <Entity primitive="a-entity" camera />
      </Scene>

      {/* Overlay UI */}
      <div className={styles.overlay}>
        {/* Atas */}
        <div className="w-full flex justify-center">
          {isLoaded && !markerFound && (
            <div className="p-3 bg-sky-600 bg-opacity-80 rounded-full text-center shadow-lg pointer-events-auto">
              <p className="text-white font-semibold text-sm md:text-base">Arahkan kamera pada marker</p>
            </div>
          )}
        </div>

        {/* Bawah */}
        <div className="w-full flex justify-between items-end">
          {markerFound && (
            <div className="bg-black bg-opacity-70 p-4 rounded-lg shadow-xl text-white max-w-xs pointer-events-auto">
              <h3 className="font-bold text-lg border-b border-gray-500 pb-2 mb-2">Resistor</h3>
              <p className="text-sm">Ini adalah komponen elektronika yang berfungsi untuk menghambat dan mengatur arus listrik.</p>
            </div>
          )}
          <div className="flex-grow" />
          <Link to="/" className="bg-sky-800 bg-opacity-80 text-white p-4 rounded-full shadow-lg hover:bg-sky-700 transition pointer-events-auto">
            <FaHome size={24} />
          </Link>
        </div>

        {/* Loading */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 pointer-events-auto">
            <p className="text-white text-xl font-bold animate-pulse">Memuat Komponen AR...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ARPage;
