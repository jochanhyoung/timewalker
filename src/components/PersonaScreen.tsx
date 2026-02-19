import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface PersonaScreenProps {
  onSelectPersona: (persona: string) => void;
}

interface Persona {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
}

const personas: Persona[] = [
  {
    id: 'student',
    title: '학생',
    description: '대학생인 당신은 친구들과 함께 민주주의를 외칩니다.',
    fullDescription: '대학생인 당신은 친구들과 함께 민주주의를 외칩니다. 책으로만 배웠던 자유와 정의가 이제 현실이 되었습니다. 두려움과 희망이 교차하는 순간, 당신은 펜 대신 마이크를 잡고 광장에 섭니다.'
  },
  {
    id: 'soldier',
    title: '군인',
    description: '5월 18일 오전..당신과 당신의 전우는 영문도 모른 채 광주에 투입됩니다.',
    fullDescription: '5월 18일 오전..당신과 당신의 전우는 영문도 모른 채 광주에 투입됩니다. 상부의 명령만을 따라야 하는 상황 속에서, 시민들의 눈빛과 마주하게 됩니다. 당신은 이 혼란 속에서 어떤 선택을 하게 될까요?'
  },
  {
    id: 'citizen',
    title: '시민',
    description: '평범한 일상이 갑자기 무너집니다. 거리에는 총성이 울리고..',
    fullDescription: '평범한 일상이 갑자기 무너집니다. 거리에는 총성이 울리고, 이웃들이 하나둘 모여들기 시작합니다. 당신은 가족을 지켜야 할지, 광장으로 나가야 할지 고민합니다. 역사의 한 순간, 당신의 결정이 미래를 바꿀 수 있습니다.'
  }
];

export function PersonaScreen({ onSelectPersona }: PersonaScreenProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);
  const [showComingSoon, setShowComingSoon] = useState(false);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleSelect = (personaId: string) => {
    // 학생만 선택 가능, 나머지는 준비중
    if (personaId === 'student') {
      onSelectPersona(personaId);
    } else {
      setShowComingSoon(true);
      setTimeout(() => setShowComingSoon(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col pb-16">
      {/* Header */}
      <div className="mb-8 mt-8">
        <h2 className="mb-2" style={{ 
          fontFamily: 'Georgia, serif',
          fontSize: '1.75rem'
        }}>
          투어 시, 대화할 상대를
        </h2>
        <h2 style={{ 
          fontFamily: 'Georgia, serif',
          fontSize: '1.75rem'
        }}>
          선택해주세요.
        </h2>
      </div>

      {/* Persona Cards */}
      <div className="space-y-4">
        {personas.map((persona, index) => {
          const isExpanded = expandedIndex === index;
          const isAvailable = persona.id === 'student';
          
          return (
            <div
              key={persona.id}
              className={`bg-gray-900 border rounded-2xl overflow-hidden transition-all duration-300 ${
                isAvailable ? 'border-gray-800' : 'border-gray-800/50 opacity-75'
              }`}
            >
              {/* Card Header - Always Visible */}
              <button
                onClick={() => toggleExpand(index)}
                className="w-full px-6 py-5 flex items-start justify-between hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 style={{ 
                      fontFamily: 'Georgia, serif',
                      fontSize: '1.5rem'
                    }}>
                      {persona.title}
                    </h3>
                    {!isAvailable && (
                      <span className="text-xs px-2 py-1 bg-yellow-600 text-white rounded-md">
                        준비중
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {persona.description}
                  </p>
                </div>
                <div className="ml-4 mt-2">
                  {isExpanded ? (
                    <ChevronUp className="w-6 h-6 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-400" />
                  )}
                </div>
              </button>

              {/* Expanded Content */}
              <div
                className={`transition-all duration-300 overflow-hidden ${
                  isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-5 border-t border-gray-800">
                  <p className="text-gray-300 mt-4 mb-6 leading-relaxed">
                    {persona.fullDescription}
                  </p>
                  <button
                    onClick={() => handleSelect(persona.id)}
                    className={`w-full py-3 px-6 rounded-xl transition-all ${
                      isAvailable
                        ? 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
                        : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    }`}
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    {isAvailable ? '이 상대와 대화하기' : '준비중입니다'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 준비중 알림 모달 */}
      {showComingSoon && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 mx-6 text-center shadow-2xl">
            <div className="text-5xl mb-4">🚧</div>
            <h3 className="mb-2" style={{ 
              fontFamily: 'Georgia, serif',
              fontSize: '1.5rem'
            }}>
              준비중입니다
            </h3>
            <p className="text-gray-400">
              해당 페르소나는 곧 만나보실 수 있습니다
            </p>
          </div>
        </div>
      )}
    </div>
  );
}