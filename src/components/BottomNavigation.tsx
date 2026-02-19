import { Home, History, FileText } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: 'main' | 'history' | 'license';
  onTabChange: (tab: 'main' | 'history' | 'license') => void;
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-gray-900 border-t border-gray-800 z-50">
      <div className="flex items-center justify-around h-16 px-4">
        <button
          onClick={() => onTabChange('main')}
          className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
            activeTab === 'main' ? 'text-amber-400' : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          <Home className="w-6 h-6 mb-1" />
          <span className="text-xs">홈</span>
        </button>
        
        <button
          onClick={() => onTabChange('history')}
          className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
            activeTab === 'history' ? 'text-amber-400' : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          <History className="w-6 h-6 mb-1" />
          <span className="text-xs">히스토리</span>
        </button>
        
        <button
          onClick={() => onTabChange('license')}
          className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
            activeTab === 'license' ? 'text-amber-400' : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          <FileText className="w-6 h-6 mb-1" />
          <span className="text-xs">라이센스</span>
        </button>
      </div>
    </nav>
  );
}
