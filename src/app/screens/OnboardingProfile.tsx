import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Mic, MicOff } from 'lucide-react';
import { motion } from 'motion/react';

export function OnboardingProfile() {
  const navigate = useNavigate();
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    mobile: '9876543210' // Pre-filled from SIM detection
  });

  const handleContinue = () => {
    navigate('/onboarding/farm-details');
  };

  return (
    <div className="min-h-screen bg-[#F7F3EE] flex flex-col">
      {/* Top Bar */}
      <div className="bg-white px-4 py-3 flex items-center gap-3 border-b border-gray-200">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-6 h-6 text-[#1C1C1E]" />
        </button>
        <div className="flex-1 text-center">
          <p className="text-[13px] text-[#6B7280]">Step 1 of 5 — Basic Details</p>
        </div>
        <div className="w-6" /> {/* Spacer for centering */}
      </div>

      {/* Progress Bar */}
      <div className="bg-white px-4 pb-3">
        <div className="flex gap-2">
          <div className="flex-1 h-1 bg-[#F5A623] rounded-full" />
          <div className="flex-1 h-1 bg-gray-200 rounded-full" />
          <div className="flex-1 h-1 bg-gray-200 rounded-full" />
          <div className="flex-1 h-1 bg-gray-200 rounded-full" />
          <div className="flex-1 h-1 bg-gray-200 rounded-full" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-white to-[#F7F3EE] px-6 py-8">
          <div className="flex items-start gap-4">
            <div className="text-6xl">👨‍🌾</div>
            <div className="flex-1">
              <div className="bg-white rounded-2xl rounded-tl-sm p-4 shadow-sm">
                <p className="text-[15px] text-[#1C1C1E] leading-relaxed">
                  नमस्ते! मैं आपकी मदद करूँगा।<br />
                  बस कुछ सवालों के जवाब दीजिए।
                </p>
                <p className="text-[13px] text-[#6B7280] mt-2">
                  Hello! I'll help you. Just answer a few questions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Voice Input Card */}
        <div className="px-6 mb-6">
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <button
              onClick={() => setIsVoiceActive(!isVoiceActive)}
              className="w-full flex flex-col items-center gap-3 mb-4"
            >
              <motion.div
                animate={isVoiceActive ? { scale: [1, 1.1, 1] } : {}}
                transition={{ repeat: isVoiceActive ? Infinity : 0, duration: 1.2 }}
                className={`w-20 h-20 rounded-full flex items-center justify-center ${
                  isVoiceActive ? 'bg-[#F5A623] bg-opacity-20' : 'bg-gray-100'
                }`}
              >
                {isVoiceActive ? (
                  <Mic className="w-10 h-10 text-[#F5A623]" />
                ) : (
                  <MicOff className="w-10 h-10 text-gray-400" />
                )}
              </motion.div>
              <p className="text-[15px] text-[#6B7280]">
                {isVoiceActive ? 'सुन रहा हूँ... / Listening...' : 'अपना नाम बोलिए... / Say your name...'}
              </p>
            </button>

            <div className="text-center text-[12px] text-[#6B7280] my-3">
              ────── OR ──────
            </div>

            {/* Manual Input Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-[13px] text-[#6B7280] mb-1.5">
                  Name / नाम
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="अपना नाम लिखें"
                  className="w-full px-4 py-3 bg-[#F7F3EE] rounded-xl border-none outline-none focus:ring-2 focus:ring-[#F5A623]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[13px] text-[#6B7280] mb-1.5">
                    Age / उम्र
                  </label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    placeholder="25"
                    className="w-full px-4 py-3 bg-[#F7F3EE] rounded-xl border-none outline-none focus:ring-2 focus:ring-[#F5A623]"
                  />
                </div>

                <div>
                  <label className="block text-[13px] text-[#6B7280] mb-1.5">
                    Mobile / मोबाइल
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      className="w-full px-4 py-3 bg-[#F7F3EE] rounded-xl border-none outline-none focus:ring-2 focus:ring-[#F5A623]"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] bg-[#97BC62] text-white px-2 py-0.5 rounded-full">
                      ✓ Verified
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[13px] text-[#6B7280] mb-2">
                  Gender / लिंग
                </label>
                <div className="flex gap-2">
                  {['Male', 'Female', 'Other'].map((gender) => (
                    <button
                      key={gender}
                      onClick={() => setFormData({ ...formData, gender })}
                      className={`flex-1 py-2.5 rounded-xl font-medium text-[14px] transition-all ${
                        formData.gender === gender
                          ? 'bg-[#F5A623] text-white'
                          : 'bg-[#F7F3EE] text-[#6B7280]'
                      }`}
                    >
                      {gender === 'Male' ? 'पुरुष' : gender === 'Female' ? 'महिला' : 'अन्य'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-[12px] text-[#6B7280] text-center mt-4">
              Voice se bhar sakte hain • आवाज़ से भर सकते हैं
            </p>
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
