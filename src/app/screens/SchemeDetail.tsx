import { useState } from 'react';
import { ArrowLeft, Calendar, FileText, Clock, IndianRupee, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';

export function SchemeDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [expandedSection, setExpandedSection] = useState<string>('at-a-glance');

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? '' : section);
  };

  const eligibilityCriteria = [
    { met: true, text: 'Small/Marginal Farmer — Land < 2 hectares' },
    { met: true, text: 'Valid Aadhaar linked to bank' },
    { met: true, text: 'Active bank account' },
    { met: 'warning' as const, text: 'Annual income below ₹1.5L — Update your profile to verify' },
    { met: false, text: 'Not a government employee' },
  ];

  const documents = [
    { name: 'Aadhaar Card', uploaded: true },
    { name: 'Bank Passbook', uploaded: true },
    { name: 'Land Records (7/12)', uploaded: false },
    { name: 'Passport Photo', uploaded: false },
  ];

  const steps = [
    { step: 1, text: 'Fill application form', time: '5 minutes' },
    { step: 2, text: 'Upload 4 documents', time: '3 minutes' },
    { step: 3, text: 'Submit online / via CSC', time: '2 minutes' },
    { step: 4, text: 'Track approval status', time: 'Instant' },
  ];

  return (
    <div className="min-h-screen bg-[#F7F3EE] pb-24">
      {/* Header */}
      <div className="bg-[#1A3C1A] pt-3 pb-6 px-4">
        <button onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>

        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-xl flex-shrink-0">
            🏛️
          </div>
          <div className="flex-1">
            <h1 className="font-bold text-white text-[20px] mb-1">
              PM-Kisan Samman Nidhi
            </h1>
            <p className="text-[#C8D8C8] text-[14px] mb-2">
              प्रधानमंत्री किसान सम्मान निधि
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="bg-[#2D6A2D] text-white px-2 py-1 rounded-lg text-[11px]">
                Central Govt
              </span>
              <span className="bg-[#2D6A2D] text-white px-2 py-1 rounded-lg text-[11px]">
                Direct Benefit
              </span>
            </div>
          </div>
          <div className="bg-[#97BC62] px-3 py-1 rounded-full text-[#1A3C1A] text-[11px] font-semibold whitespace-nowrap">
            ✅ आप पात्र हैं
          </div>
        </div>
      </div>

      <div className="px-4 pt-4">
        {/* At a Glance Section */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
          <h2 className="font-bold text-[16px] text-[#1C1C1E] mb-4">
            At a Glance
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#F7F3EE] rounded-xl p-3 text-center">
              <div className="w-10 h-10 rounded-full bg-[#F5A623] bg-opacity-20 flex items-center justify-center mx-auto mb-2">
                <IndianRupee className="w-5 h-5 text-[#F5A623]" />
              </div>
              <div className="font-bold text-[20px] text-[#1C1C1E]">₹6,000</div>
              <div className="text-[11px] text-[#6B7280]">Per Year</div>
            </div>
            <div className="bg-[#F7F3EE] rounded-xl p-3 text-center">
              <div className="w-10 h-10 rounded-full bg-[#FB923C] bg-opacity-20 flex items-center justify-center mx-auto mb-2">
                <Calendar className="w-5 h-5 text-[#FB923C]" />
              </div>
              <div className="font-bold text-[16px] text-[#1C1C1E]">March 31</div>
              <div className="text-[11px] text-[#6B7280]">Deadline</div>
            </div>
            <div className="bg-[#F7F3EE] rounded-xl p-3 text-center">
              <div className="w-10 h-10 rounded-full bg-[#60A5FA] bg-opacity-20 flex items-center justify-center mx-auto mb-2">
                <FileText className="w-5 h-5 text-[#60A5FA]" />
              </div>
              <div className="font-bold text-[20px] text-[#1C1C1E]">3</div>
              <div className="text-[11px] text-[#6B7280]">Documents</div>
            </div>
            <div className="bg-[#F7F3EE] rounded-xl p-3 text-center">
              <div className="w-10 h-10 rounded-full bg-[#97BC62] bg-opacity-20 flex items-center justify-center mx-auto mb-2">
                <Clock className="w-5 h-5 text-[#97BC62]" />
              </div>
              <div className="font-bold text-[16px] text-[#1C1C1E]">15 days</div>
              <div className="text-[11px] text-[#6B7280]">Processing</div>
            </div>
          </div>
        </div>

        {/* Eligibility Criteria */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
          <button
            onClick={() => toggleSection('eligibility')}
            className="w-full flex items-center justify-between mb-2"
          >
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-[16px] text-[#1C1C1E]">
                Eligibility Criteria
              </h2>
              <span className="bg-[#97BC62] bg-opacity-20 text-[#2D6A2D] px-2 py-0.5 rounded-full text-[11px] font-medium">
                You Meet 5/6
              </span>
            </div>
            {expandedSection === 'eligibility' ? (
              <ChevronUp className="w-5 h-5 text-[#6B7280]" />
            ) : (
              <ChevronDown className="w-5 h-5 text-[#6B7280]" />
            )}
          </button>

          {expandedSection === 'eligibility' && (
            <div className="space-y-2 mt-3">
              {eligibilityCriteria.map((criteria, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="mt-0.5">
                    {criteria.met === true ? '✅' : criteria.met === 'warning' ? '⚠️' : '❌'}
                  </span>
                  <span className={`text-[13px] ${
                    criteria.met === true ? 'text-[#1C1C1E]' : 
                    criteria.met === 'warning' ? 'text-[#FB923C]' : 
                    'text-[#6B7280]'
                  }`}>
                    {criteria.text}
                  </span>
                </div>
              ))}
              <div className="bg-[#FFF4E6] border border-[#FB923C] rounded-xl p-3 mt-3">
                <p className="text-[13px] text-[#FB923C] font-medium">
                  प्रोफाइल अपडेट करें और पूरी पात्रता जांचें
                </p>
                <button 
                  onClick={() => navigate('/profile')}
                  className="text-[#FB923C] text-[12px] font-semibold mt-1 underline"
                >
                  Update Profile →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Required Documents */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
          <button
            onClick={() => toggleSection('documents')}
            className="w-full flex items-center justify-between mb-2"
          >
            <h2 className="font-bold text-[16px] text-[#1C1C1E]">
              Required Documents
            </h2>
            {expandedSection === 'documents' ? (
              <ChevronUp className="w-5 h-5 text-[#6B7280]" />
            ) : (
              <ChevronDown className="w-5 h-5 text-[#6B7280]" />
            )}
          </button>

          {expandedSection === 'documents' && (
            <div className="space-y-2 mt-3">
              {documents.map((doc, index) => (
                <div key={index} className="flex items-center gap-2 py-2">
                  <div className={`w-4 h-4 rounded ${
                    doc.uploaded ? 'bg-[#97BC62]' : 'border-2 border-gray-300'
                  } flex items-center justify-center`}>
                    {doc.uploaded && <span className="text-white text-[10px]">✓</span>}
                  </div>
                  <span className={`text-[13px] flex-1 ${
                    doc.uploaded ? 'text-[#1C1C1E]' : 'text-[#6B7280]'
                  }`}>
                    {doc.name}
                  </span>
                  <span className={`text-[11px] ${
                    doc.uploaded ? 'text-[#97BC62]' : 'text-[#6B7280]'
                  }`}>
                    {doc.uploaded ? 'Uploaded' : 'Not uploaded'}
                  </span>
                </div>
              ))}
              <button className="w-full mt-3 py-2.5 border border-[#F5A623] text-[#F5A623] rounded-xl font-medium text-[14px]">
                दस्तावेज़ अपलोड करें / Upload Documents
              </button>
            </div>
          )}
        </div>

        {/* How to Apply */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
          <button
            onClick={() => toggleSection('how-to-apply')}
            className="w-full flex items-center justify-between mb-2"
          >
            <h2 className="font-bold text-[16px] text-[#1C1C1E]">
              How to Apply
            </h2>
            {expandedSection === 'how-to-apply' ? (
              <ChevronUp className="w-5 h-5 text-[#6B7280]" />
            ) : (
              <ChevronDown className="w-5 h-5 text-[#6B7280]" />
            )}
          </button>

          {expandedSection === 'how-to-apply' && (
            <div className="space-y-3 mt-3">
              {steps.map((step) => (
                <div key={step.step} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#F5A623] text-white flex items-center justify-center font-bold text-[14px] flex-shrink-0">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <p className="text-[14px] text-[#1C1C1E] font-medium">
                      {step.text}
                    </p>
                    <p className="text-[12px] text-[#6B7280]">{step.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Benefits */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
          <h2 className="font-bold text-[16px] text-[#1C1C1E] mb-3">
            Benefits & Disbursement
          </h2>
          <p className="text-[14px] text-[#1C1C1E] mb-2">
            ₹6,000 per year in 3 installments of ₹2,000 each
          </p>
          <div className="bg-[#F7F3EE] rounded-xl p-3 mb-2">
            <p className="text-[13px] text-[#2D6A2D] font-medium">
              💳 Direct Bank Transfer (DBT)
            </p>
          </div>
          <p className="text-[12px] text-[#97BC62]">
            Last disbursed to 8.2 Cr farmers
          </p>
        </div>
      </div>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex gap-2 z-20">
        <button className="flex-1 py-3 border border-gray-300 text-[#1C1C1E] rounded-xl font-medium text-[14px] flex items-center justify-center gap-1">
          💾 सेव करें
        </button>
        <button 
          onClick={() => navigate(`/apply/${id}`)}
          className="flex-1 py-3 bg-[#F5A623] text-white rounded-xl font-bold text-[14px]"
        >
          आवेदन करें / Apply Now
        </button>
      </div>
    </div>
  );
}
