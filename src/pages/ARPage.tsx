import "aframe";
import { Scene, Entity } from "aframe-react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const ARPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [markerFound, setMarkerFound] = useState(false);

  return (
    // Container utama sekarang hanya fokus pada layout
    <div className="w-screen h-screen relative">
      <Helmet>
        <script src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js"></script>
      </Helmet>

      {/* Lapisan AR: Scene A-Frame sebagai background, diletakkan di lapisan paling bawah */}
      <Scene embedded vr-mode-ui="enabled: false" arjs="sourceType: webcam; debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3;" className="absolute top-0 left-0" events={{ loaded: () => setIsLoaded(true) }}>
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
        <Entity camera />
      </Scene>

      {/* Lapisan UI: diletakkan di atas dengan posisi absolut dan z-index */}
      {/* PENTING: pointer-events-none agar bisa interaksi dengan scene di bawahnya */}
      <div className="absolute top-0 left-0 w-full h-full z-10 p-4 flex flex-col justify-between pointer-events-none">
        {/* === UI Bagian Atas === */}
        <div className="w-full flex justify-center">
          {isLoaded && !markerFound && (
            <div className="p-3 bg-sky-600 bg-opacity-80 rounded-full text-center shadow-lg">
              <p className="text-white font-semibold text-sm md:text-base">Arahkan kamera pada marker</p>
            </div>
          )}
        </div>

        {/* === UI Bagian Bawah === */}
        <div className="w-full flex justify-between items-end">
          {/* Kartu Info saat marker ditemukan */}
          {markerFound && (
            <div className="bg-black bg-opacity-70 p-4 rounded-lg shadow-xl text-white max-w-xs pointer-events-auto">
              <h3 className="font-bold text-lg border-b border-gray-500 pb-2 mb-2">Resistor</h3>
              <p className="text-sm">Ini adalah komponen elektronika yang berfungsi untuk menghambat dan mengatur arus listrik.</p>
            </div>
          )}
          {/* Tombol Home (dibuat selalu terlihat) */}
          <div className="flex-grow"></div> {/* Spacer untuk mendorong tombol ke kanan */}
          <Link to="/" className="bg-sky-800 bg-opacity-80 text-white p-4 rounded-full shadow-lg hover:bg-sky-700 transition pointer-events-auto">
            <FaHome size={24} />
          </Link>
        </div>

        {/* Loading Overlay */}
        {!isLoaded && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-70 pointer-events-auto">
            <p className="text-white text-xl font-bold animate-pulse">Memuat Komponen AR...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ARPage;
