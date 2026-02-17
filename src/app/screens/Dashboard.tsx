import { Bell, Menu, ArrowRight, Search, FileText, BarChart3, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router';
import { BottomNav } from '../components/BottomNav';
import { SchemeCard } from '../components/SchemeCard';

export function Dashboard() {
  const navigate = useNavigate();

  const schemes = [
    {
      id: 'pm-kisan',
      name: 'PM-Kisan Samman Nidhi',
      nameHi: 'प्रधानमंत्री किसान सम्मान निधि',
      amount: '₹6,000/year',
      type: 'Central Govt',
      deadline: 'March 31',
      docsRequired: 3,
      eligible: true,
      logo: '🏛️'
    },
    {
      id: 'pmfby',
      name: 'PM Fasal Bima Yojana',
      nameHi: 'प्रधानमंत्री फसल बीमा योजना',
      amount: 'Up to ₹2L',
      type: 'Central Govt',
      deadline: 'Feb 28',
      docsRequired: 4,
      eligible: true,
      logo: '🏛️'
    },
    {
      id: 'soil-health',
      name: 'Soil Health Card Scheme',
      nameHi: 'मृदा स्वास्थ्य कार्ड योजना',
      amount: 'Free Testing',
      type: 'State Govt',
      deadline: 'March 15',
      docsRequired: 2,
      eligible: true,
      logo: '🏛️'
    },
  ];

  const quickActions = [
    { icon: Search, label: 'योजना खोजें', labelEn: 'Search Scheme', path: '/schemes' },
    { icon: FileText, label: 'आवेदन करें', labelEn: 'Apply', path: '/schemes' },
    { icon: BarChart3, label: 'स्थिति देखें', labelEn: 'Check Status', path: '/applications' },
    { icon: AlertCircle, label: 'रिमाइंडर', labelEn: 'Reminders', path: '/notifications' },
  ];

  return (
    <div className="min-h-screen bg-[#F7F3EE] pb-20">
      {/* Header */}
      <div className="bg-[#1A3C1A] pt-3 pb-8 px-4">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => navigate('/profile')}>
            <Menu className="w-6 h-6 text-white" />
          </button>
          <h1 className="font-display font-bold text-white text-[18px]">
            Krishi Mitra
          </h1>
          <button 
            onClick={() => navigate('/notifications')}
            className="relative"
          >
            <Bell className="w-6 h-6 text-white" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#F87171] rounded-full flex items-center justify-center text-white text-[9px] font-bold">
              3
            </div>
          </button>
        </div>

        {/* Greeting Card */}
        <div className="bg-[#2D6A2D] rounded-2xl p-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h2 className="text-white font-bold text-[20px] mb-1">
                🌾 नमस्ते, राजेश जी!
              </h2>
              <p className="text-[#97BC62] text-[14px]">
                आपकी प्रोफाइल 78% पूरी है
              </p>
            </div>
            <button 
              onClick={() => navigate('/profile')}
              className="text-[#F5A623] text-[13px] font-medium"
            >
              पूरा करें
            </button>
          </div>
          <div className="w-full bg-[#1A3C1A] h-2 rounded-full overflow-hidden">
            <div className="bg-[#F5A623] h-full" style={{ width: '78%' }} />
          </div>
          <div className="flex items-center gap-1 mt-3 text-[#C8D8C8] text-[12px]">
            <span>📍</span>
            <span>Nashik, Maharashtra</span>
          </div>
        </div>
      </div>

      {/* Scheme Match Banner */}
      <div className="px-4 -mt-4 mb-6">
        <div 
          onClick={() => navigate('/schemes')}
          className="bg-white rounded-2xl p-4 shadow-lg border-l-4 border-[#F5A623] cursor-pointer hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-bold text-[16px] text-[#1C1C1E] mb-2">
                🎯 आपके लिए 14 योजनाएं मिलीं!
              </h3>
              <div className="flex gap-2 flex-wrap">
                <span className="bg-[#F7F3EE] text-[#1C1C1E] px-2 py-1 rounded-lg text-[11px] font-medium">
                  PM-Kisan
                </span>
                <span className="bg-[#F7F3EE] text-[#1C1C1E] px-2 py-1 rounded-lg text-[11px] font-medium">
                  PMFBY
                </span>
                <span className="bg-[#F7F3EE] text-[#1C1C1E] px-2 py-1 rounded-lg text-[11px] font-medium">
                  +12 more
                </span>
              </div>
            </div>
            <ArrowRight className="w-6 h-6 text-[#F5A623] flex-shrink-0 ml-2" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 mb-6">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                onClick={() => navigate(action.path)}
                className="flex flex-col items-center gap-2 bg-white rounded-2xl p-4 min-w-[80px] shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-full bg-[#F7F3EE] flex items-center justify-center">
                  <Icon className="w-6 h-6 text-[#2D6A2D]" />
                </div>
                <span className="text-[11px] text-[#1C1C1E] font-medium text-center leading-tight">
                  {action.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Urgent Alerts */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-[18px] text-[#1C1C1E]">
            ⚠️ जरूरी सूचनाएं
          </h3>
          <button 
            onClick={() => navigate('/notifications')}
            className="text-[#2D6A2D] text-[13px] font-medium"
          >
            सभी देखें
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2">
          <div className="bg-white rounded-2xl p-4 min-w-[280px] border-l-4 border-[#FB923C] shadow-sm">
            <div className="flex items-start gap-2 mb-2">
              <div className="w-2 h-2 bg-[#F87171] rounded-full mt-1.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-[14px] text-[#1C1C1E] mb-1">
                  PM-Kisan आवेदन की आखिरी तारीख
                </h4>
                <p className="text-[13px] text-[#6B7280]">
                  केवल 3 दिन बाकी हैं
                </p>
              </div>
            </div>
            <button 
              onClick={() => navigate('/schemes/pm-kisan')}
              className="w-full bg-[#F5A623] text-white py-2 rounded-xl text-[13px] font-medium mt-2"
            >
              अभी आवेदन करें / Apply Now
            </button>
          </div>

          <div className="bg-white rounded-2xl p-4 min-w-[280px] border-l-4 border-[#60A5FA] shadow-sm">
            <div className="flex items-start gap-2 mb-2">
              <div className="w-2 h-2 bg-[#60A5FA] rounded-full mt-1.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-[14px] text-[#1C1C1E] mb-1">
                  आपका PMFBY आवेदन अंडर रिव्यू में ह��
                </h4>
                <p className="text-[13px] text-[#6B7280]">
                  अनुमानित समय: 7 दिन
                </p>
              </div>
            </div>
            <button 
              onClick={() => navigate('/applications')}
              className="w-full border border-gray-200 text-[#1C1C1E] py-2 rounded-xl text-[13px] font-medium mt-2"
            >
              स्थिति देखें / View Status
            </button>
          </div>
        </div>
      </div>

      {/* Recommended Schemes */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-[18px] text-[#1C1C1E]">
            आपके लिए अनुशंसित योजनाएं
          </h3>
          <button 
            onClick={() => navigate('/schemes')}
            className="text-[#2D6A2D] text-[13px] font-medium"
          >
            और देखें
          </button>
        </div>

        <div className="space-y-3">
          {schemes.map((scheme) => (
            <SchemeCard key={scheme.id} {...scheme} />
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
