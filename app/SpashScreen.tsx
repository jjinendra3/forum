import { useState, useEffect } from 'react';

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [exit, setExit] = useState(false);

  useEffect(() => {
    // Wait 2.5s, then trigger exit animation
    const timer = setTimeout(() => {
      setExit(true);
      // After the dust animation (1s), complete the splash
      const exitTimer = setTimeout(() => {
        onComplete();
      }, 1000);
      return () => clearTimeout(exitTimer);
    }, 1500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black z-50 flex items-center justify-center ${
          exit ? 'animate-dustDisappear' : ''
        }`}
      >
        <div className="text-center">
          <h1
            className={`text-4xl md:text-6xl font-bold text-white ${
              exit
                ? 'animate-dustText'
                : 'opacity-0 animate-[fadeIn_1s_ease-in-out_forwards]'
            }`}
          >
            Minimal Forum
          </h1>
          <div
            className={`mt-4 h-1 w-0 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto ${
              exit
                ? 'animate-dustLine'
                : 'animate-[growWidth_1.5s_ease-in-out_forwards]'
            }`}
          ></div>
        </div>
      </div>
      <style jsx>{`
        @keyframes dustDisappear {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.05);
          }
          100% {
            opacity: 0;
            transform: scale(1.2);
          }
        }
        .animate-dustDisappear {
          animation: dustDisappear 1s forwards;
        }
        @keyframes dustText {
          0% {
            opacity: 1;
            filter: blur(0px);
          }
          100% {
            opacity: 0;
            filter: blur(4px);
          }
        }
        .animate-dustText {
          animation: dustText 1s forwards;
        }
        @keyframes dustLine {
          0% {
            opacity: 1;
            filter: blur(0px);
          }
          100% {
            opacity: 0;
            filter: blur(4px);
          }
        }
        .animate-dustLine {
          animation: dustLine 1s forwards;
        }
      `}</style>
    </>
  );
};

export default SplashScreen;
