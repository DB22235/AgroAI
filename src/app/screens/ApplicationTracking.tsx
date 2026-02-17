import { useState } from 'react';
import { FileText, Clock, CheckCircle, XCircle, AlertCircle, Eye, Phone } from 'lucide-react';
import { useNavigate } from 'react-router';
import { BottomNav } from '../components/BottomNav';

const filters = ['All', 'Pending', 'Approved', 'Rejected', 'Disbursed'];

interface Application {
  id: string;
  scheme: string;
  refNumber: string;
  status: 'pending' | 'action-required' | 'approved' | 'rejected' | 'under-review';
  submittedDate: string;
  expectedDate: string;
  currentStep: number;
  totalSteps: number;
  statusLabel: string;
  statusLabelHi: string;
  message?: string;
  amount?: string;
}

export function ApplicationTracking() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');

  const applications: Application[] = [
    {
      id: '1',
      scheme: 'PM-Kisan',
      refNumber: 'REF#84729',
      status: 'under-review',
      submittedDate: 'Jan 15',
      expectedDate: 'Feb 15',
      currentStep: 3,
      totalSteps: 5,
      statusLabel: 'Under Review',
      statusLabelHi: 'समीक्षाधीन',
    },
    {
      id: '2',
      scheme: 'PMFBY',
      refNumber: 'REF#84512',
      status: 'action-required',
      submittedDate: 'Jan 10',
      expectedDate: 'Today',
      currentStep: 2,
      totalSteps: 5,
      statusLabel: 'Action Required',
      statusLabelHi: 'कार्रवाई आवश्यक',
      message: 'Land Records document is missing',
    },
    {
      id: '3',
      scheme: 'Soil Health Card',
      refNumber: 'REF#83991',
      status: 'approved',
      submittedDate: 'Jan 5',
      expectedDate: 'Jan 20',
      currentStep: 5,
      totalSteps: 5,
      statusLabel: 'Approved',
      statusLabelHi: 'स्वीकृत',
      amount: '₹2,000',
    },
    {
      id: '4',
      scheme: 'KCC Loan',
      refNumber: 'REF#83245',
      status: 'rejected',
      submittedDate: 'Dec 28',
      expectedDate: 'Jan 12',
      currentStep: 4,
      totalSteps: 5,
      statusLabel: 'Rejected',
      statusLabelHi: 'अस्वीकृत',
      message: 'Income certificate mismatch',
    },
  ];

  const stats = [
    { label: 'Total', labelHi: 'कुल', count: applications.length, icon: FileText, color: '#2D6A2D' },
    { label: 'Pending', labelHi: 'लंबित', count: 2, icon: Clock, color: '#FB923C' },
    { label: 'Approved', labelHi: 'स्वीकृत', count: 1, icon: CheckCircle, color: '#97BC62' },
    { label: 'Rejected', labelHi: 'अस्वीकृत', count: 1, icon: XCircle, color: '#F87171' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'under-review': return { bg: 'bg-[#60A5FA] bg-opacity-20', text: 'text-[#60A5FA]', border: 'border-[#60A5FA]' };
      case 'action-required': return { bg: 'bg-[#FB923C] bg-opacity-20', text: 'text-[#FB923C]', border: 'border-[#FB923C]' };
      case 'approved': return { bg: 'bg-[#97BC62] bg-opacity-20', text: 'text-[#2D6A2D]', border: 'border-[#97BC62]' };
      case 'rejected': return { bg: 'bg-[#F87171] bg-opacity-20', text: 'text-[#F87171]', border: 'border-[#F87171]' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-600', border: 'border-gray-300' };
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'under-review': return '🔵';
      case 'action-required': return '🟠';
      case 'approved': return '🟢';
      case 'rejected': return '🔴';
      default: return '⚪';
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F3EE] pb-20">
      {/* Top Bar */}
      <div className="bg-white px-4 py-3 border-b border-gray-200 sticky top-0 z-10">
        <h1 className="font-bold text-[20px] text-[#1C1C1E]">
          मेरे आवेदन / My Applications
        </h1>
      </div>

      <div className="px-4 pt-4">
        {/* Filter Pills */}
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

        {/* Summary Stats */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white rounded-xl p-3 text-center shadow-sm">
                <div 
                  className="w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}20` }}
                >
                  <Icon className="w-4 h-4" style={{ color: stat.color }} />
                </div>
                <div className="font-bold text-[20px] text-[#1C1C1E]">
                  {stat.count}
                </div>
                <div className="text-[10px] text-[#6B7280] leading-tight">
                  {stat.labelHi}
                </div>
              </div>
            );
          })}
        </div>

        {/* Application Cards */}
        <div className="space-y-3">
          {applications.map((app) => {
            const statusColors = getStatusColor(app.status);
            const statusIcon = getStatusIcon(app.status);
            
            return (
              <div 
                key={app.id} 
                className={`bg-white rounded-2xl p-4 shadow-sm border-l-4 ${statusColors.border}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-[16px] text-[#1C1C1E] mb-1">
                      {app.scheme} | {app.refNumber}
                    </h3>
                    <div className={`inline-flex items-center gap-1 ${statusColors.bg} ${statusColors.text} px-2 py-1 rounded-full text-[12px] font-medium`}>
                      <span>{statusIcon}</span>
                      <span>{app.statusLabelHi}</span>
                    </div>
                  </div>
                </div>

                {/* Progress Timeline */}
                <div className="mb-3">
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((step) => (
                      <div key={step} className="flex-1 flex items-center">
                        <div 
                          className={`w-full h-1 rounded-full ${
                            step <= app.currentStep ? 'bg-[#F5A623]' : 'bg-gray-200'
                          }`}
                        />
                        {step < 5 && <div className="w-1" />}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-[#6B7280]">
                    <span>Submitted</span>
                    <span>Received</span>
                    <span>Review</span>
                    <span>Decision</span>
                    <span>Disbursed</span>
                  </div>
                </div>

                {/* Dates */}
                <div className="flex items-center justify-between text-[12px] mb-3">
                  <span className="text-[#6B7280]">
                    Submitted: {app.submittedDate}
                  </span>
                  <span className={`font-medium ${
                    app.status === 'action-required' ? 'text-[#FB923C]' : 'text-[#2D6A2D]'
                  }`}>
                    Expected: {app.expectedDate}
                  </span>
                  {app.status === 'under-review' && (
                    <span className="text-[#97BC62] flex items-center gap-1">
                      ✅ On Track
                    </span>
                  )}
                </div>

                {/* Message for action required or rejected */}
                {app.message && (
                  <div className={`${statusColors.bg} ${statusColors.text} rounded-xl p-3 mb-3`}>
                    <p className="text-[13px] font-medium">{app.message}</p>
                  </div>
                )}

                {/* Amount for approved */}
                {app.amount && (
                  <div className="bg-[#F0FDF4] rounded-xl p-3 mb-3">
                    <p className="text-[13px] text-[#2D6A2D]">
                      <span className="font-bold">{app.amount}</span> transferred to XXXXXXXXX234
                    </p>
                    <p className="text-[11px] text-[#6B7280] mt-1">
                      Bank transfer: Jan 20, 2026
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {app.status === 'action-required' ? (
                    <>
                      <button 
                        onClick={() => navigate(`/apply/${app.id}`)}
                        className="flex-1 bg-[#F5A623] text-white py-2 rounded-xl text-[13px] font-medium"
                      >
                        अभी अपलोड करें / Upload Now
                      </button>
                      <button className="px-4 py-2 border border-gray-200 text-[#1C1C1E] rounded-xl text-[13px] font-medium">
                        <Eye className="w-4 h-4" />
                      </button>
                    </>
                  ) : app.status === 'approved' ? (
                    <>
                      <button className="flex-1 border border-gray-200 text-[#1C1C1E] py-2 rounded-xl text-[13px] font-medium">
                        View Receipt
                      </button>
                      <button className="flex-1 border border-gray-200 text-[#1C1C1E] py-2 rounded-xl text-[13px] font-medium">
                        Apply Again
                      </button>
                    </>
                  ) : app.status === 'rejected' ? (
                    <>
                      <button className="flex-1 border border-[#F87171] text-[#F87171] py-2 rounded-xl text-[13px] font-medium">
                        Raise Grievance
                      </button>
                      <button className="flex-1 border border-gray-200 text-[#1C1C1E] py-2 rounded-xl text-[13px] font-medium">
                        View Reason
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="flex-1 border border-gray-200 text-[#1C1C1E] py-2 rounded-xl text-[13px] font-medium">
                        View Details
                      </button>
                      <button className="px-4 py-2 border border-gray-200 text-[#1C1C1E] rounded-xl text-[13px] font-medium">
                        <Phone className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
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
