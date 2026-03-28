import { useAdminStore } from '../../store';
import { Users, CheckCircle, Coffee, AlertTriangle } from 'lucide-react';

export default function AdminDashboard() {
  const { products, categories, posts } = useAdminStore();

  const stats = [
    { label: '오늘 연습 횟수', value: '124', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: '주문 완료율', value: '86%', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
    { label: '등록된 메뉴', value: products.length.toString(), icon: Coffee, color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: '가장 어려운 단계', value: '결제 방식 선택', icon: AlertTriangle, color: 'text-orange-600', bg: 'bg-orange-100' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">대시보드</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`p-4 rounded-xl ${stat.bg}`}>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6">최근 공지사항</h2>
          <div className="space-y-4">
            {posts.slice(0, 3).map((post) => (
              <div key={post.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <h3 className="font-medium text-gray-900">{post.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{post.createdAt}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${post.isPublished ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'}`}>
                  {post.isPublished ? '게시됨' : '임시저장'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Menu */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6">인기 연습 메뉴</h2>
          <div className="space-y-4">
            {products.filter(p => p.isPopular).map((product) => (
              <div key={product.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <img src={product.imageUrl} alt={product.name} className="w-16 h-16 rounded-lg object-cover" />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{categories.find(c => c.id === product.categoryId)?.name}</p>
                </div>
                <div className="font-medium text-gray-900">
                  {product.price.toLocaleString()}원
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
