import { useNavigate } from 'react-router-dom';
import { CreditCard, Smartphone, Banknote } from 'lucide-react';

export default function PaymentMethodPage() {
  const navigate = useNavigate();

  const handleSelect = (method: string) => {
    if (method === 'cash') {
      alert('현금 결제는 카운터에서 도와드리겠습니다.');
      return;
    }
    navigate('/kiosk/confirm');
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 gap-12 bg-kiosk-black">
      <h2 className="text-5xl font-bold text-kiosk-white mb-8">
        결제 방식을 선택해주세요
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        <button
          onClick={() => handleSelect('card')}
          className="flex flex-col items-center justify-center gap-8 bg-kiosk-card hover:bg-kiosk-card/80 border-4 border-kiosk-purple text-kiosk-white rounded-[3rem] p-16 transition-all active:scale-95 shadow-[0_0_30px_rgba(111,63,245,0.2)]"
        >
          <CreditCard className="w-32 h-32 text-kiosk-purple" />
          <div className="text-center">
            <h3 className="text-5xl font-bold mb-4">신용카드</h3>
            <p className="text-2xl text-kiosk-gray leading-relaxed">
              신용카드 또는 체크카드<br />(삼성페이 포함)
            </p>
          </div>
        </button>

        <button
          onClick={() => handleSelect('simple')}
          className="flex flex-col items-center justify-center gap-8 bg-kiosk-card hover:bg-kiosk-card/80 border-4 border-transparent text-kiosk-white rounded-[3rem] p-16 transition-all active:scale-95"
        >
          <Smartphone className="w-32 h-32 text-kiosk-white" />
          <div className="text-center">
            <h3 className="text-5xl font-bold mb-4">간편결제</h3>
            <p className="text-2xl text-kiosk-gray leading-relaxed">
              카카오페이, 네이버페이 등<br />바코드 결제
            </p>
          </div>
        </button>

        <button
          onClick={() => handleSelect('cash')}
          className="flex flex-col items-center justify-center gap-8 bg-kiosk-card hover:bg-kiosk-card/80 border-4 border-transparent text-kiosk-white rounded-[3rem] p-16 transition-all active:scale-95"
        >
          <Banknote className="w-32 h-32 text-kiosk-violet" />
          <div className="text-center">
            <h3 className="text-5xl font-bold mb-4">현금결제</h3>
            <p className="text-2xl text-kiosk-gray leading-relaxed">
              카운터에서<br />직원에게 결제
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}
