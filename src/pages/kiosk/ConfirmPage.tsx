import { useNavigate } from 'react-router-dom';
import { useKioskStore } from '../../store';
import { formatPrice } from '../../lib/utils';
import { CheckCircle2 } from 'lucide-react';

export default function ConfirmPage() {
  const navigate = useNavigate();
  const { cart, clearCart } = useKioskStore();

  const totalCartPrice = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  const handleConfirm = () => {
    // In a real app, this would process payment.
    // For practice, we just go to complete.
    clearCart();
    navigate('/kiosk/complete');
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 gap-12 bg-kiosk-black">
      <div className="bg-kiosk-card p-16 rounded-[4rem] flex flex-col items-center max-w-4xl w-full text-center">
        <CheckCircle2 className="w-48 h-48 text-kiosk-purple mb-8" />
        
        <h2 className="text-6xl font-bold text-kiosk-white mb-6">
          이대로 결제하시겠습니까?
        </h2>
        
        <p className="text-3xl text-kiosk-gray mb-12">
          총 결제금액: <span className="text-kiosk-purple font-bold">{formatPrice(totalCartPrice)}</span>
        </p>

        <div className="flex gap-8 w-full">
          <button
            onClick={() => navigate(-1)}
            className="flex-1 bg-white/10 hover:bg-white/20 text-white py-10 rounded-3xl text-4xl font-bold transition-all active:scale-95"
          >
            다시 선택하기
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 bg-kiosk-purple hover:bg-kiosk-purple-hover text-white py-10 rounded-3xl text-4xl font-bold shadow-[0_0_40px_rgba(111,63,245,0.4)] transition-all active:scale-95"
          >
            예 (결제하기)
          </button>
        </div>
      </div>
    </div>
  );
}
