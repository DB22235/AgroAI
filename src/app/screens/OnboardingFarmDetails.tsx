import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';

const crops = [
  { id: 'wheat', nameEn: 'Wheat', nameHi: 'गेहूँ', icon: '🌾' },
  { id: 'rice', nameEn: 'Rice', nameHi: 'धान', icon: '🌾' },
  { id: 'maize', nameEn: 'Maize', nameHi: 'मक्का', icon: '🌽' },
  { id: 'soybean', nameEn: 'Soybean', nameHi: 'सोयाबीन', icon: '🫘' },
  { id: 'vegetables', nameEn: 'Vegetables', nameHi: 'सब्जियां', icon: '🍅' },
  { id: 'pulses', nameEn: 'Pulses', nameHi: 'दालें', icon: '🌿' },
];

const irrigationSources = [
  { id: 'borewell', name: 'Borewell', icon: '💧' },
  { id: 'canal', name: 'Canal', icon: '🌊' },
  { id: 'rainfed', name: 'Rain-fed', icon: '🌧' },
  { id: 'river', name: 'River', icon: '💦' },
  { id: 'pond', name: 'Pond', icon: '🪣' },
];

export function OnboardingFarmDetails() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    landOwnership: '',
    landSize: 2.5,
    landUnit: 'Acre',
    selectedCrops: [] as string[],
    season: 'kharif',
    irrigation: [] as string[],
  });

  const handleContinue = () => {
    navigate('/dashboard');
  };

  const toggleCrop = (cropId: string) => {
    setFormData({
      ...formData,
      selectedCrops: formData.selectedCrops.includes(cropId)
        ? formData.selectedCrops.filter(id => id !== cropId)
        : [...formData.selectedCrops, cropId]
    });
  };

  const toggleIrrigation = (source: string) => {
    setFormData({
      ...formData,
      irrigation: formData.irrigation.includes(source)
        ? formData.irrigation.filter(id => id !== source)
        : [...formData.irrigation, source]
    });
  };

  return (
    <div className="min-h-screen bg-[#F7F3EE] flex flex-col">
      {/* Top Bar */}
      <div className="bg-white px-4 py-3 flex items-center gap-3 border-b border-gray-200">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-6 h-6 text-[#1C1C1E]" />
        </button>
        <div className="flex-1 text-center">
          <p className="text-[13px] text-[#6B7280]">Step 2 of 5 — Farm Details</p>
        </div>
        <div className="w-6" />
      </div>

      {/* Progress Bar */}
      <div className="bg-white px-4 pb-3">
        <div className="flex gap-2">
          <div className="flex-1 h-1 bg-[#F5A623] rounded-full" />
          <div className="flex-1 h-1 bg-[#F5A623] rounded-full" />
          <div className="flex-1 h-1 bg-gray-200 rounded-full" />
          <div className="flex-1 h-1 bg-gray-200 rounded-full" />
          <div className="flex-1 h-1 bg-gray-200 rounded-full" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-24 px-6 pt-6">
        <h2 className="font-bold text-[24px] text-[#1C1C1E] mb-2">
          आपकी खेती की जानकारी
        </h2>
        <p className="text-[14px] text-[#6B7280] mb-6">
          यह जानकारी सही योजनाएं ढूंढने में मदद करती है
        </p>

        {/* Land Ownership */}
        <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
          <h3 className="font-semibold text-[16px] text-[#1C1C1E] mb-3">
            आप जमीन के... / Land Ownership
          </h3>
          <div className="flex gap-2">
            {[
              { id: 'owner', label: 'मालिक / Owner' },
              { id: 'tenant', label: 'किरायेदार / Tenant' },
              { id: 'sharecropper', label: 'बटाईदार / Sharecropper' },
            ].map((option) => (
              <button
                key={option.id}
                onClick={() => setFormData({ ...formData, landOwnership: option.id })}
                className={`flex-1 py-2.5 rounded-xl font-medium text-[13px] transition-all ${
                  formData.landOwnership === option.id
                    ? 'bg-[#F5A623] text-white'
                    : 'bg-[#F7F3EE] text-[#2D6A2D] border border-[#2D6A2D]'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Land Size */}
        <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
          <h3 className="font-semibold text-[16px] text-[#1C1C1E] mb-4">
            जमीन का आकार / Land Size
          </h3>
          <div className="text-center mb-4">
            <div className="text-[48px] font-bold text-[#F5A623]">
              {formData.landSize}
            </div>
          </div>
          <div className="flex gap-2 mb-4">
            {['Acre', 'Hectare', 'Bigha', 'Gunta'].map((unit) => (
              <button
                key={unit}
                onClick={() => setFormData({ ...formData, landUnit: unit })}
                className={`flex-1 py-2 rounded-xl text-[13px] font-medium transition-all ${
                  formData.landUnit === unit
                    ? 'bg-[#F5A623] text-white'
                    : 'bg-[#F7F3EE] text-[#6B7280]'
                }`}
              >
                {unit}
              </button>
            ))}
          </div>
          <input
            type="range"
            min="0"
            max="100"
            step="0.5"
            value={formData.landSize}
            onChange={(e) => setFormData({ ...formData, landSize: parseFloat(e.target.value) })}
            className="w-full accent-[#F5A623]"
          />
          <div className="flex justify-between text-[12px] text-[#6B7280] mt-1">
            <span>0</span>
            <span>100+</span>
          </div>
        </div>

        {/* Crop Type */}
        <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
          <h3 className="font-semibold text-[16px] text-[#1C1C1E] mb-3">
            आप क्या उगाते हैं? / What do you grow?
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {crops.map((crop) => (
              <button
                key={crop.id}
                onClick={() => toggleCrop(crop.id)}
                className={`py-3 px-3 rounded-xl font-medium text-[14px] transition-all flex items-center gap-2 ${
                  formData.selectedCrops.includes(crop.id)
                    ? 'bg-[#F5A623] text-white'
                    : 'bg-[#F7F3EE] text-[#1C1C1E]'
                }`}
              >
                <span className="text-xl">{crop.icon}</span>
                <span className="text-left">
                  {crop.nameEn}
                  <br />
                  <span className="text-[11px] opacity-80">{crop.nameHi}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Season */}
        <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
          <h3 className="font-semibold text-[16px] text-[#1C1C1E] mb-3">
            Season / मौसम
          </h3>
          <div className="flex items-center justify-between">
            <span className={formData.season === 'kharif' ? 'text-[#F5A623] font-semibold' : 'text-[#6B7280]'}>
              Kharif
            </span>
            <button
              onClick={() => setFormData({ ...formData, season: formData.season === 'kharif' ? 'rabi' : 'kharif' })}
              className="relative w-16 h-8 bg-[#F5A623] rounded-full transition-colors"
            >
              <div className={`absolute top-1 ${formData.season === 'kharif' ? 'left-1' : 'right-1'} w-6 h-6 bg-white rounded-full transition-all`} />
            </button>
            <span className={formData.season === 'rabi' ? 'text-[#F5A623] font-semibold' : 'text-[#6B7280]'}>
              Rabi
            </span>
          </div>
        </div>

        {/* Irrigation Source */}
        <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
          <h3 className="font-semibold text-[16px] text-[#1C1C1E] mb-3">
            Irrigation / सिंचाई का स्रोत
          </h3>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {irrigationSources.map((source) => (
              <button
                key={source.id}
                onClick={() => toggleIrrigation(source.id)}
                className={`flex flex-col items-center gap-1 px-4 py-3 rounded-xl font-medium text-[13px] whitespace-nowrap transition-all ${
                  formData.irrigation.includes(source.id)
                    ? 'bg-[#F5A623] text-white'
                    : 'bg-[#F7F3EE] text-[#1C1C1E]'
                }`}
              >
                <span className="text-2xl">{source.icon}</span>
                <span>{source.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <button
          onClick={handleContinue}
          className="w-full bg-[#F5A623] text-[#1C1C1E] py-4 rounded-xl font-bold text-[16px] hover:bg-[#E09515] transition-colors"
        >
          आगे बढ़ें / Next
        </button>
      </div>
    </div>
  );
}
