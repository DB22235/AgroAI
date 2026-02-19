
// // src/screens/OnboardingFarmDetails.tsx
// import { useState } from 'react';
// import { useNavigate } from 'react-router';
// import { ArrowLeft, Sprout, Ruler, Droplets, Sun, Cloud, CloudRain, Sparkles, Mic } from 'lucide-react';
// import { motion } from 'motion/react';
// import { useLanguage } from '../../context/LanguageContext';
// import { useUser } from '../../context/UserContext';

// const crops = [
//   { id: 'wheat', nameEn: 'Wheat', nameHi: 'गेहूँ', icon: '🌾' },
//   { id: 'rice', nameEn: 'Rice', nameHi: 'धान', icon: '🍚' },
//   { id: 'maize', nameEn: 'Maize', nameHi: 'मक्का', icon: '🌽' },
//   { id: 'soybean', nameEn: 'Soybean', nameHi: 'सोयाबीन', icon: '🫘' },
//   { id: 'cotton', nameEn: 'Cotton', nameHi: 'कपास', icon: '☁️' },
//   { id: 'sugarcane', nameEn: 'Sugarcane', nameHi: 'गन्ना', icon: '🎋' },
//   { id: 'vegetables', nameEn: 'Vegetables', nameHi: 'सब्जियां', icon: '🥬' },
//   { id: 'pulses', nameEn: 'Pulses', nameHi: 'दालें', icon: '🌿' },
//   { id: 'fruits', nameEn: 'Fruits', nameHi: 'फल', icon: '🍎' },
//   { id: 'spices', nameEn: 'Spices', nameHi: 'मसाले', icon: '🌶️' },
// ];

// const irrigationSources = [
//   { id: 'borewell', nameEn: 'Borewell', nameHi: 'बोरवेल', icon: '💧', desc_en: 'Underground', desc_hi: 'भूमिगत' },
//   { id: 'canal', nameEn: 'Canal', nameHi: 'नहर', icon: '🌊', desc_en: 'Govt Canal', desc_hi: 'सरकारी नहर' },
//   { id: 'rainfed', nameEn: 'Rain-fed', nameHi: 'वर्षा आधारित', icon: '🌧️', desc_en: 'Natural Rain', desc_hi: 'प्राकृतिक वर्षा' },
//   { id: 'river', nameEn: 'River', nameHi: 'नदी', icon: '🏞️', desc_en: 'River Water', desc_hi: 'नदी का पानी' },
//   { id: 'pond', nameEn: 'Pond', nameHi: 'तालाब', icon: '🪷', desc_en: 'Farm Pond', desc_hi: 'खेत का तालाब' },
//   { id: 'drip', nameEn: 'Drip', nameHi: 'ड्रिप', icon: '💦', desc_en: 'Drip System', desc_hi: 'ड्रिप सिस्टम' },
// ];

// const seasons = [
//   {
//     id: 'kharif',
//     nameEn: 'Kharif',
//     nameHi: 'खरीफ',
//     months_en: 'Jun - Oct',
//     months_hi: 'जून - अक्टूबर',
//     icon: CloudRain,
//     color: 'bg-blue-500',
//     lightColor: 'bg-blue-50',
//     borderColor: 'border-blue-500',
//     textColor: 'text-blue-600',
//   },
//   {
//     id: 'rabi',
//     nameEn: 'Rabi',
//     nameHi: 'रबी',
//     months_en: 'Nov - Mar',
//     months_hi: 'नवंबर - मार्च',
//     icon: Sun,
//     color: 'bg-amber-500',
//     lightColor: 'bg-amber-50',
//     borderColor: 'border-amber-500',
//     textColor: 'text-amber-600',
//   },
//   {
//     id: 'zaid',
//     nameEn: 'Zaid',
//     nameHi: 'जायद',
//     months_en: 'Mar - Jun',
//     months_hi: 'मार्च - जून',
//     icon: Cloud,
//     color: 'bg-green-500',
//     lightColor: 'bg-green-50',
//     borderColor: 'border-green-500',
//     textColor: 'text-green-600',
//   },
// ];

// export function OnboardingFarmDetails() {
//   const navigate = useNavigate();
//   const { t, language } = useLanguage();
//   const isHindi = language === 'hi';
//   const { updateUserData } = useUser();

//   const handleContinue = () => {
//   updateUserData({
//     landOwnership: formData.landOwnership,
//     landSize: formData.landSize,
//     landUnit: formData.landUnit,
//     selectedCrops: formData.selectedCrops,
//     selectedSeasons: formData.selectedSeasons,
//     irrigation: formData.irrigation,
//   });
//   navigate('/dashboard');
// };

//   const [formData, setFormData] = useState({
//     landOwnership: '',
//     landSize: 2.5,
//     landUnit: 'Acre',
//     selectedCrops: [] as string[],
//     selectedSeasons: [] as string[],
//     irrigation: [] as string[],
//   });

//   const handleContinue = () => {
//     navigate('/dashboard');
//   };

//   const toggleCrop = (cropId: string) => {
//     setFormData({
//       ...formData,
//       selectedCrops: formData.selectedCrops.includes(cropId)
//         ? formData.selectedCrops.filter((id) => id !== cropId)
//         : [...formData.selectedCrops, cropId],
//     });
//   };

//   const toggleSeason = (seasonId: string) => {
//     setFormData({
//       ...formData,
//       selectedSeasons: formData.selectedSeasons.includes(seasonId)
//         ? formData.selectedSeasons.filter((id) => id !== seasonId)
//         : [...formData.selectedSeasons, seasonId],
//     });
//   };

//   const toggleIrrigation = (source: string) => {
//     setFormData({
//       ...formData,
//       irrigation: formData.irrigation.includes(source)
//         ? formData.irrigation.filter((id) => id !== source)
//         : [...formData.irrigation, source],
//     });
//   };

//   const sectionTitleClass = 'flex items-center gap-2 mb-4';
//   const sectionIconClass = 'w-5 h-5 text-[#F5A623]';

