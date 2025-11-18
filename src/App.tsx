import { useState } from 'react';
import { LandingScreen } from './components/LandingScreen';
import { LocationScreen } from './components/LocationScreen';
import { PersonaScreen } from './components/PersonaScreen';
import { TourScreen } from './components/TourScreen';
import { PuzzleScreen } from './components/PuzzleScreen';
import { FinalMissionScreen } from './components/FinalMissionScreen';
import { HistoryScreen } from './components/HistoryScreen';
import { LicenseScreen } from './components/LicenseScreen';
import { BottomNavigation } from './components/BottomNavigation';

type Screen = 'landing' | 'location' | 'persona' | 'tour' | 'puzzle' | 'final';
type Tab = 'main' | 'history' | 'license';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [selectedPersona, setSelectedPersona] = useState<string>('student');
  const [activeTab, setActiveTab] = useState<Tab>('main');
  const [historyKey, setHistoryKey] = useState(0);

  const handleStart = () => {
    setCurrentScreen('location');
  };

  const handleInstitutionLogin = () => {
    // Institution login logic would go here
    alert('기관 로그인 기능은 준비 중입니다.');
  };

  const handleStartTour = () => {
    setCurrentScreen('persona');
  };

  const handleFindOtherLocation = () => {
    alert('다른 장소를 찾는 기능은 준비 중입니다.');
  };

  const handleSelectPersona = (persona: string) => {
    setSelectedPersona(persona);
    setCurrentScreen('tour');
  };

  const handleTourToPuzzle = () => {
    setCurrentScreen('puzzle');
  };

  const handlePuzzleComplete = () => {
    setCurrentScreen('final');
  };

  const handleTourComplete = () => {
    setCurrentScreen('landing');
  };

  const handleTabChange = (tab: Tab) => {
    // If clicking on already active history tab, reset it
    if (tab === 'history' && activeTab === 'history') {
      setHistoryKey(prev => prev + 1);
    }
    
    setActiveTab(tab);
    if (tab === 'main') {
      // Return to the main flow
      setCurrentScreen('landing');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-950 min-h-screen">
      {/* Main App Screens */}
      {activeTab === 'main' && (
        <>
          {currentScreen === 'landing' && (
            <LandingScreen
              onStart={handleStart}
              onInstitutionLogin={handleInstitutionLogin}
            />
          )}
          {currentScreen === 'location' && (
            <LocationScreen
              onStartTour={handleStartTour}
              onFindOtherLocation={handleFindOtherLocation}
            />
          )}
          {currentScreen === 'persona' && (
            <PersonaScreen onSelectPersona={handleSelectPersona} />
          )}
          {currentScreen === 'tour' && (
            <TourScreen 
              selectedPersona={selectedPersona}
              onNextPhase={handleTourToPuzzle}
            />
          )}
          {currentScreen === 'puzzle' && (
            <PuzzleScreen
              selectedPersona={selectedPersona}
              onComplete={handlePuzzleComplete}
            />
          )}
          {currentScreen === 'final' && (
            <FinalMissionScreen
              selectedPersona={selectedPersona}
              onComplete={handleTourComplete}
            />
          )}
        </>
      )}

      {/* History Screen */}
      {activeTab === 'history' && <HistoryScreen key={historyKey} />}

      {/* License Screen */}
      {activeTab === 'license' && <LicenseScreen />}

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}