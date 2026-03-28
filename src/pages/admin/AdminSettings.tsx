import { useAdminStore } from '../../store';
import { Save } from 'lucide-react';

export default function AdminSettings() {
  const { settings, updateSettings } = useAdminStore();

  const handleSave = () => {
    alert('설정이 저장되었습니다.');
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">설정</h1>
        <button 
          onClick={handleSave}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
        >
          <Save className="w-5 h-5" />
          저장하기
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 divide-y divide-gray-200">
        
        {/* Voice Guidance Setting */}
        <div className="p-8 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-1">음성 안내 기본 설정</h2>
            <p className="text-gray-500">키오스크 시작 시 음성 안내를 기본으로 켤지 설정합니다.</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer"
              checked={settings.voiceGuidanceDefault}
              onChange={(e) => updateSettings({ voiceGuidanceDefault: e.target.checked })}
            />
            <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-purple-600"></div>
          </label>
        </div>

        {/* High Contrast Mode */}
        <div className="p-8 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-1">고대비 모드</h2>
            <p className="text-gray-500">시력이 안 좋으신 어르신들을 위해 대비를 높입니다.</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer"
              checked={settings.highContrastMode}
              onChange={(e) => updateSettings({ highContrastMode: e.target.checked })}
            />
            <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-purple-600"></div>
          </label>
        </div>

        {/* Brand Color */}
        <div className="p-8 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-1">브랜드 색상</h2>
            <p className="text-gray-500">키오스크의 메인 포인트 색상을 변경합니다.</p>
          </div>
          <div className="flex items-center gap-4">
            <input 
              type="color" 
              value={settings.primaryColor}
              onChange={(e) => updateSettings({ primaryColor: e.target.value })}
              className="w-12 h-12 rounded cursor-pointer border-0 p-0"
            />
            <span className="text-gray-900 font-mono bg-gray-100 px-3 py-1 rounded">{settings.primaryColor}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
