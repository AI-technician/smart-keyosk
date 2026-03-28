import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export default function CompletePage() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 gap-12 bg-kiosk-black">
      <div className="bg-kiosk-card p-16 rounded-[4rem] flex flex-col items-center max-w-4xl w-full text-center">
        <CheckCircle className="w-48 h-48 text-green-500 mb-8" />
        
        <h2 className="text-6xl font-bold text-kiosk-white mb-6">
          주문이 완료되었습니다!
        </h2>
        
        <p className="text-3xl text-kiosk-gray mb-12 leading-relaxed">
          참 잘하셨습니다.<br />
          영수증과 진동벨을 챙겨주세요.
        </p>

        <div className="flex gap-8 w-full">
          <button
            onClick={() => navigate('/')}
            className="flex-1 bg-white/10 hover:bg-white/20 text-white py-10 rounded-3xl text-4xl font-bold transition-all active:scale-95"
          >
            처음으로 돌아가기
          </button>
          <button
            onClick={() => navigate('/kiosk/mode')}
            className="flex-1 bg-kiosk-purple hover:bg-kiosk-purple-hover text-white py-10 rounded-3xl text-4xl font-bold shadow-[0_0_40px_rgba(111,63,245,0.4)] transition-all active:scale-95"
          >
            다시 연습하기
          </button>
        </div>
      </div>
    </div>
  );
}
