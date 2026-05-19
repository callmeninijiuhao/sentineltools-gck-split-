import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, CheckCircle, AlertCircle, Copy } from 'lucide-react';

export const FeedbackButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-focus textarea when modal opens
  useEffect(() => {
    if (isOpen && textareaRef.current) {
      setTimeout(() => textareaRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Reset form when closing
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setMessage('');
        setSubmitted(false);
        setCopied(false);
      }, 300);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const subject = encodeURIComponent('Tool Feedback');
    const body = encodeURIComponent(message.trim());
    const mailtoUrl = `mailto:sammi.wang@pubmatic.com?subject=${subject}&body=${body}`;

    // Try to open mailto
    window.location.href = mailtoUrl;
    setSubmitted(true);
  };

  const handleCopy = async () => {
    if (!message.trim()) return;
    const fullText = `To: sammi.wang@pubmatic.com\nSubject: Tool Feedback\n\n${message.trim()}`;
    await navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Floating Pill Button - more noticeable than icon-only */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-pubmatic-blue hover:bg-pubmatic-navy text-white pl-4 pr-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group animate-bounce-subtle"
        aria-label="Send Feedback"
        title="Send Feedback"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pubmatic-teal opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-pubmatic-teal"></span>
        </span>
        <MessageSquare size={18} />
        <span className="text-sm font-semibold">Feedback</span>
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl border border-pubmatic-border w-full max-w-md mx-4 overflow-hidden animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-pubmatic-lightBlue px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="bg-pubmatic-blue p-1.5 rounded-lg">
                  <MessageSquare size={18} className="text-white" />
                </div>
                <h3 className="text-base font-bold text-pubmatic-navy">Send Feedback</h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Describe your issue or suggestion
                    </label>
                    <textarea
                      ref={textareaRef}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="e.g., The crawler is timing out on iOS app IDs, or I have a feature idea..."
                      rows={5}
                      className="w-full p-3.5 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:border-pubmatic-blue focus:ring-2 focus:ring-pubmatic-blue/20 outline-none resize-none bg-gray-50/50 transition-all"
                      required
                    />
                    <p className="text-[11px] text-gray-400 mt-1.5 flex items-center gap-1">
                      <AlertCircle size={11} />
                      Your feedback will open in your default email client pre-filled for sammi.wang@pubmatic.com
                    </p>
                  </div>

                  <div className="flex gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="flex-1 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!message.trim()}
                      className="flex-1 py-2.5 text-sm font-semibold text-white bg-pubmatic-blue hover:bg-pubmatic-navy disabled:bg-gray-300 disabled:cursor-not-allowed rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                      <Send size={14} />
                      Send Feedback
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-4 space-y-4">
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle size={28} className="text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-gray-800 mb-1">Thank You!</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      Your default email client should have opened with your feedback pre-filled.<br/>
                      If it didn't open, you can copy the message below.
                    </p>
                  </div>
                  
                  <button
                    onClick={handleCopy}
                    className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-pubmatic-blue bg-pubmatic-lightBlue hover:bg-blue-100 rounded-xl transition-colors"
                  >
                    {copied ? <CheckCircle size={14} /> : <Copy size={14} />}
                    {copied ? 'Copied to Clipboard!' : 'Copy Feedback to Clipboard'}
                  </button>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
