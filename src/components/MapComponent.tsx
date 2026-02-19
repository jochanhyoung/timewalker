import { useEffect, useState, useRef } from 'react';
import { MapPin, Navigation } from 'lucide-react';

interface MapComponentProps {
  onLocationDetected?: (lat: number, lng: number) => void;
}

export function MapComponent({ onLocationDetected }: MapComponentProps) {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const hasDetected = useRef(false);

  useEffect(() => {
    if (hasDetected.current) return;

    // Get current position using Geolocation API
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          setPosition({ lat, lng });
          setLoading(false);
          if (!hasDetected.current && onLocationDetected) {
            hasDetected.current = true;
            onLocationDetected(lat, lng);
          }
        },
        (err) => {
          // GPS 사용 불가 시 기본 위치 사용 (에러 로그 제거)
          let errorMessage = '위치 정보를 가져올 수 없습니다.';
          
          if (err.code === 1) {
            errorMessage = '위치 권한이 필요합니다. 기본 위치를 사용합니다.';
          } else if (err.code === 2) {
            errorMessage = '위치 정보를 사용할 수 없습니다. 기본 위치를 사용합니다.';
          } else if (err.code === 3) {
            errorMessage = '위치 요청 시간이 초과되었습니다. 기본 위치를 사용합니다.';
          }
          
          setError(errorMessage);
          // Default to 5·18 기념관 for testing
          const defaultLat = 35.1466;
          const defaultLng = 126.9175;
          setPosition({ lat: defaultLat, lng: defaultLng });
          setLoading(false);
          if (!hasDetected.current && onLocationDetected) {
            hasDetected.current = true;
            onLocationDetected(defaultLat, defaultLng);
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      setError('브라우저가 위치 정보를 지원하지 않습니다. 기본 위치를 사용합니다.');
      // Default to 5·18 기념관
      const defaultLat = 35.1466;
      const defaultLng = 126.9175;
      setPosition({ lat: defaultLat, lng: defaultLng });
      setLoading(false);
      if (!hasDetected.current && onLocationDetected) {
        hasDetected.current = true;
        onLocationDetected(defaultLat, defaultLng);
      }
    }
  }, []); // 의존성 배열을 비워서 한 번만 실행

  if (loading) {
    return (
      <div className="w-full h-64 rounded-2xl bg-gray-800 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p style={{ fontFamily: 'Georgia, serif' }}>위치 정보 가져오는 중...</p>
        </div>
      </div>
    );
  }

  if (!position) {
    return (
      <div className="w-full h-64 rounded-2xl bg-gray-800 flex items-center justify-center">
        <div className="text-white text-center px-4">
          <MapPin className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p style={{ fontFamily: 'Georgia, serif' }}>{error || '위치를 찾을 수 없습니다.'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden shadow-lg border border-white/20 relative">
      {/* Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black">
        {/* Grid pattern for map feel */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
        
        {/* Center marker */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="relative animate-pulse">
            <div 
              className="absolute -top-8 left-1/2 transform -translate-x-1/2"
              style={{
                width: '32px',
                height: '32px',
                backgroundColor: '#dc2626',
                borderRadius: '50% 50% 50% 0',
                transform: 'translate(-50%, 0) rotate(-45deg)',
                border: '3px solid white',
                boxShadow: '0 4px 12px rgba(220, 38, 38, 0.5)'
              }}
            >
              <div style={{
                width: '12px',
                height: '12px',
                backgroundColor: 'white',
                borderRadius: '50%',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              }} />
            </div>
            
            {/* Ping animation circles */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-16 h-16 rounded-full bg-red-500/20 animate-ping" />
            </div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-12 h-12 rounded-full bg-red-500/30 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Decorative roads/paths */}
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
          <path d="M 0 200 Q 100 150 200 200 T 400 200" stroke="rgba(255,255,255,0.3)" strokeWidth="2" fill="none" />
          <path d="M 200 0 Q 150 100 200 200 T 200 400" stroke="rgba(255,255,255,0.3)" strokeWidth="2" fill="none" />
          <circle cx="120" cy="180" r="30" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="rgba(255,255,255,0.05)" />
          <circle cx="280" cy="220" r="25" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="rgba(255,255,255,0.05)" />
        </svg>
      </div>

      {/* Location info overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <Navigation className="w-5 h-5" />
            <div style={{ fontFamily: 'Georgia, serif', fontSize: '0.875rem' }}>
              <div className="opacity-70">현재 위치</div>
              <div className="text-xs opacity-50">
                {position.lat.toFixed(4)}°N, {position.lng.toFixed(4)}°E
              </div>
            </div>
          </div>
          <div className="text-xs opacity-50" style={{ fontFamily: 'Georgia, serif' }}>
            {error ? 'GPS 대기 중' : 'GPS 활성'}
          </div>
        </div>
      </div>

      {/* Compass indicator */}
      <div className="absolute top-4 right-4">
        <div className="w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full border border-white/20 flex items-center justify-center">
          <div className="text-white text-xs" style={{ fontFamily: 'Georgia, serif' }}>N</div>
        </div>
      </div>

      {/* Error notification if GPS failed */}
      {error && (
        <div className="absolute top-4 left-4 right-16 bg-yellow-600/90 backdrop-blur-sm rounded-lg p-3 border border-yellow-400">
          <p className="text-white text-xs" style={{ fontFamily: 'Georgia, serif' }}>
            ⚠️ {error}
          </p>
        </div>
      )}
    </div>
  );
}