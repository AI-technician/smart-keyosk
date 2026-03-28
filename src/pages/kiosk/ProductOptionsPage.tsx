import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdminStore, useKioskStore, CartItem } from '../../store';
import { formatPrice, cn } from '../../lib/utils';
import { Minus, Plus, Check } from 'lucide-react';

export default function ProductOptionsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useAdminStore();
  const { addToCart } = useKioskStore();
  
  const product = products.find(p => p.id === id);

  const [temperature, setTemperature] = useState<'hot' | 'ice'>('ice');
  const [size, setSize] = useState<'tall' | 'grande' | 'venti'>('tall');
  const [shot, setShot] = useState(0);
  const [syrup, setSyrup] = useState(0);
  const [takeout, setTakeout] = useState(true);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <div className="p-8 text-3xl text-center">상품을 찾을 수 없습니다.</div>;
  }

  const optionPrices = {
    hot: 0,
    ice: 0,
    tall: 0,
    grande: 500,
    venti: 1000,
    shot: 500,
    syrup: 500,
    takeout: 0,
  };

  const calculateTotal = () => {
    let base = product.price;
    base += optionPrices[size];
    base += shot * optionPrices.shot;
    base += syrup * optionPrices.syrup;
    return base * quantity;
  };

  const handleAddToCart = () => {
    const item: CartItem = {
      id: Math.random().toString(36).substr(2, 9),
      product,
      quantity,
      options: {
        temperature,
        size,
        shot,
        syrup,
        takeout,
      },
      totalPrice: calculateTotal(),
    };
    addToCart(item);
    navigate('/kiosk/menu');
  };

  return (
    <div className="flex flex-col h-full bg-kiosk-black overflow-hidden">
      <div className="flex-1 overflow-y-auto p-8 no-scrollbar">
        <div className="max-w-4xl mx-auto flex flex-col gap-12">
          
          {/* Product Header */}
          <div className="flex gap-12 items-center bg-kiosk-card p-8 rounded-[3rem]">
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="w-48 h-48 rounded-[2rem] object-cover bg-white/5"
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col gap-4">
              <h2 className="text-5xl font-bold text-kiosk-white">{product.name}</h2>
              <p className="text-2xl text-kiosk-gray">{product.description}</p>
              <div className="text-4xl font-bold text-kiosk-purple mt-2">
                기본 {formatPrice(product.price)}
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="flex flex-col gap-12">
            
            {/* Temperature */}
            <section>
              <h3 className="text-3xl font-bold text-kiosk-white mb-6">온도 선택</h3>
              <div className="grid grid-cols-2 gap-6">
                <button
                  onClick={() => setTemperature('hot')}
                  className={cn(
                    "py-10 rounded-[2rem] text-4xl font-bold flex items-center justify-center gap-4 transition-all active:scale-95",
                    temperature === 'hot' ? "bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]" : "bg-kiosk-card text-kiosk-gray hover:bg-white/10"
                  )}
                >
                  {temperature === 'hot' && <Check className="w-10 h-10" />}
                  따뜻하게 (HOT)
                </button>
                <button
                  onClick={() => setTemperature('ice')}
                  className={cn(
                    "py-10 rounded-[2rem] text-4xl font-bold flex items-center justify-center gap-4 transition-all active:scale-95",
                    temperature === 'ice' ? "bg-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)]" : "bg-kiosk-card text-kiosk-gray hover:bg-white/10"
                  )}
                >
                  {temperature === 'ice' && <Check className="w-10 h-10" />}
                  차갑게 (ICE)
                </button>
              </div>
            </section>

            {/* Size */}
            <section>
              <h3 className="text-3xl font-bold text-kiosk-white mb-6">크기 선택</h3>
              <div className="grid grid-cols-3 gap-6">
                {[
                  { id: 'tall', label: '기본 (Tall)', price: 0 },
                  { id: 'grande', label: '조금 크게 (Grande)', price: 500 },
                  { id: 'venti', label: '아주 크게 (Venti)', price: 1000 },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSize(s.id as any)}
                    className={cn(
                      "py-10 rounded-[2rem] flex flex-col items-center justify-center gap-4 transition-all active:scale-95",
                      size === s.id ? "bg-kiosk-purple text-white shadow-[0_0_20px_rgba(111,63,245,0.4)]" : "bg-kiosk-card text-kiosk-gray hover:bg-white/10"
                    )}
                  >
                    <span className="text-3xl font-bold">{s.label}</span>
                    <span className="text-2xl opacity-80">+{formatPrice(s.price)}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Takeout */}
            <section>
              <h3 className="text-3xl font-bold text-kiosk-white mb-6">포장 여부</h3>
              <div className="grid grid-cols-2 gap-6">
                <button
                  onClick={() => setTakeout(true)}
                  className={cn(
                    "py-10 rounded-[2rem] text-4xl font-bold flex items-center justify-center gap-4 transition-all active:scale-95",
                    takeout ? "bg-kiosk-purple text-white shadow-[0_0_20px_rgba(111,63,245,0.4)]" : "bg-kiosk-card text-kiosk-gray hover:bg-white/10"
                  )}
                >
                  {takeout && <Check className="w-10 h-10" />}
                  포장하기 (Take-out)
                </button>
                <button
                  onClick={() => setTakeout(false)}
                  className={cn(
                    "py-10 rounded-[2rem] text-4xl font-bold flex items-center justify-center gap-4 transition-all active:scale-95",
                    !takeout ? "bg-kiosk-purple text-white shadow-[0_0_20px_rgba(111,63,245,0.4)]" : "bg-kiosk-card text-kiosk-gray hover:bg-white/10"
                  )}
                >
                  {!takeout && <Check className="w-10 h-10" />}
                  매장 식사 (Dine-in)
                </button>
              </div>
            </section>

            {/* Shot & Syrup */}
            <section className="grid grid-cols-2 gap-8">
              <div className="bg-kiosk-card p-8 rounded-[3rem] flex flex-col gap-6">
                <h3 className="text-3xl font-bold text-kiosk-white">샷 추가 (+500원)</h3>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setShot(Math.max(0, shot - 1))}
                    className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 active:scale-95"
                  >
                    <Minus className="w-10 h-10 text-white" />
                  </button>
                  <span className="text-5xl font-bold">{shot}</span>
                  <button
                    onClick={() => setShot(shot + 1)}
                    className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 active:scale-95"
                  >
                    <Plus className="w-10 h-10 text-white" />
                  </button>
                </div>
              </div>

              <div className="bg-kiosk-card p-8 rounded-[3rem] flex flex-col gap-6">
                <h3 className="text-3xl font-bold text-kiosk-white">시럽 추가 (+500원)</h3>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setSyrup(Math.max(0, syrup - 1))}
                    className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 active:scale-95"
                  >
                    <Minus className="w-10 h-10 text-white" />
                  </button>
                  <span className="text-5xl font-bold">{syrup}</span>
                  <button
                    onClick={() => setSyrup(syrup + 1)}
                    className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 active:scale-95"
                  >
                    <Plus className="w-10 h-10 text-white" />
                  </button>
                </div>
              </div>
            </section>

            {/* Quantity */}
            <section className="flex items-center justify-between bg-kiosk-card p-8 rounded-[3rem]">
              <h3 className="text-4xl font-bold text-kiosk-white">수량</h3>
              <div className="flex items-center gap-8">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 active:scale-95"
                >
                  <Minus className="w-10 h-10 text-white" />
                </button>
                <span className="text-6xl font-bold w-24 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 active:scale-95"
                >
                  <Plus className="w-10 h-10 text-white" />
                </button>
              </div>
            </section>

          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="bg-kiosk-card border-t border-white/10 p-8 shrink-0 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-2xl text-kiosk-gray">총 금액</span>
          <span className="text-6xl font-bold text-kiosk-purple">
            {formatPrice(calculateTotal())}
          </span>
        </div>

        <div className="flex gap-6">
          <button
            onClick={() => navigate(-1)}
            className="bg-white/10 hover:bg-white/20 text-white px-12 py-8 rounded-3xl text-4xl font-bold transition-all active:scale-95"
          >
            다시 선택하기
          </button>
          <button
            onClick={handleAddToCart}
            className="bg-kiosk-purple hover:bg-kiosk-purple-hover text-white px-20 py-8 rounded-3xl text-4xl font-bold shadow-[0_0_30px_rgba(111,63,245,0.3)] transition-all active:scale-95"
          >
            장바구니 담기
          </button>
        </div>
      </div>
    </div>
  );
}
