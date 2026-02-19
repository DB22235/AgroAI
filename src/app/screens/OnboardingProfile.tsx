
// // src/screens/OnboardingProfile.tsx
// import { useUser } from '../../context/UserContext';
// import { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router';
// import { ArrowLeft, Mic, MicOff, Phone, User, Calendar, Users, Sparkles, AlertCircle, X } from 'lucide-react';
// import { motion, AnimatePresence } from 'motion/react';
// import { useLanguage } from '../../context/LanguageContext';

// // Speech Recognition Types
// interface SpeechRecognitionEvent {
//   results: SpeechRecognitionResultList;
//   resultIndex: number;
// }

// interface SpeechRecognitionErrorEvent {
//   error: string;
//   message: string;
// }

// type VoiceField = 'name' | 'age' | 'mobile' | null;

// export function OnboardingProfile() {
//   const navigate = useNavigate();
//   const { t, language } = useLanguage();

//   const [isVoiceActive, setIsVoiceActive] = useState(false);
//   const [isVoiceSupported, setIsVoiceSupported] = useState(true);
//   const [voiceError, setVoiceError] = useState('');
//   const [activeVoiceField, setActiveVoiceField] = useState<VoiceField>(null);
//   const [voiceTranscript, setVoiceTranscript] = useState('');
//   const [showVoiceNotSupported, setShowVoiceNotSupported] = useState(false);
//   const [isFetchingNumber, setIsFetchingNumber] = useState(false);
//   const [numberDetected, setNumberDetected] = useState(false);
//   const recognitionRef = useRef<any>(null);
//   const transcriptRef = useRef('');
//   const { updateUserData } = useUser();

//   const handleContinue = () => {
//   updateUserData({
//     name: formData.name,
//     age: formData.age,
//     gender: formData.gender,
//     mobile: formData.mobile,
//   });
//   navigate('/onboarding/farm-details');
// };

//   const [formData, setFormData] = useState({
//     name: '',
//     age: '',
//     gender: '',
//     mobile: '',
//   });

//   // Check if Speech Recognition is supported and set it up
//   useEffect(() => {
//     const SpeechRecognition =
//       (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

//     if (!SpeechRecognition) {
//       setIsVoiceSupported(false);
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.continuous = false;
//     recognition.interimResults = true;
//     recognition.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
//     recognition.maxAlternatives = 1;

//     recognition.onresult = (event: SpeechRecognitionEvent) => {
//       const transcript = Array.from(event.results)
//         .map((result: any) => result[0].transcript)
//         .join('');
//       setVoiceTranscript(transcript);
//       transcriptRef.current = transcript;
//     };

//     recognition.onend = () => {
//       setIsVoiceActive(false);
//       if (transcriptRef.current) {
//         processVoiceInput(transcriptRef.current);
//         transcriptRef.current = '';
//       }
//     };

//     recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
//       console.error('Speech recognition error:', event.error, event.message);
//       setIsVoiceActive(false);

//       let errorMessage = '';
//       switch (event.error) {
//         case 'not-allowed':
//         case 'service-not-allowed':
//           errorMessage = t('Microphone access denied. Please allow microphone permission.');
//           break;
//         case 'no-speech':
//           errorMessage = t('No speech detected. Please try again.');
//           break;
//         case 'network':
//           errorMessage = t('Network error. Please check your connection.');
//           break;
//         case 'audio-capture':
//           errorMessage = t('Microphone is being used by another application.');
//           break;
//         case 'aborted':
//           // User aborted, don't show error
//           return;
//         default:
//           errorMessage = t('Voice input failed. Please type manually.');
//       }
      
//       setVoiceError(errorMessage);
//       setTimeout(() => setVoiceError(''), 4000);
//     };

//     recognitionRef.current = recognition;

//     return () => {
//       if (recognitionRef.current) {
//         try {
//           recognitionRef.current.abort();
//         } catch {
//           // Ignore
//         }
//       }
//     };
//   }, [language, t]);

//   // Update recognition language when language changes
//   useEffect(() => {
//     if (recognitionRef.current) {
//       recognitionRef.current.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
//     }
//   }, [language, t]);

//   // Process voice input and fill the correct field
//   const processVoiceInput = (transcript: string) => {
//     if (!transcript.trim()) return;
//     const cleanedText = transcript.trim();

//     switch (activeVoiceField) {
//       case 'name':
//         setFormData((prev) => ({ ...prev, name: cleanedText }));
//         break;

//       case 'age': {
//         const hindiNumbers: Record<string, string> = {
//           '०': '0', '१': '1', '२': '2', '३': '3', '४': '4',
//           '५': '5', '६': '6', '७': '7', '८': '8', '९': '9',
//         };
//         let converted = cleanedText;
//         Object.entries(hindiNumbers).forEach(([hindi, english]) => {
//           converted = converted.replace(new RegExp(hindi, 'g'), english);
//         });
//         const ageMatch = converted.match(/\d+/);
//         if (ageMatch) {
//           const age = parseInt(ageMatch[0]);
//           if (age > 0 && age < 150) {
//             setFormData((prev) => ({ ...prev, age: age.toString() }));
//           }
//         }
//         break;
//       }

//       case 'mobile': {
//         const hindiNumbers: Record<string, string> = {
//           '०': '0', '१': '1', '२': '2', '३': '3', '४': '4',
//           '५': '5', '६': '6', '७': '7', '८': '8', '९': '9',
//         };
//         let converted = cleanedText;
//         Object.entries(hindiNumbers).forEach(([hindi, english]) => {
//           converted = converted.replace(new RegExp(hindi, 'g'), english);
//         });
//         const digits = converted.replace(/\D/g, '');
//         if (digits.length >= 10) {
//           setFormData((prev) => ({ ...prev, mobile: digits.slice(-10) }));
//         } else if (digits.length > 0) {
//           setFormData((prev) => ({ ...prev, mobile: digits }));
//         }
//         break;
//       }

