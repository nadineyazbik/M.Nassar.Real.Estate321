import React, { useState } from 'react';
import { Bot, Sparkles, Send, X, Calculator, ShieldCheck, RefreshCw, MessageSquare, Building2, ChevronLeft } from 'lucide-react';
import { Property } from '../types';

interface AiAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPropertyForValuation?: Property | null;
  onSelectProperty?: (property: Property) => void;
}

export const AiAdvisorModal: React.FC<AiAdvisorModalProps> = ({
  isOpen,
  onClose,
  selectedPropertyForValuation
}) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'evaluate'>('chat');
  
  // Chat State
  const [inputMessage, setInputMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string; time: string }>>([
    {
      sender: 'ai',
      text: 'أهلاً بك! أنا مستشار م. نصار العقاري بالذكاء الاصطناعي. يمكنني إجابتك عن أفضل مناطق بيروت، أسعار الشقق بالسند الأخضر، وتوجيهك لأفضل الفرص العقارية في لبنان.',
      time: new Date().toLocaleTimeString('ar-LB', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Valuation Form State
  const [valForm, setValForm] = useState({
    propertyTitle: selectedPropertyForValuation?.title || '',
    location: selectedPropertyForValuation?.location || 'بيروت - الحمرا',
    price: selectedPropertyForValuation?.price || 180000,
    propertyType: selectedPropertyForValuation?.propertyType || 'apartment',
    areaSqM: selectedPropertyForValuation?.areaSqM || 140,
    bedrooms: selectedPropertyForValuation?.bedrooms || 3,
    bathrooms: selectedPropertyForValuation?.bathrooms || 2,
    description: selectedPropertyForValuation?.description || ''
  });
  const [valuationResult, setValuationResult] = useState<string | null>(null);
  const [isValuationLoading, setIsValuationLoading] = useState(false);

  if (!isOpen) return null;

  const handleSendMessage = async (msgToSend?: string) => {
    const text = msgToSend || inputMessage.trim();
    if (!text || isChatLoading) return;

    const userTime = new Date().toLocaleTimeString('ar-LB', { hour: '2-digit', minute: '2-digit' });
    setChatMessages(prev => [...prev, { sender: 'user', text, time: userTime }]);
    if (!msgToSend) setInputMessage('');
    setIsChatLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });
      const data = await res.json();
      const aiTime = new Date().toLocaleTimeString('ar-LB', { hour: '2-digit', minute: '2-digit' });

      if (data.reply) {
        setChatMessages(prev => [...prev, { sender: 'ai', text: data.reply, time: aiTime }]);
      } else {
        setChatMessages(prev => [...prev, { sender: 'ai', text: 'نعتذر، لم نتمكن من الوصول للسيرفر حالياً.', time: aiTime }]);
      }
    } catch {
      setChatMessages(prev => [
        ...prev,
        { sender: 'ai', text: 'عذراً، حدث خطأ في الاتصال بمستشار الذكاء الاصطناعي.', time: new Date().toLocaleTimeString('ar-LB', { hour: '2-digit', minute: '2-digit' }) }
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleEvaluateProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsValuationLoading(true);
    setValuationResult(null);

    try {
      const res = await fetch('/api/ai/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(valForm)
      });
      const data = await res.json();
      if (data.evaluation) {
        setValuationResult(data.evaluation);
      } else {
        setValuationResult('تعذر إكمال تقرير التقييم حالياً.');
      }
    } catch {
      setValuationResult('حدث خطأ أثناء إجراء التثمين بالذكاء الاصطناعي.');
    } finally {
      setIsValuationLoading(false);
    }
  };

  const PRESET_PROMPTS = [
    'ما هي أفضل المناطق للاستثمار العقاري في بيروت حالياً؟',
    'ما هي الأوراق والمعاملات المطلوبة لشراء شقة بسند أخضر في لبنان؟',
    'كيف تتفاوت الأسعار بين داخل بيروت وخارجها؟',
    'ما هو متوسط العائد على الإيجار في مناطق الحمرا والمصيطبة؟'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/80 backdrop-blur-sm dir-rtl animate-fadeIn">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-[#064E3B] text-white p-4 sm:p-5 flex items-center justify-between border-b border-[#D4AF37]/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37] text-[#064E3B] flex items-center justify-center shadow-md font-bold">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black flex items-center gap-2">
                <span>مستشار م. نصار العقاري بالذكاء الاصطناعي</span>
                <span className="bg-[#D4AF37] text-white text-[9px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" />
                  Gemini AI
                </span>
              </h3>
              <p className="text-xs text-stone-200 font-medium mt-0.5">
                استشارات عقارية ذكية وتثمين فوري للعقارات في لبنان
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-black/20 text-stone-200 hover:text-white hover:bg-black/40 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-stone-200 bg-stone-50 px-4 pt-3 gap-2">
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-4 py-2.5 rounded-t-lg text-xs font-bold flex items-center gap-1.5 transition-colors border-b-2 ${
              activeTab === 'chat'
                ? 'bg-white text-[#064E3B] border-[#064E3B] shadow-sm'
                : 'text-stone-600 border-transparent hover:text-stone-900'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-[#D4AF37]" />
            <span>المساعد الذكي (أسئلة واستشارات)</span>
          </button>

          <button
            onClick={() => setActiveTab('evaluate')}
            className={`px-4 py-2.5 rounded-t-lg text-xs font-bold flex items-center gap-1.5 transition-colors border-b-2 ${
              activeTab === 'evaluate'
                ? 'bg-white text-[#064E3B] border-[#064E3B] shadow-sm'
                : 'text-stone-600 border-transparent hover:text-stone-900'
            }`}
          >
            <Calculator className="w-4 h-4 text-[#D4AF37]" />
            <span>تثمين العقار بالذكاء الاصطناعي</span>
          </button>
        </div>

        {/* Tab 1: Chat Assistant */}
        {activeTab === 'chat' && (
          <div className="flex-1 flex flex-col p-4 overflow-hidden bg-stone-50/50">
            {/* Chat Messages Body */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1 pl-1 mb-3 max-h-[380px]">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-start' : 'items-end'}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#064E3B] text-white rounded-br-none shadow-sm'
                        : 'bg-white text-stone-800 border border-stone-200 rounded-bl-none shadow-sm'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                    <span
                      className={`block text-[9px] mt-1.5 ${
                        msg.sender === 'user' ? 'text-emerald-200 text-left' : 'text-stone-400 text-right'
                      }`}
                    >
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}

              {isChatLoading && (
                <div className="flex items-center gap-2 text-xs text-stone-500 font-bold bg-white p-3 rounded-xl border border-stone-200 w-fit">
                  <RefreshCw className="w-4 h-4 text-[#064E3B] animate-spin" />
                  <span>مستشار الذكاء الاصطناعي يكتب الرد...</span>
                </div>
              )}
            </div>

            {/* Quick Presets */}
            <div className="mb-3">
              <p className="text-[10px] text-stone-500 font-bold mb-1.5 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                <span>أسئلة شائعة اقترحها الذكاء الاصطناعي:</span>
              </p>
              <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                {PRESET_PROMPTS.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(prompt)}
                    className="whitespace-nowrap text-[11px] bg-white border border-stone-200 text-stone-700 hover:border-[#D4AF37] hover:text-[#064E3B] px-2.5 py-1 rounded-full transition-colors shrink-0 shadow-2xs"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Message Input Box */}
            <div className="flex items-center gap-2 pt-2 border-t border-stone-200">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="اسأل المستشار الذكي عن أي عقار، منطقة، أو إجراء قانوني في لبنان..."
                className="flex-1 bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#064E3B]"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={isChatLoading || !inputMessage.trim()}
                className="bg-[#064E3B] hover:bg-[#04382a] disabled:opacity-50 text-white p-2.5 rounded-xl transition-colors shrink-0 flex items-center justify-center"
              >
                <Send className="w-4 h-4 rotate-180" />
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Valuation Form */}
        {activeTab === 'evaluate' && (
          <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 bg-stone-50/50">
            <form onSubmit={handleEvaluateProperty} className="bg-white p-4 rounded-xl border border-stone-200 space-y-3">
              <h4 className="font-bold text-xs text-[#064E3B] flex items-center gap-1.5 border-b border-stone-100 pb-2">
                <Building2 className="w-4 h-4 text-[#D4AF37]" />
                <span>أدخل مواصفات العقار للحصول على تقرير تثمين واستثمار بالذكاء الاصطناعي</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-stone-600 font-bold mb-1">اسم / عنوان العقار المعروض</label>
                  <input
                    type="text"
                    value={valForm.propertyTitle}
                    onChange={(e) => setValForm({ ...valForm, propertyTitle: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-stone-900 focus:outline-none focus:border-[#064E3B]"
                    placeholder="مثال: شقة فخمة في الحمرا"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 font-bold mb-1">الموقع والتفاصيل</label>
                  <input
                    type="text"
                    value={valForm.location}
                    onChange={(e) => setValForm({ ...valForm, location: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-stone-900 focus:outline-none focus:border-[#064E3B]"
                    placeholder="مثال: بيروت - شارع الحمرا"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 font-bold mb-1">السعر المطلوب ($)</label>
                  <input
                    type="number"
                    value={valForm.price}
                    onChange={(e) => setValForm({ ...valForm, price: Number(e.target.value) })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-stone-900 focus:outline-none focus:border-[#064E3B]"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 font-bold mb-1">المساحة الإجمالية (م²)</label>
                  <input
                    type="number"
                    value={valForm.areaSqM}
                    onChange={(e) => setValForm({ ...valForm, areaSqM: Number(e.target.value) })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-stone-900 focus:outline-none focus:border-[#064E3B]"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 font-bold mb-1">عدد غرف النوم</label>
                  <input
                    type="number"
                    value={valForm.bedrooms}
                    onChange={(e) => setValForm({ ...valForm, bedrooms: Number(e.target.value) })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-stone-900 focus:outline-none focus:border-[#064E3B]"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 font-bold mb-1">نوع العقار</label>
                  <select
                    value={valForm.propertyType}
                    onChange={(e) => setValForm({ ...valForm, propertyType: e.target.value as any })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-stone-900 focus:outline-none focus:border-[#064E3B]"
                  >
                    <option value="apartment">شقة سكنية</option>
                    <option value="villa">فيلا / بيت مستقل</option>
                    <option value="land">أرض / أرض إعمار</option>
                    <option value="commercial">مكتب / محلي تجاري</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isValuationLoading}
                className="w-full bg-[#064E3B] hover:bg-[#04382a] disabled:opacity-50 text-white font-bold text-xs py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                {isValuationLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>جاري تحليل البيانات وإعداد تقرير التقييم...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                    <span>إنشاء تقرير تثمين واستثمار فورياً</span>
                  </>
                )}
              </button>
            </form>

            {/* Valuation Report Result */}
            {valuationResult && (
              <div className="bg-white p-4 sm:p-5 rounded-xl border border-[#D4AF37] space-y-3 shadow-md animate-fadeIn">
                <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <h4 className="font-bold text-xs text-[#064E3B] flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                    <span>نتيجة التثمين والتحليل الاستثماري بالذكاء الاصطناعي</span>
                  </h4>
                  <span className="text-[10px] bg-emerald-100 text-[#064E3B] font-bold px-2 py-0.5 rounded">
                    م. نصار العقارية AI
                  </span>
                </div>
                <div className="text-xs text-stone-700 leading-relaxed whitespace-pre-wrap bg-stone-50 p-3.5 rounded-lg border border-stone-200">
                  {valuationResult}
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
