import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// --- Types ---

export type ProductOption = {
  id: string;
  name: string;
  price: number;
};

export type Product = {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isPopular?: boolean;
  isRecommended?: boolean;
  isSoldOut?: boolean;
};

export type Category = {
  id: string;
  name: string;
  order: number;
};

export type CartItem = {
  id: string;
  product: Product;
  quantity: number;
  options: {
    temperature?: 'hot' | 'ice';
    size?: 'tall' | 'grande' | 'venti';
    shot?: number;
    syrup?: number;
    takeout?: boolean;
  };
  totalPrice: number;
};

export type Post = {
  id: string;
  title: string;
  content: string;
  category: 'notice' | 'guide';
  createdAt: string;
  isPublished: boolean;
};

// --- Mock Data ---

const MOCK_CATEGORIES: Category[] = [
  { id: 'c1', name: '커피', order: 1 },
  { id: 'c2', name: '라떼', order: 2 },
  { id: 'c3', name: '차가운 음료', order: 3 },
  { id: 'c4', name: '티', order: 4 },
  { id: 'c5', name: '디저트', order: 5 },
];

const MOCK_PRODUCTS: Product[] = [
  { id: 'p1', categoryId: 'c1', name: '퍼플 아메리카노', description: '퍼플리프의 시그니처 블렌딩 원두로 내린 아메리카노', price: 4500, imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=400&fit=crop', isPopular: true },
  { id: 'p2', categoryId: 'c1', name: '디카페인 아메리카노', description: '카페인 부담 없이 즐기는 깔끔한 아메리카노', price: 4800, imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=400&fit=crop' },
  { id: 'p3', categoryId: 'c2', name: '바닐라 라떼', description: '달콤한 바닐라 시럽과 부드러운 우유의 조화', price: 5500, imageUrl: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=400&h=400&fit=crop', isRecommended: true },
  { id: 'p4', categoryId: 'c2', name: '돌체 라떼', description: '연유가 들어가 더욱 달콤하고 부드러운 라떼', price: 5800, imageUrl: 'https://images.unsplash.com/photo-1558584673-c834fb1cc3ca?w=400&h=400&fit=crop' },
  { id: 'p5', categoryId: 'c3', name: '카라멜 크림 프라페', description: '시원한 얼음과 카라멜, 생크림이 듬뿍 올라간 음료', price: 6500, imageUrl: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=400&fit=crop' },
  { id: 'p6', categoryId: 'c4', name: '유자 캐모마일 티', description: '상큼한 유자와 향긋한 캐모마일이 어우러진 티', price: 5000, imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400&h=400&fit=crop' },
  { id: 'p7', categoryId: 'c5', name: '블루베리 머핀', description: '상큼한 블루베리가 톡톡 씹히는 촉촉한 머핀', price: 3500, imageUrl: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400&h=400&fit=crop' },
];

const MOCK_POSTS: Post[] = [
  { id: 'post1', title: '처음 이용하시는 분은 연습모드를 먼저 사용해보세요.', content: '키오스크가 낯설다면 연습모드를 통해 천천히 배워보세요. 실수해도 괜찮습니다.', category: 'notice', createdAt: '2026-03-28', isPublished: true },
  { id: 'post2', title: '음성안내 버튼을 누르면 화면 설명을 들을 수 있습니다.', content: '화면 우측 상단의 스피커 모양 버튼을 누르면 친절한 음성 안내가 나옵니다.', category: 'guide', createdAt: '2026-03-27', isPublished: true },
  { id: 'post3', title: '실전모드는 실제 키오스크처럼 연습할 수 있습니다.', content: '연습모드에 익숙해지셨다면 실전모드에 도전해보세요!', category: 'notice', createdAt: '2026-03-26', isPublished: true },
];

// --- Stores ---

interface AdminState {
  categories: Category[];
  products: Product[];
  posts: Post[];
  settings: {
    voiceGuidanceDefault: boolean;
    highContrastMode: boolean;
    primaryColor: string;
  };
  addCategory: (category: Category) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addPost: (post: Post) => void;
  updatePost: (id: string, post: Partial<Post>) => void;
  deletePost: (id: string) => void;
  updateSettings: (settings: Partial<AdminState['settings']>) => void;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      categories: MOCK_CATEGORIES,
      products: MOCK_PRODUCTS,
      posts: MOCK_POSTS,
      settings: {
        voiceGuidanceDefault: true,
        highContrastMode: false,
        primaryColor: '#6F3FF5',
      },
      addCategory: (category) => set((state) => ({ categories: [...state.categories, category] })),
      updateCategory: (id, updated) => set((state) => ({ categories: state.categories.map(c => c.id === id ? { ...c, ...updated } : c) })),
      deleteCategory: (id) => set((state) => ({ categories: state.categories.filter(c => c.id !== id) })),
      addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
      updateProduct: (id, updated) => set((state) => ({ products: state.products.map(p => p.id === id ? { ...p, ...updated } : p) })),
      deleteProduct: (id) => set((state) => ({ products: state.products.filter(p => p.id !== id) })),
      addPost: (post) => set((state) => ({ posts: [...state.posts, post] })),
      updatePost: (id, updated) => set((state) => ({ posts: state.posts.map(p => p.id === id ? { ...p, ...updated } : p) })),
      deletePost: (id) => set((state) => ({ posts: state.posts.filter(p => p.id !== id) })),
      updateSettings: (updated) => set((state) => ({ settings: { ...state.settings, ...updated } })),
    }),
    { name: 'purple-leaf-admin-storage' }
  )
);

interface KioskState {
  mode: 'practice' | 'real' | 'step' | null;
  voiceEnabled: boolean;
  cart: CartItem[];
  currentCategory: string | null;
  selectedProduct: Product | null;
  setMode: (mode: KioskState['mode']) => void;
  toggleVoice: () => void;
  setVoice: (enabled: boolean) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  setCurrentCategory: (id: string | null) => void;
  setSelectedProduct: (product: Product | null) => void;
  resetKiosk: () => void;
}

export const useKioskStore = create<KioskState>((set) => ({
  mode: null,
  voiceEnabled: true,
  cart: [],
  currentCategory: null,
  selectedProduct: null,
  setMode: (mode) => set({ mode }),
  toggleVoice: () => set((state) => ({ voiceEnabled: !state.voiceEnabled })),
  setVoice: (enabled) => set({ voiceEnabled: enabled }),
  addToCart: (item) => set((state) => ({ cart: [...state.cart, item] })),
  removeFromCart: (id) => set((state) => ({ cart: state.cart.filter(item => item.id !== id) })),
  clearCart: () => set({ cart: [] }),
  setCurrentCategory: (id) => set({ currentCategory: id }),
  setSelectedProduct: (product) => set({ selectedProduct: product }),
  resetKiosk: () => set({ mode: null, cart: [], currentCategory: null, selectedProduct: null }),
}));
