import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Home, ArrowLeft, Volume2, VolumeX } from 'lucide-react';
import { useKioskStore } from '../store';
import { cn } from '../lib/utils';
import { useEffect, useState } from 'react';

export default function KioskLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { voiceEnabled, toggleVoice, resetKiosk } = useKioskStore();
  const [voiceText, setVoiceText] = useState('');

  const handleHome = () => {
    if (window.confirm('처음으로 돌아가시겠습니까? 장바구니가 비워집니다.')) {
      resetKiosk();
      navigate('/');
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  // Simple TTS logic based on route
  useEffect(() => {
    if (!voiceEnabled) return;
    
    let text = '';
    switch (location.pathname) {
      case '/kiosk/mode':
        text = '연습 모드와 실전 모드 중 원하시는 모드를 선택해주세요.';
        break;
      case '/kiosk/menu':
        text = '화면에서 원하시는 메뉴를 눌러주세요.';
        break;
      case '/kiosk/cart':
        text = '선택하신 메뉴를 확인하고 결제하기 버튼을 눌러주세요.';
        break;
      case '/kiosk/payment':
        text = '결제 방식을 선택해주세요.';
        break;
      case '/kiosk/confirm':
        text = '이대로 결제하시겠습니까?';
        break;
      case '/kiosk/complete':
        text = '결제가 완료되었습니다. 영수증을 챙겨주세요.';
        break;
      default:
        if (location.pathname.includes('/kiosk/product')) {
          text = '음료의 온도와 크기를 선택해주세요.';
        }
    }

    setVoiceText(text);

    if (text && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ko-KR';
      utterance.rate = 0.8; // Slower for seniors
      window.speechSynthesis.speak(utterance);
    }

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [location.pathname, voiceEnabled]);

  const replayVoice = () => {
    if (voiceText && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(voiceText);
      utterance.lang = 'ko-KR';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-kiosk-black text-kiosk-white overflow-hidden">
      {/* Top Navigation Bar */}
      <header className="h-24 bg-kiosk-card flex items-center justify-between px-8 shrink-0 border-b border-white/10">
        <button
          onClick={handleBack}
          className="flex items-center gap-4 text-3xl font-bold text-kiosk-white bg-white/5 hover:bg-white/10 px-8 py-4 rounded-2xl transition-colors active:scale-95"
        >
          <ArrowLeft className="w-10 h-10" />
          뒤로
        </button>

        <h1 className="text-4xl font-bold text-kiosk-purple tracking-tight">
          퍼플리프 커피
        </h1>

        <div className="flex items-center gap-6">
          <button
            onClick={toggleVoice}
            className={cn(
              "flex items-center gap-3 px-6 py-4 rounded-2xl text-2xl font-bold transition-colors active:scale-95",
              voiceEnabled ? "bg-kiosk-purple text-white" : "bg-white/10 text-kiosk-gray"
            )}
          >
            {voiceEnabled ? <Volume2 className="w-8 h-8" /> : <VolumeX className="w-8 h-8" />}
            음성안내
          </button>
          <button
            onClick={handleHome}
            className="flex items-center gap-4 text-3xl font-bold text-kiosk-white bg-white/5 hover:bg-white/10 px-8 py-4 rounded-2xl transition-colors active:scale-95"
          >
            <Home className="w-10 h-10" />
            처음으로
          </button>
        </div>
      </header>

      {/* Voice Guidance Subtitle Bar */}
      {voiceEnabled && voiceText && (
        <div className="bg-kiosk-purple/20 border-b border-kiosk-purple/30 p-6 flex items-center justify-between shrink-0">
          <p className="text-3xl text-kiosk-white font-medium flex-1 text-center">
            {voiceText}
          </p>
          <button 
            onClick={replayVoice}
            className="flex items-center gap-2 bg-kiosk-purple hover:bg-kiosk-purple-hover text-white px-6 py-3 rounded-xl text-xl font-bold active:scale-95"
          >
            <Volume2 className="w-6 h-6" />
            천천히 다시 듣기
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden flex flex-col relative">
        <Outlet />
      </main>
    </div>
  );
}
