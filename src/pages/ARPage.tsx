"use client";

import "aframe";
import { Scene, Entity } from "aframe-react";
import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import styles from "./ARPage.module.css";

const ARPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [markerFound, setMarkerFound] = useState(false);
  const sceneRef = useRef<Scene | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Force camera permissions and setup
    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "environment",
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        });
        // Stop the stream immediately as AR.js will handle it
        stream.getTracks().forEach((track) => track.stop());
      } catch (error) {
        console.error("Camera access error:", error);
      }
    };

    initCamera();

    return () => {
      // Cleanup all video streams
      const videos = document.querySelectorAll("video");
      videos.forEach((video) => {
        video.pause();
        if (video.srcObject) {
          const stream = video.srcObject as MediaStream;
          stream.getTracks().forEach((track) => track.stop());
        }
        video.srcObject = null;
      });
    };
  }, []);

  const handleGoHome = () => {
    const videos = document.querySelectorAll("video");
    videos.forEach((video) => {
      video.pause();
      if (video.srcObject) {
        const stream = video.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
      video.srcObject = null;
    });

    navigate("/");
  };

  return (
    <div className={`${styles.container}`}>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, viewport-fit=cover" />
        <script src="https://aframe.io/releases/1.4.2/aframe.min.js"></script>
        <script src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js"></script>
      </Helmet>

      <Scene
        ref={sceneRef}
        embedded
        vr-mode-ui="enabled: false"
        renderer="logarithmicDepthBuffer: true; antialias: true; alpha: true;"
        arjs="trackingMethod: best; sourceType: webcam; debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3; cameraParametersUrl: data/camera_para.dat; maxDetectionRate: 60; canvasWidth: 640; canvasHeight: 480;"
        className={styles.arScene}
        events={{
          loaded: () => {
            console.log("AR Scene loaded");
            setIsLoaded(true);
          },
        }}
      >
        <Entity
          primitive="a-marker"
          type="pattern"
          url="/assets/resistor.patt"
          events={{
            markerFound: () => {
              console.log("Marker found");
              setMarkerFound(true);
            },
            markerLost: () => {
              console.log("Marker lost");
              setMarkerFound(false);
            },
          }}
        >
          <Entity gltf-model="url(/assets/resistor.glb)" scale="0.05 0.05 0.05" position="0 0 0" rotation="-90 0 0" animation="property: rotation; to: -90 360 0; loop: true; dur: 10000" />
        </Entity>

        <Entity primitive="a-entity" camera />
      </Scene>

      <div className={styles.overlay}>
        {/* Status message */}
        <div className={styles.topMessage}>
          {isLoaded && !markerFound && (
            <div className={styles.instructionBox}>
              <p className="text-white font-semibold text-sm md:text-base">📱 Arahkan kamera pada marker resistor</p>
            </div>
          )}
        </div>

        {/* Bottom controls and info */}
        <div className={styles.bottomControls}>
          {markerFound && (
            <div className={styles.infoBox}>
              <h3 className="font-bold text-lg border-b border-gray-500 pb-2 mb-2">🔌 Resistor</h3>
              <p className="text-sm">Komponen elektronika yang berfungsi untuk menghambat dan mengatur arus listrik dalam rangkaian elektronik.</p>
              <div className="mt-2 text-xs text-gray-300">💡 Nilai resistansi diukur dalam satuan Ohm (Ω)</div>
            </div>
          )}

          <button onClick={handleGoHome} className={styles.homeButton} aria-label="Kembali ke beranda">
            <FaHome size={24} />
          </button>
        </div>

        {/* Loading screen */}
        {!isLoaded && (
          <div className={styles.loadingScreen}>
            <div className={styles.loadingContent}>
              <div className={styles.spinner}></div>
              <p className="text-white text-xl font-bold mt-4">🚀 Memuat Komponen AR...</p>
              <p className="text-gray-300 text-sm mt-2">Pastikan kamera diizinkan untuk akses</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ARPage;
