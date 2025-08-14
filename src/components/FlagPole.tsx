import React from 'react';
 
interface FlagPoleProps {
  isHoisted: boolean;
  isUnfurling: boolean;
}
 
const FlagPole: React.FC<FlagPoleProps> = ({ isHoisted=true, isUnfurling }) => {
  return (
    <div className="relative flex flex-col items-center h-96">
      {/* Pole */}
      <div className="relative w-3 rounded-sm shadow-xl bg-gradient-to-b from-gray-400 to-gray-700 h-80">
        {/* Pulley at top */}
        <div className="absolute -top-3 -left-1.5 w-6 h-6 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full shadow-lg border border-gray-500"></div>
        
        {/* Flag */}
        <div
          className={`absolute left-0 top-6 flag-hoist transform ${
            isHoisted ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-40 opacity-60 '
          }`}
        >
          <div className="relative">
            {/* Flag with animation */}
            <div className={`shadow-2xl transform-gpu border border-gray-300 transition-all duration-1000 origin-left ${
              !isHoisted ? 'w-8 h-32 bg-gradient-to-b from-orange-500 via-white to-green-600' :
              !isUnfurling ? 'w-8 h-32 bg-gradient-to-b from-orange-500 via-white to-green-600' :
              'w-48 h-32'
            } ${isUnfurling && isHoisted ? 'animate-wave' : ''}`}>
              {/* Folded flag state */}
              {(!isHoisted || !isUnfurling) && (
                <div className="relative w-full h-full bg-gradient-to-b from-orange-500 via-white to-green-600">
                  {/* Folded flag texture */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10"></div>
                </div>
              )}
              
              {/* Unfurled flag state */}
              {isHoisted && isUnfurling && (
                <>
              {/* Saffron stripe */}
              <div className="relative overflow-hidden h-1/3 bg-gradient-to-r from-orange-500 to-orange-600">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
              </div>
              
              {/* White stripe with Ashoka Chakra */}
              <div className="relative flex items-center justify-center bg-white h-1/3">
                {/* Ashoka Chakra */}
                <div className={`w-8 h-8 relative ${isUnfurling ? 'animate-spin-slow' : ''}`}>
                  <div className="absolute inset-0 border-2 border-blue-900 rounded-full shadow-sm"></div>
                  {/* Chakra spokes */}
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-px h-4 origin-bottom bg-blue-900 left-1/2 top-1/2"
                      style={{
                        transform: `translate(-50%, -100%) rotate(${i * 15}deg)`,
                      }}
                    />
                  ))}
                </div>
              </div>
              
              {/* Green stripe */}
              <div className="relative overflow-hidden h-1/3 bg-gradient-to-r from-green-600 to-green-700">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
              </div>
                </>
              )}
            </div>
            
            {/* Flag rope */}
            <div className="absolute left-0 top-0 w-0.5 h-32 bg-gray-500 shadow-sm"></div>
          </div>
        </div>
      </div>
      
      {/* Base */}
      <div className="w-16 h-8 border border-gray-600 shadow-xl bg-gradient-to-b from-gray-500 to-gray-800 rounded-b-xl"></div>
      
      
     
      
      <style>{`
        @keyframes wave {
          0%, 100% { transform: translateX(0) rotateY(0deg); }
          25% { transform: translateX(2px) rotateY(-5deg); }
          75% { transform: translateX(-2px) rotateY(5deg); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-wave {
          animation: wave 2s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
};
 
export default FlagPole;