import { useState } from 'react';
import { ArrowLeft, Camera, Upload, Folder, CheckCircle, Copy } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { motion } from 'motion/react';

export function ApplicationWizard() {
  const navigate = useNavigate();
  const { schemeId } = useParams();
  const [currentStep, setCurrentStep] = useState<'documents' | 'form' | 'review' | 'success'>('documents');
  const [documents, setDocuments] = useState({
    aadhaar: { uploaded: true, url: 'mock.jpg', quality: 'good' },
    landRecords: { uploaded: false, url: '', quality: '' },
    bankPassbook: { uploaded: true, url: 'mock.jpg', quality: 'good' },
    photo: { uploaded: false, url: '', quality: '' },
  });

  const [formData, setFormData] = useState({
    name: 'Rajesh Kumar',
    fatherName: 'Mohan Kumar',
    dob: '12/03/1981',
    aadhaar: 'XXXX-XXXX-4521',
    surveyNumber: '',
    bankAccount: 'XXXXXXXXX234',
    ifsc: 'SBIN0001234',
  });

  const progressSteps = ['Documents', 'Details', 'Review', 'Submit'];
  const currentStepIndex = 
    currentStep === 'documents' ? 0 : 
    currentStep === 'form' ? 1 : 
    currentStep === 'review' ? 2 : 3;

  const handleDocumentUpload = (docType: string) => {
    setDocuments({
      ...documents,
      [docType]: { uploaded: true, url: 'mock.jpg', quality: 'good' }
    });
  };

  const renderDocumentsStep = () => (
    <div className="space-y-4">
      <h2 className="font-bold text-[24px] text-[#1C1C1E] mb-2">
        दस्तावेज़ अपलोड करें
      </h2>
      <p className="text-[14px] text-[#6B7280] mb-6">
        आधार और बैंक पासबुक की फ़ोटो लें
      </p>

      {/* Aadhaar Card - Uploaded */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border-2 border-[#97BC62]">
        <div className="flex items-start gap-3">
          <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
            <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 blur-sm" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle className="w-4 h-4 text-[#97BC62]" />
              <h3 className="font-semibold text-[14px] text-[#97BC62]">
                आधार कार्ड — अपलोड हुआ
              </h3>
            </div>
            <p className="text-[12px] text-[#6B7280] mb-2">
              Name: Rajesh Kumar | DOB: 12/03/1981
            </p>
            <button className="text-[#F5A623] text-[12px] font-medium">
              बदलें / Change
            </button>
          </div>
        </div>
      </div>

      {/* Land Records - Not Uploaded */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border-2 border-dashed border-gray-300">
        <h3 className="font-semibold text-[14px] text-[#1C1C1E] mb-3">
          Land Records (7/12)
        </h3>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => handleDocumentUpload('landRecords')}
            className="flex flex-col items-center gap-1 py-3 bg-[#F7F3EE] rounded-xl hover:bg-gray-100 transition-colors"
          >
            <Camera className="w-6 h-6 text-[#2D6A2D]" />
            <span className="text-[11px] text-[#1C1C1E]">फ़ोटो लें</span>
          </button>
          <button
            onClick={() => handleDocumentUpload('landRecords')}
            className="flex flex-col items-center gap-1 py-3 bg-[#F7F3EE] rounded-xl hover:bg-gray-100 transition-colors"
          >
            <Folder className="w-6 h-6 text-[#2D6A2D]" />
            <span className="text-[11px] text-[#1C1C1E]">गैलरी से</span>
          </button>
          <button
            onClick={() => handleDocumentUpload('landRecords')}
            className="flex flex-col items-center gap-1 py-3 bg-[#F7F3EE] rounded-xl hover:bg-gray-100 transition-colors"
          >
            <Upload className="w-6 h-6 text-[#2D6A2D]" />
            <span className="text-[11px] text-[#1C1C1E]">DigiLocker</span>
          </button>
        </div>
      </div>

      {/* Bank Passbook - Uploaded */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border-2 border-[#97BC62]">
        <div className="flex items-start gap-3">
          <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
            <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 blur-sm" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle className="w-4 h-4 text-[#97BC62]" />
              <h3 className="font-semibold text-[14px] text-[#97BC62]">
                Bank Passbook — अपलोड हुआ
              </h3>
            </div>
            <p className="text-[12px] text-[#6B7280] mb-2">
              A/C: XXXXXXXXX234
            </p>
            <button className="text-[#F5A623] text-[12px] font-medium">
              बदलें / Change
            </button>
          </div>
        </div>
      </div>

      {/* Photo - Not Uploaded */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border-2 border-dashed border-gray-300">
        <h3 className="font-semibold text-[14px] text-[#1C1C1E] mb-3">
          Passport Photo
        </h3>
        <button
          onClick={() => handleDocumentUpload('photo')}
          className="w-full flex items-center justify-center gap-2 py-3 bg-[#F7F3EE] rounded-xl hover:bg-gray-100 transition-colors"
        >
          <Camera className="w-5 h-5 text-[#2D6A2D]" />
          <span className="text-[13px] text-[#1C1C1E]">📷 फ़ोटो लें / Take Photo</span>
        </button>
      </div>
    </div>
  );

  const renderFormStep = () => (
    <div className="space-y-4">
      <h2 className="font-bold text-[24px] text-[#1C1C1E] mb-2">
        आवेदन फॉर्म भरें
      </h2>
      <p className="text-[14px] text-[#6B7280] mb-6">
        Form Details
      </p>

      <div className="bg-[#F0FDF4] border border-[#97BC62] rounded-2xl p-3 mb-4">
        <p className="text-[13px] text-[#2D6A2D]">
          Auto-filled 5 of 7 fields from your profile 🎉
        </p>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-[13px] text-[#6B7280] mb-1.5">
            Name / नाम
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.name}
              readOnly
              className="w-full px-4 py-3 bg-gray-100 rounded-xl border-none outline-none text-[15px]"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] bg-[#97BC62] text-white px-2 py-0.5 rounded-full">
              ✓ Auto-filled
            </div>
          </div>
        </div>

        <div>
          <label className="block text-[13px] text-[#6B7280] mb-1.5">
            Father's Name / पिता का नाम
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.fatherName}
              readOnly
              className="w-full px-4 py-3 bg-gray-100 rounded-xl border-none outline-none text-[15px]"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] bg-[#97BC62] text-white px-2 py-0.5 rounded-full">
              ✓ Auto-filled
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[13px] text-[#6B7280] mb-1.5">
              Date of Birth
            </label>
            <input
              type="text"
              value={formData.dob}
              readOnly
              className="w-full px-4 py-3 bg-gray-100 rounded-xl border-none outline-none text-[15px]"
            />
          </div>
          <div>
            <label className="block text-[13px] text-[#6B7280] mb-1.5">
              Aadhaar
            </label>
            <input
              type="text"
              value={formData.aadhaar}
              readOnly
              className="w-full px-4 py-3 bg-gray-100 rounded-xl border-none outline-none text-[15px]"
            />
          </div>
        </div>

        <div>
          <label className="block text-[13px] text-[#6B7280] mb-1.5">
            Land Survey Number / सर्वे नंबर
          </label>
          <input
            type="text"
            value={formData.surveyNumber}
            onChange={(e) => setFormData({ ...formData, surveyNumber: e.target.value })}
            placeholder="Enter survey number"
            className="w-full px-4 py-3 bg-white rounded-xl border-2 border-[#F5A623] outline-none focus:ring-2 focus:ring-[#F5A623] text-[15px]"
          />
          <p className="text-[11px] text-[#2D6A2D] mt-1">
            🎤 सर्वे नंबर बोलकर भरें / Say your survey number
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[13px] text-[#6B7280] mb-1.5">
              Bank Account
            </label>
            <input
              type="text"
              value={formData.bankAccount}
              readOnly
              className="w-full px-4 py-3 bg-gray-100 rounded-xl border-none outline-none text-[15px]"
            />
          </div>
          <div>
            <label className="block text-[13px] text-[#6B7280] mb-1.5">
              IFSC Code
            </label>
            <input
              type="text"
              value={formData.ifsc}
              readOnly
              className="w-full px-4 py-3 bg-gray-100 rounded-xl border-none outline-none text-[15px]"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderReviewStep = () => (
    <div className="space-y-4">
      <h2 className="font-bold text-[24px] text-[#1C1C1E] mb-2">
        आवेदन की समीक्षा करें
      </h2>
      <p className="text-[14px] text-[#6B7280] mb-6">
        Review Your Application
      </p>

      {/* Completeness Bar */}
      <div className="bg-gradient-to-r from-[#97BC62] to-[#2D6A2D] rounded-2xl p-4 text-white mb-4">
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle className="w-5 h-5" />
          <span className="font-bold text-[16px]">आवेदन 100% पूरा है</span>
        </div>
        <div className="w-full bg-white bg-opacity-30 h-2 rounded-full overflow-hidden">
          <div className="bg-white h-full" style={{ width: '100%' }} />
        </div>
      </div>

      {/* Personal Details */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-[16px] text-[#2D6A2D]">
            Personal Information
          </h3>
          <button 
            onClick={() => setCurrentStep('form')}
            className="text-[#F5A623] text-[12px] font-medium"
          >
            ✏️ Edit
          </button>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-[13px]">
            <span className="text-[#6B7280]">Name:</span>
            <span className="text-[#1C1C1E] font-medium">{formData.name}</span>
          </div>
          <div className="flex justify-between text-[13px]">
            <span className="text-[#6B7280]">Father's Name:</span>
            <span className="text-[#1C1C1E] font-medium">{formData.fatherName}</span>
          </div>
          <div className="flex justify-between text-[13px]">
            <span className="text-[#6B7280]">DOB:</span>
            <span className="text-[#1C1C1E] font-medium">{formData.dob}</span>
          </div>
          <div className="flex justify-between text-[13px]">
            <span className="text-[#6B7280]">Aadhaar:</span>
            <span className="text-[#1C1C1E] font-medium">{formData.aadhaar}</span>
          </div>
        </div>
      </div>

      {/* Bank Details */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-[16px] text-[#2D6A2D]">
            Bank Details
          </h3>
          <button 
            onClick={() => setCurrentStep('form')}
            className="text-[#F5A623] text-[12px] font-medium"
          >
            ✏️ Edit
          </button>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-[13px]">
            <span className="text-[#6B7280]">Account:</span>
            <span className="text-[#1C1C1E] font-medium">{formData.bankAccount}</span>
          </div>
          <div className="flex justify-between text-[13px]">
            <span className="text-[#6B7280]">IFSC:</span>
            <span className="text-[#1C1C1E] font-medium">{formData.ifsc}</span>
          </div>
        </div>
      </div>

      {/* Documents */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-[16px] text-[#2D6A2D]">
            Documents
          </h3>
          <button 
            onClick={() => setCurrentStep('documents')}
            className="text-[#F5A623] text-[12px] font-medium"
          >
            ✏️ Edit
          </button>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[13px]">
            <CheckCircle className="w-4 h-4 text-[#97BC62]" />
            <span className="text-[#1C1C1E]">Aadhaar Card</span>
          </div>
          <div className="flex items-center gap-2 text-[13px]">
            <CheckCircle className="w-4 h-4 text-[#97BC62]" />
            <span className="text-[#1C1C1E]">Bank Passbook</span>
          </div>
          <div className="flex items-center gap-2 text-[13px]">
            <CheckCircle className="w-4 h-4 text-[#97BC62]" />
            <span className="text-[#1C1C1E]">Land Records</span>
          </div>
          <div className="flex items-center gap-2 text-[13px]">
            <CheckCircle className="w-4 h-4 text-[#97BC62]" />
            <span className="text-[#1C1C1E]">Passport Photo</span>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-6">
        <button className="flex-1 py-3 border border-gray-300 text-[#1C1C1E] rounded-xl font-medium text-[14px]">
          📄 Preview
        </button>
        <button 
          onClick={() => setCurrentStep('success')}
          className="flex-1 py-3 bg-[#F5A623] text-white rounded-xl font-bold text-[14px]"
        >
          ✅ अभी जमा करें
        </button>
      </div>
    </div>
  );

  const renderSuccessStep = () => (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', duration: 0.5 }}
      >
        <div className="w-32 h-32 rounded-full bg-[#97BC62] flex items-center justify-center mb-6">
          <CheckCircle className="w-20 h-20 text-white" />
        </div>
      </motion.div>

      <h2 className="font-bold text-[24px] text-[#1C1C1E] text-center mb-2">
        आवेदन सफलतापूर्वक जमा हुआ!
      </h2>
      <p className="text-[14px] text-[#6B7280] text-center mb-6">
        Application submitted successfully!
      </p>

      <div className="bg-white rounded-2xl p-4 shadow-sm w-full max-w-md mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[13px] text-[#6B7280]">Reference Number:</span>
          <button className="text-[#F5A623]">
            <Copy className="w-4 h-4" />
          </button>
        </div>
        <p className="font-mono font-bold text-[16px] text-[#1C1C1E] text-center">
          REF#2026-PMKISAN-84729
        </p>
      </div>

      <div className="bg-[#F7F3EE] rounded-2xl p-4 w-full max-w-md mb-6">
        <div className="flex items-start gap-2 mb-2">
          <span className="text-xl">⏱</span>
          <div>
            <p className="text-[14px] text-[#1C1C1E] font-medium">
              अनुमानित समय: 15 कार्य दिवस
            </p>
            <p className="text-[12px] text-[#6B7280]">
              Estimated processing time
            </p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-xl">💬</span>
          <div>
            <p className="text-[14px] text-[#1C1C1E] font-medium">
              आपके 9876543210 पर SMS भेजा गया
            </p>
            <p className="text-[12px] text-[#6B7280]">
              SMS confirmation sent
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 w-full max-w-md">
        <button
          onClick={() => navigate('/applications')}
          className="flex-1 py-3 bg-[#2D6A2D] text-white rounded-xl font-bold text-[14px]"
        >
          Track Application
        </button>
        <button
          onClick={() => navigate('/dashboard')}
          className="flex-1 py-3 border border-gray-300 text-[#1C1C1E] rounded-xl font-medium text-[14px]"
        >
          Home पर जाएं
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F7F3EE] flex flex-col">
      {/* Top Bar */}
      <div className="bg-white px-4 py-3 flex items-center gap-3 border-b border-gray-200">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-6 h-6 text-[#1C1C1E]" />
        </button>
        <div className="flex-1 text-center">
          {currentStep !== 'success' && (
            <p className="text-[13px] text-[#6B7280]">
              Step {currentStepIndex + 1} of 4 — {progressSteps[currentStepIndex]}
            </p>
          )}
        </div>
        <div className="w-6" />
      </div>

      {/* Progress Bar */}
      {currentStep !== 'success' && (
        <div className="bg-white px-4 pb-3">
          <div className="flex gap-2">
            {progressSteps.map((_, index) => (
              <div
                key={index}
                className={`flex-1 h-1 rounded-full ${
                  index <= currentStepIndex ? 'bg-[#F5A623]' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-24">
        {currentStep === 'documents' && renderDocumentsStep()}
        {currentStep === 'form' && renderFormStep()}
        {currentStep === 'review' && renderReviewStep()}
        {currentStep === 'success' && renderSuccessStep()}
      </div>

      {/* Bottom CTA */}
      {currentStep !== 'success' && currentStep !== 'review' && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <button
            onClick={() => {
              if (currentStep === 'documents') setCurrentStep('form');
              else if (currentStep === 'form') setCurrentStep('review');
            }}
            className="w-full bg-[#F5A623] text-[#1C1C1E] py-4 rounded-xl font-bold text-[16px] hover:bg-[#E09515] transition-colors"
          >
            आगे बढ़ें / Next
          </button>
        </div>
      )}
    </div>
  );
}
