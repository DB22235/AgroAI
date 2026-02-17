import { useState } from 'react';
import { ArrowLeft, Mic, Send, Phone } from 'lucide-react';
import { useNavigate } from 'react-router';
import { BottomNav } from '../components/BottomNav';
import { motion } from 'motion/react';

interface Message {
  id: string;
  type: 'bot' | 'user';
  text: string;
  timestamp: string;
  schemes?: Array<{
    id: string;
    name: string;
    nameHi: string;
    benefit: string;
    eligible: boolean;
  }>;
}

export function Chat() {
  const navigate = useNavigate();
  const [messages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      text: 'नमस्ते राजेश जी! 🌾 मैं आपकी कैसे मदद कर सकता हूँ?',
      timestamp: '9:41 AM',
    },
    {
      id: '2',
      type: 'user',
      text: 'मुझे खाद पर सब्सिडी चाहिए',
      timestamp: '9:42 AM',
    },
    {
      id: '3',
      type: 'bot',
      text: 'आपके लिए 3 खाद सब्सिडी योजनाएं मिलीं:',
      timestamp: '9:42 AM',
      schemes: [
        {
          id: 'pm-pranam',
          name: 'PM Pranam Yojana',
          nameHi: 'उर्वरक सब्सिडी • Central Govt',
          benefit: '50% subsidy on DAP/Urea',
          eligible: true,
        },
        {
          id: 'dbt-fertilizer',
          name: 'DBT Fertilizer Subsidy',
          nameHi: 'उर्वरक पर प्रत्यक्ष लाभ हस्तांतरण',
          benefit: 'Direct bank transfer',
          eligible: true,
        },
        {
          id: 'neem-coated',
          name: 'Neem Coated Urea Scheme',
          nameHi: 'नीम लेपित यूरिया योजना',
          benefit: 'Subsidized neem urea',
          eligible: true,
        },
      ],
    },
    {
      id: '4',
      type: 'bot',
      text: 'क्या आप किसी एक के लिए आवेदन करना चाहते हैं?',
      timestamp: '9:42 AM',
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  const suggestionChips = ['योजना खोजें', 'आवेदन जांचें', 'दस्तावेज़', 'शिकायत'];

  const handleSend = () => {
    if (inputText.trim()) {
      // Handle send message
      setInputText('');
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F3EE] flex flex-col pb-32">
      {/* Top Bar */}
      <div className="bg-white px-4 py-3 flex items-center gap-3 border-b border-gray-200 sticky top-0 z-10">
        <button onClick={() => navigate('/dashboard')}>
          <ArrowLeft className="w-6 h-6 text-[#1C1C1E]" />
        </button>
        <div className="flex-1">
          <h2 className="font-semibold text-[16px] text-[#1C1C1E]">
            Krishi Mitra AI
          </h2>
          <div className="flex items-center gap-1 text-[11px] text-[#97BC62]">
            <div className="w-2 h-2 bg-[#97BC62] rounded-full animate-pulse" />
            <span>Online • 12 languages supported</span>
          </div>
        </div>
        <button>
          <Phone className="w-5 h-5 text-[#2D6A2D]" />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] ${message.type === 'user' ? 'order-1' : 'order-2'}`}>
              {message.type === 'bot' && (
                <div className="flex items-end gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#2D6A2D] flex items-center justify-center text-white text-sm flex-shrink-0">
                    🌾
                  </div>
                  <div>
                    <div
                      className={`rounded-2xl rounded-tl-sm p-4 ${
                        message.type === 'bot'
                          ? 'bg-[#2D6A2D] text-white'
                          : 'bg-[#F5A623] text-[#1C1C1E]'
                      }`}
                    >
                      <p className="text-[15px] leading-relaxed">{message.text}</p>
                    </div>
                    
                    {/* Suggestion chips for first bot message */}
                    {message.id === '1' && (
                      <div className="flex gap-2 mt-2 flex-wrap">
                        {suggestionChips.map((chip) => (
                          <button
                            key={chip}
                            className="bg-white text-[#2D6A2D] px-3 py-1.5 rounded-full text-[12px] font-medium border border-gray-200 hover:bg-gray-50"
                          >
                            {chip}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Scheme cards in chat */}
                    {message.schemes && (
                      <div className="mt-3 space-y-2">
                        {message.schemes.map((scheme) => (
                          <div
                            key={scheme.id}
                            className="bg-white rounded-2xl p-4 border border-gray-200"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xl">🌿</span>
                                  <h4 className="font-semibold text-[14px] text-[#1C1C1E]">
                                    {scheme.name}
                                  </h4>
                                </div>
                                <p className="text-[12px] text-[#6B7280] mb-1">
                                  {scheme.nameHi}
                                </p>
                                {scheme.eligible && (
                                  <div className="inline-flex items-center gap-1 bg-[#97BC62] bg-opacity-20 text-[#2D6A2D] px-2 py-0.5 rounded-full text-[11px] font-medium">
                                    ✅ आप पात्र हैं
                                  </div>
                                )}
                              </div>
                            </div>
                            <p className="text-[13px] text-[#1C1C1E] mb-3">
                              लाभ: {scheme.benefit}
                            </p>
                            <div className="flex gap-2">
                              <button
                                onClick={() => navigate(`/apply/${scheme.id}`)}
                                className="flex-1 bg-[#F5A623] text-white py-2 rounded-xl text-[13px] font-medium"
                              >
                                अभी आवेदन करें
                              </button>
                              <button
                                onClick={() => navigate(`/schemes/${scheme.id}`)}
                                className="flex-1 border border-gray-200 text-[#1C1C1E] py-2 rounded-xl text-[13px] font-medium"
                              >
                                और जानें
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <p className="text-[11px] text-[#6B7280] mt-1 ml-2">
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              )}

              {message.type === 'user' && (
                <div>
                  <div className="rounded-2xl rounded-tr-sm p-4 bg-[#F5A623] text-[#1C1C1E]">
                    <p className="text-[15px] leading-relaxed">{message.text}</p>
                  </div>
                  <p className="text-[11px] text-[#6B7280] mt-1 text-right mr-2">
                    {message.timestamp}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Typing indicator could go here */}
      </div>

      {/* Voice Active Overlay */}
      {isVoiceActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-[#1A3C1A] bg-opacity-90 z-40 flex flex-col items-center justify-center"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="relative"
          >
            <div className="w-32 h-32 rounded-full bg-[#F5A623] opacity-20 absolute inset-0" />
            <div className="w-32 h-32 rounded-full bg-[#F5A623] opacity-40 absolute inset-0 animate-ping" />
            <div className="w-32 h-32 rounded-full bg-[#F5A623] flex items-center justify-center relative">
              <Mic className="w-16 h-16 text-white" />
            </div>
          </motion.div>
          <p className="text-white text-[24px] font-semibold mt-8">
            सुन रहा हूँ...
          </p>
          <p className="text-[#C8D8C8] text-[16px] mt-2">
            Listening...
          </p>
          <button
            onClick={() => setIsVoiceActive(false)}
            className="mt-8 bg-[#F87171] text-white px-6 py-3 rounded-full font-medium"
          >
            रोकें / Stop
          </button>
        </motion.div>
      )}

      {/* Input Bar */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 p-4 z-30">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsVoiceActive(true)}
            className="w-10 h-10 rounded-full bg-[#F5A623] flex items-center justify-center flex-shrink-0"
          >
            <Mic className="w-5 h-5 text-white" />
          </button>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="अपना सवाल लिखें..."
            className="flex-1 px-4 py-2.5 bg-[#F7F3EE] rounded-full border-none outline-none focus:ring-2 focus:ring-[#F5A623] text-[15px]"
          />
          <button
            onClick={handleSend}
            className="w-10 h-10 rounded-full bg-[#2D6A2D] flex items-center justify-center flex-shrink-0"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
