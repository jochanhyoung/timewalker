import { MapPin, Search } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import parkMapImage from 'figma:asset/9cb003839a006888887ce6e4a2c9f9645c607031.png';

interface LocationScreenProps {
  onStartTour: () => void;
  onFindOtherLocation: () => void;
}

export function LocationScreen({ onStartTour, onFindOtherLocation }: LocationScreenProps) {
  const [isNearLocation, setIsNearLocation] = useState(false);

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col pb-16">
      {/* Header */}
      <div className="px-6 pt-8 pb-6">
        <h2 className="mb-2" style={{ 
          fontFamily: 'Georgia, serif',
          fontSize: '1.75rem'
        }}>
          현장 체험 장소
        </h2>
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-400" />
          <p style={{ 
            fontFamily: 'Georgia, serif',
            fontSize: '1.5rem'
          }}>
            5·18 기념공원
          </p>
        </div>
      </div>

      {/* Map Area - Navigation Style */}
      <div className="flex-1 relative bg-white overflow-hidden">
        {/* Park Map Background */}
        <img
          src={parkMapImage}
          alt="5·18 기념공원 지도"
          className="absolute inset-0 w-full h-full object-contain"
        />
        
        {/* Light overlay for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/40 via-transparent to-gray-950/60" />

        {/* Navigation Route SVG - Following actual roads on map */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 600">
          {/* Route Background (wider) - Following road network to 5·18 기념공원 */}
          <path
            d="M 180 550 L 180 500 L 180 450 L 180 400 L 180 350 L 200 330 L 220 310 L 240 290 L 260 270 L 280 250 L 290 240 L 300 220 L 305 210 L 308 200"
            stroke="#1e40af"
            strokeWidth="22"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.35"
          />
          
          {/* Main Route Path */}
          <path
            d="M 180 550 L 180 500 L 180 450 L 180 400 L 180 350 L 200 330 L 220 310 L 240 290 L 260 270 L 280 250 L 290 240 L 300 220 L 305 210 L 308 200"
            stroke="#3b82f6"
            strokeWidth="11"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Direction Arrows on Route */}
          <g>
            <path d="M 180 510 L 175 520 L 185 520 Z" fill="#fff" opacity="0.95" />
            <path d="M 180 460 L 175 470 L 185 470 Z" fill="#fff" opacity="0.95" />
            <path d="M 180 410 L 175 420 L 185 420 Z" fill="#fff" opacity="0.95" />
            <path d="M 210 320 L 205 330 L 215 330 Z" fill="#fff" opacity="0.95" />
            <path d="M 250 280 L 245 290 L 255 290 Z" fill="#fff" opacity="0.95" />
            <path d="M 290 240 L 285 250 L 295 250 Z" fill="#fff" opacity="0.95" />
          </g>
          
          {/* Current Location (Navigation Arrow) - 남쪽 출발점 */}
          <g>
            {/* Pulsing circle */}
            <circle cx="180" cy="550" r="28" fill="#3b82f6" opacity="0.3">
              <animate attributeName="r" from="28" to="45" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.3" to="0" dur="2s" repeatCount="indefinite" />
            </circle>
            {/* Navigation marker */}
            <circle cx="180" cy="550" r="20" fill="#3b82f6" stroke="#fff" strokeWidth="5" />
            <path d="M 180 540 L 174 556 L 186 556 Z" fill="#fff" />
          </g>
          
          {/* Destination Marker - 5·18 기념공원 (matches red marker on map) */}
          <g>
            {/* Pin glow */}
            <circle cx="308" cy="200" r="14" fill="#ef4444" opacity="0.35">
              <animate attributeName="r" from="14" to="22" dur="1.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.35" to="0" dur="1.5s" repeatCount="indefinite" />
            </circle>
            {/* Pin shape - matching Google Maps style red pin */}
            <path d="M 308 178 Q 296 188 296 200 Q 296 212 308 226 Q 320 212 320 200 Q 320 188 308 178 Z" 
                  fill="#ef4444" stroke="#fff" strokeWidth="3" />
            <circle cx="308" cy="198" r="6" fill="#fff" />
          </g>
          
          {/* Waypoint markers along the route */}
          <g>
            <circle cx="180" cy="450" r="5" fill="#fff" opacity="0.8" />
            <circle cx="180" cy="350" r="5" fill="#fff" opacity="0.8" />
            <circle cx="220" cy="310" r="5" fill="#fff" opacity="0.8" />
            <circle cx="270" cy="260" r="5" fill="#fff" opacity="0.8" />
          </g>
        </svg>

        {/* Top Navigation Card - Turn by Turn Style */}
        <div className="absolute top-4 left-4 right-4">
          <div className="bg-white text-gray-950 rounded-2xl shadow-2xl overflow-hidden">
            {/* Main Direction */}
            <div className="p-5 flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 19V5M12 5l-7 7M12 5l7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-3xl mb-1" style={{ fontFamily: 'Georgia, serif' }}>450m</p>
                <p className="text-sm text-gray-600">직진 후 우회전 - 5·18 기념공원</p>
              </div>
            </div>
            
            {/* Distance & Time Bar */}
            <div className="bg-blue-50 px-5 py-3 flex items-center justify-between border-t border-gray-200">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-sm">도보 6분</span>
              </div>
              <button
                onClick={() => setIsNearLocation(!isNearLocation)}
                className={`px-4 py-1.5 rounded-lg text-xs transition-all ${
                  isNearLocation 
                    ? 'bg-green-600 text-white' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isNearLocation ? '✓ 위치 확인됨' : '위치 확인'}
              </button>
            </div>
          </div>
        </div>

        {/* ETA Card - Bottom */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-gray-950/90 backdrop-blur-md rounded-xl p-4 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 mb-1">도착 예정</p>
                <p className="text-xl" style={{ fontFamily: 'Georgia, serif' }}>
                  오후 2:15
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400 mb-1">남은 거리</p>
                <p className="text-xl text-blue-400" style={{ fontFamily: 'Georgia, serif' }}>
                  450m
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400 mb-1">남은 시간</p>
                <p className="text-xl text-green-400" style={{ fontFamily: 'Georgia, serif' }}>
                  6분
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Area */}
      <div className="px-6 py-8 space-y-4 bg-gray-900">
        <button
          onClick={onStartTour}
          disabled={!isNearLocation}
          className={`w-full py-4 px-6 rounded-2xl transition-all ${
            isNearLocation
              ? 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
              : 'bg-gray-700 text-gray-400 cursor-not-allowed opacity-50'
          }`}
          style={{ fontFamily: 'Georgia, serif' }}
        >
          {isNearLocation ? '투어 시작하기' : '투어 시작하기 (특정 지점 도착 필요)'}
        </button>
        <button
          onClick={onFindOtherLocation}
          className="w-full py-4 px-6 bg-white/10 text-white border border-white/20 rounded-2xl backdrop-blur-sm transition-all hover:bg-white/20 active:scale-95 flex items-center justify-center gap-2"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          <Search className="w-5 h-5" />
          다른 장소 찾아보기
        </button>
      </div>
    </div>
  );
}