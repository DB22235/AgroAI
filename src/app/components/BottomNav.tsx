import { Home, Search, FileText, MessageCircle, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', labelHi: 'होम', path: '/dashboard' },
    { icon: Search, label: 'Schemes', labelHi: 'योजनाएं', path: '/schemes' },
    { icon: FileText, label: 'Applications', labelHi: 'आवेदन', path: '/applications' },
    { icon: MessageCircle, label: 'Chat', labelHi: 'चैट', path: '/chat' },
    { icon: User, label: 'Profile', labelHi: 'प्रोफाइल', path: '/profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 h-16 flex items-center justify-around px-4 z-50">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className="flex flex-col items-center justify-center gap-0.5 min-w-[60px]"
          >
            <Icon 
              className={`w-6 h-6 ${isActive ? 'text-[#F5A623]' : 'text-gray-400'}`}
              strokeWidth={2}
            />
            <span className={`text-[11px] ${isActive ? 'text-[#F5A623] font-medium' : 'text-gray-400'}`}>
              {item.labelHi}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
