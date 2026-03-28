import { useNavigate } from 'react-router-dom';
import { useKioskStore } from '../store';
import { Volume2, Settings } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const { setVoice } = useKioskStore();

  const handleStart = (withVoice: boolean) => {
    setVoice(withVoice);
    navigate('/kiosk/mode');
  };

  return (
    <div className="min-h-screen bg-kiosk-black flex flex-col items-center justify-center p-8 relative">
      <button 
        onClick={() => navigate('/admin')}
        className="absolute top-8 right-8 p-4 text-kiosk-gray hover:text-kiosk-white transition-colors"
      >
        <Settings className="w-8 h-8" />
      </button>

      <div className="text-center mb-16">
        <h1 className="text-6xl md:text-8xl font-bold text-kiosk-white mb-6 tracking-tight">
          퍼플리프 커피
        </h1>
        <h2 className="text-3xl md:text-4xl text-kiosk-purple font-medium mb-4">
          어르신 키오스크 연습센터
        </h2>
        <p className="text-2xl text-kiosk-gray">
          카페 키오스크를 천천히 따라 하며 연습해보세요
        </p>
      </div>

      <div className="flex flex-col gap-6 w-full max-w-2xl">
        <button
          onClick={() => handleStart(false)}
          className="w-full bg-kiosk-purple hover:bg-kiosk-purple-hover text-white text-4xl font-bold py-12 rounded-3xl shadow-[0_0_40px_rgba(111,63,245,0.3)] transition-all active:scale-95"
        >
          주문 연습 시작하기
        </button>
        
        <button
          onClick={() => handleStart(true)}
          className="w-full bg-kiosk-card border-2 border-kiosk-purple text-kiosk-white text-3xl font-bold py-10 rounded-3xl flex items-center justify-center gap-4 hover:bg-kiosk-card/80 transition-all active:scale-95"
        >
          <Volume2 className="w-10 h-10 text-kiosk-purple" />
          음성안내와 함께 시작하기
        </button>
      </div>
    </div>
  );
}
