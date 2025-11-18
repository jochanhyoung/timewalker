import { ImageWithFallback } from './figma/ImageWithFallback';
import backgroundImage from 'figma:asset/e9eeb0bfb7614ba756cb2260a182916bfc0ea56e.png';

interface LandingScreenProps {
  onStart: () => void;
  onInstitutionLogin: () => void;
}

export function LandingScreen({ onStart, onInstitutionLogin }: LandingScreenProps) {
  return (
    <div className="relative min-h-screen w-full flex flex-col pb-16 overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0">
        <img
          src={backgroundImage}
          alt="5·18 기념공원"
          className="w-full h-full object-cover"
          style={{
            animation: 'slideBackground 60s ease-in-out infinite',
            objectPosition: 'center'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen px-6 py-8 text-white justify-center">
        {/* Top Stats - Large and Animated */}
        <div className="text-center mb-8 px-4">
          <p 
            className="animate-pulse leading-tight"
            style={{ 
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(1.5rem, 8vw, 3rem)',
              animation: 'fadeInOut 3s ease-in-out infinite'
            }}
          >
            <span className="block">타임워커는</span>
            <span className="block mt-2">127,457개의</span>
            <span className="block mt-2">문화유산과</span>
            <span className="block mt-2">함께하는 중</span>
          </p>
        </div>

        {/* Center Content */}
        <div className="flex flex-col items-center justify-center">
          {/* Logo/Title */}
          <div className="text-center mb-12">
            <h1 className="mb-6" style={{ 
              fontFamily: 'Georgia, serif',
              fontSize: '3rem',
              fontWeight: '600',
              letterSpacing: '-0.02em'
            }}>
              타임워커
            </h1>
            <p className="opacity-90" style={{ 
              fontFamily: 'Georgia, serif',
              fontSize: '1.25rem',
              letterSpacing: '0.02em'
            }}>
              역사를 걷고, 과거와 대화하다
            </p>
          </div>

          {/* Buttons */}
          <div className="w-full max-w-sm space-y-4">
            <button
              onClick={onStart}
              className="w-full py-4 px-6 bg-white text-gray-900 rounded-2xl transition-all hover:bg-gray-100 active:scale-95"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              현재 위치로 시작하기
            </button>
            <button
              onClick={onInstitutionLogin}
              className="w-full py-4 px-6 bg-white/10 text-white border border-white/30 rounded-2xl backdrop-blur-sm transition-all hover:bg-white/20 active:scale-95"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              기관 로그인
            </button>
          </div>
        </div>

        {/* Bottom Spacing */}
        <div className="h-12" />
      </div>
    </div>
  );
}