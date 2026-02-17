import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';

const languages = [
  { code: 'hi', name: 'हिंदी', nameEn: 'Hindi' },
  { code: 'ta', name: 'தமிழ்', nameEn: 'Tamil' },
  { code: 'te', name: 'తెలుగు', nameEn: 'Telugu' },
  { code: 'bn', name: 'বাংলা', nameEn: 'Bengali' },
  { code: 'mr', name: 'मराठी', nameEn: 'Marathi' },
  { code: 'gu', name: 'ગુજરાતી', nameEn: 'Gujarati' },
  { code: 'kn', name: 'ಕನ್ನಡ', nameEn: 'Kannada' },
  { code: 'ml', name: 'മലയാളം', nameEn: 'Malayalam' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ', nameEn: 'Punjabi' },
  { code: 'or', name: 'ଓଡ଼ିଆ', nameEn: 'Odia' },
  { code: 'as', name: 'অসমীয়া', nameEn: 'Assamese' },
  { code: 'en', name: 'English', nameEn: 'English' },
];

export function Splash() {
  const [selectedLanguage, setSelectedLanguage] = useState('hi');
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/onboarding/profile');
  };

  return (
    <div className="min-h-screen bg-[#1A3C1A] flex flex-col items-center justify-between px-8 py-12">
      {/* Top status bar simulation */}
      <div className="w-full text-white text-xs flex justify-between mb-8">
        <span>9:41</span>
        <span>Airtel 4G • 82%</span>
      </div>

      {/* Logo and branding */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center mb-12"
      >
        <div className="w-20 h-20 mb-4 text-6xl flex items-center justify-center">
          🌾
        </div>
        <h1 className="font-display font-bold text-white text-[32px] text-center mb-2">
          कृषि मित्र
        </h1>
        <h2 className="font-display font-bold text-white text-[28px] text-center mb-3">
          Krishi Mitra
        </h2>
        <p className="text-[#97BC62] text-[16px] text-center">
          आपका सरकारी योजना सहायक
        </p>
        <p className="text-[#C8D8C8] text-[14px] text-center mt-1">
          Your Government Scheme Assistant
        </p>
      </motion.div>

      {/* Language selection */}
      <div className="w-full max-w-md flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold text-[16px]">
            Select Language / भाषा चुनें
          </h3>
          <div className="bg-[#97BC62] px-3 py-1 rounded-full text-[11px] text-[#1A3C1A] font-medium">
            Auto Detect ON
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-8">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setSelectedLanguage(lang.code)}
              className={`
                h-12 rounded-xl flex flex-col items-center justify-center transition-all
                ${selectedLanguage === lang.code
                  ? 'bg-[#F5A623] bg-opacity-20 border-2 border-[#F5A623] text-[#F5A623]'
                  : 'bg-transparent border-2 border-[#2D6A2D] text-white'
                }
              `}
            >
              <span className="text-[14px] font-medium leading-tight">
                {lang.name}
              </span>
              <span className="text-[9px] opacity-70 leading-tight">
                {lang.nameEn}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Continue button */}
      <button
        onClick={handleContinue}
        className="w-full max-w-md bg-[#F5A623] text-[#1C1C1E] py-4 rounded-xl font-bold text-[16px] hover:bg-[#E09515] transition-colors"
      >
        Continue / आगे बढ़ें
      </button>
    </div>
  );
}
