import React, { useState } from 'react';
import { MessageCircle, X, Mail, Send } from 'lucide-react';

export const FeedbackButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMailto = () => {
    window.location.href = 'mailto:sammi.wang@pubmatic.com?subject=Tool%20Feedback';
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-pubmatic-blue hover:bg-pubmatic-navy text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
        aria-label="Feedback"
      >
        {isOpen ? <X size={18} /> : <MessageCircle size={18} />}
        <span className="text-sm font-medium max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap">
          {isOpen ? 'Close' : 'Need Help?'}
        </span>
      </button>

      {/* Popup Card */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-72 bg-white rounded-xl shadow-2xl border border-pubmatic-border p-5 animate-fade-in-up">
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-pubmatic-lightBlue p-2 rounded-full">
              <Mail size={16} className="text-pubmatic-blue" />
            </div>
            <h4 className="text-sm font-bold text-pubmatic-navy">Feedback</h4>
          </div>
          <p className="text-xs text-gray-500 mb-4 leading-relaxed">
            Experiencing issues or have suggestions for this tool? Reach out to the team.
          </p>
          <button
            onClick={handleMailto}
            className="w-full flex items-center justify-center gap-2 bg-pubmatic-blue hover:bg-pubmatic-navy text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
          >
            <Send size={14} />
            Contact Sammi Wang
          </button>
          <p className="text-[10px] text-gray-400 mt-3 text-center">
            sammi.wang@pubmatic.com
          </p>
        </div>
      )}
    </>
  );
};