//   return (
//     <div className="min-h-screen bg-[#F7F3EE] flex flex-col">

//       {/* Top Bar */}
//       <div className="bg-white px-4 pt-10 pb-3 flex items-center gap-3 border-b border-gray-100 shadow-sm">
//         <button
//           onClick={() => navigate(-1)}
//           className="w-9 h-9 flex items-center justify-center rounded-full bg-[#F7F3EE] hover:bg-gray-200 transition-colors"
//         >
//           <ArrowLeft className="w-5 h-5 text-[#1C1C1E]" />
//         </button>
//         <div className="flex-1 text-center">
//           <p className="text-[13px] font-medium text-[#6B7280]">
//             {isHindi ? 'चरण 2 / 5 — खेती की जानकारी' : 'Step 2 of 5 — Farm Details'}
//           </p>
//         </div>
//         <div className="w-9" />
//       </div>

//       {/* Progress Bar */}
//       <div className="bg-white px-4 pb-4">
//         <div className="flex gap-1.5">
//           {[1, 2, 3, 4, 5].map((step) => (
//             <motion.div
//               key={step}
//               initial={{ scaleX: 0 }}
//               animate={{ scaleX: 1 }}
//               transition={{ duration: 0.4, delay: step * 0.1 }}
//               className={`flex-1 h-1.5 rounded-full ${
//                 step <= 2 ? 'bg-[#F5A623]' : 'bg-gray-100'
//               }`}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Content */}
//       <div className="flex-1 overflow-y-auto pb-28">

//         {/* Header */}
//         <div className="px-6 py-6">
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.4 }}
//           >
//             <div className="flex items-center gap-2 mb-1">
//               <Sparkles className="w-5 h-5 text-[#F5A623]" />
//               <h1 className="text-[22px] font-bold text-[#1C1C1E]">
//                 {isHindi ? 'आपकी खेती की जानकारी' : 'Your Farm Details'}
//               </h1>
//             </div>
//             <p className="text-[14px] text-[#6B7280] leading-relaxed">
//               {isHindi
//                 ? 'यह जानकारी आपके लिए सही योजनाएं ढूंढने में मदद करेगी।'
//                 : 'This information helps us find the right schemes for you.'}
//             </p>
//           </motion.div>
//         </div>

//         <div className="px-6 space-y-4">

//           {/* Land Ownership */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 }}
//             className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100"
//           >
//             <div className={sectionTitleClass}>
//               <Sprout className={sectionIconClass} />
//               <h3 className="font-semibold text-[16px] text-[#1C1C1E]">
//                 {isHindi ? 'भूमि स्वामित्व' : 'Land Ownership'}
//               </h3>
//             </div>
//             <div className="flex gap-2">
//               {[
//                 { id: 'owner', en: 'Owner', hi: 'मालिक', emoji: '🏠' },
//                 { id: 'tenant', en: 'Tenant', hi: 'किरायेदार', emoji: '📋' },
//                 { id: 'sharecropper', en: 'Sharecropper', hi: 'बटाईदार', emoji: '🤝' },
//               ].map((option) => (
//                 <motion.button
//                   key={option.id}
//                   onClick={() => setFormData({ ...formData, landOwnership: option.id })}
//                   whileHover={{ scale: 1.03 }}
//                   whileTap={{ scale: 0.97 }}
//                   className={`flex-1 py-3 rounded-2xl font-semibold text-[13px] transition-all duration-200 border-2 flex flex-col items-center gap-1 ${
//                     formData.landOwnership === option.id
//                       ? 'bg-[#F5A623] text-white border-[#F5A623] shadow-md shadow-[#F5A623]/20'
//                       : 'bg-[#F7F3EE] text-[#6B7280] border-transparent hover:border-[#F5A623]/30'
//                   }`}
//                 >
//                   <span className="text-lg">{option.emoji}</span>
//                   <span>{isHindi ? option.hi : option.en}</span>
//                 </motion.button>
//               ))}
//             </div>

//             {/* Voice placeholder */}
//             <div className="mt-3 flex items-center justify-center gap-1.5 py-1.5 rounded-xl bg-[#F7F3EE]">
//               <Mic className="w-3 h-3 text-gray-300" />
//               <span className="text-[11px] text-gray-300">
//                 {isHindi ? 'जल्द ही वॉइस इनपुट उपलब्ध होगा' : 'Voice input coming soon'}
//               </span>
//             </div>
//           </motion.div>

//           {/* Land Size */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.15 }}
//             className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100"
//           >
//             <div className={sectionTitleClass}>
//               <Ruler className={sectionIconClass} />
//               <h3 className="font-semibold text-[16px] text-[#1C1C1E]">
//                 {isHindi ? 'जमीन का आकार' : 'Land Size'}
//               </h3>
//             </div>

//             {/* Size Display */}
//             <div className="text-center mb-5 py-4 bg-gradient-to-b from-[#FFF8EC] to-[#F7F3EE] rounded-2xl">
//               <motion.div
//                 key={formData.landSize}
//                 initial={{ scale: 0.8 }}
//                 animate={{ scale: 1 }}
//                 className="text-[52px] font-bold text-[#F5A623] leading-none"
//               >
//                 {formData.landSize}
//               </motion.div>
//               <p className="text-[14px] text-[#6B7280] mt-1">
//                 {formData.landUnit}{formData.landSize > 1 ? 's' : ''}
//               </p>
//             </div>

