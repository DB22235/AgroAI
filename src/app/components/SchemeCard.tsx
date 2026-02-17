import { Calendar, FileText, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router';

interface SchemeCardProps {
  id: string;
  name: string;
  nameHi: string;
  amount: string;
  type: string;
  deadline: string;
  docsRequired: number;
  eligible: boolean;
  logo?: string;
}

export function SchemeCard({
  id,
  name,
  nameHi,
  amount,
  type,
  deadline,
  docsRequired,
  eligible,
  logo
}: SchemeCardProps) {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/schemes/${id}`)}
      className="bg-white rounded-2xl p-4 shadow-sm border-l-4 border-[#2D6A2D] cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-[#1A3C1A] flex items-center justify-center text-white text-lg flex-shrink-0">
          {logo || '🏛️'}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-[15px] text-[#1C1C1E] leading-tight mb-0.5">
                {name}
              </h3>
              <p className="text-[13px] text-[#6B7280] leading-tight">
                {nameHi}
              </p>
            </div>
            {eligible && (
              <CheckCircle className="w-5 h-5 text-[#97BC62] flex-shrink-0" />
            )}
          </div>
        </div>
      </div>

      <div className="text-[13px] text-[#6B7280] mb-3">
        {amount} • {type} • <span className="text-[#97BC62] font-medium">You're Eligible!</span>
      </div>

      <div className="border-t border-gray-100 pt-3 flex items-center justify-between text-[12px]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-[#6B7280]">
            <Calendar className="w-3.5 h-3.5" />
            <span>Deadline: {deadline}</span>
          </div>
          <div className="flex items-center gap-1 text-[#6B7280]">
            <FileText className="w-3.5 h-3.5" />
            <span>Docs: {docsRequired}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-3">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/apply/${id}`);
          }}
          className="flex-1 bg-[#F5A623] text-[#1C1C1E] py-2.5 rounded-xl font-medium text-[14px] hover:bg-[#E09515] transition-colors"
        >
          आवेदन करें / Apply
        </button>
        <button 
          onClick={(e) => e.stopPropagation()}
          className="px-4 py-2.5 rounded-xl border border-gray-200 font-medium text-[14px] text-[#6B7280] hover:bg-gray-50 transition-colors"
        >
          सेव करें
        </button>
      </div>
    </div>
  );
}
