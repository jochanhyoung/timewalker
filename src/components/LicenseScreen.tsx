import { ExternalLink, ChevronDown, ChevronUp, Award, Download, Share2 } from 'lucide-react';
import { useState } from 'react';

interface LicenseItem {
  name: string;
  version: string;
  license: string;
  url: string;
  description: string;
}

interface Certificate {
  id: string;
  location: string;
  date: string;
  persona: string;
  completionDate: string;
}

const certificates: Certificate[] = [
  {
    id: '1',
    location: '5·18 민주화운동 기념공원',
    date: '2024년 11월 15일',
    persona: '학생',
    completionDate: '2024.11.15'
  },
  {
    id: '3',
    location: '독립기념관',
    date: '2024년 11월 5일',
    persona: '시민',
    completionDate: '2024.11.05'
  }
];

const licenses: LicenseItem[] = [
  {
    name: 'React',
    version: '18.x',
    license: 'MIT License',
    url: 'https://reactjs.org/',
    description: 'A JavaScript library for building user interfaces'
  },
  {
    name: 'Tailwind CSS',
    version: '4.0',
    license: 'MIT License',
    url: 'https://tailwindcss.com/',
    description: 'A utility-first CSS framework'
  },
  {
    name: 'Lucide React',
    version: 'latest',
    license: 'ISC License',
    url: 'https://lucide.dev/',
    description: 'Beautiful & consistent icon toolkit'
  },
  {
    name: 'Unsplash',
    version: 'API',
    license: 'Unsplash License',
    url: 'https://unsplash.com/license',
    description: 'Photos for everyone - Image content provider'
  }
];

