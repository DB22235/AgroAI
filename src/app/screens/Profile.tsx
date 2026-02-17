import { useState } from 'react';
import { ArrowLeft, ChevronRight, ChevronDown, ChevronUp, Edit2, CheckCircle, AlertCircle, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router';
import { BottomNav } from '../components/BottomNav';

export function Profile() {
  const navigate = useNavigate();
  const [expandedSection, setExpandedSection] = useState<string>('');

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? '' : section);
  };

  const profileCompletion = 78;
  const pendingTasks = [
    'वार्षिक आय जोड़ें / Add annual income',
    'भूमि के दस्तावेज़ / Land documents'
  ];

  const personalInfo = [
    { label: 'Name', labelHi: 'नाम', value: 'Rajesh Kumar' },
    { label: 'Age', labelHi: 'उम्र', value: '45 years' },
    { label: 'Gender', labelHi: 'लिंग', value: 'Male' },
    { label: 'Aadhaar', labelHi: 'आधार', value: 'XXXX-XXXX-4521' },
    { label: 'Mobile', labelHi: 'मोबाइल', value: '+91 9876543210' },
    { label: 'Category', labelHi: 'श्रेणी', value: 'General' },
  ];

  const farmingDetails = [
    { label: 'Land Size', labelHi: 'भूमि आकार', value: '2.5 Acres' },
    { label: 'Ownership', labelHi: 'स्वामित्व', value: 'Owner / मालिक' },
    { label: 'Crops', labelHi: 'फसलें', value: 'Wheat, Rice, Vegetables' },
    { label: 'Soil Type', labelHi: 'मिट्टी का प्रकार', value: 'Black Soil' },
    { label: 'Irrigation', labelHi: 'सिंचाई', value: 'Borewell, Canal' },
    { label: 'Livestock', labelHi: 'पशुधन', value: '2 Cows, 5 Goats' },
  ];

  const economicInfo = [
    { label: 'Income Range', labelHi: 'आय सीमा', value: '₹50,000 - ₹1,00,000' },
    { label: 'Category', labelHi: 'श्रेणी', value: 'APL (Above Poverty Line)' },
    { label: 'PM-Kisan Status', labelHi: 'पीएम-किसान स्थिति', value: 'Active ✅' },
    { label: 'Bank Account', labelHi: 'बैंक खाता', value: 'XXXXXXXXX234' },
    { label: 'IFSC Code', labelHi: 'आईएफएससी कोड', value: 'SBIN0001234' },
    { label: 'Bank', labelHi: 'बैंक', value: 'State Bank of India ✅' },
  ];

  const documents = [
    { name: 'Aadhaar Card', nameHi: 'आधार कार्ड', status: 'uploaded', verified: true },
    { name: 'Land Records', nameHi: 'भूमि रिकॉर्ड', status: 'uploaded', verified: true },
    { name: 'Bank Passbook', nameHi: 'बैंक पासबुक', status: 'uploaded', verified: false, warning: 'Expired?' },
    { name: 'Passport Photo', nameHi: 'पासपोर्ट फोटो', status: 'uploaded', verified: true },
  ];

  return (
    <div className="min-h-screen bg-[#F7F3EE] pb-20">
      {/* Header */}
      <div className="bg-[#1A3C1A] pt-3 pb-12 px-4">
        <button onClick={() => navigate('/dashboard')} className="mb-4">
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>

        <div className="flex flex-col items-center">
          <div className="relative mb-3">
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-4xl border-4 border-[#F5A623]">
              👨‍🌾
            </div>
            <button className="absolute bottom-0 right-0 w-6 h-6 bg-[#F5A623] rounded-full flex items-center justify-center">
              <Edit2 className="w-3 h-3 text-white" />
            </button>
          </div>
          <h1 className="font-bold text-white text-[22px] mb-1">
            Rajesh Kumar
          </h1>
          <div className="flex items-center gap-1 text-[#97BC62] text-[14px] mb-1">
            <span>📍</span>
            <span>Nashik, Maharashtra</span>
          </div>
          <p className="text-[#C8D8C8] text-[12px]">
            Member since Jan 2026
          </p>
          <div className="bg-[#97BC62] px-3 py-1 rounded-full text-[#1A3C1A] text-[11px] font-semibold mt-2">
            ✅ Aadhaar Verified
          </div>
        </div>
      </div>

      {/* Profile Completion Card */}
      <div className="px-4 -mt-8 mb-6">
        <div className="bg-white rounded-2xl p-4 shadow-lg border-t-4 border-[#F5A623]">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-[16px] text-[#1C1C1E]">
              प्रोफाइल {profileCompletion}% पूर्ण है
            </h3>
            <span className="text-[#F5A623] text-[20px] font-bold">
              {profileCompletion}%
            </span>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-3">
            <div 
              className="bg-[#F5A623] h-full transition-all duration-500" 
              style={{ width: `${profileCompletion}%` }}
            />
          </div>
          <div className="mb-3">
            <p className="text-[13px] text-[#6B7280] mb-2">
              {pendingTasks.length} चीज़ें बाकी हैं:
            </p>
            {pendingTasks.map((task, index) => (
              <div key={index} className="flex items-center gap-2 mb-1">
                <div className="w-4 h-4 border-2 border-gray-300 rounded" />
                <span className="text-[13px] text-[#1C1C1E]">{task}</span>
              </div>
            ))}
          </div>
          <button 
            onClick={() => navigate('/onboarding/farm-details')}
            className="w-full bg-[#F5A623] text-white py-2.5 rounded-xl font-bold text-[14px]"
          >
            पूरा करें / Complete Profile
          </button>
        </div>
      </div>

      <div className="px-4 space-y-3">
        {/* Personal Information */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <button
            onClick={() => toggleSection('personal')}
            className="w-full px-4 py-3 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#2D6A2D] bg-opacity-10 flex items-center justify-center">
                <span className="text-xl">👤</span>
              </div>
              <h3 className="font-semibold text-[16px] text-[#1C1C1E]">
                व्यक्तिगत जानकारी
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/onboarding/profile');
                }}
                className="text-[#F5A623]"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              {expandedSection === 'personal' ? (
                <ChevronUp className="w-5 h-5 text-[#6B7280]" />
              ) : (
                <ChevronDown className="w-5 h-5 text-[#6B7280]" />
              )}
            </div>
          </button>

          {expandedSection === 'personal' && (
            <div className="px-4 pb-4 space-y-2 border-t border-gray-100 pt-3">
              {personalInfo.map((info, index) => (
                <div key={index} className="flex justify-between text-[13px] py-1">
                  <span className="text-[#6B7280]">{info.labelHi}:</span>
                  <span className="text-[#1C1C1E] font-medium">{info.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Farming Details */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <button
            onClick={() => toggleSection('farming')}
            className="w-full px-4 py-3 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#97BC62] bg-opacity-20 flex items-center justify-center">
                <span className="text-xl">🌾</span>
              </div>
              <h3 className="font-semibold text-[16px] text-[#1C1C1E]">
                कृषि विवरण
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/onboarding/farm-details');
                }}
                className="text-[#F5A623]"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              {expandedSection === 'farming' ? (
                <ChevronUp className="w-5 h-5 text-[#6B7280]" />
              ) : (
                <ChevronDown className="w-5 h-5 text-[#6B7280]" />
              )}
            </div>
          </button>

          {expandedSection === 'farming' && (
            <div className="px-4 pb-4 space-y-2 border-t border-gray-100 pt-3">
              {farmingDetails.map((info, index) => (
                <div key={index} className="flex justify-between text-[13px] py-1">
                  <span className="text-[#6B7280]">{info.labelHi}:</span>
                  <span className="text-[#1C1C1E] font-medium text-right max-w-[60%]">{info.value}</span>
                </div>
              ))}
              <div className="bg-[#FFF4E6] border border-[#FB923C] rounded-xl p-3 mt-2">
                <p className="text-[12px] text-[#FB923C] flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  Soil Health Card: Last tested 8 months ago
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Economic Information */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <button
            onClick={() => toggleSection('economic')}
            className="w-full px-4 py-3 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F5A623] bg-opacity-20 flex items-center justify-center">
                <span className="text-xl">💰</span>
              </div>
              <h3 className="font-semibold text-[16px] text-[#1C1C1E]">
                आर्थिक जानकारी
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={(e) => e.stopPropagation()}
                className="text-[#F5A623]"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              {expandedSection === 'economic' ? (
                <ChevronUp className="w-5 h-5 text-[#6B7280]" />
              ) : (
                <ChevronDown className="w-5 h-5 text-[#6B7280]" />
              )}
            </div>
          </button>

          {expandedSection === 'economic' && (
            <div className="px-4 pb-4 space-y-2 border-t border-gray-100 pt-3">
              {economicInfo.map((info, index) => (
                <div key={index} className="flex justify-between text-[13px] py-1">
                  <span className="text-[#6B7280]">{info.labelHi}:</span>
                  <span className="text-[#1C1C1E] font-medium">{info.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* My Documents */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <button
            onClick={() => toggleSection('documents')}
            className="w-full px-4 py-3 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#60A5FA] bg-opacity-20 flex items-center justify-center">
                <span className="text-xl">📄</span>
              </div>
              <h3 className="font-semibold text-[16px] text-[#1C1C1E]">
                मेरे दस्तावेज़
              </h3>
            </div>
            {expandedSection === 'documents' ? (
              <ChevronUp className="w-5 h-5 text-[#6B7280]" />
            ) : (
              <ChevronDown className="w-5 h-5 text-[#6B7280]" />
            )}
          </button>

          {expandedSection === 'documents' && (
            <div className="px-4 pb-4 border-t border-gray-100 pt-3">
              <div className="grid grid-cols-2 gap-2 mb-3">
                {documents.map((doc, index) => (
                  <div 
                    key={index} 
                    className={`rounded-xl p-3 text-center ${
                      doc.verified ? 'bg-[#F0FDF4] border border-[#97BC62]' : 
                      doc.warning ? 'bg-[#FFF4E6] border border-[#FB923C]' : 
                      'bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <div className="text-2xl mb-1">
                      {doc.verified ? '✅' : doc.warning ? '⚠️' : '📄'}
                    </div>
                    <p className="text-[11px] text-[#1C1C1E] font-medium mb-0.5">
                      {doc.nameHi}
                    </p>
                    {doc.warning && (
                      <p className="text-[9px] text-[#FB923C]">{doc.warning}</p>
                    )}
                  </div>
                ))}
              </div>
              <button className="w-full border-2 border-dashed border-gray-300 rounded-xl py-3 text-[13px] text-[#6B7280] font-medium">
                + Add Document
              </button>
            </div>
          )}
        </div>

        {/* Language Preference */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <span className="text-xl">🌐</span>
              </div>
              <div>
                <h3 className="font-semibold text-[14px] text-[#1C1C1E]">
                  Language / भाषा
                </h3>
                <p className="text-[12px] text-[#6B7280]">हिंदी / Hindi</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-[#6B7280]" />
          </div>
        </div>

        {/* Sign Out */}
        <button className="w-full text-left px-4 py-3 text-[#F87171] text-[14px] font-medium">
          <div className="flex items-center gap-2">
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </div>
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
