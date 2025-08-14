import { useState, useRef } from "react";
import FlagPole from "./components/FlagPole";
import FlowerPetals from "./components/FlowerPetals";
import "./App.css";

function App() {
  const [isHoisted, setIsHoisted] = useState(false);
  const [isUnfurling, setIsUnfurling] = useState(false);
  const [showFlowers, setShowFlowers] = useState(false);
  const [isAnthemPlaying, setIsAnthemPlaying] = useState(false);
  const [showAnthemNotice, setShowAnthemNotice] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const timeoutRef = useRef<number | null>(null);
  const unfurlTimeoutRef = useRef<number | null>(null);
  const flowerTimeoutRef = useRef<number | null>(null);
  const anthemTimeoutRef = useRef<number | null>(null);

  const handleHoistFlag = () => {
    if (!isHoisted) {
      setIsHoisted(true);

      // Start unfurling after flag reaches the top (3 seconds)
      unfurlTimeoutRef.current = setTimeout(() => {
        setIsUnfurling(true);
      }, 3000);

      // Show anthem notice after flowers start (5 seconds)
      timeoutRef.current = setTimeout(() => {
        setShowAnthemNotice(true);
      }, 5000);

      // Start anthem after notice (7 seconds total)
      anthemTimeoutRef.current = setTimeout(() => {
        setShowAnthemNotice(false);
        setIsAnthemPlaying(true);
        setShowFlowers(true);
        if (audioRef.current) {
          audioRef.current.play().catch(console.error);
        }
      }, 6000);
    } else {
      // Clear all timeouts
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (unfurlTimeoutRef.current) {
        clearTimeout(unfurlTimeoutRef.current);
        unfurlTimeoutRef.current = null;
      }
      if (flowerTimeoutRef.current) {
        clearTimeout(flowerTimeoutRef.current);
        flowerTimeoutRef.current = null;
      }
      if (anthemTimeoutRef.current) {
        clearTimeout(anthemTimeoutRef.current);
        anthemTimeoutRef.current = null;
      }

      setIsHoisted(false);
      setIsUnfurling(false);
      setShowFlowers(false);
      setIsAnthemPlaying(false);
      setShowAnthemNotice(false);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  };

  const handleAnthemEnd = () => {
    setIsAnthemPlaying(false);
    setShowFlowers(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-300 via-white to-green-300 relative overflow-hidden pt-10">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0">
        {/* Saffron gradient overlay */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-orange-200/30 to-transparent"></div>
        {/* Green gradient overlay */}
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-green-200/30 to-transparent"></div>

        {/* Decorative circles */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-orange-300/20 rounded-full blur-xl animate-pulse"></div>
        <div
          className="absolute top-40 right-32 w-24 h-24 bg-green-300/20 rounded-full blur-lg animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-32 left-1/4 w-40 h-40 bg-blue-300/15 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-20 right-20 w-28 h-28 bg-orange-300/25 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>

      {/* National Anthem Audio */}
      <audio ref={audioRef} onEnded={handleAnthemEnd} preload="auto">
        <source src="/national-anthem.mp3" type="audio/mpeg" />
        {/* Fallback message for browsers that don't support audio */}
        Your browser does not support the audio element.
      </audio>

      {/* Falling Flower Petals */}
      <FlowerPetals isActive={showFlowers} />

      {/* Anthem Notice */}
      {/* LNS Logo */}
      <div className="fixed top-8 left-8 z-50">
        <img
          src="/lnsLogo.png"
          alt="LNS Logo"
          className="h-22 w-auto hover:scale-105 transition-transform duration-300 drop-shadow-lg"
        />
      </div>

      {/* Anthem Notice */}
      {showAnthemNotice && (
        <div className="fixed top-8 right-8 z-50 bg-white/90 backdrop-blur-sm border-2 border-orange-500 rounded-xl px-8 py-4 shadow-2xl animate-pulse">
          <p className="text-orange-600 font-semibold text-center">
            🎵 National Anthem Starting...
          </p>
        </div>
      )}

      {/* Playing Indicator */}
      {isAnthemPlaying && (
        <div className="fixed top-8 right-8 z-50 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl px-8 py-4 shadow-2xl">
          <p className="font-semibold text-center flex items-center">
            <span className="animate-pulse mr-2">🎵</span>
            Playing National Anthem
            <span className="animate-pulse ml-2">🎵</span>
          </p>
        </div>
      )}

      <div className="flex flex-col items-center justify-center min-h-screen text-center relative z-10">
        {/* Flag Section */}
        <div className="mb-12">
          <FlagPole isHoisted={isHoisted} isUnfurling={isUnfurling} />
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          <span className="gradient-text">79th Independence Day</span>{" "}
        </h1>

        <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl">
          Celebrate the spirit of freedom with our virtual flag hoisting
          ceremony
        </p>

        <button
          onClick={handleHoistFlag}
          className={`px-12 py-5 rounded-full font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl ${
            isHoisted
              ? "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 border-2 border-red-400"
              : "bg-gradient-to-r from-orange-500 via-white to-green-500 text-gray-800 hover:shadow-xl border-2 border-orange-400"
          }`}
        >
          {isHoisted ? "Lower the Flag" : "Hoist the Flag"}
        </button>

        {/* Patriotic Quote */}
        <div className="mt-8 p-6 bg-white/50 backdrop-blur-sm rounded-2xl shadow-lg max-w-2xl">
          <p className="text-lg italic text-gray-700">
            "Celebrate freedom with kindness and courage."
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