export function LicenseScreen() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleDownload = (cert: Certificate) => {
    alert(`${cert.location} 수료증을 다운로드합니다.`);
  };

  const handleShare = (cert: Certificate) => {
    alert(`${cert.location} 수료증을 공유합니다.`);
  };

  return (
    <div className="min-h-screen bg-gray-950 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-b from-gray-900 to-gray-950 p-6 border-b border-gray-800">
        <h1 className="text-amber-100 text-center mb-2">수료증 & 라이센스</h1>
        <p className="text-gray-400 text-center text-sm">
          투어 수료증 및 앱 정보
        </p>
      </div>

      {/* Certificates Section */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-5 h-5 text-amber-400" />
          <h3 className="text-amber-100">
            투어 수료증
          </h3>
        </div>

        {certificates.length > 0 ? (
          <div className="space-y-3">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="bg-gradient-to-br from-amber-950/30 to-gray-900 rounded-2xl p-5 border border-amber-900/40 cursor-pointer hover:border-amber-700/60 transition-all"
                onClick={() => setSelectedCertificate(cert)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="text-amber-100 mb-1">
                      {cert.location}
                    </h4>
                    <p className="text-xs text-gray-400">
                      {cert.persona} 페르소나로 완료
                    </p>
                  </div>
                  <Award className="w-8 h-8 text-amber-400/80" />
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t border-amber-900/30">
                  <span className="text-xs text-gray-400">수료일: {cert.completionDate}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShare(cert);
                      }}
                      className="p-1.5 hover:bg-amber-900/30 rounded-lg transition-colors"
                    >
                      <Share2 className="w-4 h-4 text-amber-400" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownload(cert);
                      }}
                      className="p-1.5 hover:bg-amber-900/30 rounded-lg transition-colors"
                    >
                      <Download className="w-4 h-4 text-amber-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 text-center">
            <Award className="w-12 h-12 text-gray-700 mx-auto mb-3" />
            <p className="text-gray-400 text-sm mb-1">아직 완료한 투어가 없습니다</p>
            <p className="text-gray-600 text-xs">투어를 완료하면 수료증을 받을 수 있습니다</p>
          </div>
        )}
      </div>

      {/* Certificate Detail Modal */}
      {selectedCertificate && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedCertificate(null)}
        >
          <div
            className="bg-gradient-to-br from-amber-950/90 to-gray-900 rounded-3xl p-8 max-w-sm w-full border-2 border-amber-700/50 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Certificate Header */}
            <div className="text-center mb-6">
              <Award className="w-16 h-16 text-amber-400 mx-auto mb-4" />
              <h2 className="text-amber-100 mb-2">
                수료증
              </h2>
              <p className="text-xs text-gray-400">Certificate of Completion</p>
            </div>

            {/* Certificate Content */}
            <div className="bg-black/20 rounded-2xl p-6 mb-6 border border-amber-900/30">
              <p className="text-center text-gray-300 text-sm mb-4">
                타임워커 역사 체험 프로그램
              </p>
              
              <div className="space-y-3 mb-4">
                <div className="text-center">
                  <p className="text-xs text-gray-400 mb-1">투어 장소</p>
                  <p className="text-amber-100">
                    {selectedCertificate.location}
                  </p>
                </div>
                
                <div className="text-center">
                  <p className="text-xs text-gray-400 mb-1">체험 페르소나</p>
                  <p className="text-gray-300">{selectedCertificate.persona}</p>
                </div>

                <div className="text-center">
                  <p className="text-xs text-gray-400 mb-1">완료일</p>
                  <p className="text-gray-300">{selectedCertificate.completionDate}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-amber-900/30 text-center">
                <p className="text-xs text-gray-500">
                  위 사용자는 타임워커 역사 체험 프로그램을<br />
                  성실히 수행하였음을 증명합니다.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => handleShare(selectedCertificate)}
                className="flex-1 flex items-center justify-center gap-2 bg-amber-900/40 hover:bg-amber-900/60 text-amber-100 py-3 rounded-xl transition-colors border border-amber-700/50"
              >
                <Share2 className="w-4 h-4" />
                <span className="text-sm">공유</span>
              </button>
              <button
                onClick={() => handleDownload(selectedCertificate)}
                className="flex-1 flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-xl transition-colors"
              >
                <Download className="w-4 h-4" />
                <span className="text-sm">다운로드</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* App Info */}
      <div className="p-6 border-b border-gray-800">
        <div className="bg-gradient-to-br from-amber-950/40 to-gray-900 rounded-2xl p-6 border border-amber-900/30">
          <h2 className="text-amber-100 text-center mb-2">타임워커</h2>
          <p className="text-gray-400 text-center text-sm mb-1">
            Version 1.0.0
          </p>
          <p className="text-gray-500 text-center text-xs">
            127,457개의 문화유산과 함께하는 위치 기반 역사 체험 서비스
          </p>
        </div>
      </div>

      {/* Licenses List */}
      <div className="p-4 space-y-3">
        <h3 className="text-gray-400 px-2 mb-4">사용된 오픈소스</h3>
        
        {licenses.map((license, index) => (
          <div
            key={index}
            className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden"
          >
            <button
              onClick={() => toggleExpand(index)}
              className="w-full p-4 flex items-center justify-between hover:bg-gray-800/50 transition-colors"
            >
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-amber-100">{license.name}</h4>
                  <span className="text-xs text-gray-500">{license.version}</span>
                </div>
                <p className="text-xs text-gray-400">{license.license}</p>
              </div>
              
              {expandedIndex === index ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>

            {expandedIndex === index && (
              <div className="px-4 pb-4 border-t border-gray-800">
                <p className="text-sm text-gray-400 mb-3 mt-3">
                  {license.description}
                </p>
                <a
                  href={license.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300 transition-colors"
                >
                  <span>자세히 보기</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Copyright */}
      <div className="px-6 py-8 text-center">
        <p className="text-gray-600 text-xs">
          © 2024 타임워커. All rights reserved.
        </p>
        <p className="text-gray-700 text-xs mt-2">
          Made with ❤️ for history education
        </p>
      </div>
    </div>
  );
}