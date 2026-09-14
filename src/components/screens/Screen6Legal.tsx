import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  ExternalLink, 
  Search, 
  ShieldCheck, 
  AlertTriangle, 
  Calendar, 
  CheckCircle2, 
  ArrowRight,
  Filter
} from 'lucide-react';
import { useSimulator } from '../../context/SimulatorContext';
import { useLanguage } from '../../context/LanguageContext';

export const Screen6Legal: React.FC = () => {
  const { legalRules, openLegalDrawer, setCurrentScreen } = useSimulator();
  const { language, t } = useLanguage();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All');

  const topics = useMemo(() => {
    const list = Array.from(new Set(legalRules.map(r => r.topic)));
    return ['All', ...list];
  }, [legalRules]);

  const filteredRules = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return legalRules.filter(r => {
      const topicText = `${r.topic} ${r.topic_vi || ''}`.toLowerCase();
      const ruleText = `${r.rule} ${r.rule_vi || ''}`.toLowerCase();
      const articleText = `${r.article} ${r.article_vi || ''}`.toLowerCase();
      const matchesSearch = 
        r.id.toLowerCase().includes(query) ||
        topicText.includes(query) ||
        r.legal_basis.toLowerCase().includes(query) ||
        ruleText.includes(query) ||
        articleText.includes(query);

      const matchesTopic = selectedTopic === 'All' || r.topic === selectedTopic;

      return matchesSearch && matchesTopic;
    });
  }, [legalRules, searchQuery, selectedTopic]);

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#e6f4ef] text-[#145f4b] text-xs font-semibold mb-2 border border-[#c2e5d9]">
            <BookOpen className="w-3.5 h-3.5 text-[#145f4b]" />
            {t('Bước 6 trong 8: Minh bạch Căn cứ Pháp lý & Tính Kiểm chứng (Auditability)', 'Step 6 of 8: Statutory Legal Evidence & Auditability')}
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {t('Hệ thống Quy tắc Pháp lý & Dẫn nguồn Văn bản', 'Statutory Legal Rules & Authority Register')}
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            {t(
              'Vietnam ETS Simulator là nền tảng minh bạch. Mỗi công thức, ngưỡng số liệu và kết luận đều được gắn mã định danh pháp lý (L001–L018) với điều khoản và đường dẫn nguồn chính thức.',
              'Vietnam ETS Simulator is built on radical transparency. Every formula, threshold, and finding is linked to an auditable legal rule ID (L001–L018) with official gazette URLs.'
            )}
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder={t('Tìm kiếm điều luật, nghị định, quyết định...', 'Search rule, article, decree, decision...')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0 hidden sm:inline" />
          <select
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
          >
            <option value="All">{t('Tất cả chủ đề', 'All Topics')}</option>
            {topics.filter(t => t !== 'All').map(tName => {
              const sample = legalRules.find(r => r.topic === tName);
              const label = language === 'vi' ? (sample?.topic_vi || tName) : tName;
              return (
                <option key={tName} value={tName}>{label}</option>
              );
            })}
          </select>
        </div>
      </div>

      {/* Rules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRules.map((rule) => (
          <div
            key={rule.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-[#e6f4ef] text-[#145f4b] border border-[#bfe2d7] font-mono font-bold text-xs flex items-center justify-center">
                    {rule.id}
                  </span>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      {language === 'vi' ? (rule.topic_vi || rule.topic) : rule.topic}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {rule.legal_basis} — {language === 'vi' ? (rule.article_vi || rule.article) : rule.article}
                    </h4>
                  </div>
                </div>

                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full shrink-0">
                  {language === 'vi' ? (rule.effective_status_vi || rule.effective_status) : rule.effective_status}
                </span>
              </div>

              <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed font-medium">
                "{language === 'vi' ? (rule.rule_vi || rule.rule) : rule.rule}"
              </p>

              <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#145f4b] shrink-0" />
                <span>{language === 'vi' ? (rule.simulator_use_vi || rule.simulator_use) : rule.simulator_use}</span>
              </div>

              {(rule.caution || rule.caution_vi) && (
                <div className="text-[11px] text-amber-800 bg-amber-50 p-2 rounded-lg border border-amber-200 flex items-start gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <span>{language === 'vi' ? (rule.caution_vi || rule.caution) : rule.caution}</span>
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => openLegalDrawer(rule)}
                className="text-xs font-semibold text-[#145f4b] hover:text-[#0f4f3e] transition-colors cursor-pointer"
              >
                {t('Xem chi tiết hồ sơ →', 'Inspect full dossier →')}
              </button>

              {rule.source_url && (
                <a
                  href={rule.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-700 transition-colors"
                >
                  <span>{t('Nguồn Cổng TTĐT', 'Government Source')}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <button
          type="button"
          onClick={() => setCurrentScreen(5)}
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-2 cursor-pointer"
        >
          ← {t('Quay lại: Vị thế Tuân thủ', 'Back: Compliance Position')}
        </button>

        <button
          type="button"
          onClick={() => setCurrentScreen(7)}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#145f4b] text-white font-semibold text-xs hover:bg-[#0f4f3e] shadow-xs transition-all cursor-pointer"
        >
          <span>{t('Tiếp theo: Kiểm toán Chất lượng Dữ liệu', 'Next: Data Quality Matrix')}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
