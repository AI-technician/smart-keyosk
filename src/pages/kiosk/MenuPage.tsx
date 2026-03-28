import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminStore, useKioskStore } from '../../store';
import { cn, formatPrice } from '../../lib/utils';
import { ShoppingCart } from 'lucide-react';

export default function MenuPage() {
  const navigate = useNavigate();
  const { categories, products } = useAdminStore();
  const { currentCategory, setCurrentCategory, setSelectedProduct, cart } = useKioskStore();

  useEffect(() => {
    if (!currentCategory && categories.length > 0) {
      setCurrentCategory(categories[0].id);
    }
  }, [categories, currentCategory, setCurrentCategory]);

  const filteredProducts = products.filter(p => p.categoryId === currentCategory);
  
  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartPrice = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    navigate(`/kiosk/product/${product.id}`);
  };

  return (
    <div className="flex flex-col h-full bg-kiosk-black overflow-hidden">
      {/* Categories Tab Bar */}
      <div className="flex gap-4 p-6 overflow-x-auto no-scrollbar shrink-0 border-b border-white/10">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCurrentCategory(cat.id)}
            className={cn(
              "px-10 py-6 rounded-full text-3xl font-bold whitespace-nowrap transition-all active:scale-95",
              currentCategory === cat.id
                ? "bg-kiosk-purple text-white shadow-[0_0_20px_rgba(111,63,245,0.4)]"
                : "bg-kiosk-card text-kiosk-gray hover:bg-white/10"
            )}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="flex-1 overflow-y-auto p-8 no-scrollbar">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <button
              key={product.id}
              onClick={() => handleProductClick(product)}
              className="flex flex-col bg-kiosk-card rounded-[2rem] overflow-hidden hover:bg-white/5 transition-all active:scale-95 border-2 border-transparent focus:border-kiosk-purple"
            >
              <div className="relative aspect-square w-full bg-white/5">
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {product.isPopular && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full text-xl font-bold shadow-lg">
                    인기
                  </div>
                )}
                {product.isRecommended && (
                  <div className="absolute top-4 left-4 bg-kiosk-purple text-white px-4 py-2 rounded-full text-xl font-bold shadow-lg">
                    추천
                  </div>
                )}
              </div>
              <div className="p-8 flex flex-col gap-4 flex-1 justify-between">
                <div>
                  <h3 className="text-4xl font-bold text-kiosk-white mb-2 leading-tight">
                    {product.name}
                  </h3>
                  <p className="text-xl text-kiosk-gray line-clamp-2">
                    {product.description}
                  </p>
                </div>
                <div className="text-4xl font-bold text-kiosk-purple mt-4">
                  {formatPrice(product.price)}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Cart Bar */}
      <div className="bg-kiosk-card border-t border-white/10 p-8 shrink-0 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="relative">
            <ShoppingCart className="w-16 h-16 text-kiosk-white" />
            {totalCartItems > 0 && (
              <div className="absolute -top-4 -right-4 bg-red-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold">
                {totalCartItems}
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-2xl text-kiosk-gray">총 결제금액</span>
            <span className="text-5xl font-bold text-kiosk-white">
              {formatPrice(totalCartPrice)}
            </span>
          </div>
        </div>

        <button
          onClick={() => navigate('/kiosk/cart')}
          disabled={totalCartItems === 0}
          className={cn(
            "px-16 py-8 rounded-3xl text-4xl font-bold transition-all active:scale-95",
            totalCartItems > 0
              ? "bg-kiosk-purple hover:bg-kiosk-purple-hover text-white shadow-[0_0_30px_rgba(111,63,245,0.3)]"
              : "bg-white/10 text-kiosk-gray cursor-not-allowed"
          )}
        >
          장바구니 확인 ({totalCartItems}개)
        </button>
      </div>
    </div>
  );
}
