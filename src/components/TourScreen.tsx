import { Camera, X, CheckCircle, XCircle, Play, Pause } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import backgroundImage from 'figma:asset/e9eeb0bfb7614ba756cb2260a182916bfc0ea56e.png';
import jsQR from 'jsqr';

interface TourScreenProps {
  selectedPersona: string;
  onNextPhase: () => void;
}

const personaNames: Record<string, string> = {
  soldier: '군인',
  citizen: '시민',
  student: '학생'
};

// 각 층별 퀴즈와 영상 데이터
const floorData = {
  student: [
    {
      floor: 1,
      floorName: '1층 - 역사의 시작',
      quizzes: [
        {
          question: '5·18 민주화운동이 시작된 해는 언제일까?',
          options: [
            { text: '1979년', isCorrect: false },
            { text: '1980년', isCorrect: true },
            { text: '1981년', isCorrect: false },
            { text: '1987년', isCorrect: false }
          ],
          wrongFeedback: '아니야... 다시 한번 생각해봐. 전두환 신군부가 집권하던 시기였어.',
          correctFeedback: '맞아! 1980년 5월 18일이었어.'
        },
        {
          question: '5·18이 일어난 도시는 어디일까?',
          options: [
            { text: '서울', isCorrect: false },
            { text: '부산', isCorrect: false },
            { text: '광주', isCorrect: true },
            { text: '대전', isCorrect: false }
          ],
          wrongFeedback: '다시 생각해봐. 전라남도의 중심 도시였어.',
          correctFeedback: '맞아! 광주에서 일어난 민주화 운동이야.'
        }
      ],
      videoUrl: 'https://www.youtube.com/embed/T6cNCxAsiU0',
      videoTitle: '5·18의 시작',
      completionMessage: '1층 탐험을 완료했어! 이제 2층으로 올라가자.'
    },
    {
      floor: 2,
      floorName: '2층 - 항쟁의 전개',
      quizzes: [
        {
          question: '5·18 민주화운동의 주요 원인은 무엇이었을까?',
          options: [
            { text: '경제 위기', isCorrect: false },
            { text: '신군부의 비상계엄 확대', isCorrect: true },
            { text: '외교 문제', isCorrect: false },
            { text: '자연재해', isCorrect: false }
          ],
          wrongFeedback: '그게 아니야. 전두환을 중심으로 한 신군부의 권력 장악과 관련이 있어.',
          correctFeedback: '맞아! 신군부가 비상계엄을 전국으로 확대하면서 시작됐어.'
        },
        {
          question: '5·18 당시 시민군은 어떤 역할을 했을까?',
          options: [
            { text: '도망갔다', isCorrect: false },
            { text: '질서를 지키며 항쟁을 이어갔다', isCorrect: true },
            { text: '외국에 도움을 요청했다', isCorrect: false },
            { text: '협상만 시도했다', isCorrect: false }
          ],
          wrongFeedback: '아니야. 시민들은 용감하게 저항했어.',
          correctFeedback: '맞아! 시민들은 스스로 조직되어 질서를 지키며 민주주의를 지켰어.'
        }
      ],
      videoUrl: 'https://www.youtube.com/embed/T6cNCxAsiU0',
      videoTitle: '시민들의 항쟁',
      completionMessage: '2층 탐험을 완료했어! 이제 3층으로 올라가자.'
    },
    {
      floor: 3,
      floorName: '3층 - 기억과 계승',
      quizzes: [
        {
          question: '5·18 당시 시민들이 요구한 핵심 가치는?',
          options: [
            { text: '경제 성장', isCorrect: false },
            { text: '민주주의와 자유', isCorrect: true },
            { text: '영토 확장', isCorrect: false },
            { text: '외교 관계 개선', isCorrect: false }
          ],
          wrongFeedback: '다시 생각해봐. 군부 독재에 맞서 무엇을 원했을까?',
          correctFeedback: '바로 그거야! 민주주의와 자유를 위해 싸웠어.'
        },
        {
          question: '5·18 정신이 오늘날 우리에게 주는 의미는?',
          options: [
            { text: '과거의 사건일 뿐이다', isCorrect: false },
            { text: '민주주의를 지키는 시민의식', isCorrect: true },
            { text: '정치인들만의 문제', isCorrect: false },
            { text: '특별한 의미가 없다', isCorrect: false }
          ],
          wrongFeedback: '아니야. 5·18은 지금도 우리에게 중요한 의미를 가지고 있어.',
          correctFeedback: '맞아! 5·18 정신은 민주주의를 지키는 시민의식으로 계승되고 있어.'
        }
      ],
      videoUrl: 'https://www.youtube.com/embed/T6cNCxAsiU0',
      videoTitle: '5·18의 의미',
      completionMessage: '모든 층 탐험을 완료했어! 정말 수고했어.'
    }
  ]
};

