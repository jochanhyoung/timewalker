import { Sparkles, Mic, Type, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface FinalMissionScreenProps {
  selectedPersona: string;
  onComplete: () => void;
}

const personaNames: Record<string, string> = {
  soldier: '군인',
  citizen: '시민',
  student: '학생'
};

const finalQuestions: Record<string, { question: string; reflection: string }> = {
  soldier: {
    question: '명령과 양심 사이에서 당신은 무엇을 선택했나요?',
    reflection: '우리가 오늘 한 일이 옳은 일이었을까? 때로는 명령보다 더 중요한 것이 있다는 걸 배웠습니다.'
  },
  citizen: {
    question: '오늘 광주에서 무슨 일이 일어난 걸까?',
    reflection: '우리가 오늘 한 일이 옳은 일이었을까? 두려웠지만, 함께했기에 가능했습니다.'
  },
  student: {
    question: '오늘 광주에서 무슨 일이 일어난 걸까?',
    reflection: '우리가 오늘 한 일이 옳은 일이었을까? 자유와 민주주의는 저절로 주어지지 않는다는 것을 알았습니다.'
  }
};

const keywords = ['비상계엄', '민주화', '시민항쟁', '5·18', '광주'];

export function FinalMissionScreen({ selectedPersona, onComplete }: FinalMissionScreenProps) {
  const [showReflection, setShowReflection] = useState(false);
  const [showUserAnswer, setShowUserAnswer] = useState(false);
  const [showCharacterResponse, setShowCharacterResponse] = useState(false);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [userInput, setUserInput] = useState('');
  
  const personaName = personaNames[selectedPersona] || '가이드';
  const finalQuestion = finalQuestions[selectedPersona];

  const toggleKeyword = (keyword: string) => {
    if (selectedKeywords.includes(keyword)) {
      setSelectedKeywords(selectedKeywords.filter(k => k !== keyword));
    } else {
      setSelectedKeywords([...selectedKeywords, keyword]);
    }
  };

  const handleFirstAnswer = () => {
    setShowUserAnswer(true);
    // Show character response after user answer
    setTimeout(() => {
      setShowCharacterResponse(true);
    }, 500);
  };

  const handleSecondAnswer = () => {
    setShowReflection(true);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col pb-16">
      {!showReflection ? (
        <>
          {/* Header */}
          <div className="px-6 py-8 bg-gradient-to-b from-blue-950/40 to-gray-950">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-6 h-6 text-blue-400" />
              <h2 style={{ 
                fontFamily: 'Georgia, serif',
                fontSize: '1.75rem'
              }}>
                최종 미션
              </h2>
            </div>
            <p className="text-gray-400">투어의 마지막 질문입니다</p>
          </div>

          {/* Main Question */}
          <div className="flex-1 px-6 py-6 space-y-6">
            {/* Character Question */}
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span style={{ fontFamily: 'Georgia, serif', fontSize: '1.25rem' }}>
                  {personaName[0]}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-400 mb-1">{personaName}</p>
                <div className="bg-gray-800 border border-gray-700 rounded-2xl rounded-tl-sm px-5 py-4">
                  <p className="text-lg" style={{ fontFamily: 'Georgia, serif' }}>
                    {finalQuestion.question}
                  </p>
                </div>
              </div>
            </div>

            {/* User Answer Display */}
            {showUserAnswer && (
              <div className="flex items-start gap-3 justify-end">
                <div className="flex-1 flex flex-col items-end">
                  <p className="text-sm text-gray-400 mb-1">나</p>
                  <div className="bg-blue-600 rounded-2xl rounded-tr-sm px-5 py-4 max-w-[85%]">
                    {selectedKeywords.length > 0 && (
                      <div className="mb-3">
                        <p className="text-xs text-blue-200 mb-2">선택한 키워드:</p>
                        <div className="flex flex-wrap gap-1">
                          {selectedKeywords.map((keyword) => (
                            <span
                              key={keyword}
                              className="px-2 py-1 bg-blue-700 rounded-lg text-xs"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {userInput && (
                      <p className="leading-relaxed">{userInput}</p>
                    )}
                    {!userInput && selectedKeywords.length > 0 && (
                      <p className="leading-relaxed text-sm">
                        저는 이 키워드들로 오늘의 사건을 이해했습니다.
                      </p>
                    )}
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span style={{ fontFamily: 'Georgia, serif', fontSize: '1.25rem' }}>
                    나
                  </span>
                </div>
              </div>
            )}

            {/* Character Response after User Answer */}
            {showCharacterResponse && (
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span style={{ fontFamily: 'Georgia, serif', fontSize: '1.25rem' }}>
                    {personaName[0]}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-400 mb-1">{personaName}</p>
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-green-800/50 rounded-2xl rounded-tl-sm px-5 py-4">
                    <p className="leading-relaxed">잘 생각해주셨어요. 이제 함께 오늘의 경험을 되돌아보는 시간을 가져볼까요?</p>
                  </div>
                </div>
              </div>
            )}

            {/* Keyword Selection */}
            {!showUserAnswer && (
              <>
                <div className="space-y-3">
                  <p className="text-sm text-gray-400">관련 키워드를 선택해주세요</p>
                  <div className="flex flex-wrap gap-2">
                    {keywords.map((keyword) => (
                      <button
                        key={keyword}
                        onClick={() => toggleKeyword(keyword)}
                        className={`px-4 py-2 rounded-xl border transition-all ${
                          selectedKeywords.includes(keyword)
                            ? 'bg-blue-600 border-blue-500 text-white'
                            : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600'
                        }`}
                        style={{ fontFamily: 'Georgia, serif' }}
                      >
                        {keyword}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Text Input Area */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">
                    당신의 생각을 자유롭게 말해보세요
                  </label>
                  <textarea
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="여기에 답변을 입력하거나, 아래 버튼으로 음성/텍스트로 대화할 수 있습니다..."
                    className="w-full h-32 bg-gray-800 border border-gray-700 rounded-2xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                {/* Selected Keywords Display */}
                {selectedKeywords.length > 0 && (
                  <div className="bg-blue-950/30 border border-blue-800/50 rounded-2xl p-4">
                    <p className="text-sm text-blue-300 mb-2">선택한 키워드:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedKeywords.map((keyword) => (
                        <span
                          key={keyword}
                          className="px-3 py-1 bg-blue-600/50 rounded-lg text-sm"
                          style={{ fontFamily: 'Georgia, serif' }}
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </>
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
        </>
      ) : (
        <>
          {/* Header */}
          <div className="px-6 py-8 bg-gradient-to-b from-purple-950/40 to-gray-950">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-6 h-6 text-purple-400" />
              <h2 style={{ 
                fontFamily: 'Georgia, serif',
                fontSize: '1.75rem'
              }}>
                회고
              </h2>
            </div>
            <p className="text-gray-400">투어를 되돌아보며</p>
          </div>

          {/* Reflection Content */}
          <div className="flex-1 px-6 py-6 space-y-6">
            {/* Character's Final Message */}
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span style={{ fontFamily: 'Georgia, serif', fontSize: '1.25rem' }}>
                  {personaName[0]}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-400 mb-1">{personaName}</p>
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-purple-800/50 rounded-2xl rounded-tl-sm px-5 py-4">
                  <p className="leading-relaxed">{finalQuestion.reflection}</p>
                </div>
              </div>
            </div>

            {/* What You Learned */}
            <div className="bg-purple-950/30 border border-purple-800/50 rounded-2xl p-5">
              <h3 className="mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                오늘 배운 것
              </h3>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <ChevronRight className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-300">5·18 민주화운동의 역사적 배경과 의미</p>
                </div>
                <div className="flex items-start gap-2">
                  <ChevronRight className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-300">당시 시민들의 용기와 희생</p>
                </div>
                <div className="flex items-start gap-2">
                  <ChevronRight className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-300">민주주의를 위한 투쟁의 가치</p>
                </div>
              </div>
            </div>

            {/* Tour Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
                <p className="text-2xl mb-1">12</p>
                <p className="text-xs text-gray-400">대화 횟수</p>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
                <p className="text-2xl mb-1">5</p>
                <p className="text-xs text-gray-400">미션 완료</p>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
                <p className="text-2xl mb-1">45분</p>
                <p className="text-xs text-gray-400">투어 시간</p>
              </div>
            </div>
          </div>

          {/* Bottom Action Button */}
          <div className="px-6 py-6 bg-gray-900 border-t border-gray-800">
            <button
              onClick={onComplete}
              className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl transition-all hover:from-blue-700 hover:to-purple-700 active:scale-95"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              투어 완료하기
            </button>
          </div>
        </>
      )}
    </div>
  );
}