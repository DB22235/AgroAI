import { ArrowLeft, Settings, Clock, CheckCircle2, Bell, Info } from 'lucide-react';
import { useNavigate } from 'react-router';
import { BottomNav } from '../components/BottomNav';

interface Notification {
  id: string;
  type: 'urgent' | 'info' | 'reminder' | 'system';
  icon: string;
  title: string;
  titleHi: string;
  message: string;
  messageHi: string;
  time: string;
  unread: boolean;
  actionLabel?: string;
  actionPath?: string;
}

export function Notifications() {
  const navigate = useNavigate();

  const notifications: Notification[] = [
    {
      id: '1',
      type: 'urgent',
      icon: '🔴',
      title: 'PM-Kisan deadline in 3 days!',
      titleHi: 'PM-Kisan deadline in 3 days!',
      message: 'आवेदन की अंतिम तिथि: 31 मार्च 2026',
      messageHi: 'Last date to apply: March 31, 2026',
      time: '9:15 AM',
      unread: true,
      actionLabel: 'अभी आवेदन करें',
      actionPath: '/schemes/pm-kisan',
    },
    {
      id: '2',
      type: 'info',
      icon: '🔵',
      title: 'PMFBY application approved',
      titleHi: 'आपका PMFBY आवेदन approved हो गया',
      message: '₹5,200 जल्द आपके खाते में आएगा',
      messageHi: '₹5,200 will be credited to your account soon',
      time: '8:47 AM',
      unread: true,
      actionLabel: 'View Details',
      actionPath: '/applications',
    },
    {
      id: '3',
      type: 'reminder',
      icon: '🟢',
      title: 'New scheme for you',
      titleHi: 'नई योजना आपके लिए: Soil Health Card Scheme',
      message: 'आप पात्र हो सकते हैं — जांचें',
      messageHi: 'You might be eligible - Check now',
      time: 'Yesterday, 4:30 PM',
      unread: false,
      actionLabel: 'Check Eligibility',
      actionPath: '/schemes/soil-health',
    },
    {
      id: '4',
      type: 'system',
      icon: '⚙️',
      title: 'Profile completion reminder',
      titleHi: 'प्रोफाइल 78% पूर्ण — 2 फ़ील्ड अपडेट करें',
      message: 'Complete your profile to get better scheme matches',
      messageHi: 'Complete your profile to get better scheme matches',
      time: 'Yesterday, 11:00 AM',
      unread: false,
      actionLabel: 'Complete Profile',
      actionPath: '/profile',
    },
    {
      id: '5',
      type: 'info',
      icon: '🔵',
      title: 'Document verified',
      titleHi: 'आपके दस्तावेज़ सत्यापित हो गए',
      message: 'Aadhaar and Bank details verified successfully',
      messageHi: 'Aadhaar and Bank details verified successfully',
      time: '2 days ago',
      unread: false,
    },
    {
      id: '6',
      type: 'reminder',
      icon: '🟢',
      title: 'Soil health test reminder',
      titleHi: 'मृदा स्वास्थ्य परीक्षण का समय',
      message: 'आखिरी परीक्षण 8 महीने पहले हुआ था',
      messageHi: 'Last test was 8 months ago',
      time: '3 days ago',
      unread: false,
      actionLabel: 'Book Test',
      actionPath: '/schemes/soil-health',
    },
  ];

  const todayNotifications = notifications.filter(n => !n.time.includes('Yesterday') && !n.time.includes('days ago'));
  const yesterdayNotifications = notifications.filter(n => n.time.includes('Yesterday'));
  const olderNotifications = notifications.filter(n => n.time.includes('days ago'));

  const unreadCount = notifications.filter(n => n.unread).length;

  const getNotificationStyle = (type: string) => {
    switch (type) {
      case 'urgent':
        return { bg: 'bg-white', border: 'border-l-4 border-[#FB923C]', icon: 'bg-[#FB923C] bg-opacity-20' };
      case 'info':
        return { bg: 'bg-white', border: 'border-l-4 border-[#60A5FA]', icon: 'bg-[#60A5FA] bg-opacity-20' };
      case 'reminder':
        return { bg: 'bg-white', border: 'border-l-4 border-[#97BC62]', icon: 'bg-[#97BC62] bg-opacity-20' };
      case 'system':
        return { bg: 'bg-white', border: 'border-l-4 border-gray-300', icon: 'bg-gray-100' };
      default:
        return { bg: 'bg-white', border: '', icon: 'bg-gray-100' };
    }
  };

  const NotificationCard = ({ notif }: { notif: Notification }) => {
    const styles = getNotificationStyle(notif.type);
    
    return (
      <div className={`${styles.bg} rounded-2xl p-4 shadow-sm ${styles.border} ${notif.unread ? 'ring-2 ring-[#F5A623] ring-opacity-30' : ''}`}>
        <div className="flex items-start gap-3 mb-2">
          <div className={`w-10 h-10 rounded-full ${styles.icon} flex items-center justify-center text-xl flex-shrink-0`}>
            {notif.icon}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-[14px] text-[#1C1C1E] mb-1">
              {notif.titleHi}
            </h3>
            <p className="text-[13px] text-[#6B7280] mb-2">
              {notif.messageHi}
            </p>
            <p className="text-[11px] text-[#6B7280]">{notif.time}</p>
          </div>
          {notif.unread && (
            <div className="w-2 h-2 rounded-full bg-[#F5A623] flex-shrink-0 mt-1" />
          )}
        </div>
        
        {notif.actionLabel && notif.actionPath && (
          <button
            onClick={() => navigate(notif.actionPath!)}
            className={`w-full mt-3 py-2 rounded-xl font-medium text-[13px] ${
              notif.type === 'urgent'
                ? 'bg-[#F5A623] text-white'
                : 'border border-gray-200 text-[#1C1C1E]'
            }`}
          >
            {notif.actionLabel}
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F7F3EE] pb-20">
      {/* Top Bar */}
      <div className="bg-white px-4 py-3 flex items-center gap-3 border-b border-gray-200 sticky top-0 z-10">
        <button onClick={() => navigate('/dashboard')}>
          <ArrowLeft className="w-6 h-6 text-[#1C1C1E]" />
        </button>
        <div className="flex-1">
          <h1 className="font-bold text-[18px] text-[#1C1C1E]">
            सूचनाएं / Notifications
          </h1>
          {unreadCount > 0 && (
            <p className="text-[12px] text-[#F5A623]">
              {unreadCount} नई / {unreadCount} new
            </p>
          )}
        </div>
        <button className="text-[#2D6A2D] text-[13px] font-medium">
          सभी पढ़ें
        </button>
      </div>

      <div className="px-4 pt-4">
        {/* Today */}
        {todayNotifications.length > 0 && (
          <div className="mb-6">
            <h2 className="font-bold text-[16px] text-[#1C1C1E] mb-3">
              आज / Today
            </h2>
            <div className="space-y-3">
              {todayNotifications.map((notif) => (
                <NotificationCard key={notif.id} notif={notif} />
              ))}
            </div>
          </div>
        )}

        {/* Yesterday */}
        {yesterdayNotifications.length > 0 && (
          <div className="mb-6">
            <h2 className="font-bold text-[16px] text-[#1C1C1E] mb-3">
              कल / Yesterday
            </h2>
            <div className="space-y-3">
              {yesterdayNotifications.map((notif) => (
                <NotificationCard key={notif.id} notif={notif} />
              ))}
            </div>
          </div>
        )}

        {/* Older */}
        {olderNotifications.length > 0 && (
          <div className="mb-6">
            <h2 className="font-bold text-[16px] text-[#1C1C1E] mb-3">
              Earlier
            </h2>
            <div className="space-y-3">
              {olderNotifications.map((notif) => (
                <NotificationCard key={notif.id} notif={notif} />
              ))}
            </div>
          </div>
        )}

        {/* Notification Settings Link */}
        <button
          onClick={() => {}}
          className="w-full bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between mb-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#F7F3EE] flex items-center justify-center">
              <Settings className="w-5 h-5 text-[#2D6A2D]" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-[14px] text-[#1C1C1E]">
                सूचना सेटिंग बदलें
              </h3>
              <p className="text-[12px] text-[#6B7280]">
                Manage notification preferences
              </p>
            </div>
          </div>
          <ArrowLeft className="w-5 h-5 text-[#6B7280] rotate-180" />
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
