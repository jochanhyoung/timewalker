import backgroundImage from 'figma:asset/e9eeb0bfb7614ba756cb2260a182916bfc0ea56e.png';

interface LandingScreenProps {
  onStart: () => void;
}

export function LandingScreen({ onStart }: LandingScreenProps) {
  return (
    <div className="relative min-h-screen w-full flex flex-col pb-16 overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0">
        <img
          src={backgroundImage}
          alt="5·18 기념관"
          className="w-full h-full object-cover"
          style={{
            animation: 'slideBackground 60s ease-in-out infinite',
            objectPosition: 'center'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen px-6 py-8 text-white justify-between items-center">
        {/* Top/Center Content */}
        <div className="flex-1 flex flex-col items-center justify-center max-w-md w-full">
          {/* Logo/Title */}
          <div className="text-center">
            <h1 className="mb-8" style={{ 
              fontFamily: 'Georgia, serif',
              fontSize: '4rem',
              fontWeight: '600',
              letterSpacing: '-0.02em'
            }}>
              타임워커
            </h1>
            <p className="opacity-90 mb-2" style={{ 
              fontFamily: 'Georgia, serif',
              fontSize: '1.5rem',
              letterSpacing: '0.02em'
            }}>
              역사를 걷고,
            </p>
            <p className="opacity-90" style={{ 
              fontFamily: 'Georgia, serif',
              fontSize: '1.5rem',
              letterSpacing: '0.02em'
            }}>
              과거와 대화하다
            </p>
          </div>
        </div>

        {/* Bottom Button */}
        <div className="w-full max-w-md pb-16">
          <button
            onClick={onStart}
            className="w-full py-4 px-6 bg-white text-gray-900 rounded-2xl transition-all hover:bg-gray-100 active:scale-95"
            style={{ fontFamily: 'Georgia, serif', fontSize: '1.125rem' }}
          >
            현재 위치로 시작하기
          </button>
        </div>
      </div>
    </div>
  );
}