//             {/* Unit Selection */}
//             <div className="flex gap-2 mb-5">
//               {[
//                 { id: 'Acre', hi: 'एकड़' },
//                 { id: 'Hectare', hi: 'हेक्टेयर' },
//                 { id: 'Bigha', hi: 'बीघा' },
//                 { id: 'Gunta', hi: 'गुंठा' },
//               ].map((unit) => (
//                 <motion.button
//                   key={unit.id}
//                   onClick={() => setFormData({ ...formData, landUnit: unit.id })}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className={`flex-1 py-2.5 rounded-2xl text-[12px] font-semibold transition-all duration-200 border-2 ${
//                     formData.landUnit === unit.id
//                       ? 'bg-[#F5A623] text-white border-[#F5A623]'
//                       : 'bg-[#F7F3EE] text-[#6B7280] border-transparent'
//                   }`}
//                 >
//                   {isHindi ? unit.hi : unit.id}
//                 </motion.button>
//               ))}
//             </div>

//             {/* Slider */}
//             <div className="px-1">
//               <input
//                 type="range"
//                 min="0"
//                 max="100"
//                 step="0.5"
//                 value={formData.landSize}
//                 onChange={(e) => setFormData({ ...formData, landSize: parseFloat(e.target.value) })}
//                 className="w-full h-2 bg-[#F7F3EE] rounded-full appearance-none cursor-pointer accent-[#F5A623]"
//               />
//               <div className="flex justify-between text-[11px] text-[#6B7280] mt-2 px-1">
//                 <span>0</span>
//                 <span>25</span>
//                 <span>50</span>
//                 <span>75</span>
//                 <span>100+</span>
//               </div>
//             </div>

//             {/* Quick select */}
//             <div className="flex gap-2 mt-4">
//               {[1, 2, 5, 10, 25].map((size) => (
//                 <button
//                   key={size}
//                   onClick={() => setFormData({ ...formData, landSize: size })}
//                   className={`flex-1 py-2 rounded-xl text-[12px] font-medium transition-all ${
//                     formData.landSize === size
//                       ? 'bg-[#F5A623]/10 text-[#F5A623] border border-[#F5A623]'
//                       : 'bg-[#F7F3EE] text-[#6B7280]'
//                   }`}
//                 >
//                   {size}
//                 </button>
//               ))}
//             </div>
//           </motion.div>

//           {/* Crop Type */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100"
//           >
//             <div className={sectionTitleClass}>
//               <Sprout className={sectionIconClass} />
//               <h3 className="font-semibold text-[16px] text-[#1C1C1E]">
//                 {isHindi ? 'आप क्या उगाते हैं?' : 'What do you grow?'}
//               </h3>
//               {formData.selectedCrops.length > 0 && (
//                 <span className="ml-auto text-[12px] bg-[#F5A623]/10 text-[#F5A623] px-2.5 py-1 rounded-full font-semibold">
//                   {formData.selectedCrops.length} {isHindi ? 'चुने' : 'selected'}
//                 </span>
//               )}
//             </div>
//             <div className="grid grid-cols-2 gap-2">
//               {crops.map((crop) => (
//                 <motion.button
//                   key={crop.id}
//                   onClick={() => toggleCrop(crop.id)}
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.97 }}
//                   className={`py-3.5 px-4 rounded-2xl font-medium text-[14px] transition-all duration-200 flex items-center gap-3 border-2 ${
//                     formData.selectedCrops.includes(crop.id)
//                       ? 'bg-[#F5A623] text-white border-[#F5A623] shadow-md shadow-[#F5A623]/20'
//                       : 'bg-[#F7F3EE] text-[#1C1C1E] border-transparent hover:border-[#F5A623]/30'
//                   }`}
//                 >
//                   <span className="text-2xl">{crop.icon}</span>
//                   <div className="text-left">
//                     <span className="block text-[14px] font-semibold">
//                       {isHindi ? crop.nameHi : crop.nameEn}
//                     </span>
//                     <span className={`text-[11px] ${
//                       formData.selectedCrops.includes(crop.id)
//                         ? 'text-white/70'
//                         : 'text-[#6B7280]'
//                     }`}>
//                       {isHindi ? crop.nameEn : crop.nameHi}
//                     </span>
//                   </div>
//                   {formData.selectedCrops.includes(crop.id) && (
//                     <motion.div
//                       initial={{ scale: 0 }}
//                       animate={{ scale: 1 }}
//                       className="ml-auto w-5 h-5 bg-white rounded-full flex items-center justify-center"
//                     >
//                       <span className="text-[#F5A623] text-[12px] font-bold">✓</span>
//                     </motion.div>
//                   )}
//                 </motion.button>
//               ))}
//             </div>
//           </motion.div>

//           {/* Season - REDESIGNED */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.25 }}
//             className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100"
//           >
//             <div className={sectionTitleClass}>
//               <Sun className={sectionIconClass} />
//               <h3 className="font-semibold text-[16px] text-[#1C1C1E]">
//                 {isHindi ? 'फसल का मौसम' : 'Crop Season'}
//               </h3>
//               <span className="ml-auto text-[11px] text-[#6B7280]">
//                 {isHindi ? 'एक से ज़्यादा चुनें' : 'Select multiple'}
//               </span>
//             </div>

//             <div className="space-y-3">
//               {seasons.map((season) => {
//                 const isSelected = formData.selectedSeasons.includes(season.id);
//                 const SeasonIcon = season.icon;

//                 return (
//                   <motion.button
//                     key={season.id}
//                     onClick={() => toggleSeason(season.id)}
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.97 }}
//                     className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 border-2 ${
//                       isSelected
//                         ? `${season.lightColor} ${season.borderColor} shadow-sm`
//                         : 'bg-[#F7F3EE] border-transparent hover:border-gray-200'
//                     }`}
//                   >
//                     {/* Icon */}
//                     <div
//                       className={`w-12 h-12 rounded-xl flex items-center justify-center ${
//                         isSelected ? season.color : 'bg-gray-200'
//                       }`}
//                     >
//                       <SeasonIcon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-gray-500'}`} />
//                     </div>

//                     {/* Text */}
//                     <div className="flex-1 text-left">
//                       <p className={`text-[15px] font-bold ${isSelected ? season.textColor : 'text-[#1C1C1E]'}`}>
//                         {isHindi ? season.nameHi : season.nameEn}
//                       </p>
//                       <p className={`text-[12px] ${isSelected ? season.textColor + '/70' : 'text-[#6B7280]'}`}>
//                         {isHindi ? season.months_hi : season.months_en}
//                       </p>
//                     </div>

