import { useNavigate } from 'react-router-dom';
import { useKioskStore } from '../../store';
import { BookOpen, Coffee, HelpCircle } from 'lucide-react';

export default function ModeSelectPage() {
  const navigate = useNavigate();
  const { setMode } = useKioskStore();

  const handleSelect = (mode: 'practice' | 'real' | 'step') => {
    setMode(mode);
    navigate('/kiosk/menu');
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 gap-12 bg-kiosk-black">
      <h2 className="text-5xl font-bold text-kiosk-white mb-8">
        원하시는 모드를 선택해주세요
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        <button
          onClick={() => handleSelect('practice')}
          className="flex flex-col items-center justify-center gap-8 bg-kiosk-card hover:bg-kiosk-card/80 border-4 border-kiosk-purple text-kiosk-white rounded-[3rem] p-16 transition-all active:scale-95 shadow-[0_0_30px_rgba(111,63,245,0.2)]"
        >
          <BookOpen className="w-32 h-32 text-kiosk-purple" />
          <div className="text-center">
            <h3 className="text-5xl font-bold mb-4">연습 모드</h3>
            <p className="text-2xl text-kiosk-gray leading-relaxed">
              친절한 설명과 함께<br />천천히 주문해봅니다
            </p>
          </div>
        </button>

        <button
          onClick={() => handleSelect('real')}
          className="flex flex-col items-center justify-center gap-8 bg-kiosk-card hover:bg-kiosk-card/80 border-4 border-transparent text-kiosk-white rounded-[3rem] p-16 transition-all active:scale-95"
        >
          <Coffee className="w-32 h-32 text-kiosk-white" />
          <div className="text-center">
            <h3 className="text-5xl font-bold mb-4">실전 모드</h3>
            <p className="text-2xl text-kiosk-gray leading-relaxed">
              실제 카페처럼<br />스스로 주문해봅니다
            </p>
          </div>
        </button>

        <button
          onClick={() => handleSelect('step')}
          className="flex flex-col items-center justify-center gap-8 bg-kiosk-card hover:bg-kiosk-card/80 border-4 border-transparent text-kiosk-white rounded-[3rem] p-16 transition-all active:scale-95"
        >
          <HelpCircle className="w-32 h-32 text-kiosk-violet" />
          <div className="text-center">
            <h3 className="text-5xl font-bold mb-4">단계별 학습</h3>
            <p className="text-2xl text-kiosk-gray leading-relaxed">
              어려운 부분만<br />집중적으로 연습합니다
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}