export function TourScreen({ selectedPersona, onNextPhase }: TourScreenProps) {
  const [currentFloor, setCurrentFloor] = useState(0); // 0, 1, 2 (총 3개 층)
  const [conversationStep, setConversationStep] = useState<'greeting' | 'quiz' | 'video' | 'camera'>('greeting');
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  
  // Video states
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoWatched, setVideoWatched] = useState(false);
  const videoPlayerRef = useRef<HTMLIFrameElement>(null);
  
  // Camera states
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [qrDetected, setQrDetected] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number>();

  const personaName = personaNames[selectedPersona] || '가이드';
  const floorList = floorData[selectedPersona as keyof typeof floorData] || floorData.student;
  const floor = floorList[currentFloor];
  const quizList = floor.quizzes;
  const quiz = quizList[currentQuizIndex];
  const isLastQuiz = currentQuizIndex === quizList.length - 1;

  // 현재 대화 텍스트
  const getCurrentText = () => {
    if (conversationStep === 'greeting') {
      return currentFloor === 0 
        ? `안녕! 나는 ${personaName}이야. 우리 함께 5·18의 역사를 알아볼까?`
        : `${floor.floorName}에 온 걸 환영해! 여기서도 중요한 역사를 배워보자.`;
    } else if (conversationStep === 'quiz' && !showFeedback) {
      return quiz.question;
    } else if (showFeedback && isCorrect) {
      return quiz.correctFeedback;
    } else if (showFeedback && !isCorrect) {
      return quiz.wrongFeedback;
    } else if (conversationStep === 'video') {
      return videoWatched 
        ? currentFloor < floorList.length - 1
          ? `영상을 다 봤구나. 이제 ${floor.floorName} 기념비를 찾아가서 QR 코드를 스캔하고 다음 층으로 올라가자!`
          : '영상을 다 봤구나. 마지막 기념비를 찾아가서 QR 코드를 스캔해줘!'
        : '이 영상을 끝까지 봐줘. 당시의 상황을 이해하는 데 도움이 될 거야.';
    }
    return '';
  };

  // 타이핑 효과
  useEffect(() => {
    const fullText = getCurrentText();
    setDisplayedText('');
    setIsTyping(true);
    
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, [conversationStep, showFeedback, isCorrect]);

  // 인사말에서 퀴즈로 이동
  const handleStartQuiz = () => {
    setConversationStep('quiz');
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  // 답변 선택
  const handleSelectAnswer = (index: number) => {
    if (isTyping || showFeedback) return;
    
    setSelectedAnswer(index);
    setShowFeedback(true);
    const correct = quiz.options[index].isCorrect;
    setIsCorrect(correct);
    
    if (correct) {
      // 정답이면 3초 후 다음 단계로
      setTimeout(() => {
        if (isLastQuiz) {
          // 마지막 퀴즈면 영상 단계로
          setConversationStep('video');
          setIsVideoPlaying(true);
        } else {
          // 다음 퀴즈로
          setCurrentQuizIndex(prev => prev + 1);
          setShowFeedback(false);
          setSelectedAnswer(null);
        }
      }, 3000);
    } else {
      // 오답이면 3초 후 다시 퀴즈
      setTimeout(() => {
        setShowFeedback(false);
        setSelectedAnswer(null);
      }, 3000);
    }
  };

  // 영상 시청 완료
  const handleVideoComplete = () => {
    setVideoWatched(true);
    setIsVideoPlaying(false);
  };

  // 영상 건너뛰기 (테스트용)
  const skipVideo = () => {
    setVideoWatched(true);
    setIsVideoPlaying(false);
  };

  // QR 스캔 단계로 이동
  const moveToCamera = () => {
    setConversationStep('camera');
    // 바로 카메라 활성화
    setTimeout(() => {
      startCamera();
    }, 100);
  };

  // 카메라 시작
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } // 후면 카메라 사용
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsCameraActive(true);
        setCameraError(null);
        
        // QR 스캔 시작
        scanQRCode();
      }
    } catch (err: any) {
      console.warn('카메라를 사용할 수 없습니다:', err.name);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setCameraError('카메라 권한이 거부되었습니다. 브라우저 설정에서 카메라 권한을 허용해주세요.');
      } else if (err.name === 'NotFoundError') {
        setCameraError('카메라를 찾을 수 없습니다.');
      } else {
        setCameraError('카메라를 사용할 수 없습니다.');
      }
    }
  };

  // 테스트용: QR 스캔 건너뛰기
  const skipQRScan = () => {
    setQrDetected(true);
    setTimeout(() => {
      stopCamera();
      
      // 다음 층으로 이동 또는 최종 페이지로
      if (currentFloor < floorList.length - 1) {
        // 다음 층으로
        setCurrentFloor(prev => prev + 1);
        setCurrentQuizIndex(0);
        setConversationStep('greeting');
        setVideoWatched(false);
        setQrDetected(false);
      } else {
        // 마지막 층이면 최종 페이지로
        onNextPhase();
      }
    }, 1000);
  };

  // QR 코드 스캔
  const scanQRCode = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    const scan = () => {
      if (video.readyState === video.HAVE_ENOUGH_DATA && !qrDetected) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        
        if (code) {
          console.log('QR Code detected:', code.data);
          setQrDetected(true);
          stopCamera();
          
          // QR 코드 감지 후 다음 단계로
          setTimeout(() => {
            // 다음 층으로 이동 또는 최종 페이지로
            if (currentFloor < floorList.length - 1) {
              // 다음 층으로
              setCurrentFloor(prev => prev + 1);
              setCurrentQuizIndex(0);
              setConversationStep('greeting');
              setVideoWatched(false);
              setQrDetected(false);
            } else {
              // 마지막 층이면 최종 페이지로
              onNextPhase();
            }
          }, 1500);
          return;
        }
      }
      
      animationFrameRef.current = requestAnimationFrame(scan);
    };

    scan();
  };

  // 카메라 중지
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    setIsCameraActive(false);
  };

  // 컴포넌트 언마운트 시 카메라 정리
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="h-screen bg-gray-950 flex flex-col overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <img
          src={backgroundImage}
          alt="5·18 기념관"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/90 via-gray-950/85 to-gray-950/95" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Character Area */}
        <div className="flex-1 flex items-end justify-center pb-8">
          <div className="w-32 h-32 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full border-4 border-white shadow-2xl flex items-center justify-center">
            <span className="text-white text-5xl" style={{ fontFamily: 'Georgia, serif' }}>
              {personaName[0]}
            </span>
          </div>
        </div>

        {/* Dialogue Box */}
        <div className="px-6 pb-6">
          <div className="bg-gray-900/95 backdrop-blur-md border-2 border-amber-600/50 rounded-3xl p-6 shadow-2xl">
            {/* Character Name */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
              <p className="text-amber-400" style={{ fontFamily: 'Georgia, serif' }}>
                {personaName}
              </p>
            </div>

            {/* Dialogue Text */}
            <div className="mb-6 min-h-[60px]">
              <p className="text-white text-lg leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
                {displayedText}
                {isTyping && <span className="animate-pulse">▌</span>}
              </p>
            </div>

            {/* Action Buttons / Options */}
            {!isTyping && (
              <div className="space-y-3">
                {conversationStep === 'greeting' && (
                  <button
                    onClick={handleStartQuiz}
                    className="w-full py-4 bg-amber-600 text-white rounded-xl transition-all hover:bg-amber-700 active:scale-95 flex items-center justify-center gap-2"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    좋아! 시작하자 →
                  </button>
                )}

                {conversationStep === 'quiz' && !showFeedback && (
                  <>
                    {/* Quiz Progress Indicator */}
                    <div className="flex items-center justify-center gap-2 mb-4">
                      {quizList.map((_, idx) => (
                        <div
                          key={idx}
                          className={`h-2 rounded-full transition-all ${
                            idx === currentQuizIndex
                              ? 'w-8 bg-amber-500'
                              : idx < currentQuizIndex
                              ? 'w-2 bg-amber-600'
                              : 'w-2 bg-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      {quiz.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleSelectAnswer(index)}
                          className={`py-4 px-6 rounded-xl transition-all border-2 text-left ${
                            selectedAnswer === index
                              ? 'bg-amber-600 border-amber-500 text-white scale-95'
                              : 'bg-gray-800 border-gray-700 text-white hover:border-amber-600/50 hover:bg-gray-700'
                          }`}
                          style={{ fontFamily: 'Georgia, serif' }}
                        >
                          <span className="text-amber-400 mr-2">{String.fromCharCode(65 + index)}.</span>
                          {option.text}
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {showFeedback && (
                  <div className={`flex items-center gap-3 p-4 rounded-xl ${
                    isCorrect ? 'bg-green-900/50 border-2 border-green-500' : 'bg-red-900/50 border-2 border-red-500'
                  }`}>
                    {isCorrect ? (
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-400" />
                    )}
                    <span className={`${isCorrect ? 'text-green-300' : 'text-red-300'}`} style={{ fontFamily: 'Georgia, serif' }}>
                      {isCorrect ? '정답입니다!' : '다시 생각해봐!'}
                    </span>
                  </div>
                )}

                {conversationStep === 'video' && videoWatched && (
                  <button
                    onClick={moveToCamera}
                    className="w-full py-4 bg-blue-600 text-white rounded-xl transition-all hover:bg-blue-700 active:scale-95 flex items-center justify-center gap-2"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    <Camera className="w-6 h-6" />
                    QR 코드 스캔하러 가기
                  </button>
                )}

                {conversationStep === 'camera' && !isCameraActive && (
                  <button
                    onClick={startCamera}
                    className="w-full py-4 bg-blue-600 text-white rounded-xl transition-all hover:bg-blue-700 active:scale-95 flex items-center justify-center gap-2"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    <Camera className="w-6 h-6" />
                    QR 코드 스캔하기
                  </button>
                )}

                {conversationStep === 'camera' && !isCameraActive && cameraError && (
                  <button
                    onClick={skipQRScan}
                    className="w-full py-3 bg-yellow-600 text-white rounded-xl transition-all hover:bg-yellow-700 active:scale-95 flex items-center justify-center gap-2"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    QR 스캔 완료로 설정 (테스트)
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Video Player Modal */}
      {conversationStep === 'video' && !videoWatched && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm">
          <div className="h-full flex flex-col">
            {/* Video Header */}
            <div className="px-6 py-4 bg-gray-900/80 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-white" style={{ fontFamily: 'Georgia, serif' }}>
                  5·18 민주화운동 영상
                </h3>
                <button
                  onClick={skipVideo}
                  className="px-4 py-2 bg-yellow-600 text-white rounded-lg text-sm hover:bg-yellow-700 transition-all"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  건너뛰기 (테스트)
                </button>
              </div>
            </div>

            {/* Video Content */}
            <div className="flex-1 flex items-center justify-center p-6">
              <div className="w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
                <iframe
                  ref={videoPlayerRef}
                  src={`${quiz.videoUrl}?autoplay=1`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  onLoad={() => {
                    // 영상 로드 후 30초 뒤에 시청 완료로 간주 (테스트용)
                    setTimeout(() => {
                      handleVideoComplete();
                    }, 30000);
                  }}
                />
              </div>
            </div>

            {/* Video Controls */}
            <div className="px-6 py-4 bg-gray-900/80 border-t border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${isVideoPlaying ? 'bg-red-500 animate-pulse' : 'bg-gray-500'}`} />
                  <span className="text-gray-400 text-sm" style={{ fontFamily: 'Georgia, serif' }}>
                    {isVideoPlaying ? '재생 중...' : '일시정지'}
                  </span>
                </div>
                <button
                  onClick={handleVideoComplete}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  시청 완료
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Camera Modal */}
      {isCameraActive && (
        <div className="fixed inset-0 z-50 bg-black">
          {/* Video Preview */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
          
          {/* Hidden canvas for QR scanning */}
          <canvas ref={canvasRef} className="hidden" />

          {/* Scan Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Scanning Frame */}
              <div className="w-64 h-64 border-4 border-amber-500 rounded-2xl relative">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-xl" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-xl" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-xl" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-xl" />
                
                {/* Scanning Line Animation */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl">
                  <div className="w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent animate-scan" />
                </div>
              </div>
              
              <p className="text-white text-center mt-4" style={{ fontFamily: 'Georgia, serif' }}>
                QR 코드를 스캔하세요
              </p>
            </div>
          </div>

          {/* QR Detected Success */}
          {qrDetected && (
            <div className="absolute inset-0 bg-green-600/90 flex items-center justify-center backdrop-blur-sm">
              <div className="text-center">
                <CheckCircle className="w-20 h-20 text-white mx-auto mb-4" />
                <p className="text-white text-2xl" style={{ fontFamily: 'Georgia, serif' }}>
                  스캔 완료!
                </p>
              </div>
            </div>
          )}

          {/* Close Button */}
          <button
            onClick={stopCamera}
            className="absolute top-6 right-6 w-12 h-12 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white/30 hover:bg-black/70 transition-all"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Error Message */}
          {cameraError && (
            <div className="absolute bottom-6 left-6 right-6 bg-red-600/90 backdrop-blur-md rounded-xl p-4 border border-red-400">
              <p className="text-white text-center mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                {cameraError}
              </p>
              <button
                onClick={skipQRScan}
                className="w-full py-3 bg-yellow-600 text-white rounded-xl transition-all hover:bg-yellow-700 active:scale-95"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                QR 스캔 건너뛰기 (테스트)
              </button>
            </div>
          )}
        </div>
      )}

      {/* Scanning Animation Styles */}
      <style>{`
        @keyframes scan {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(256px);
          }
          100% {
            transform: translateY(0);
          }
        }
        .animate-scan {
          animation: scan 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}