//                     {/* Check */}
//                     <div
//                       className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${
//                         isSelected
//                           ? `${season.color} border-transparent`
//                           : 'border-gray-300 bg-white'
//                       }`}
//                     >
//                       {isSelected && (
//                         <motion.span
//                           initial={{ scale: 0 }}
//                           animate={{ scale: 1 }}
//                           className="text-white text-[12px] font-bold"
//                         >
//                           ✓
//                         </motion.span>
//                       )}
//                     </div>
//                   </motion.button>
//                 );
//               })}
//             </div>
//           </motion.div>

//           {/* Irrigation Source - REDESIGNED */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//             className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100"
//           >
//             <div className={sectionTitleClass}>
//               <Droplets className={sectionIconClass} />
//               <h3 className="font-semibold text-[16px] text-[#1C1C1E]">
//                 {isHindi ? 'सिंचाई का स्रोत' : 'Irrigation Source'}
//               </h3>
//               {formData.irrigation.length > 0 && (
//                 <span className="ml-auto text-[12px] bg-[#F5A623]/10 text-[#F5A623] px-2.5 py-1 rounded-full font-semibold">
//                   {formData.irrigation.length} {isHindi ? 'चुने' : 'selected'}
//                 </span>
//               )}
//             </div>

//             <div className="grid grid-cols-3 gap-2">
//               {irrigationSources.map((source) => {
//                 const isSelected = formData.irrigation.includes(source.id);
//                 return (
//                   <motion.button
//                     key={source.id}
//                     onClick={() => toggleIrrigation(source.id)}
//                     whileHover={{ scale: 1.03 }}
//                     whileTap={{ scale: 0.95 }}
//                     className={`relative flex flex-col items-center gap-2 py-4 px-2 rounded-2xl transition-all duration-200 border-2 ${
//                       isSelected
//                         ? 'bg-[#F5A623] text-white border-[#F5A623] shadow-md shadow-[#F5A623]/20'
//                         : 'bg-[#F7F3EE] text-[#1C1C1E] border-transparent hover:border-[#F5A623]/30'
//                     }`}
//                   >
//                     {/* Checkmark */}
//                     {isSelected && (
//                       <motion.div
//                         initial={{ scale: 0 }}
//                         animate={{ scale: 1 }}
//                         className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm"
//                       >
//                         <span className="text-[#F5A623] text-[10px] font-bold">✓</span>
//                       </motion.div>
//                     )}

//                     <span className="text-3xl">{source.icon}</span>
//                     <div className="text-center">
//                       <p className="text-[12px] font-semibold leading-tight">
//                         {isHindi ? source.nameHi : source.nameEn}
//                       </p>
//                       <p className={`text-[10px] mt-0.5 leading-tight ${
//                         isSelected ? 'text-white/70' : 'text-[#6B7280]'
//                       }`}>
//                         {isHindi ? source.desc_hi : source.desc_en}
//                       </p>
//                     </div>
//                   </motion.button>
//                 );
//               })}
//             </div>
//           </motion.div>