//       default: {
//         // Auto-detect mode: guess which field based on content
//         const hindiNumbers: Record<string, string> = {
//           '०': '0', '१': '1', '२': '2', '३': '3', '४': '4',
//           '५': '5', '६': '6', '७': '7', '८': '8', '९': '9',
//         };
//         let converted = cleanedText;
//         Object.entries(hindiNumbers).forEach(([hindi, english]) => {
//           converted = converted.replace(new RegExp(hindi, 'g'), english);
//         });
//         const numbers = converted.replace(/\D/g, '');

//         if (numbers.length >= 10) {
//           setFormData((prev) => ({ ...prev, mobile: numbers.slice(-10) }));
//         } else if (numbers.length > 0 && parseInt(numbers) < 150) {
//           setFormData((prev) => ({ ...prev, age: numbers }));
//         } else {
//           setFormData((prev) => ({ ...prev, name: cleanedText }));
//         }
//         break;
//       }
//     }

//     setVoiceTranscript('');
//     setActiveVoiceField(null);
//   };

//   // Start voice input for a specific field or auto-detect
//   const startVoiceInput = (field: VoiceField = null) => {
//     if (!isVoiceSupported) {
//       setShowVoiceNotSupported(true);
//       setTimeout(() => setShowVoiceNotSupported(false), 4000);
//       return;
//     }

//     if (isVoiceActive) {
//       stopVoiceInput();
//       return;
//     }

//     setActiveVoiceField(field);
//     setVoiceTranscript('');
//     setVoiceError('');
//     transcriptRef.current = '';

//     try {
//       recognitionRef.current?.start();
//       setIsVoiceActive(true);
//     } catch (error) {
//       console.error('Failed to start voice:', error);
//       setVoiceError(t('Failed to start voice input. Please type manually.'));
//       setTimeout(() => setVoiceError(''), 4000);
//     }
//   };

//   // Stop voice input
//   const stopVoiceInput = () => {
//     try {
//       recognitionRef.current?.stop();
//     } catch {
//       // Ignore
//     }
//     setIsVoiceActive(false);
//   };

//   // Get field-specific voice prompt
//   const getVoicePrompt = (field: VoiceField) => {
//     switch (field) {
//       case 'name':
//         return language === 'hi' ? 'अपना नाम बोलें...' : 'Say your name...';
//       case 'age':
//         return language === 'hi' ? 'अपनी उम्र बोलें...' : 'Say your age...';
//       case 'mobile':
//         return language === 'hi' ? 'अपना नंबर बोलें...' : 'Say your number...';
//       default:
//         return language === 'hi' ? 'बोलें...' : 'Speak...';
//     }
//   };

//   // Try to detect phone number on mount
//   useEffect(() => {
//     const tryFetchNumber = async () => {
//       setIsFetchingNumber(true);
//       try {
//         if ('contacts' in navigator && 'ContactsManager' in window) {
//           const contacts = await (navigator as any).contacts.select(['tel'], {
//             multiple: false,
//           });
//           if (contacts.length > 0 && contacts[0].tel?.length > 0) {
//             setFormData((prev) => ({ ...prev, mobile: contacts[0].tel[0] }));
//             setNumberDetected(true);
//           }
//         }
//       } catch {
//         // User denied or API not available
//       } finally {
//         setIsFetchingNumber(false);
//       }
//     };
//     tryFetchNumber();
//   }, []);

//   const handleContinue = () => {
//     navigate('/onboarding/farm-details');
//   };

//   const inputClass =
//     'w-full px-4 py-3.5 bg-[#F7F3EE] rounded-2xl border-2 border-transparent outline-none focus:border-[#F5A623] focus:bg-white transition-all duration-200 text-[15px] text-[#1C1C1E] placeholder:text-gray-400';

//   const labelClass =
//     'flex items-center gap-1.5 text-[12px] font-semibold text-[#6B7280] uppercase tracking-wider mb-2';

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
//             {t('Step 1 of 5 — Basic Details')}
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
//                 step === 1 ? 'bg-[#F5A623]' : 'bg-gray-100'
//               }`}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Translation Loading */}
//       {/* {translationLoading && (
//         <div className="bg-[#FFF4E0] px-4 py-2 text-center">
//           <p className="text-[11px] text-[#F5A623] flex items-center justify-center gap-2">
//             <motion.div
//               animate={{ rotate: 360 }}
//               transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
//               className="w-3 h-3 border-2 border-[#F5A623] border-t-transparent rounded-full"
//             />
//             {t('Loading...')}
//           </p>
//         </div>
//       )} */}

//       {/* Voice Error / Not Supported Toast */}
//       <AnimatePresence>
//         {(voiceError || showVoiceNotSupported) && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             className="mx-6 mt-3 bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3"
//           >
//             <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
//             <div className="flex-1">
//               <p className="text-[13px] font-semibold text-red-700">
//                 {showVoiceNotSupported
//                   ? t('Voice input not supported')
//                   : t('Voice Error')}
//               </p>
//               <p className="text-[12px] text-red-600 mt-0.5">
//                 {showVoiceNotSupported
//                   ? t('Your browser does not support voice input. Please fill the form manually.')
//                   : voiceError}
//               </p>
//             </div>
//             <button
//               onClick={() => {
//                 setVoiceError('');
//                 setShowVoiceNotSupported(false);
//               }}
//             >
//               <X className="w-4 h-4 text-red-400" />
//             </button>
//           </motion.div>
//         )}
//       </AnimatePresence>

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
//                 {t("Let's get you started!")}
//               </h1>
//             </div>
//             <p className="text-[14px] text-[#6B7280] leading-relaxed">
//               {t('Tell us a bit about yourself to find the best schemes for you.')}
//             </p>
//           </motion.div>
//         </div>

