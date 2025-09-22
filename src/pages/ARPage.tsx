import "aframe";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const ARPage = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <Helmet>
        <script src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js"></script>
      </Helmet>

      {/* Tombol kembali */}
      <Link
        to="/"
        className="absolute top-4 left-4 z-10 
                   bg-sky-600 text-white px-3 sm:px-4 py-2 
                   rounded-md font-bold shadow-lg 
                   text-sm sm:text-base
                   hover:bg-sky-700 transition"
      >
        Kembali ke Menu
      </Link>

      {/* A-Frame Scene */}
      <a-scene embedded vr-mode-ui="enabled: false" arjs="sourceType: webcam; debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3;" className="w-full h-full">
        <a-marker type="pattern" url="/assets/resistor.patt">
          <a-entity gltf-model="url(/assets/resistor.glb)" scale="0.05 0.05 0.05" position="0 0 0" rotation="-90 0 0" />
        </a-marker>

        <a-entity camera></a-entity>
      </a-scene>
    </div>
  );
};

export default ARPage;