//           {/* Voice Placeholder Card */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.35 }}
//             className="bg-gradient-to-r from-[#F5A623]/5 to-[#97BC62]/5 rounded-3xl p-5 border border-dashed border-[#F5A623]/30"
//           >
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-full bg-[#F5A623]/10 flex items-center justify-center">
//                 <Mic className="w-5 h-5 text-[#F5A623]" />
//               </div>
//               <div className="flex-1">
//                 <p className="text-[13px] font-semibold text-[#1C1C1E]">
//                   {isHindi ? 'वॉइस इनपुट जल्द आ रहा है!' : 'Voice input coming soon!'}
//                 </p>
//                 <p className="text-[11px] text-[#6B7280]">
//                   {isHindi
//                     ? 'जल्द ही आप बोलकर यह फॉर्म भर सकेंगे'
//                     : 'Soon you can fill this form by speaking'}
//                 </p>
//               </div>
//               <span className="text-[10px] bg-[#F5A623]/10 text-[#F5A623] px-2 py-1 rounded-full font-semibold">
//                 {isHindi ? 'जल्द' : 'Soon'}
//               </span>
//             </div>
//           </motion.div>

//         </div>
//       </div>

//       {/* Bottom CTA */}
//       <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-100 p-4 safe-area-bottom">
//         <motion.button
//           onClick={handleContinue}
//           whileHover={{ scale: 1.02 }}
//           whileTap={{ scale: 0.98 }}
//           className="w-full bg-[#F5A623] text-white py-4 rounded-2xl font-bold text-[16px] shadow-lg shadow-[#F5A623]/30 hover:bg-[#E09515] transition-colors flex items-center justify-center gap-2"
//         >
//           {isHindi ? 'आगे बढ़ें' : 'Continue'}
//           <ArrowLeft className="w-5 h-5 rotate-180" />
//         </motion.button>
//       </div>
//     </div>
//   );
// }

// src/screens/OnboardingFarmDetails.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Sprout, Ruler, Droplets, Sun, Cloud, CloudRain, Sparkles, Mic, AlertCircle, X, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../../context/LanguageContext';
import { useUser } from '../../context/UserContext';

const crops = [
  { id: 'wheat', nameEn: 'Wheat', nameHi: 'गेहूँ', icon: '🌾' },
  { id: 'rice', nameEn: 'Rice', nameHi: 'धान', icon: '🍚' },
  { id: 'maize', nameEn: 'Maize', nameHi: 'मक्का', icon: '🌽' },
  { id: 'soybean', nameEn: 'Soybean', nameHi: 'सोयाबीन', icon: '🫘' },
  { id: 'cotton', nameEn: 'Cotton', nameHi: 'कपास', icon: '☁️' },
  { id: 'sugarcane', nameEn: 'Sugarcane', nameHi: 'गन्ना', icon: '🎋' },
  { id: 'vegetables', nameEn: 'Vegetables', nameHi: 'सब्जियां', icon: '🥬' },
  { id: 'pulses', nameEn: 'Pulses', nameHi: 'दालें', icon: '🌿' },
  { id: 'fruits', nameEn: 'Fruits', nameHi: 'फल', icon: '🍎' },
  { id: 'spices', nameEn: 'Spices', nameHi: 'मसाले', icon: '🌶️' },
];

const irrigationSources = [
  { id: 'borewell', nameEn: 'Borewell', nameHi: 'बोरवेल', icon: '💧', desc_en: 'Underground', desc_hi: 'भूमिगत' },
  { id: 'canal', nameEn: 'Canal', nameHi: 'नहर', icon: '🌊', desc_en: 'Govt Canal', desc_hi: 'सरकारी नहर' },
  { id: 'rainfed', nameEn: 'Rain-fed', nameHi: 'वर्षा आधारित', icon: '🌧️', desc_en: 'Natural Rain', desc_hi: 'प्राकृतिक वर्षा' },
  { id: 'river', nameEn: 'River', nameHi: 'नदी', icon: '🏞️', desc_en: 'River Water', desc_hi: 'नदी का पानी' },
  { id: 'pond', nameEn: 'Pond', nameHi: 'तालाब', icon: '🪷', desc_en: 'Farm Pond', desc_hi: 'खेत का तालाब' },
  { id: 'drip', nameEn: 'Drip', nameHi: 'ड्रिप', icon: '💦', desc_en: 'Drip System', desc_hi: 'ड्रिप सिस्टम' },
];

const seasons = [
  {
    id: 'kharif',
    nameEn: 'Kharif',
    nameHi: 'खरीफ',
    months_en: 'Jun - Oct',
    months_hi: 'जून - अक्टूबर',
    icon: CloudRain,
    color: 'bg-blue-500',
    lightColor: 'bg-blue-50',
    borderColor: 'border-blue-500',
    textColor: 'text-blue-600',
  },
  {
    id: 'rabi',
    nameEn: 'Rabi',
    nameHi: 'रबी',
    months_en: 'Nov - Mar',
    months_hi: 'नवंबर - मार्च',
    icon: Sun,
    color: 'bg-amber-500',
    lightColor: 'bg-amber-50',
    borderColor: 'border-amber-500',
    textColor: 'text-amber-600',
  },
  {
    id: 'zaid',
    nameEn: 'Zaid',
    nameHi: 'जायद',
    months_en: 'Mar - Jun',
    months_hi: 'मार्च - जून',
    icon: Cloud,
    color: 'bg-green-500',
    lightColor: 'bg-green-50',
    borderColor: 'border-green-500',
    textColor: 'text-green-600',
  },
];

export function OnboardingFarmDetails() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { userData, updateUserData } = useUser();
  const isHindi = language === 'hi';

  const [showValidationError, setShowValidationError] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    landOwnership: userData.landOwnership || '',
    landSize: userData.landSize || 0,
    landUnit: userData.landUnit || 'Acre',
    selectedCrops: userData.selectedCrops || [],
    selectedSeasons: userData.selectedSeasons || [],
    irrigation: userData.irrigation || [],
  });

  // Validation functions
  const isFieldValid = (field: string) => {
    switch (field) {
      case 'ownership':
        return formData.landOwnership !== '';
      case 'landSize':
        return formData.landSize > 0;
      case 'crops':
        return formData.selectedCrops.length > 0;
      case 'seasons':
        return formData.selectedSeasons.length > 0;
      case 'irrigation':
        return formData.irrigation.length > 0;
      default:
        return false;
    }
  };

  const isFormComplete = () => {
    return (
      formData.landOwnership !== '' &&
      formData.landSize > 0 &&
      formData.selectedCrops.length > 0 &&
      formData.selectedSeasons.length > 0 &&
      formData.irrigation.length > 0
    );
  };

  const getValidationErrors = () => {
    const errors: string[] = [];
    if (!formData.landOwnership) {
      errors.push(isHindi ? 'भूमि स्वामित्व चुनें' : 'Select land ownership');
    }
    if (formData.landSize <= 0) {
      errors.push(isHindi ? 'जमीन का आकार चुनें' : 'Select land size');
    }
    if (formData.selectedCrops.length === 0) {
      errors.push(isHindi ? 'कम से कम एक फसल चुनें' : 'Select at least one crop');
    }
    if (formData.selectedSeasons.length === 0) {
      errors.push(isHindi ? 'कम से कम एक मौसम चुनें' : 'Select at least one season');
    }
    if (formData.irrigation.length === 0) {
      errors.push(isHindi ? 'कम से कम एक सिंचाई स्रोत चुनें' : 'Select at least one irrigation source');
    }
    return errors;
  };

  const getCompletionPercent = () => {
    let filled = 0;
    if (formData.landOwnership) filled += 20;
    if (formData.landSize > 0) filled += 20;
    if (formData.selectedCrops.length > 0) filled += 20;
    if (formData.selectedSeasons.length > 0) filled += 20;
    if (formData.irrigation.length > 0) filled += 20;
    return filled;
  };

  const handleContinue = () => {
    const errors = getValidationErrors();
    if (errors.length > 0) {
      setValidationErrors(errors);
      setShowValidationError(true);
      setTimeout(() => setShowValidationError(false), 5000);
      return;
    }

    // Save to context
    updateUserData({
      landOwnership: formData.landOwnership,
      landSize: formData.landSize,
      landUnit: formData.landUnit,
      selectedCrops: formData.selectedCrops,
      selectedSeasons: formData.selectedSeasons,
      irrigation: formData.irrigation,
    });

    navigate('/dashboard');
  };

  const toggleCrop = (cropId: string) => {
    setFormData({
      ...formData,
      selectedCrops: formData.selectedCrops.includes(cropId)
        ? formData.selectedCrops.filter((id) => id !== cropId)
        : [...formData.selectedCrops, cropId],
    });
  };

  const toggleSeason = (seasonId: string) => {
    setFormData({
      ...formData,
      selectedSeasons: formData.selectedSeasons.includes(seasonId)
        ? formData.selectedSeasons.filter((id) => id !== seasonId)
        : [...formData.selectedSeasons, seasonId],
    });
  };

  const toggleIrrigation = (source: string) => {
    setFormData({
      ...formData,
      irrigation: formData.irrigation.includes(source)
        ? formData.irrigation.filter((id) => id !== source)
        : [...formData.irrigation, source],
    });
  };

  const sectionTitleClass = 'flex items-center gap-2 mb-4';
  const sectionIconClass = 'w-5 h-5 text-[#F5A623]';
  const completionPercent = getCompletionPercent();

  return (
    <div className="min-h-screen bg-[#F7F3EE] flex flex-col">

      {/* Top Bar */}
      <div className="bg-white px-4 pt-10 pb-3 flex items-center gap-3 border-b border-gray-100 shadow-sm">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-[#F7F3EE] hover:bg-gray-200 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-[#1C1C1E]" />
        </button>
        <div className="flex-1 text-center">
          <p className="text-[13px] font-medium text-[#6B7280]">
            {isHindi ? 'चरण 2 / 5 — खेती की जानकारी' : 'Step 2 of 5 — Farm Details'}
          </p>
        </div>
        <div className="w-9" />
      </div>

      {/* Progress Bar */}
      <div className="bg-white px-4 pb-4">
        <div className="flex gap-1.5">
          {[1, 2, 3, 4, 5].map((step) => (
            <motion.div
              key={step}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.4, delay: step * 0.1 }}
              className={`flex-1 h-1.5 rounded-full ${
                step <= 2 ? 'bg-[#F5A623]' : 'bg-gray-100'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Validation Error Toast */}
      <AnimatePresence>
        {showValidationError && validationErrors.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mx-4 mt-3 bg-red-50 border border-red-200 rounded-2xl p-4"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-[13px] font-semibold text-red-700 mb-1">
                  {isHindi ? 'कृपया सभी जानकारी भरें' : 'Please fill all details'}
                </p>
                <ul className="space-y-0.5">
                  {validationErrors.map((error, index) => (
                    <li key={index} className="text-[12px] text-red-600 flex items-center gap-1">
                      <span>•</span> {error}
                    </li>
                  ))}
                </ul>
              </div>
              <button onClick={() => setShowValidationError(false)}>
                <X className="w-4 h-4 text-red-400" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-28">

        {/* Header */}
        <div className="px-6 py-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-5 h-5 text-[#F5A623]" />
              <h1 className="text-[22px] font-bold text-[#1C1C1E]">
                {isHindi ? 'आपकी खेती की जानकारी' : 'Your Farm Details'}
              </h1>
            </div>
            <p className="text-[14px] text-[#6B7280] leading-relaxed">
              {isHindi
                ? 'यह जानकारी आपके लिए सही योजनाएं ढूंढने में मदद करेगी।'
                : 'This information helps us find the right schemes for you.'}
            </p>
          </motion.div>

          {/* Completion Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] font-medium text-[#6B7280]">
                {isHindi ? 'पूर्णता' : 'Completion'}
              </span>
              <span className={`text-[14px] font-bold ${
                completionPercent === 100 ? 'text-green-500' : 'text-[#F5A623]'
              }`}>
                {completionPercent}%
              </span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${completionPercent}%` }}
                transition={{ duration: 0.5 }}
                className={`h-full rounded-full ${
                  completionPercent === 100 ? 'bg-green-500' : 'bg-[#F5A623]'
                }`}
              />
            </div>
            <div className="flex justify-between mt-2">
              {['ownership', 'landSize', 'crops', 'seasons', 'irrigation'].map((field) => (
                <div
                  key={field}
                  className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    isFieldValid(field) ? 'bg-green-100' : 'bg-gray-100'
                  }`}
                >
                  {isFieldValid(field) ? (
                    <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                  ) : (
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="px-6 space-y-4">

          {/* Land Ownership */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`bg-white rounded-3xl p-5 shadow-sm border-2 transition-all ${
              isFieldValid('ownership') ? 'border-green-200' : 'border-gray-100'
            }`}
          >
            <div className={sectionTitleClass}>
              <Sprout className={sectionIconClass} />
              <h3 className="font-semibold text-[16px] text-[#1C1C1E]">
                {isHindi ? 'भूमि स्वामित्व' : 'Land Ownership'}
                <span className="text-red-500 ml-1">*</span>
              </h3>
              {isFieldValid('ownership') && (
                <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
              )}
            </div>
            <div className="flex gap-2">
              {[
                { id: 'owner', en: 'Owner', hi: 'मालिक', emoji: '🏠' },
                { id: 'tenant', en: 'Tenant', hi: 'किरायेदार', emoji: '📋' },
                { id: 'sharecropper', en: 'Sharecropper', hi: 'बटाईदार', emoji: '🤝' },
              ].map((option) => (
                <motion.button
                  key={option.id}
                  onClick={() => setFormData({ ...formData, landOwnership: option.id })}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`flex-1 py-3 rounded-2xl font-semibold text-[13px] transition-all duration-200 border-2 flex flex-col items-center gap-1 ${
                    formData.landOwnership === option.id
                      ? 'bg-[#F5A623] text-white border-[#F5A623] shadow-md shadow-[#F5A623]/20'
                      : 'bg-[#F7F3EE] text-[#6B7280] border-transparent hover:border-[#F5A623]/30'
                  }`}
                >
                  <span className="text-lg">{option.emoji}</span>
                  <span>{isHindi ? option.hi : option.en}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Land Size */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className={`bg-white rounded-3xl p-5 shadow-sm border-2 transition-all ${
              isFieldValid('landSize') ? 'border-green-200' : 'border-gray-100'
            }`}
          >
            <div className={sectionTitleClass}>
              <Ruler className={sectionIconClass} />
              <h3 className="font-semibold text-[16px] text-[#1C1C1E]">
                {isHindi ? 'जमीन का आकार' : 'Land Size'}
                <span className="text-red-500 ml-1">*</span>
              </h3>
              {isFieldValid('landSize') && (
                <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
              )}
            </div>

            {/* Size Display */}
            <div className="text-center mb-5 py-4 bg-gradient-to-b from-[#FFF8EC] to-[#F7F3EE] rounded-2xl">
              <motion.div
                key={formData.landSize}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`text-[52px] font-bold leading-none ${
                  formData.landSize > 0 ? 'text-[#F5A623]' : 'text-gray-300'
                }`}
              >
                {formData.landSize || '0'}
              </motion.div>
              <p className="text-[14px] text-[#6B7280] mt-1">
                {isHindi 
                  ? (formData.landUnit === 'Acre' ? 'एकड़' : formData.landUnit === 'Hectare' ? 'हेक्टेयर' : formData.landUnit === 'Bigha' ? 'बीघा' : 'गुंठा')
                  : formData.landUnit}
              </p>
            </div>

            {/* Unit Selection */}
            <div className="flex gap-2 mb-5">
              {[
                { id: 'Acre', hi: 'एकड़' },
                { id: 'Hectare', hi: 'हेक्टेयर' },
                { id: 'Bigha', hi: 'बीघा' },
                { id: 'Gunta', hi: 'गुंठा' },
              ].map((unit) => (
                <motion.button
                  key={unit.id}
                  onClick={() => setFormData({ ...formData, landUnit: unit.id })}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex-1 py-2.5 rounded-2xl text-[12px] font-semibold transition-all duration-200 border-2 ${
                    formData.landUnit === unit.id
                      ? 'bg-[#F5A623] text-white border-[#F5A623]'
                      : 'bg-[#F7F3EE] text-[#6B7280] border-transparent'
                  }`}
                >
                  {isHindi ? unit.hi : unit.id}
                </motion.button>
              ))}
            </div>

            {/* Slider */}
            <div className="px-1">
              <input
                type="range"
                min="0"
                max="100"
                step="0.5"
                value={formData.landSize}
                onChange={(e) => setFormData({ ...formData, landSize: parseFloat(e.target.value) })}
                className="w-full h-2 bg-[#F7F3EE] rounded-full appearance-none cursor-pointer accent-[#F5A623]"
              />
              <div className="flex justify-between text-[11px] text-[#6B7280] mt-2 px-1">
                <span>0</span>
                <span>25</span>
                <span>50</span>
                <span>75</span>
                <span>100+</span>
              </div>
            </div>

            {/* Quick select */}
            <div className="flex gap-2 mt-4">
              {[1, 2, 5, 10, 25].map((size) => (
                <button
                  key={size}
                  onClick={() => setFormData({ ...formData, landSize: size })}
                  className={`flex-1 py-2 rounded-xl text-[12px] font-medium transition-all ${
                    formData.landSize === size
                      ? 'bg-[#F5A623]/10 text-[#F5A623] border border-[#F5A623]'
                      : 'bg-[#F7F3EE] text-[#6B7280]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Crop Type */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`bg-white rounded-3xl p-5 shadow-sm border-2 transition-all ${
              isFieldValid('crops') ? 'border-green-200' : 'border-gray-100'
            }`}
          >
            <div className={sectionTitleClass}>
              <Sprout className={sectionIconClass} />
              <h3 className="font-semibold text-[16px] text-[#1C1C1E]">
                {isHindi ? 'आप क्या उगाते हैं?' : 'What do you grow?'}
                <span className="text-red-500 ml-1">*</span>
              </h3>
              {formData.selectedCrops.length > 0 && (
                <span className="ml-auto text-[12px] bg-[#F5A623]/10 text-[#F5A623] px-2.5 py-1 rounded-full font-semibold">
                  {formData.selectedCrops.length} {isHindi ? 'चुने' : 'selected'}
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {crops.map((crop) => (
                <motion.button
                  key={crop.id}
                  onClick={() => toggleCrop(crop.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className={`py-3.5 px-4 rounded-2xl font-medium text-[14px] transition-all duration-200 flex items-center gap-3 border-2 ${
                    formData.selectedCrops.includes(crop.id)
                      ? 'bg-[#F5A623] text-white border-[#F5A623] shadow-md shadow-[#F5A623]/20'
                      : 'bg-[#F7F3EE] text-[#1C1C1E] border-transparent hover:border-[#F5A623]/30'
                  }`}
                >
                  <span className="text-2xl">{crop.icon}</span>
                  <div className="text-left">
                    <span className="block text-[14px] font-semibold">
                      {isHindi ? crop.nameHi : crop.nameEn}
                    </span>
                    <span className={`text-[11px] ${
                      formData.selectedCrops.includes(crop.id) ? 'text-white/70' : 'text-[#6B7280]'
                    }`}>
                      {isHindi ? crop.nameEn : crop.nameHi}
                    </span>
                  </div>
                  {formData.selectedCrops.includes(crop.id) && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-auto w-5 h-5 bg-white rounded-full flex items-center justify-center"
                    >
                      <span className="text-[#F5A623] text-[12px] font-bold">✓</span>
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Season */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className={`bg-white rounded-3xl p-5 shadow-sm border-2 transition-all ${
              isFieldValid('seasons') ? 'border-green-200' : 'border-gray-100'
            }`}
          >
            <div className={sectionTitleClass}>
              <Sun className={sectionIconClass} />
              <h3 className="font-semibold text-[16px] text-[#1C1C1E]">
                {isHindi ? 'फसल का मौसम' : 'Crop Season'}
                <span className="text-red-500 ml-1">*</span>
              </h3>
              <span className="ml-auto text-[11px] text-[#6B7280]">
                {isHindi ? 'एक से ज़्यादा चुनें' : 'Select multiple'}
              </span>
            </div>

            <div className="space-y-3">
              {seasons.map((season) => {
                const isSelected = formData.selectedSeasons.includes(season.id);
                const SeasonIcon = season.icon;

                return (
                  <motion.button
                    key={season.id}
                    onClick={() => toggleSeason(season.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 border-2 ${
                      isSelected
                        ? `${season.lightColor} ${season.borderColor} shadow-sm`
                        : 'bg-[#F7F3EE] border-transparent hover:border-gray-200'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      isSelected ? season.color : 'bg-gray-200'
                    }`}>
                      <SeasonIcon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-gray-500'}`} />
                    </div>

                    <div className="flex-1 text-left">
                      <p className={`text-[15px] font-bold ${isSelected ? season.textColor : 'text-[#1C1C1E]'}`}>
                        {isHindi ? season.nameHi : season.nameEn}
                      </p>
                      <p className={`text-[12px] ${isSelected ? season.textColor + '/70' : 'text-[#6B7280]'}`}>
                        {isHindi ? season.months_hi : season.months_en}
                      </p>
                    </div>

                    <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${
                      isSelected ? `${season.color} border-transparent` : 'border-gray-300 bg-white'
                    }`}>
                      {isSelected && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="text-white text-[12px] font-bold"
                        >
                          ✓
                        </motion.span>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Irrigation Source */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`bg-white rounded-3xl p-5 shadow-sm border-2 transition-all ${
              isFieldValid('irrigation') ? 'border-green-200' : 'border-gray-100'
            }`}
          >
            <div className={sectionTitleClass}>
              <Droplets className={sectionIconClass} />
              <h3 className="font-semibold text-[16px] text-[#1C1C1E]">
                {isHindi ? 'सिंचाई का स्रोत' : 'Irrigation Source'}
                <span className="text-red-500 ml-1">*</span>
              </h3>
              {formData.irrigation.length > 0 && (
                <span className="ml-auto text-[12px] bg-[#F5A623]/10 text-[#F5A623] px-2.5 py-1 rounded-full font-semibold">
                  {formData.irrigation.length} {isHindi ? 'चुने' : 'selected'}
                </span>
              )}
            </div>

            <div className="grid grid-cols-3 gap-2">
              {irrigationSources.map((source) => {
                const isSelected = formData.irrigation.includes(source.id);
                return (
                  <motion.button
                    key={source.id}
                    onClick={() => toggleIrrigation(source.id)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative flex flex-col items-center gap-2 py-4 px-2 rounded-2xl transition-all duration-200 border-2 ${
                      isSelected
                        ? 'bg-[#F5A623] text-white border-[#F5A623] shadow-md shadow-[#F5A623]/20'
                        : 'bg-[#F7F3EE] text-[#1C1C1E] border-transparent hover:border-[#F5A623]/30'
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm"
                      >
                        <span className="text-[#F5A623] text-[10px] font-bold">✓</span>
                      </motion.div>
                    )}

                    <span className="text-3xl">{source.icon}</span>
                    <div className="text-center">
                      <p className="text-[12px] font-semibold leading-tight">
                        {isHindi ? source.nameHi : source.nameEn}
                      </p>
                      <p className={`text-[10px] mt-0.5 leading-tight ${
                        isSelected ? 'text-white/70' : 'text-[#6B7280]'
                      }`}>
                        {isHindi ? source.desc_hi : source.desc_en}
                      </p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Voice Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="bg-gradient-to-r from-[#F5A623]/5 to-[#97BC62]/5 rounded-3xl p-5 border border-dashed border-[#F5A623]/30"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F5A623]/10 flex items-center justify-center">
                <Mic className="w-5 h-5 text-[#F5A623]" />
              </div>
              <div className="flex-1">
                <p className="text-[13px] font-semibold text-[#1C1C1E]">
                  {isHindi ? 'वॉइस इनपुट जल्द आ रहा है!' : 'Voice input coming soon!'}
                </p>
                <p className="text-[11px] text-[#6B7280]">
                  {isHindi
                    ? 'जल्द ही आप बोलकर यह फॉर्म भर सकेंगे'
                    : 'Soon you can fill this form by speaking'}
                </p>
              </div>
              <span className="text-[10px] bg-[#F5A623]/10 text-[#F5A623] px-2 py-1 rounded-full font-semibold">
                {isHindi ? 'जल्द' : 'Soon'}
              </span>
            </div>
          </motion.div>

          {/* Required Fields Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-[12px] text-center text-gray-400 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white border border-gray-100"
          >
            <AlertCircle className="w-3 h-3" />
            {isHindi
              ? 'सभी फ़ील्ड (*) अनिवार्य हैं'
              : 'All fields marked (*) are required'}
          </motion.div>

        </div>
      </div>

      {/* Bottom CTA */}
       <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-100 p-4 safe-area-bottom">
        <motion.button
          onClick={handleContinue}
          whileHover={{ scale: isFormComplete() ? 1.02 : 1 }}
          whileTap={{ scale: isFormComplete() ? 0.98 : 1 }}
          className={`w-full py-4 rounded-2xl font-bold text-[16px] transition-all flex items-center justify-center gap-2 ${
            isFormComplete()
              ? 'bg-[#F5A623] text-white shadow-lg shadow-[#F5A623]/30 hover:bg-[#E09515]'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isFormComplete() ? (
            <>
              {isHindi ? 'आगे बढ़ें' : 'Continue'}
              <ArrowLeft className="w-5 h-5 rotate-180" />
            </>
          ) : (
            <>
              {isHindi ? 'सभी जानकारी भरें' : 'Fill all details'}
              <span className="text-[12px] bg-white/20 px-2 py-0.5 rounded-full">
                {completionPercent}%
              </span>
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}