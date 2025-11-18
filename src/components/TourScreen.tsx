import { MapPin, MessageCircle, Type, Mic } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import parkMapImage from 'figma:asset/9cb003839a006888887ce6e4a2c9f9645c607031.png';
import backgroundImage from 'figma:asset/e9eeb0bfb7614ba756cb2260a182916bfc0ea56e.png';

interface TourScreenProps {
  selectedPersona: string;
  onNextPhase: () => void;
}

const personaNames: Record<string, string> = {
  soldier: '군인',
  citizen: '시민',
  student: '학생'
};

const personaMessages: Record<string, string[]> = {
  soldier: [
    '여기가 그 공원이군요.. 당시에는 완전히 다른 모습이었습니다.',
    '명령과 양심 사이에서 많은 고민을 했었죠.',
  ],
  citizen: [
    '바로 이 자리에서 많은 사람들이 모였었어요.',
    '두려웠지만, 우리는 함께였습니다.',
  ],
  student: [
    '오늘 시위는 공원 앞 나무에서 시작할거야! 거기서 만나자!',
    '친구들과 함께 이곳에서 민주주의를 외쳤어요.',
  ]
};

export function TourScreen({ selectedPersona, onNextPhase }: TourScreenProps) {
  const [messages, setMessages] = useState<Array<{ text: string; sender: 'user' | 'persona' }>>([
    { text: personaMessages[selectedPersona][0], sender: 'persona' }
  ]);
  const [inputValue, setInputValue] = useState('');

  const personaName = personaNames[selectedPersona] || '가이드';

  return (
    <div className="h-screen bg-gray-950 flex flex-col pb-16">
      {/* Header with Location */}
      <div className="fixed inset-0 z-0">
        <img
          src={backgroundImage}
          alt="5·18 기념공원"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/85 via-gray-950/80 to-gray-950/90" />
      </div>

      {/* Content - with relative positioning */}
      <div className="relative z-10 flex flex-col min-h-screen">

      {/* Objective Section */}
      <div className="px-6 py-6 bg-gradient-to-b from-gray-900/60 to-transparent">
        <div className="bg-amber-900/25 border border-amber-700/40 rounded-2xl p-5">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-amber-300 mb-1">현재 목표</p>
              <p className="text-amber-50" style={{ fontFamily: 'Georgia, serif' }}>
                {messages[0].text}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area - Map & Chat */}
      <div className="flex-1 px-6 pb-6 space-y-4">
        {/* Mini Map - Navigation Style */}
        <div className="bg-white border border-gray-300 rounded-2xl overflow-hidden h-48 relative">
          {/* Park Map Background */}
          <img
            src={parkMapImage}
            alt="5·18 기념공원"
            className="absolute inset-0 w-full h-full object-contain"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 via-transparent to-gray-950/40" />
          
          {/* Navigation Elements */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 192">
            {/* Current Location - 5·18 기념공원 내부 */}
            <g>
              <circle cx="200" cy="65" r="12" fill="#3b82f6" opacity="0.3">
                <animate attributeName="r" from="12" to="20" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.3" to="0" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="200" cy="65" r="9" fill="#3b82f6" stroke="#fff" strokeWidth="3" />
              <circle cx="200" cy="65" r="3" fill="#fff" />
            </g>
            
            {/* Next waypoint - 주변 포인트 */}
            <g>
              <circle cx="280" cy="80" r="7" fill="#fbbf24" stroke="#fff" strokeWidth="2.5" />
              <text x="280" y="68" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">다음</text>
            </g>
            
            {/* Walking path */}
            <path
              d="M 200 65 L 220 68 L 240 72 L 260 76 L 280 80"
              stroke="#3b82f6"
              strokeWidth="3"
              fill="none"
              strokeDasharray="4,3"
              strokeLinecap="round"
              opacity="0.7"
            />
          </svg>
          
          {/* Location Info Card */}
          <div className="absolute top-3 left-3 right-3">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 text-gray-950 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-600">현재 위치</p>
                  <p className="text-sm truncate" style={{ fontFamily: 'Georgia, serif' }}>
                    5·18 기념공원 입구
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Map Controls */}
          <div className="absolute bottom-3 right-3">
            <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white transition-colors shadow-lg">
              <MapPin className="w-5 h-5 text-blue-600" />
            </button>
          </div>
        </div>

        {/* Chat Bubbles */}
        <div className="space-y-3">
          {messages.map((msg, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-700 rounded-full flex items-center justify-center flex-shrink-0">
                <span style={{ fontFamily: 'Georgia, serif' }}>
                  {msg.sender === 'persona' ? personaName[0] : '나'}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-amber-400 mb-1">{msg.sender === 'persona' ? personaName : '나'}</p>
                <div className="bg-stone-800/90 border border-amber-900/50 rounded-2xl rounded-tl-sm px-4 py-3">
                  <p className="text-amber-50">{msg.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="px-6 py-6 bg-gray-900/90 backdrop-blur-md border-t border-gray-800 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={onNextPhase}
            className="py-4 px-4 bg-amber-600 text-white rounded-2xl transition-all hover:bg-amber-700 active:scale-95 flex items-center justify-center gap-2"
          >
            <Mic className="w-5 h-5" />
            <span style={{ fontFamily: 'Georgia, serif' }}>대화하기</span>
          </button>
          <button 
            onClick={onNextPhase}
            className="py-4 px-4 bg-stone-800 text-white border border-stone-700 rounded-2xl transition-all hover:bg-stone-700 active:scale-95 flex items-center justify-center gap-2"
          >
            <Type className="w-5 h-5" />
            <span style={{ fontFamily: 'Georgia, serif' }}>텍스트로 대화하기</span>
          </button>
        </div>
        <button
          onClick={onNextPhase}
          className="w-full py-3 text-sm text-amber-400 hover:text-amber-300 transition-colors"
        >
          다음 미션으로 진행 →
        </button>
      </div>
      </div>
    </div>
  );
}