//         {/* Main Card */}
//         <div className="px-6 mb-5">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 }}
//             className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
//           >
//             {/* Global Voice Button */}
//             <div className="px-6 pt-6 pb-5">
//               <motion.button
//                 onClick={() => startVoiceInput(null)}
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.97 }}
//                 className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${
//                   isVoiceActive && !activeVoiceField
//                     ? 'bg-[#FFF4E0] border-2 border-[#F5A623]'
//                     : 'bg-[#F7F3EE] border-2 border-transparent'
//                 }`}
//               >
//                 <motion.div
//                   animate={
//                     isVoiceActive && !activeVoiceField
//                       ? {
//                           scale: [1, 1.15, 1],
//                           boxShadow: [
//                             '0 0 0px #F5A62300',
//                             '0 0 20px #F5A62366',
//                             '0 0 0px #F5A62300',
//                           ],
//                         }
//                       : {}
//                   }
//                   transition={{ repeat: Infinity, duration: 1.4 }}
//                   className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 ${
//                     isVoiceActive && !activeVoiceField
//                       ? 'bg-[#F5A623]'
//                       : isVoiceSupported
//                       ? 'bg-white border-2 border-gray-200'
//                       : 'bg-gray-100'
//                   }`}
//                 >
//                   {isVoiceActive && !activeVoiceField ? (
//                     <Mic className="w-7 h-7 text-white" />
//                   ) : (
//                     <MicOff className="w-7 h-7 text-gray-400" />
//                   )}
//                 </motion.div>

//                 <div className="text-left flex-1">
//                   <p
//                     className={`text-[15px] font-semibold ${
//                       isVoiceActive && !activeVoiceField
//                         ? 'text-[#F5A623]'
//                         : 'text-[#1C1C1E]'
//                     }`}
//                   >
//                     {isVoiceActive && !activeVoiceField
//                       ? t('Listening... Tap to stop')
//                       : isVoiceSupported
//                       ? t('Tap to speak your details')
//                       : t('Voice not supported — Fill manually')}
//                   </p>

//                   {/* Live transcript */}
//                   {isVoiceActive && !activeVoiceField && voiceTranscript && (
//                     <motion.p
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       className="text-[13px] text-[#F5A623] mt-1 italic"
//                     >
//                       "{voiceTranscript}"
//                     </motion.p>
//                   )}

//                   {/* Sound wave */}
//                   {isVoiceActive && !activeVoiceField && (
//                     <motion.div
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       className="flex gap-1 mt-2"
//                     >
//                       {[1, 2, 3, 4, 5, 6, 7].map((bar) => (
//                         <motion.div
//                           key={bar}
//                           animate={{ height: [4, 16, 4] }}
//                           transition={{
//                             repeat: Infinity,
//                             duration: 0.6,
//                             delay: bar * 0.08,
//                           }}
//                           className="w-1 bg-[#F5A623] rounded-full"
//                           style={{ height: 4 }}
//                         />
//                       ))}
//                     </motion.div>
//                   )}
//                 </div>

//                 {/* Stop Button */}
//                 {isVoiceActive && !activeVoiceField && (
//                   <motion.div
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1 }}
//                     className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       stopVoiceInput();
//                     }}
//                   >
//                     <div className="w-4 h-4 rounded-sm bg-white" />
//                   </motion.div>
//                 )}
//               </motion.button>
//             </div>

//             {/* Divider */}
//             <div className="flex items-center gap-4 px-6 mb-5">
//               <div className="flex-1 h-px bg-gray-100" />
//               <span className="text-[12px] font-medium text-gray-400">{t('OR')}</span>
//               <div className="flex-1 h-px bg-gray-100" />
//             </div>

//             {/* Form Fields */}
//             <div className="px-6 pb-6 space-y-5">

//               {/* Name */}
//               <div>
//                 <label className={labelClass}>
//                   <User className="w-3.5 h-3.5" />
//                   {t('Full Name')}
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="text"
//                     value={formData.name}
//                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                     placeholder={t('Enter your full name')}
//                     className={`${inputClass} pr-12 ${
//                       isVoiceActive && activeVoiceField === 'name'
//                         ? 'border-[#F5A623] bg-[#FFF4E0]'
//                         : ''
//                     }`}
//                   />
//                   {isVoiceSupported && (
//                     <button
//                       onClick={() => startVoiceInput('name')}
//                       className={`absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
//                         isVoiceActive && activeVoiceField === 'name'
//                           ? 'bg-[#F5A623]'
//                           : 'bg-[#F7F3EE] hover:bg-[#F5A623]/20'
//                       }`}
//                     >
//                       <Mic className={`w-4 h-4 ${
//                         isVoiceActive && activeVoiceField === 'name'
//                           ? 'text-white'
//                           : 'text-gray-400'
//                       }`} />
//                     </button>
//                   )}
//                 </div>
//                 {/* Live transcript for name */}
//                 <AnimatePresence>
//                   {isVoiceActive && activeVoiceField === 'name' && (
//                     <motion.div
//                       initial={{ opacity: 0, height: 0 }}
//                       animate={{ opacity: 1, height: 'auto' }}
//                       exit={{ opacity: 0, height: 0 }}
//                       className="mt-2 flex items-center gap-2"
//                     >
//                       <div className="flex gap-0.5">
//                         {[1, 2, 3].map((bar) => (
//                           <motion.div
//                             key={bar}
//                             animate={{ height: [3, 10, 3] }}
//                             transition={{ repeat: Infinity, duration: 0.5, delay: bar * 0.1 }}
//                             className="w-0.5 bg-[#F5A623] rounded-full"
//                             style={{ height: 3 }}
//                           />
//                         ))}
//                       </div>
//                       <p className="text-[12px] text-[#F5A623] italic">
//                         {voiceTranscript || getVoicePrompt('name')}
//                       </p>
//                       <button
//                         onClick={stopVoiceInput}
//                         className="ml-auto text-[11px] text-red-500 font-semibold"
//                       >
//                         {t('Stop')}
//                       </button>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>

