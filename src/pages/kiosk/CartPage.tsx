import { useNavigate } from 'react-router-dom';
import { useKioskStore } from '../../store';
import { formatPrice } from '../../lib/utils';
import { Trash2, Plus, Minus } from 'lucide-react';

export default function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart, addToCart, clearCart } = useKioskStore();

  const totalCartPrice = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  const handleProceed = () => {
    if (cart.length === 0) {
      alert('장바구니가 비어있습니다.');
      return;
    }
    navigate('/kiosk/payment');
  };

  return (
    <div className="flex flex-col h-full bg-kiosk-black overflow-hidden">
      <div className="flex-1 overflow-y-auto p-8 no-scrollbar">
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-5xl font-bold text-kiosk-white">
              주문하실 메뉴를 확인해주세요
            </h2>
            {cart.length > 0 && (
              <button
                onClick={() => {
                  if (window.confirm('장바구니를 모두 비우시겠습니까?')) {
                    clearCart();
                  }
                }}
                className="text-2xl text-red-400 hover:text-red-300 transition-colors underline underline-offset-4"
              >
                전체 삭제
              </button>
            )}
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-32 text-3xl text-kiosk-gray">
              장바구니가 비어있습니다.
            </div>
          ) : (
            cart.map((item, index) => (
              <div key={item.id} className="bg-kiosk-card p-8 rounded-[3rem] flex items-center justify-between gap-8">
                <div className="flex items-center gap-8 flex-1">
                  <img 
                    src={item.product.imageUrl} 
                    alt={item.product.name} 
                    className="w-32 h-32 rounded-[2rem] object-cover bg-white/5"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex flex-col gap-2">
                    <h3 className="text-4xl font-bold text-kiosk-white">{item.product.name}</h3>
                    <p className="text-2xl text-kiosk-gray">
                      {item.options.temperature === 'hot' ? '따뜻하게' : '차갑게'} / 
                      {item.options.size === 'tall' ? ' 기본 크기' : item.options.size === 'grande' ? ' 조금 크게' : ' 아주 크게'} / 
                      {item.options.takeout ? ' 포장' : ' 매장'}
                      {item.options.shot ? ` / 샷 추가(${item.options.shot})` : ''}
                      {item.options.syrup ? ` / 시럽 추가(${item.options.syrup})` : ''}
                    </p>
                    <div className="text-3xl font-bold text-kiosk-purple mt-2">
                      {formatPrice(item.totalPrice)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <span className="text-4xl font-bold w-16 text-center">{item.quantity}개</span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="w-20 h-20 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center hover:bg-red-500/30 active:scale-95 transition-colors"
                  >
                    <Trash2 className="w-10 h-10" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="bg-kiosk-card border-t border-white/10 p-8 shrink-0 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-2xl text-kiosk-gray">총 결제금액</span>
          <span className="text-6xl font-bold text-kiosk-purple">
            {formatPrice(totalCartPrice)}
          </span>
        </div>

        <div className="flex gap-6">
          <button
            onClick={() => navigate('/kiosk/menu')}
            className="bg-white/10 hover:bg-white/20 text-white px-12 py-8 rounded-3xl text-4xl font-bold transition-all active:scale-95"
          >
            메뉴 추가하기
          </button>
          <button
            onClick={handleProceed}
            disabled={cart.length === 0}
            className="bg-kiosk-purple hover:bg-kiosk-purple-hover text-white px-20 py-8 rounded-3xl text-4xl font-bold shadow-[0_0_30px_rgba(111,63,245,0.3)] transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            결제하기
          </button>
        </div>
      </div>
    </div>
  );
}
