import { MapPin, Calendar, User, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { TourDetailScreen } from './TourDetailScreen';

interface TourHistory {
  id: string;
  location: string;
  date: string;
  persona: string;
  progress: number;
  thumbnail: string;
  route: Array<{ name: string; time: string; visited: boolean }>;
  conversations: Array<{ sender: 'user' | 'persona'; text: string; time: string }>;
}

const mockHistory: TourHistory[] = [
  {
    id: '1',
    location: '5·18 민주화운동 기념공원',
    date: '2024년 11월 15일',
    persona: '학생',
    progress: 100,
    thumbnail: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=400',
    route: [
      { name: '5·18 기념공원 입구', time: '14:20', visited: true },
      { name: '민주광장', time: '14:35', visited: true },
      { name: '추모탑', time: '14:50', visited: true },
      { name: '역사관', time: '15:10', visited: true }
    ],
    conversations: [
      { sender: 'persona', text: '오늘 시위는 공원 앞 나무에서 시작할거야! 거기서 만나자!', time: '14:22' },
      { sender: 'user', text: '알았어, 지금 가고 있어', time: '14:23' },
      { sender: 'persona', text: '친구들과 함께 이곳에서 민주주의를 외쳤어요.', time: '14:36' },
      { sender: 'user', text: '당시 상황이 어땠나요?', time: '14:37' },
      { sender: 'persona', text: '두려웠지만, 우리는 정의를 위해 함께 목소리를 냈습니다.', time: '14:38' },
      { sender: 'user', text: '용기 있는 행동이었네요', time: '14:40' },
      { sender: 'persona', text: '이 추모탑은 희생자들을 기리기 위한 곳입니다.', time: '14:52' },
      { sender: 'user', text: '많은 분들이 희생되셨군요', time: '14:53' },
    ]
  },
  {
    id: '2',
    location: '경복궁',
    date: '2024년 11월 10일',
    persona: '군인',
    progress: 75,
    thumbnail: 'https://images.unsplash.com/photo-1583500557349-fb5238f8d946?w=400',
    route: [
      { name: '광화문', time: '10:00', visited: true },
      { name: '근정전', time: '10:20', visited: true },
      { name: '경회루', time: '10:45', visited: true },
      { name: '향원정', time: '11:00', visited: false }
    ],
    conversations: [
      { sender: 'persona', text: '이곳은 조선시대 왕궁의 정문입니다.', time: '10:02' },
      { sender: 'user', text: '웅장하네요', time: '10:03' },
      { sender: 'persona', text: '왕이 신하들과 국사를 논하던 곳입니다.', time: '10:22' },
      { sender: 'user', text: '역사가 느껴집니다', time: '10:23' },
    ]
  },
  {
    id: '3',
    location: '독립기념관',
    date: '2024년 11월 5일',
    persona: '시민',
    progress: 100,
    thumbnail: 'https://images.unsplash.com/photo-1604999333679-b86d54738315?w=400',
    route: [
      { name: '겨레의 탑', time: '13:00', visited: true },
      { name: '독립기념관 본관', time: '13:20', visited: true },
      { name: '3·1운동 전시관', time: '13:50', visited: true }
    ],
    conversations: [
      { sender: 'persona', text: '독립을 위해 싸운 선조들의 이야기입니다.', time: '13:02' },
      { sender: 'user', text: '감동적이네요', time: '13:03' },
      { sender: 'persona', text: '자유는 결코 공짜가 아닙니다.', time: '13:25' },
    ]
  }
];

export function HistoryScreen() {
  const [selectedTour, setSelectedTour] = useState<TourHistory | null>(null);

  if (selectedTour) {
    return <TourDetailScreen tour={selectedTour} onBack={() => setSelectedTour(null)} />;
  }

  return (
    <div className="min-h-screen bg-gray-950 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-b from-gray-900 to-gray-950 p-6 border-b border-gray-800">
        <h1 className="text-amber-100 text-center mb-2">투어 히스토리</h1>
        <p className="text-gray-400 text-center text-sm">
          총 {mockHistory.length}개의 투어를 체험하셨습니다
        </p>
      </div>

      {/* History List */}
      <div className="p-4 space-y-4">
        {mockHistory.map((tour) => (
          <div
            key={tour.id}
            onClick={() => setSelectedTour(tour)}
            className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-amber-900 transition-colors cursor-pointer"
          >
            <div className="flex">
              {/* Thumbnail */}
              <div className="w-24 h-24 flex-shrink-0 relative overflow-hidden">
                <img
                  src={tour.thumbnail}
                  alt={tour.location}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
              </div>

              {/* Content */}
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-amber-100 mb-2">{tour.location}</h3>
                  <div className="flex items-center gap-3 text-gray-400 text-xs mb-2">
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

                {/* Progress */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-600 to-amber-400"
                      style={{ width: `${tour.progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-400">{tour.progress}%</span>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex items-center pr-4">
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State (when no history) */}
      {mockHistory.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 px-6">
          <MapPin className="w-16 h-16 text-gray-700 mb-4" />
          <h3 className="text-gray-400 text-center mb-2">
            아직 투어 기록이 없습니다
          </h3>
          <p className="text-gray-600 text-center text-sm">
            첫 역사 투어를 시작해보세요
          </p>
        </div>
      )}
    </div>
  );
}