//               {/* Age + Mobile */}
//               <div className="grid grid-cols-2 gap-3">
//                 {/* Age */}
//                 <div>
//                   <label className={labelClass}>
//                     <Calendar className="w-3.5 h-3.5" />
//                     {t('Age')}
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="number"
//                       value={formData.age}
//                       onChange={(e) => setFormData({ ...formData, age: e.target.value })}
//                       placeholder={t('Your age')}
//                       className={`${inputClass} pr-12 ${
//                         isVoiceActive && activeVoiceField === 'age'
//                           ? 'border-[#F5A623] bg-[#FFF4E0]'
//                           : ''
//    }`}
//                     />
//                     {isVoiceSupported && (
//                       <button
//                         onClick={() => startVoiceInput('age')}
//                         className={`absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
//                           isVoiceActive && activeVoiceField === 'age'
//                             ? 'bg-[#F5A623]'
//                             : 'bg-[#F7F3EE] hover:bg-[#F5A623]/20'
//                         }`}
//                       >
//                         <Mic className={`w-4 h-4 ${
//                           isVoiceActive && activeVoiceField === 'age'
//                             ? 'text-white'
//                             : 'text-gray-400'
//                         }`} />
//                       </button>
//                     )}
//                   </div>
//                   {/* Live transcript for age */}
//                   <AnimatePresence>
//                     {isVoiceActive && activeVoiceField === 'age' && (
//                       <motion.div
//                         initial={{ opacity: 0, height: 0 }}
//                         animate={{ opacity: 1, height: 'auto' }}
//                         exit={{ opacity: 0, height: 0 }}
//                         className="mt-2 flex items-center gap-2"
//                       >
//                         <div className="flex gap-0.5">
//                           {[1, 2, 3].map((bar) => (
//                             <motion.div
//                               key={bar}
//                               animate={{ height: [3, 10, 3] }}
//                               transition={{ repeat: Infinity, duration: 0.5, delay: bar * 0.1 }}
//                               className="w-0.5 bg-[#F5A623] rounded-full"
//                               style={{ height: 3 }}
//                             />
//                           ))}
//                         </div>
//                         <p className="text-[12px] text-[#F5A623] italic">
//                           {voiceTranscript || getVoicePrompt('age')}
//                         </p>
//                         <button
//                           onClick={stopVoiceInput}
//                           className="ml-auto text-[11px] text-red-500 font-semibold"
//                         >
//                           {t('Stop')}
//                         </button>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>

//                 {/* Mobile */}
//                 <div>
//                   <label className={labelClass}>
//                     <Phone className="w-3.5 h-3.5" />
//                     {t('Mobile Number')}
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="tel"
//                       value={formData.mobile}
//                       onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
//                       placeholder={isFetchingNumber ? t('Detecting number...') : t('Enter mobile number')}
//                       autoComplete="tel"
//                       className={`${inputClass} ${numberDetected ? 'pr-24' : 'pr-12'} ${
//                         isVoiceActive && activeVoiceField === 'mobile'
//                           ? 'border-[#F5A623] bg-[#FFF4E0]'
//                           : ''
//                       }`}
//                     />
//                     {/* Voice button for mobile */}
//                     {isVoiceSupported && !numberDetected && !isFetchingNumber && (
//                       <button
//                         onClick={() => startVoiceInput('mobile')}
//                         className={`absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
//                           isVoiceActive && activeVoiceField === 'mobile'
//                             ? 'bg-[#F5A623]'
//                             : 'bg-[#F7F3EE] hover:bg-[#F5A623]/20'
//                         }`}
//                       >
//                         <Mic className={`w-4 h-4 ${
//                           isVoiceActive && activeVoiceField === 'mobile'
//                             ? 'text-white'
//                             : 'text-gray-400'
//                         }`} />
//                       </button>
//                     )}
//                     <AnimatePresence>
//                       {numberDetected && (
//                         <motion.div
//                           initial={{ opacity: 0, scale: 0.8 }}
//                           animate={{ opacity: 1, scale: 1 }}
//                           exit={{ opacity: 0, scale: 0.8 }}
//                           className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] bg-[#97BC62] text-white px-2 py-1 rounded-full font-semibold whitespace-nowrap"
//                         >
//                           {t('✓ Auto-detected')}
//                         </motion.div>
//                       )}
//                       {isFetchingNumber && (
//                         <motion.div
//                           initial={{ opacity: 0 }}
//                           animate={{ opacity: 1 }}
//                           exit={{ opacity: 0 }}
//                           className="absolute right-3 top-1/2 -translate-y-1/2"
//                         >
//                           <motion.div
//                             animate={{ rotate: 360 }}
//                             transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
//                             className="w-4 h-4 border-2 border-[#F5A623] border-t-transparent rounded-full"
//                           />
//                         </motion.div>
//                       )}
//                     </AnimatePresence>
//                   </div>
//                   {/* Live transcript for mobile */}
//                   <AnimatePresence>
//                     {isVoiceActive && activeVoiceField === 'mobile' && (
//                       <motion.div
//                         initial={{ opacity: 0, height: 0 }}
//                         animate={{ opacity: 1, height: 'auto' }}
//                         exit={{ opacity: 0, height: 0 }}
//                         className="mt-2 flex items-center gap-2"
//                       >
//                         <div className="flex gap-0.5">
//                           {[1, 2, 3].map((bar) => (
//                             <motion.div
//                               key={bar}
//                               animate={{ height: [3, 10, 3] }}
//                               transition={{ repeat: Infinity, duration: 0.5, delay: bar * 0.1 }}
//                               className="w-0.5 bg-[#F5A623] rounded-full"
//                               style={{ height: 3 }}
//                             />
//                           ))}
//                         </div>
//                         <p className="text-[12px] text-[#F5A623] italic">
//                           {voiceTranscript || getVoicePrompt('mobile')}
//                         </p>
//                         <button
//                           onClick={stopVoiceInput}
//                           className="ml-auto text-[11px] text-red-500 font-semibold"
//                         >
//                           {t('Stop')}
//                         </button>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               </div>

