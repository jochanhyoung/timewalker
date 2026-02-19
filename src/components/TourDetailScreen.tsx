import { ArrowLeft, MapPin, MessageCircle, Navigation, Calendar, User } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import parkMapImage from 'figma:asset/9cb003839a006888887ce6e4a2c9f9645c607031.png';

interface TourDetail {
  id: string;
  location: string;
  date: string;
  persona: string;
  progress: number;
  thumbnail: string;
  route: Array<{ name: string; time: string; visited: boolean }>;
  conversations: Array<{ sender: 'user' | 'persona'; text: string; time: string }>;
}

interface TourDetailScreenProps {
  tour: TourDetail;
  onBack: () => void;
}

export function TourDetailScreen({ tour, onBack }: TourDetailScreenProps) {
  return (
    <div className="min-h-screen bg-gray-950 text-white pb-16">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gray-900 border-b border-gray-800 px-4 py-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-800 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h2 className="text-amber-100" style={{ fontFamily: 'Georgia, serif' }}>
              {tour.location}
            </h2>
            <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{tour.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <User className="w-3 h-3" />
                <span>{tour.persona}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {/* Map Section */}
        <div className="px-4 pt-6">
          <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800">
            <div className="p-4 border-b border-gray-800">
              <div className="flex items-center gap-2 mb-2">
                <Navigation className="w-5 h-5 text-blue-400" />
                <h3 className="text-amber-100" style={{ fontFamily: 'Georgia, serif' }}>
                  투어 경로
                </h3>
              </div>
              <p className="text-sm text-gray-400">방문한 장소와 이동 경로</p>
            </div>

            {/* Map */}
            <div className="relative h-64">
              <img
                src={parkMapImage}
                alt="투어 경로 지도"
                className="w-full h-full object-cover"
              />
              {/* Route overlay */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                {/* Path line */}
                <path
                  d="M 30 50 Q 80 70, 120 100 T 200 150 T 280 180"
                  stroke="#3b82f6"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="5,5"
                  strokeLinecap="round"
                />
                
                {/* Location markers */}
                <circle cx="30" cy="50" r="6" fill="#22c55e" stroke="#fff" strokeWidth="2" />
                <circle cx="120" cy="100" r="6" fill="#3b82f6" stroke="#fff" strokeWidth="2" />
                <circle cx="200" cy="150" r="6" fill="#3b82f6" stroke="#fff" strokeWidth="2" />
                <circle cx="280" cy="180" r="6" fill="#ef4444" stroke="#fff" strokeWidth="2" />
              </svg>

              {/* Legend */}
              <div className="absolute bottom-2 left-2 bg-gray-900/90 backdrop-blur-sm rounded-lg p-2 text-xs">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-gray-300">시작</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-gray-300">방문</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span className="text-gray-300">종료</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Route Timeline */}
        <div className="px-4">
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-4">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-amber-400" />
              <h3 className="text-amber-100" style={{ fontFamily: 'Georgia, serif' }}>
                방문 장소
              </h3>
            </div>

            <div className="space-y-3">
              {tour.route.map((location, index) => (
                <div key={index} className="flex items-start gap-3">
                  {/* Timeline line */}
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full ${
                      location.visited ? 'bg-blue-500' : 'bg-gray-600'
                    }`} />
                    {index < tour.route.length - 1 && (
                      <div className="w-0.5 h-8 bg-gray-700 my-1" />
                    )}
                  </div>

                  {/* Location info */}
                  <div className="flex-1 pb-2">
                    <div className="flex items-center justify-between mb-1">
                      <p className={`${
                        location.visited ? 'text-amber-100' : 'text-gray-500'
                      }`}>
                        {location.name}
                      </p>
                      <span className="text-xs text-gray-500">{location.time}</span>
                    </div>
                    {location.visited && (
                      <p className="text-xs text-gray-400">방문 완료</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Conversations */}
        <div className="px-4 pb-6">
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-4">
            <div className="flex items-center gap-2 mb-4">
              <MessageCircle className="w-5 h-5 text-purple-400" />
              <h3 className="text-amber-100" style={{ fontFamily: 'Georgia, serif' }}>
                대화 기록
              </h3>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {tour.conversations.map((conv, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 ${
                    conv.sender === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    conv.sender === 'persona'
                      ? 'bg-gradient-to-br from-blue-500 to-purple-600'
                      : 'bg-gradient-to-br from-amber-500 to-orange-600'
                  }`}>
                    <span className="text-sm" style={{ fontFamily: 'Georgia, serif' }}>
                      {conv.sender === 'persona' ? tour.persona[0] : 'You'}
                    </span>
                  </div>

                  {/* Message */}
                  <div className={`flex-1 max-w-[75%] ${
                    conv.sender === 'user' ? 'items-end' : 'items-start'
                  } flex flex-col`}>
                    <div className={`rounded-2xl px-4 py-3 ${
                      conv.sender === 'persona'
                        ? 'bg-gray-800 border border-gray-700 rounded-tl-sm'
                        : 'bg-blue-600 rounded-tr-sm'
                    }`}>
                      <p className="text-sm leading-relaxed">{conv.text}</p>
                    </div>
                    <span className="text-xs text-gray-500 mt-1 px-2">{conv.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="px-4 pb-6">
          <div className="bg-gradient-to-br from-amber-950/40 to-gray-900 rounded-2xl border border-amber-900/30 p-5">
            <h3 className="text-amber-100 mb-4 text-center" style={{ fontFamily: 'Georgia, serif' }}>
              투어 통계
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl mb-1">{tour.conversations.length}</p>
                <p className="text-xs text-gray-400">대화 수</p>
              </div>
              <div className="text-center">
                <p className="text-2xl mb-1">{tour.route.filter(r => r.visited).length}</p>
                <p className="text-xs text-gray-400">방문 장소</p>
              </div>
              <div className="text-center">
                <p className="text-2xl mb-1">{tour.progress}%</p>
                <p className="text-xs text-gray-400">완료율</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
