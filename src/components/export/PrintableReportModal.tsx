import React, { useEffect } from 'react';
import { X, Printer, Building2, CheckCircle2, ShieldCheck, FileCheck } from 'lucide-react';
import { useSimulator } from '../../context/SimulatorContext';
import { useLanguage } from '../../context/LanguageContext';

export const PrintableReportModal: React.FC = () => {
  const { 
    isPrintModalOpen, 
    setIsPrintModalOpen, 
    selectedFacility, 
    state, 
    inventoryResult, 
    allocationResult, 
    complianceResult,
    dataQualityReport 
  } = useSimulator();
  const { language, t } = useLanguage();

  // Close on Escape key & lock background scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsPrintModalOpen(false);
      }
    };
    if (isPrintModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isPrintModalOpen, setIsPrintModalOpen]);

  if (!isPrintModalOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-[#0a231c]/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 print:p-0 print:bg-white print:static print:inset-auto animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsPrintModalOpen(false);
      }}
    >
      
      {/* Modal Container with max-height and flex-col to prevent header overflow */}
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden print:max-h-none print:overflow-visible print:border-none print:shadow-none print:rounded-none animate-in zoom-in-95 duration-150">
        
        {/* Top Screen Action Header (Sticky, always visible, hidden in print) */}
        <div className="sticky top-0 z-20 shrink-0 bg-[#145f4b] text-white px-5 sm:px-6 py-3.5 flex items-center justify-between border-b border-[#0f4f3e] print:hidden">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center border border-emerald-500/30 shrink-0">
              <Printer className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-sm block leading-tight">
                {t('Bản in Báo cáo Thẩm định Doanh nghiệp', 'Executive Printable Report Preview')}
              </span>
              <span className="text-[11px] text-emerald-200 font-mono hidden sm:inline">
                DOC-ETS-{selectedFacility?.id || 'MAN'}-{state.assessment_date.replace(/-/g, '')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{t('In / Lưu PDF', 'Print / Save PDF')}</span>
              <kbd className="hidden sm:inline-block px-1 py-0.2 text-[9px] bg-emerald-800 text-emerald-100 rounded font-mono font-normal">Ctrl+P</kbd>
            </button>
            
            <button
              type="button"
              onClick={() => setIsPrintModalOpen(false)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#0f4f3e] hover:bg-[#0a382c] text-emerald-100 hover:text-white text-xs font-semibold border border-[#0d4435] transition-colors cursor-pointer"
              title={t('Đóng bản xem trước (Esc)', 'Close Preview (Esc)')}
            >
              <X className="w-4 h-4" />
              <span>{t('Đóng', 'Close')}</span>
              <kbd className="hidden sm:inline-block px-1 py-0.2 text-[9px] bg-[#0c3d30] text-emerald-200 rounded font-mono font-normal">Esc</kbd>
            </button>
          </div>
        </div>

        {/* Printable Paper Content (Scrollable inside modal, 100% visible on print) */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-6 text-slate-900 print:p-0 print:overflow-visible">
          
          {/* Official Letterhead */}
          <div className="border-b-2 border-[#145f4b] pb-4 flex items-start justify-between">
            <div>
              <div className="text-[11px] font-extrabold uppercase tracking-widest text-slate-500">
                VIETNAM EMISSION TRADING SCHEME (ETS) SIMULATOR
              </div>
              <h1 className="text-2xl font-black tracking-tight text-slate-900 mt-1">
                {t('BÁO CÁO THẨM ĐỊNH HẠN NGẠCH & VỊ THẾ TUÂN THỦ ETS', 'ETS QUOTA & COMPLIANCE ASSESSMENT REPORT')}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                {t('Căn cứ Nghị định 06/2022/NĐ-CP (sửa đổi theo VBHN 48) và Quyết định 699/QĐ-BNNMT', 'Pursuant to Decree 06/2022/ND-CP (amended per Decree 48) and Decision 699/QD-BNNMT')}
              </p>
            </div>

            <div className="text-right text-xs">
              <div className="font-bold font-mono">DOC-ETS-{selectedFacility?.id || 'MAN'}-{state.assessment_date.replace(/-/g, '')}</div>
              <div className="text-slate-500">{t('Ngày lập:', 'Date:')} {state.assessment_date}</div>
              <div className="text-emerald-700 font-bold">{t('Bản Thẩm định Kỹ thuật', 'Technical Assessment')}</div>
            </div>
          </div>

          {/* Section 1: Facility Profile */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-1">
              {t('I. THÔNG TIN NHẬN DIỆN CƠ SỞ PHÁT THẢI', 'I. FACILITY IDENTIFICATION & REGISTRY DATA')}
            </h3>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-500 block">{t('Tên cơ sở / Doanh nghiệp:', 'Facility / Company Name:')}</span>
                <span className="font-bold text-sm text-slate-900">
                  {selectedFacility?.name || state.manual_facility_name || t('Cơ sở tự do', 'Manual Facility')}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">{t('Mã số thuế & Mã cơ sở:', 'Tax ID & Facility Code:')}</span>
                <span className="font-bold text-sm font-mono text-slate-900">
                  {selectedFacility?.tax_id || state.manual_tax_id || 'N/A'} [{selectedFacility?.id || 'MANUAL'}]
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">{t('Lĩnh vực sản xuất & Đơn vị sản phẩm:', 'Sector & Product Unit:')}</span>
                <span className="font-semibold text-slate-800">
                  {language === 'vi' ? (selectedFacility?.sector_vi || state.sector) : (selectedFacility?.sector || state.sector)} ({selectedFacility?.product_unit || 'N/A'})
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">{t('Địa chỉ hoạt động:', 'Operational Address:')}</span>
                <span className="text-slate-700">{selectedFacility?.address || t('Khai báo theo thực tế', 'Self-declared')}</span>
              </div>
            </div>
          </div>

          {/* Section 2: Assessment Findings */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-1">
              {t('II. KẾT QUẢ THẨM ĐỊNH NGHĨA VỤ PHÁP LÝ (LEGAL ASSESSMENT)', 'II. STATUTORY COMPLIANCE ASSESSMENT FINDINGS')}
            </h3>
            
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="border border-slate-200 rounded-lg p-3 bg-slate-50">
                <div className="text-slate-500 font-bold mb-1">{t('1. Nghĩa vụ Kiểm kê Khí nhà kính (Điều 6):', '1. GHG Inventory Obligation (Article 6):')}</div>
                <div className="font-bold text-slate-900">
                  {language === 'vi' ? inventoryResult.statusLabelVi : inventoryResult.statusLabelEn}
                </div>
                <div className="text-[11px] text-slate-600 mt-1">
                  {t('Danh mục áp dụng:', 'Applicable List:')} {language === 'vi' ? inventoryResult.applicableList : inventoryResult.applicableListEn}
                </div>
              </div>

              <div className="border border-slate-200 rounded-lg p-3 bg-slate-50">
                <div className="text-slate-500 font-bold mb-1">{t('2. Nghĩa vụ Hạn ngạch ETS Thí điểm (Điều 12, QĐ 699):', '2. Pilot ETS Quota Scope (Article 12, Dec 699):')}</div>
                <div className="font-bold text-slate-900">
                  {selectedFacility 
                    ? t('THUỘC DIỆN PHÂN BỔ HẠN NGẠCH (QĐ 699)', 'OFFICIAL QUOTA ALLOCATION (DEC 699)') 
                    : t('CHƯA CÓ TRONG DANH SÁCH PHÂN BỔ HIỆN HÀNH', 'NOT LISTED IN CURRENT QUOTA ALLOCATION')}
                </div>
                <div className="text-[11px] text-slate-600 mt-1 font-mono">
                  {selectedFacility ? `2025: ${selectedFacility.allocation_2025.toLocaleString()} tCO2e | 2026: ${selectedFacility.allocation_2026.toLocaleString()} tCO2e` : t('Không áp dụng', 'Not applicable')}
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Surrender Balance Sheet */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-1">
              {t('III. BẢNG CÂN ĐỐI NGHĨA VỤ NỘP BÙ HẠN NGẠCH GIAI ĐOẠN 2025–2026 (ARTICLE 19)', 'III. 2025–2026 SURRENDER BALANCE SHEET (ARTICLE 19)')}
            </h3>

            <table className="w-full text-xs border border-slate-300">
              <thead className="bg-slate-100 border-b border-slate-300 font-bold text-slate-700">
                <tr>
                  <th className="p-2 text-left">{t('Chỉ tiêu thẩm định', 'Assessment Metric')}</th>
                  <th className="p-2 text-center w-32">{t('Căn cứ pháp lý', 'Legal Authority')}</th>
                  <th className="p-2 text-right w-40">{t('Khối lượng (tCO2e)', 'Quantity (tCO2e)')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-2">{t('1. Tổng hạn ngạch được phân bổ chính thức (2025 + 2026)', '1. Total Official Allocated Allowances (2025 + 2026)')}</td>
                  <td className="p-2 text-center text-slate-500">{t('QĐ 699/QĐ-BNNMT', 'Dec 699/QD-BNNMT')}</td>
                  <td className="p-2 text-right font-mono font-bold">{complianceResult.phaseAllocationTotal.toLocaleString()}</td>
                </tr>
                <tr>
                  <td className="p-2">{t('2. Giao dịch mua / bán hạn ngạch ròng', '2. Net Allowance Trades (+Buy / -Sell)')}</td>
                  <td className="p-2 text-center text-slate-500">{t('Sàn giao dịch KNK', 'Carbon Exchange')}</td>
                  <td className="p-2 text-right font-mono">{(complianceResult.netAllowanceTrades || 0) > 0 ? '+' : ''}{complianceResult.netAllowanceTrades.toLocaleString()}</td>
                </tr>
                <tr>
                  <td className="p-2">{t('3. Hạn ngạch vay mượn từ kỳ sau (Đủ điều kiện, trần 15%)', '3. Borrowed Allowances from Next Phase (Eligible, 15% Cap)')}</td>
                  <td className="p-2 text-center text-slate-500">{t('Điều 19.6 VBHN 48', 'Art 19.6 Decree 48')}</td>
                  <td className="p-2 text-right font-mono">+{complianceResult.eligibleBorrowed.toLocaleString()}</td>
                </tr>
                <tr className="bg-slate-50 font-bold">
                  <td className="p-2">{t('TỔNG HẠN NGẠCH KHẢ DỤNG (A + Trades + Borrowed)', 'TOTAL AVAILABLE ALLOWANCES (Allocated + Trades + Borrowed)')}</td>
                  <td className="p-2 text-center text-slate-500">—</td>
                  <td className="p-2 text-right font-mono text-blue-700">{complianceResult.availableAllowances.toLocaleString()}</td>
                </tr>
                <tr>
                  <td className="p-2">{t('4. Phát thải trực tiếp thực tế được thẩm định (2025 + 2026)', '4. Total Verified Direct Compliance Emissions (2025 + 2026)')}</td>
                  <td className="p-2 text-center text-slate-500">{t('Điều 19.5 VBHN 48', 'Art 19.5 Decree 48')}</td>
                  <td className="p-2 text-right font-mono">{complianceResult.directEmisTotal?.toLocaleString() || '—'}</td>
                </tr>
                <tr>
                  <td className="p-2">{t('5. Tín chỉ carbon sử dụng để bù trừ (Đủ điều kiện, trần 30%)', '5. Eligible Carbon Credits for Offset (Max 30% Cap)')}</td>
                  <td className="p-2 text-center text-slate-500">{t('Điều 19.8 VBHN 48', 'Art 19.8 Decree 48')}</td>
                  <td className="p-2 text-right font-mono text-emerald-700">-{complianceResult.eligibleCredits.toLocaleString()}</td>
                </tr>
                <tr className="bg-slate-50 font-bold">
                  <td className="p-2">{t('NGHĨA VỤ NỘP BÙ THỰC TẾ (Direct Emissions - Credits)', 'REQUIRED SURRENDER (Direct Emissions - Credits)')}</td>
                  <td className="p-2 text-center text-slate-500">—</td>
                  <td className="p-2 text-right font-mono">{complianceResult.requiredSurrender?.toLocaleString() || '—'}</td>
                </tr>
                <tr className="bg-slate-900 text-white font-extrabold text-sm">
                  <td className="p-2.5">
                    {t('VỊ THẾ TUÂN THỦ (COMPLIANCE GAP):', 'COMPLIANCE GAP:')} {complianceResult.status === 'SURPLUS' ? t('DƯ THỪA (SURPLUS)', 'SURPLUS') : complianceResult.status === 'DEFICIT' ? t('THÂM HỤT (DEFICIT)', 'DEFICIT') : complianceResult.status}
                  </td>
                  <td className="p-2.5 text-center text-xs font-normal text-slate-300">{t('Trước 31/12/2027', 'By Dec 31, 2027')}</td>
                  <td className="p-2.5 text-right font-mono">
                    {complianceResult.complianceGap !== null ? `${complianceResult.complianceGap >= 0 ? '+' : ''}${complianceResult.complianceGap.toLocaleString()} tCO2e` : '—'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Section 4: Sign-off & Audit Seal */}
          <div className="pt-4 border-t border-slate-200 grid grid-cols-2 gap-8 text-xs">
            <div>
              <div className="font-bold text-slate-700 mb-1">{t('XÁC NHẬN CỦA HỆ THỐNG SIMULATOR', 'SIMULATOR SYSTEM AUDIT ATTESTATION')}</div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                {t(
                  'Bản báo cáo này được tạo tự động từ động cơ tính toán Vietnam ETS Simulator. Mô hình kiểm toán tuân thủ độ chính xác logic Excel và quy chuẩn pháp lý hiện hành của Việt Nam.',
                  'This dossier is automatically generated by the Vietnam ETS Simulator engine. The audit model strictly conforms to Excel computational logic and prevailing Vietnamese statutory regulations.'
                )}
              </p>
              <div className="mt-2 text-[10px] text-slate-400 font-mono">
                {t('Mức độ sẵn sàng dữ liệu:', 'Data Readiness Score:')} {dataQualityReport.overallScorePercent}% {t('(Đạt tiêu chuẩn đánh giá)', '(Meets Audit Standard)')}
              </div>
            </div>

            <div className="text-center space-y-12">
              <div className="font-bold text-slate-800">
                {t('ĐẠI DIỆN CƠ SỞ / BỘ PHẬN PHÂN TÍCH', 'FACILITY REPRESENTATIVE / ANALYST')}
                <span className="block font-normal text-[10px] text-slate-400">{t('(Ký và ghi rõ họ tên)', '(Signature & Full Name)')}</span>
              </div>
              <div className="font-bold text-slate-900">
                {selectedFacility?.representative || t('Ban Quản trị ETS', 'ETS Administration')}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Screen Action Footer (hidden in print) */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3.5 flex items-center justify-between shrink-0 print:hidden">
          <span className="text-xs text-slate-500 hidden sm:inline">
            {t('Nhấn phím Esc hoặc click vùng tối bên ngoài để đóng xem trước', 'Press Esc or click outside to close')}
          </span>
          <div className="flex items-center gap-2.5 ml-auto">
            <button
              type="button"
              onClick={() => setIsPrintModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
            >
              {t('Đóng bản xem trước (Esc)', 'Close Preview (Esc)')}
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{t('In / Lưu PDF', 'Print / Save PDF')}</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
