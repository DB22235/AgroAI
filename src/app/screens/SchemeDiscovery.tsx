import { useState } from 'react';
import { ArrowLeft, Search, Mic, Filter } from 'lucide-react';
import { useNavigate } from 'react-router';
import { BottomNav } from '../components/BottomNav';
import { SchemeCard } from '../components/SchemeCard';

const filters = [
  'All',
  'Central Govt',
  'State Govt',
  'Subsidy',
  'Loan',
  'Insurance',
  'Pension',
  'Training',
  'Equipment',
];

export function SchemeDiscovery() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

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
      logo: '🏛️',
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
      logo: '🏛️',
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
      logo: '🏛️',
    },
    {
      id: 'kcc',
      name: 'Kisan Credit Card',
      nameHi: 'किसान क्रेडिट कार्ड',
      amount: 'Up to ₹3L',
      type: 'Central Govt',
      deadline: 'Ongoing',
      docsRequired: 5,
      eligible: true,
      logo: '🏛️',
    },
    {
      id: 'pm-kusum',
      name: 'PM-KUSUM Solar Pump',
      nameHi: 'प्रधानमंत्री कुसुम योजना',
      amount: '90% subsidy',
      type: 'Central Govt',
      deadline: 'April 15',
      docsRequired: 4,
      eligible: true,
      logo: '🏛️',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F3EE] pb-20">
      {/* Top Bar */}
      <div className="bg-white px-4 py-3 flex items-center gap-3 border-b border-gray-200 sticky top-0 z-10">
        <button onClick={() => navigate('/dashboard')}>
          <ArrowLeft className="w-6 h-6 text-[#1C1C1E]" />
        </button>
        <h1 className="flex-1 font-bold text-[18px] text-[#1C1C1E]">
          योजना खोजें
        </h1>
        <button>
          <Filter className="w-5 h-5 text-[#1C1C1E]" />
        </button>
      </div>

      <div className="px-4 pt-4">
        {/* Search Bar */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#F5A623] mb-4">
          <div className="flex items-center gap-3">
            <Search className="w-5 h-5 text-[#6B7280] flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="योजना का नाम, फसल, या जरूरत लिखें..."
              className="flex-1 bg-transparent border-none outline-none text-[15px] placeholder:text-[#6B7280]"
            />
            <button>
              <Mic className="w-5 h-5 text-[#F5A623]" />
            </button>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-4 hide-scrollbar">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-[13px] font-medium whitespace-nowrap transition-all ${
                activeFilter === filter
                  ? 'bg-[#F5A623] text-white'
                  : 'bg-white text-[#1C1C1E] border border-gray-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Eligibility Banner */}
        <div className="bg-gradient-to-r from-[#F5A623] to-[#E09515] rounded-2xl p-4 mb-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[14px] font-semibold mb-1">
                ✨ आपकी प्रोफाइल के अनुसार 14 योजनाएं
              </p>
              <p className="text-[12px] opacity-90">
                Based on your profile
              </p>
            </div>
            <button className="bg-white text-[#F5A623] px-3 py-1.5 rounded-full text-[11px] font-medium">
              सभी देखें
            </button>
          </div>
        </div>

        {/* Scheme List */}
        <div className="space-y-3 mb-4">
          {schemes.map((scheme) => (
            <SchemeCard key={scheme.id} {...scheme} />
          ))}
        </div>
      </div>

      <BottomNav />

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