//               {/* Gender */}
//               <div>
//                 <label className={labelClass}>
//                   <Users className="w-3.5 h-3.5" />
//                   {t('Gender')}
//                 </label>
//                 <div className="flex gap-2">
//                   {(['Male', 'Female', 'Other'] as const).map((gender) => (
//                     <motion.button
//                       key={gender}
//                       onClick={() => setFormData({ ...formData, gender })}
//                       whileHover={{ scale: 1.03 }}
//                       whileTap={{ scale: 0.97 }}
//                       className={`flex-1 py-3 rounded-2xl font-semibold text-[14px] transition-all duration-200 border-2 ${
//                         formData.gender === gender
//                           ? 'bg-[#F5A623] text-white border-[#F5A623] shadow-md shadow-[#F5A623]/20'
//                           : 'bg-[#F7F3EE] text-[#6B7280] border-transparent hover:border-[#F5A623]/30'
//                       }`}
//                     >
//                       {t(gender)}
//                     </motion.button>
//                   ))}
//                 </div>
//               </div>

//               {/* Voice hint */}
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.5 }}
//                 className={`text-[12px] text-center flex items-center justify-center gap-1.5 py-2 rounded-xl ${
//                   isVoiceSupported ? 'text-gray-400' : 'text-red-400 bg-red-50'
//                 }`}
//               >
//                 {isVoiceSupported ? (
//                   <>
//                     <Mic className="w-3 h-3" />
//                     {t('Tap the mic icon on each field to fill using voice')}
//                   </>
//                 ) : (
//                   <>
//                     <AlertCircle className="w-3 h-3" />
//                     {t('Voice input not available. Please fill the form manually.')}
//                   </>
//                 )}
//               </motion.div>
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
//           {t('Continue')}
//           <ArrowLeft className="w-5 h-5 rotate-180" />
//         </motion.button>
//       </div>
//     </div>
//   );
// }

// src/screens/OnboardingProfile.tsx
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Mic, MicOff, Phone, User, Calendar, Users, Sparkles, AlertCircle, X, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../../context/LanguageContext';
import { useUser } from '../../context/UserContext';

type VoiceField = 'name' | 'age' | 'mobile' | null;

