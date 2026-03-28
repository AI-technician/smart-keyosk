import { useState } from 'react';
import { useAdminStore, Product, Category } from '../../store';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export default function AdminMenu() {
  const { categories, products, addProduct, updateProduct, deleteProduct, addCategory, deleteCategory } = useAdminStore();
  const [activeTab, setActiveTab] = useState<'products' | 'categories'>('products');

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">메뉴 관리</h1>
        <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          <Plus className="w-5 h-5" />
          {activeTab === 'products' ? '상품 추가' : '카테고리 추가'}
        </button>
      </div>

      <div className="flex gap-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
            activeTab === 'products' ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          상품 목록
        </button>
        <button
          onClick={() => setActiveTab('categories')}
          className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
            activeTab === 'categories' ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          카테고리 목록
        </button>
      </div>

      {activeTab === 'products' ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-500">
                <th className="p-4">이미지</th>
                <th className="p-4">상품명</th>
                <th className="p-4">카테고리</th>
                <th className="p-4">가격</th>
                <th className="p-4">상태</th>
                <th className="p-4 text-right">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <img src={product.imageUrl} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                  </td>
                  <td className="p-4 font-medium text-gray-900">{product.name}</td>
                  <td className="p-4 text-gray-500">{categories.find(c => c.id === product.categoryId)?.name}</td>
                  <td className="p-4 text-gray-900">{product.price.toLocaleString()}원</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      {product.isPopular && <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full font-medium">인기</span>}
                      {product.isRecommended && <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-medium">추천</span>}
                      {product.isSoldOut && <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">품절</span>}
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => {
                          if (window.confirm('정말 삭제하시겠습니까?')) {
                            deleteProduct(product.id);
                          }
                        }}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-500">
                <th className="p-4">순서</th>
                <th className="p-4">카테고리명</th>
                <th className="p-4">상품 수</th>
                <th className="p-4 text-right">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {categories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-gray-500">{category.order}</td>
                  <td className="p-4 font-medium text-gray-900">{category.name}</td>
                  <td className="p-4 text-gray-500">
                    {products.filter(p => p.categoryId === category.id).length}개
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => {
                          if (window.confirm('정말 삭제하시겠습니까?')) {
                            deleteCategory(category.id);
                          }
                        }}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
