import { MapPin, AlertTriangle, Mic, Type } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import parkMapImage from 'figma:asset/9cb003839a006888887ce6e4a2c9f9645c607031.png';

interface PuzzleScreenProps {
  selectedPersona: string;
  onComplete: () => void;
}

const personaNames: Record<string, string> = {
  soldier: '군인',
  citizen: '시민',
  student: '학생'
};

const puzzleQuestions: Record<string, { mission: string; question: string }> = {
  soldier: {
    mission: '명령을 따라야 하지만... 양심이 허락하지 않는다. 안전한 경로를 찾아야 해.',
    question: '동료 군인이 누군가를 끌고가고 있는데? 누굴 왜 끌고 가는걸까?'
  },
  citizen: {
    mission: '군대가 오고있어... 표시된 지역을 피해서 접선장소에서 만나자',
    question: '광장에 모인 사람들은 무엇을 요구하고 있을까?'
  },
  student: {
    mission: '군대가 오고있어... 표시된 지역을 피해서 접선장소에서 만나자',
    question: '동료 군인이 누군가를 끌고가고 있는데? 누굴 왜 끌고 가는걸까?'
  }
};

export function PuzzleScreen({ selectedPersona, onComplete }: PuzzleScreenProps) {
  const [currentPath, setCurrentPath] = useState<'safe' | 'danger' | null>(null);
  const [showUserAnswer, setShowUserAnswer] = useState(false);
  const [showCharacterResponse, setShowCharacterResponse] = useState(false);
  
  const personaName = personaNames[selectedPersona] || '가이드';
  const puzzle = puzzleQuestions[selectedPersona];

  const handleFirstAnswer = () => {
    setCurrentPath('safe');
    setShowUserAnswer(true);
    // Show character response after user answer
    setTimeout(() => {
      setShowCharacterResponse(true);
    }, 500);
  };

  const handleSecondAnswer = () => {
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col pb-16">
      {/* Header with Mission */}
      <div className="px-6 py-6 bg-gradient-to-b from-red-950/40 to-gray-950">
        <div className="flex items-start gap-3 mb-4">
          <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <p className="text-red-300 text-sm mb-1">긴급 미션</p>
            <p style={{ fontFamily: 'Georgia, serif' }}>
              {puzzle.mission}
            </p>
          </div>
        </div>
      </div>

      {/* Map Area with Danger Zones - Navigation Style */}
      <div className="relative bg-white border-y border-gray-300 h-64 overflow-hidden">
        {/* Park Map Background */}
        <img
          src={parkMapImage}
          alt="5·18 기념공원 지도"
          className="absolute inset-0 w-full h-full object-contain"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-red-950/45 via-transparent to-gray-950/60" />
        
        {/* Map with danger zones */}
        <div className="absolute inset-0">
          {/* Navigation SVG - Based on actual road map */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 256">
            {/* Danger zones on the map */}
            {/* 위험구역 1 - 북동쪽 */}
            <g>
              <circle cx="320" cy="60" r="35" fill="#ef4444" opacity="0.35" />
              <circle cx="320" cy="60" r="38" fill="none" stroke="#ef4444" strokeWidth="3" strokeDasharray="6,3">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 320 60"
                  to="360 320 60"
                  dur="10s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="320" cy="60" r="9" fill="#ef4444" stroke="#fff" strokeWidth="2.5" />
              <text x="320" y="42" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>⚠ 위험</text>
            </g>
            
            {/* 위험구역 2 - 남서쪽 */}
            <g>
              <circle cx="100" cy="180" r="40" fill="#ef4444" opacity="0.35" />
              <circle cx="100" cy="180" r="43" fill="none" stroke="#ef4444" strokeWidth="3" strokeDasharray="6,3">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 100 180"
                  to="360 100 180"
                  dur="10s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="100" cy="180" r="9" fill="#ef4444" stroke="#fff" strokeWidth="2.5" />
              <text x="100" y="162" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>⚠ 위험</text>
            </g>
            
            {/* 위험구역 3 - 중앙 동쪽 */}
            <g>
              <circle cx="260" cy="120" r="32" fill="#ef4444" opacity="0.35" />
              <circle cx="260" cy="120" r="35" fill="none" stroke="#ef4444" strokeWidth="3" strokeDasharray="6,3">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 260 120"
                  to="360 260 120"
                  dur="10s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="260" cy="120" r="9" fill="#ef4444" stroke="#fff" strokeWidth="2.5" />
            </g>
            
            {/* Safe Route - Following roads, avoiding danger zones */}
            <path
              d="M 140 220 L 140 200 L 140 180 L 155 165 L 170 150 L 185 135 L 200 120 L 200 100 L 200 80 L 210 70 L 220 60 L 240 50"
              stroke="#065f46"
              strokeWidth="14"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.6"
            />
            <path
              d="M 140 220 L 140 200 L 140 180 L 155 165 L 170 150 L 185 135 L 200 120 L 200 100 L 200 80 L 210 70 L 220 60 L 240 50"
              stroke="#10b981"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            
            {/* Direction arrows on safe path */}
            <g>
              <path d="M 140 200 L 135 210 L 145 210 Z" fill="#fff" opacity="0.95" />
              <path d="M 162 158 L 157 168 L 167 168 Z" fill="#fff" opacity="0.95" />
              <path d="M 200 100 L 195 110 L 205 110 Z" fill="#fff" opacity="0.95" />
              <path d="M 220 65 L 215 75 L 225 75 Z" fill="#fff" opacity="0.95" />
            </g>
            
            {/* Current location */}
            <g>
              <circle cx="140" cy="220" r="16" fill="#3b82f6" opacity="0.3">
                <animate attributeName="r" from="16" to="26" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.3" to="0" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="140" cy="220" r="11" fill="#3b82f6" stroke="#fff" strokeWidth="3" />
              <path d="M 140 214 L 136 226 L 144 226 Z" fill="#fff" />
            </g>
            
            {/* Target location - 안전지역 */}
            <g>
              <circle cx="240" cy="50" r="9" fill="#10b981" opacity="0.35">
                <animate attributeName="r" from="9" to="15" dur="1.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.35" to="0" dur="1.5s" repeatCount="indefinite" />
              </circle>
              <path d="M 240 32 Q 232 40 232 50 Q 232 60 240 70 Q 248 60 248 50 Q 248 40 240 32 Z" 
                    fill="#10b981" stroke="#fff" strokeWidth="3" />
              <circle cx="240" cy="49" r="4" fill="#fff" />
              <text x="240" y="88" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>접선지</text>
            </g>
          </svg>
        </div>

        {/* Navigation Info Card - Top */}
        <div className="absolute top-3 left-3 right-3">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 text-gray-950 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-600">안전 경로 (녹색 선)</p>
                <p className="text-sm" style={{ fontFamily: 'Georgia, serif' }}>
                  위험 구역을 피해 이동하세요
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Legend - Bottom */}
        <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md rounded-xl p-3 text-xs space-y-1.5 border border-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
              <div className="w-1 h-1 bg-white" />
            </div>
            <span>현재 위치</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-white text-xs">!</span>
            </div>
            <span>위험 구역</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-1.5 bg-green-500 rounded-full" />
            <span>안전 경로</span>
          </div>
        </div>

        {/* Distance Info - Bottom Right */}
        <div className="absolute bottom-3 right-3 bg-green-600/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
          <p className="text-xs text-green-100">목적지까지</p>
          <p className="text-lg text-white" style={{ fontFamily: 'Georgia, serif' }}>320m</p>
        </div>
      </div>

      {/* Quiz/Question Area */}
      <div className="flex-1 px-6 py-6 space-y-4">
        {/* Character Message */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
            <span style={{ fontFamily: 'Georgia, serif' }}>
              {personaName[0]}
            </span>
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-400 mb-1">{personaName}</p>
            <div className="bg-gray-800 border border-gray-700 rounded-2xl rounded-tl-sm px-4 py-3">
              <p>{puzzle.question}</p>
            </div>
          </div>
        </div>

        {/* Hint/Context Box */}
        {!showUserAnswer && (
          <div className="bg-blue-950/30 border border-blue-800/50 rounded-2xl p-4">
            <div className="flex items-start gap-2">
              <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-blue-300 text-sm mb-1">주변 상황</p>
                <p className="text-sm text-gray-300">
                  거리에는 긴장감이 흐르고 있습니다. 곳곳에서 사람들의 목소리가 들려오고, 
                  군용 차량이 지나가는 소리가 멀리서 들립니다.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* User's Answer */}
        {showUserAnswer && (
          <div className="flex items-start gap-3 justify-end">
            <div className="flex-1 flex flex-col items-end">
              <p className="text-sm text-gray-400 mb-1">나</p>
              <div className="bg-blue-600 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[85%]">
                <p>저 사람들은 민주주의를 요구하고 있는 시민들이에요. 저도 안전하게 이동해서 그들과 함께 하고 싶습니다.</p>
              </div>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span style={{ fontFamily: 'Georgia, serif' }}>나</span>
            </div>
          </div>
        )}

        {/* Character Response after User Answer */}
        {showCharacterResponse && (
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span style={{ fontFamily: 'Georgia, serif' }}>
                {personaName[0]}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-400 mb-1">{personaName}</p>
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-green-800/50 rounded-2xl rounded-tl-sm px-4 py-3">
                <p>좋아요! 지도에 표시된 안전 경로를 따라 이동하면 위험 구역을 피할 수 있을 거예요. 조심히 가요.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Action Buttons */}
      <div className="px-6 py-6 bg-gray-900 border-t border-gray-800">
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={showCharacterResponse ? handleSecondAnswer : handleFirstAnswer}
            className="py-4 px-4 bg-blue-600 text-white rounded-2xl transition-all hover:bg-blue-700 active:scale-95 flex items-center justify-center gap-2"
          >
            <Mic className="w-5 h-5" />
            <span style={{ fontFamily: 'Georgia, serif' }}>대화하기</span>
          </button>
          <button 
            onClick={showCharacterResponse ? handleSecondAnswer : handleFirstAnswer}
            className="py-4 px-4 bg-gray-800 text-white border border-gray-700 rounded-2xl transition-all hover:bg-gray-700 active:scale-95 flex items-center justify-center gap-2"
          >
            <Type className="w-5 h-5" />
            <span style={{ fontFamily: 'Georgia, serif' }}>텍스트로 대답하기</span>
          </button>
        </div>
      </div>
    </div>
  );
}