export function OnboardingProfile() {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { userData, updateUserData } = useUser();
  const isHindi = language === 'hi';

  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isVoiceSupported, setIsVoiceSupported] = useState(true);
  const [voiceError, setVoiceError] = useState('');
  const [activeVoiceField, setActiveVoiceField] = useState<VoiceField>(null);
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [isFetchingNumber, setIsFetchingNumber] = useState(false);
  const [numberDetected, setNumberDetected] = useState(false);
  const [showValidationError, setShowValidationError] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const recognitionRef = useRef<any>(null);
  const transcriptRef = useRef('');

  const [formData, setFormData] = useState({
    name: userData.name || '',
    age: userData.age || '',
    gender: userData.gender || '',
    mobile: userData.mobile || '',
  });

  // Check if form is complete
  const isFormComplete = () => {
    return (
      formData.name.trim() !== '' &&
      formData.age.trim() !== '' &&
      formData.gender !== '' &&
      formData.mobile.trim() !== '' &&
      formData.mobile.length >= 10
    );
  };

  // Get validation errors
  const getValidationErrors = () => {
    const errors: string[] = [];
    if (!formData.name.trim()) {
      errors.push(isHindi ? 'नाम दर्ज करें' : 'Enter your name');
    }
    if (!formData.age.trim()) {
      errors.push(isHindi ? 'उम्र दर्ज करें' : 'Enter your age');
    } else if (parseInt(formData.age) < 18 || parseInt(formData.age) > 120) {
      errors.push(isHindi ? 'उम्र 18-120 के बीच होनी चाहिए' : 'Age must be between 18-120');
    }
    if (!formData.gender) {
      errors.push(isHindi ? 'लिंग चुनें' : 'Select gender');
    }
    if (!formData.mobile.trim()) {
      errors.push(isHindi ? 'मोबाइल नंबर दर्ज करें' : 'Enter mobile number');
    } else if (formData.mobile.length < 10) {
      errors.push(isHindi ? 'मोबाइल नंबर 10 अंकों का होना चाहिए' : 'Mobile number must be 10 digits');
    }
    return errors;
  };

  // Get completion percentage
  const getCompletionPercent = () => {
    let filled = 0;
    if (formData.name.trim()) filled += 25;
    if (formData.age.trim()) filled += 25;
    if (formData.gender) filled += 25;
    if (formData.mobile.trim() && formData.mobile.length >= 10) filled += 25;
    return filled;
  };

  // Check if field is valid
  const isFieldValid = (field: string) => {
    switch (field) {
      case 'name':
        return formData.name.trim() !== '';
      case 'age':
        return formData.age.trim() !== '' && parseInt(formData.age) >= 18 && parseInt(formData.age) <= 120;
      case 'gender':
        return formData.gender !== '';
      case 'mobile':
        return formData.mobile.trim() !== '' && formData.mobile.length >= 10;
      default:
        return false;
    }
  };

  // Initialize Speech Recognition
  useEffect(() => {
    try {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (!SpeechRecognition) {
        setIsVoiceSupported(false);
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = language === 'hi' ? 'hi-IN' : 'en-US';

      recognition.onstart = () => setVoiceError('');

      recognition.onresult = (event: any) => {
        try {
          let interimTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              setVoiceTranscript(transcript);
              transcriptRef.current = transcript;
            } else {
              interimTranscript += transcript;
            }
          }
          if (interimTranscript) setVoiceTranscript(interimTranscript);
        } catch (e) {
          console.error('Error processing results:', e);
        }
      };

      recognition.onend = () => {
        setIsVoiceActive(false);
        if (transcriptRef.current) {
          processVoiceInput(transcriptRef.current);
          transcriptRef.current = '';
        }
      };

      recognition.onerror = (event: any) => {
        setIsVoiceActive(false);
        let errorMsg = '';
        switch (event.error) {
          case 'no-speech':
            errorMsg = isHindi ? 'कोई आवाज़ नहीं मिली' : 'No speech detected';
            break;
          case 'not-allowed':
            errorMsg = isHindi ? 'माइक्रोफ़ोन की अनुमति दें' : 'Allow microphone permission';
            break;
          default:
            errorMsg = isHindi ? 'वॉइस इनपुट विफल' : 'Voice input failed';
        }
        setVoiceError(errorMsg);
        setTimeout(() => setVoiceError(''), 4000);
      };

      recognitionRef.current = recognition;
    } catch (error) {
      setIsVoiceSupported(false);
    }

    return () => {
      try {
        recognitionRef.current?.abort();
      } catch (e) {}
    };
  }, [language, isHindi]);

  // Process voice input
  const processVoiceInput = (transcript: string) => {
    if (!transcript.trim()) return;
    const cleanedText = transcript.trim();

    const hindiNumbers: Record<string, string> = {
      '०': '0', '१': '1', '२': '2', '३': '3', '४': '4',
      '५': '5', '६': '6', '७': '7', '८': '8', '९': '9',
    };

    let converted = cleanedText;
    Object.entries(hindiNumbers).forEach(([hindi, english]) => {
      converted = converted.replace(new RegExp(hindi, 'g'), english);
    });

    switch (activeVoiceField) {
      case 'name':
        setFormData((prev) => ({ ...prev, name: cleanedText }));
        break;
      case 'age': {
        const ageMatch = converted.match(/\d+/);
        if (ageMatch) {
          const age = parseInt(ageMatch[0]);
          if (age > 0 && age < 150) {
            setFormData((prev) => ({ ...prev, age: age.toString() }));
          }
        }
        break;
      }
      case 'mobile': {
        const digits = converted.replace(/\D/g, '');
        if (digits.length >= 10) {
          setFormData((prev) => ({ ...prev, mobile: digits.slice(-10) }));
        } else if (digits.length > 0) {
          setFormData((prev) => ({ ...prev, mobile: digits }));
        }
        break;
      }
      default: {
        const numbers = converted.replace(/\D/g, '');
        if (numbers.length >= 10) {
          setFormData((prev) => ({ ...prev, mobile: numbers.slice(-10) }));
        } else if (numbers.length > 0 && parseInt(numbers) < 150) {
          setFormData((prev) => ({ ...prev, age: numbers }));
        } else {
          setFormData((prev) => ({ ...prev, name: cleanedText }));
        }
        break;
      }
    }

    setVoiceTranscript('');
    setActiveVoiceField(null);
  };

  // Start voice input
  const startVoiceInput = (field: VoiceField = null) => {
    if (!isVoiceSupported) {
      setVoiceError(isHindi ? 'वॉइस इनपुट उपलब्ध नहीं' : 'Voice input not available');
      setTimeout(() => setVoiceError(''), 4000);
      return;
    }

    if (isVoiceActive) {
      stopVoiceInput();
      return;
    }

    try {
      setActiveVoiceField(field);
      setVoiceTranscript('');
      setVoiceError('');
      transcriptRef.current = '';

      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(() => {
          recognitionRef.current?.start();
          setIsVoiceActive(true);
        })
        .catch(() => {
          setVoiceError(isHindi ? 'माइक्रोफ़ोन की अनुमति दें' : 'Allow microphone permission');
          setTimeout(() => setVoiceError(''), 4000);
        });
    } catch (error) {
      setVoiceError(isHindi ? 'वॉइस शुरू नहीं हो सका' : 'Failed to start voice');
      setTimeout(() => setVoiceError(''), 4000);
    }
  };

  // Stop voice input
  const stopVoiceInput = () => {
    try {
      recognitionRef.current?.stop();
    } catch (e) {}
    setIsVoiceActive(false);
  };

  // Fetch phone number
  useEffect(() => {
    const tryFetchNumber = async () => {
      setIsFetchingNumber(true);
      try {
        if ('contacts' in navigator && 'ContactsManager' in window) {
          const contacts = await (navigator as any).contacts.select(['tel'], { multiple: false });
          if (contacts.length > 0 && contacts[0].tel?.length > 0) {
            setFormData((prev) => ({ ...prev, mobile: contacts[0].tel[0] }));
            setNumberDetected(true);
          }
        }
      } catch (err) {}
      finally {
        setIsFetchingNumber(false);
      }
    };
    tryFetchNumber();
  }, []);

  // Handle continue
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
      name: formData.name,
      age: formData.age,
      gender: formData.gender,
      mobile: formData.mobile,
    });

    navigate('/onboarding/farm-details');
  };

  const inputClass =
    'w-full px-4 py-3.5 bg-[#F7F3EE] rounded-2xl border-2 border-transparent outline-none focus:border-[#F5A623] focus:bg-white transition-all duration-200 text-[15px] text-[#1C1C1E] placeholder:text-gray-400';

  const labelClass =
    'flex items-center gap-1.5 text-[12px] font-semibold text-[#6B7280] uppercase tracking-wider mb-2';

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
            {isHindi ? 'चरण 1 / 5 — बुनियादी जानकारी' : 'Step 1 of 5 — Basic Details'}
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
                step === 1 ? 'bg-[#F5A623]' : 'bg-gray-100'
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

      {/* Voice Error Toast */}
      <AnimatePresence>
        {voiceError && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mx-4 mt-3 bg-orange-50 border border-orange-200 rounded-2xl p-4 flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <p className="text-[12px] text-orange-700 flex-1">{voiceError}</p>
            <button onClick={() => setVoiceError('')}>
              <X className="w-4 h-4 text-orange-400" />
            </button>
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
                {isHindi ? 'आपका स्वागत है!' : "Let's get you started!"}
              </h1>
            </div>
            <p className="text-[14px] text-[#6B7280] leading-relaxed">
              {isHindi
                ? 'आपके लिए सबसे अच्छी योजनाएं खोजने के लिए कुछ जानकारी दें।'
                : 'Tell us a bit about yourself to find the best schemes for you.'}
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
              {['name', 'age', 'gender', 'mobile'].map((field) => (
                <div
                  key={field}
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    isFieldValid(field)
                      ? 'bg-green-100'
                      : 'bg-gray-100'
                  }`}
                >
                  {isFieldValid(field) ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-gray-300" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Main Card */}
        <div className="px-6 mb-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
          >
            {/* Voice Button */}
            <div className="px-6 pt-6 pb-5">
              <motion.button
                onClick={() => startVoiceInput(null)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${
                  isVoiceActive && !activeVoiceField
                    ? 'bg-[#FFF4E0] border-2 border-[#F5A623]'
                    : 'bg-[#F7F3EE] border-2 border-transparent'
                }`}
              >
                <motion.div
                  animate={
                    isVoiceActive && !activeVoiceField
                      ? {
                          scale: [1, 1.15, 1],
                          boxShadow: [
                            '0 0 0px #F5A62300',
                            '0 0 20px #F5A62366',
                            '0 0 0px #F5A62300',
                          ],
                        }
                      : {}
                  }
                  transition={{ repeat: Infinity, duration: 1.4 }}
                  className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isVoiceActive && !activeVoiceField
                      ? 'bg-[#F5A623]'
                      : isVoiceSupported
                      ? 'bg-white border-2 border-gray-200'
                      : 'bg-gray-100'
                  }`}
                >
                  {isVoiceActive && !activeVoiceField ? (
                    <Mic className="w-7 h-7 text-white" />
                  ) : (
                    <MicOff className="w-7 h-7 text-gray-400" />
                  )}
                </motion.div>

                <div className="text-left flex-1">
                  <p className={`text-[15px] font-semibold ${
                    isVoiceActive && !activeVoiceField ? 'text-[#F5A623]' : 'text-[#1C1C1E]'
                  }`}>
                    {isVoiceActive && !activeVoiceField
                      ? (isHindi ? 'सुन रहा हूँ... रोकने के लिए टैप करें' : 'Listening... Tap to stop')
                      : isVoiceSupported
                      ? (isHindi ? 'अपनी जानकारी बोलने के लिए टैप करें' : 'Tap to speak your details')
                      : (isHindi ? 'वॉइस उपलब्ध नहीं' : 'Voice not available')}
                  </p>

                  {isVoiceActive && !activeVoiceField && voiceTranscript && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-[13px] text-[#F5A623] mt-1 italic"
                    >
                      "{voiceTranscript}"
                    </motion.p>
                  )}

                  {isVoiceActive && !activeVoiceField && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex gap-1 mt-2"
                    >
                      {[1, 2, 3, 4, 5, 6, 7].map((bar) => (
                        <motion.div
                          key={bar}
                          animate={{ height: [4, 16, 4] }}
                          transition={{ repeat: Infinity, duration: 0.6, delay: bar * 0.08 }}
                          className="w-1 bg-[#F5A623] rounded-full"
                          style={{ height: 4 }}
                        />
                      ))}
                    </motion.div>
                  )}
                </div>

                {isVoiceActive && !activeVoiceField && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      stopVoiceInput();
                    }}
                  >
                    <div className="w-4 h-4 rounded-sm bg-white" />
                  </motion.div>
                )}
              </motion.button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 px-6 mb-5">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-[12px] font-medium text-gray-400">
                {isHindi ? 'या' : 'OR'}
              </span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            {/* Form Fields */}
            <div className="px-6 pb-6 space-y-5">

              {/* Name */}
              <div>
                <label className={labelClass}>
                  <User className="w-3.5 h-3.5" />
                  {isHindi ? 'पूरा नाम' : 'Full Name'}
                  <span className="text-red-500">*</span>
                  {isFieldValid('name') && <CheckCircle className="w-3.5 h-3.5 text-green-500 ml-auto" />}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={isHindi ? 'अपना पूरा नाम लिखें' : 'Enter your full name'}
                    className={`${inputClass} pr-12 ${
                      !isFieldValid('name') && formData.name !== '' ? 'border-red-300' : ''
                    } ${isFieldValid('name') ? 'border-green-300 bg-green-50/30' : ''}`}
                  />
                  {isVoiceSupported && (
                    <button
                      onClick={() => startVoiceInput('name')}
                      className={`absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        isVoiceActive && activeVoiceField === 'name'
                          ? 'bg-[#F5A623]'
                          : 'bg-[#F7F3EE] hover:bg-[#F5A623]/20'
                      }`}
                    >
                      <Mic className={`w-4 h-4 ${
                        isVoiceActive && activeVoiceField === 'name' ? 'text-white' : 'text-gray-400'
                      }`} />
                    </button>
                  )}
                </div>
              </div>

              {/* Age + Mobile */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>
                    <Calendar className="w-3.5 h-3.5" />
                    {isHindi ? 'उम्र' : 'Age'}
                    <span className="text-red-500">*</span>
                    {isFieldValid('age') && <CheckCircle className="w-3.5 h-3.5 text-green-500 ml-auto" />}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      placeholder={isHindi ? 'आपकी उम्र' : 'Your age'}
                      min="18"
                      max="120"
                      className={`${inputClass} pr-12 ${
                        formData.age && !isFieldValid('age') ? 'border-red-300' : ''
                      } ${isFieldValid('age') ? 'border-green-300 bg-green-50/30' : ''}`}
                    />
                    {isVoiceSupported && (
                      <button
                        onClick={() => startVoiceInput('age')}
                        className={`absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                          isVoiceActive && activeVoiceField === 'age'
                            ? 'bg-[#F5A623]'
                            : 'bg-[#F7F3EE] hover:bg-[#F5A623]/20'
                        }`}
                      >
                        <Mic className={`w-4 h-4 ${
                          isVoiceActive && activeVoiceField === 'age' ? 'text-white' : 'text-gray-400'
                        }`} />
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <label className={labelClass}>
                    <Phone className="w-3.5 h-3.5" />
                    {isHindi ? 'मोबाइल' : 'Mobile'}
                    <span className="text-red-500">*</span>
                    {isFieldValid('mobile') && <CheckCircle className="w-3.5 h-3.5 text-green-500 ml-auto" />}
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={formData.mobile}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                        setFormData({ ...formData, mobile: value });
                      }}
                      placeholder={isFetchingNumber ? (isHindi ? 'पता लगा रहा है...' : 'Detecting...') : (isHindi ? 'मोबाइल नंबर' : 'Mobile number')}
                      autoComplete="tel"
                      maxLength={10}
                      className={`${inputClass} ${numberDetected ? 'pr-24' : 'pr-12'} ${
                        formData.mobile && !isFieldValid('mobile') ? 'border-red-300' : ''
                      } ${isFieldValid('mobile') ? 'border-green-300 bg-green-50/30' : ''}`}
                    />
                    {isVoiceSupported && !numberDetected && !isFetchingNumber && (
                      <button
                        onClick={() => startVoiceInput('mobile')}
                        className={`absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                          isVoiceActive && activeVoiceField === 'mobile'
                            ? 'bg-[#F5A623]'
                            : 'bg-[#F7F3EE] hover:bg-[#F5A623]/20'
                        }`}
                      >
                        <Mic className={`w-4 h-4 ${
                          isVoiceActive && activeVoiceField === 'mobile' ? 'text-white' : 'text-gray-400'
                        }`} />
                      </button>
                    )}
                    <AnimatePresence>
                      {numberDetected && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] bg-[#97BC62] text-white px-2 py-1 rounded-full font-semibold"
                        >
                          {isHindi ? '✓ पहचाना' : '✓ Detected'}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Gender */}
              <div>
                <label className={labelClass}>
                  <Users className="w-3.5 h-3.5" />
                  {isHindi ? 'लिंग' : 'Gender'}
                  <span className="text-red-500">*</span>
                  {isFieldValid('gender') && <CheckCircle className="w-3.5 h-3.5 text-green-500 ml-auto" />}
                </label>
                <div className="flex gap-2">
                  {[
                    { id: 'Male', en: 'Male', hi: 'पुरुष' },
                    { id: 'Female', en: 'Female', hi: 'महिला' },
                    { id: 'Other', en: 'Other', hi: 'अन्य' },
                  ].map((gender) => (
                    <motion.button
                      key={gender.id}
                      onClick={() => setFormData({ ...formData, gender: gender.id })}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className={`flex-1 py-3 rounded-2xl font-semibold text-[14px] transition-all duration-200 border-2 ${
                        formData.gender === gender.id
                          ? 'bg-[#F5A623] text-white border-[#F5A623] shadow-md shadow-[#F5A623]/20'
                          : 'bg-[#F7F3EE] text-[#6B7280] border-transparent hover:border-[#F5A623]/30'
                      }`}
                    >
                      {isHindi ? gender.hi : gender.en}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-[12px] text-center text-gray-400 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#F7F3EE]"
              >
                <AlertCircle className="w-3 h-3" />
                {isHindi
                  ? 'सभी फ़ील्ड (*) अनिवार्य हैं'
                  : 'All fields marked (*) are required'}
              </motion.div>
            </div>
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