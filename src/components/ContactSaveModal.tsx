import { useEffect, useMemo, useState } from 'react';
import {
  Check,
  ChevronRight,
  Copy,
  Download,
  FileText,
  Smartphone,
  X,
} from 'lucide-react';
import { CONTACT_PROFILES, type ContactProfile } from '../data/cardData';
import { buildVCardString, downloadVCard } from '../utils/vcard';

interface ContactSaveModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProfileId?: 'clinic' | 'company' | null;
}

export function ContactSaveModal({
  isOpen,
  onClose,
  initialProfileId = null,
}: ContactSaveModalProps) {
  const [selectedId, setSelectedId] = useState<'clinic' | 'company' | null>(
    initialProfileId,
  );
  const [savedNotice, setSavedNotice] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [showRawVcf, setShowRawVcf] = useState(false);
  const [includeOfficeTel, setIncludeOfficeTel] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setSelectedId(initialProfileId);
      setSavedNotice(false);
      setShowRawVcf(false);
      setIncludeOfficeTel(true);
    }
  }, [isOpen, initialProfileId]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const activeProfile: ContactProfile | null = selectedId
    ? CONTACT_PROFILES[selectedId]
    : null;

  const vcfPreview = useMemo(
    () =>
      activeProfile
        ? buildVCardString(activeProfile, { includeOfficeTel })
        : '',
    [activeProfile, includeOfficeTel],
  );

  if (!isOpen) return null;

  const handleConfirmSave = () => {
    if (!activeProfile) return;
    downloadVCard(activeProfile, { includeOfficeTel });
    setSavedNotice(true);
  };

  const handleCopy = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      window.setTimeout(() => setCopiedKey(null), 1800);
    } catch {
      // Fallback ignored if clipboard permissions unavailable
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#1c1613]/60 backdrop-blur-xs sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-save-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-h-[92dvh] overflow-y-auto rounded-t-3xl bg-[#F8F6F2] text-[#292420] shadow-2xl sm:max-w-lg sm:rounded-3xl border border-[#755A50]/15">
        {/* Mobile sheet drag handle */}
        <div className="pt-3 pb-1 sm:hidden" aria-hidden="true">
          <div className="mx-auto h-1.5 w-10 rounded-full bg-[#755A50]/25" />
        </div>

        {/* Sheet Header */}
        <div className="flex items-center justify-between gap-4 border-b border-[#755A50]/15 px-5 py-4 sm:px-6">
          <div>
            <h2
              id="contact-save-title"
              className="text-lg font-bold tracking-tight text-[#292420]"
            >
              연락처 저장
            </h2>
            <p className="mt-0.5 text-xs text-[#6B5B53]">
              개인 휴대전화(010-5686-3735)와 소속 정보가 주소록에 저장됩니다
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl text-[#6B5B53] transition-colors hover:bg-[#755A50]/10 hover:text-[#292420] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#755A50]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-5 px-5 py-5 pb-safe sm:px-6 sm:pb-6">
          {/* Step 1: Select Contact Type */}
          <div className="space-y-2.5">
            <p className="text-xs font-semibold text-[#755A50]">
              1. 연락처 선택
            </p>
            <div className="grid grid-cols-1 gap-2.5">
              {(['clinic', 'company'] as const).map((id) => {
                const profile = CONTACT_PROFILES[id];
                const isSelected = selectedId === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setSelectedId(id);
                      setSavedNotice(false);
                    }}
                    className={`flex min-h-[64px] w-full items-center justify-between gap-3 rounded-2xl border px-4 py-3.5 text-left transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#755A50] ${
                      isSelected
                        ? 'border-[#342C29] bg-[#342C29] text-[#F8F6F2] shadow-sm'
                        : 'border-[#755A50]/20 bg-white text-[#292420] hover:border-[#755A50]/45'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="text-[15px] font-bold leading-snug">
                        {profile.label}
                      </div>
                      <div
                        className={`mt-0.5 text-xs tabular-nums ${
                          isSelected ? 'text-[#E0BEA8]' : 'text-[#6B5B53]'
                        }`}
                      >
                        개인번호 {profile.mobile} · {profile.organization}
                      </div>
                    </div>
                    <div
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                        isSelected
                          ? 'bg-[#E0BEA8] text-[#292420]'
                          : 'bg-[#F2EDE4] text-[#755A50]'
                      }`}
                    >
                      {isSelected ? (
                        <Check className="h-4 w-4 stroke-[2.5]" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Final Confirmation Preview */}
          {activeProfile ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-[#755A50]">
                  2. 저장 내용 최종 확인
                </p>
                <button
                  type="button"
                  onClick={() => setShowRawVcf((prev) => !prev)}
                  className="inline-flex min-h-[36px] items-center gap-1 rounded-lg px-2 text-xs font-medium text-[#755A50] transition-colors hover:bg-[#755A50]/10"
                >
                  <FileText className="h-3.5 w-3.5" />
                  {showRawVcf ? '미리보기 닫기' : 'vCard 원본 확인'}
                </button>
              </div>

              <div className="divide-y divide-[#755A50]/12 rounded-2xl border border-[#755A50]/18 bg-white">
                {[
                  { key: 'name', label: '이름', value: activeProfile.name },
                  {
                    key: 'mobile',
                    label: '개인 휴대전화',
                    value: activeProfile.mobile,
                    copyable: true,
                    tabular: true,
                    highlight: true,
                  },
                  {
                    key: 'org',
                    label: '소속 · 직함',
                    value: `${activeProfile.organization} · ${activeProfile.title}`,
                  },
                  ...(includeOfficeTel
                    ? [
                        {
                          key: 'tel',
                          label: '대표전화(직장)',
                          value: activeProfile.tel,
                          copyable: true,
                          tabular: true,
                        },
                      ]
                    : []),
                  {
                    key: 'email',
                    label: '이메일',
                    value: activeProfile.email,
                    copyable: true,
                  },
                  {
                    key: 'address',
                    label: '주소',
                    value: activeProfile.address,
                    copyable: true,
                  },
                  {
                    key: 'url',
                    label: '홈페이지',
                    value: activeProfile.url,
                  },
                ].map((row) => (
                  <div
                    key={row.key}
                    className={`flex items-start justify-between gap-3 px-4 py-2.5 text-sm ${
                      row.highlight ? 'bg-[#FAF7F2]' : ''
                    }`}
                  >
                    <span className="w-24 shrink-0 pt-0.5 text-xs font-medium text-[#755A50]">
                      {row.label}
                    </span>
                    <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
                      <span
                        className={`break-all ${
                          row.highlight
                            ? 'font-bold text-[#292420]'
                            : 'font-medium text-[#292420]'
                        } ${row.tabular ? 'tabular-nums' : ''}`}
                      >
                        {row.value}
                      </span>
                      {row.copyable && (
                        <button
                          type="button"
                          onClick={() => handleCopy(row.key, row.value)}
                          aria-label={`${row.label} 복사`}
                          className="flex min-h-[36px] min-w-[36px] shrink-0 items-center justify-center rounded-lg text-[#755A50] transition-colors hover:bg-[#F2EDE4]"
                        >
                          {copiedKey === row.key ? (
                            <Check className="h-4 w-4 text-[#5A7550]" />
                          ) : (
                            <Copy className="h-3.5 w-3.5" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <label className="flex min-h-[44px] cursor-pointer items-center gap-2.5 rounded-xl border border-[#755A50]/15 bg-white px-3.5 py-2 text-xs font-medium text-[#463B35]">
                <input
                  type="checkbox"
                  checked={includeOfficeTel}
                  onChange={(e) => {
                    setIncludeOfficeTel(e.target.checked);
                    setSavedNotice(false);
                  }}
                  className="h-4 w-4 accent-[#342C29]"
                />
                <span>
                  대표전화({activeProfile.tel})도 함께 저장하기 (기본 저장 번호는
                  개인 휴대전화 {activeProfile.mobile})
                </span>
              </label>

              {showRawVcf && (
                <pre className="max-h-40 overflow-auto rounded-xl bg-[#292420] p-3 text-[11px] leading-relaxed text-[#E0BEA8]">
                  {vcfPreview}
                </pre>
              )}

              {/* Final Confirmation CTA */}
              <button
                type="button"
                onClick={handleConfirmSave}
                className="flex min-h-[54px] w-full items-center justify-center gap-2 rounded-2xl bg-[#342C29] px-5 py-3.5 text-base font-bold text-[#FFFFFF] shadow-md transition-transform active:scale-[0.98] hover:bg-[#292420] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#755A50]"
              >
                <Download className="h-5 w-5 text-[#E0BEA8]" />
                <span>주소록에 저장하기 (.vcf)</span>
              </button>

              {savedNotice && (
                <div
                  role="status"
                  className="rounded-2xl border border-[#755A50]/25 bg-[#F2EDE4] px-4 py-3 text-xs leading-relaxed text-[#292420]"
                >
                  <p className="font-bold text-[#342C29]">
                    연락처 파일(.vcf)이 준비되었습니다.
                  </p>
                  <p className="mt-1 text-[#5A4D46]">
                    휴대폰 화면에 열리는 연락처 창에서 <strong>‘저장’</strong>{' '}
                    또는 <strong>‘연락처에 추가’</strong>를 눌러 완료해 주세요.
                  </p>
                </div>
              )}

              {/* iPhone & Android OS guide */}
              <div className="rounded-2xl bg-[#F2EDE4]/85 px-4 py-3 text-xs leading-relaxed text-[#5A4D46]">
                <div className="flex items-center gap-1.5 font-semibold text-[#342C29]">
                  <Smartphone className="h-3.5 w-3.5 text-[#755A50]" />
                  <span>아이폰 · 갤럭시 저장 방법</span>
                </div>
                <ul className="mt-1.5 space-y-1">
                  <li>
                    · <strong>아이폰(Safari)</strong>: 열린 연락처 화면 오른쪽
                    위 <strong>‘저장’</strong> 또는 하단{' '}
                    <strong>‘새로운 연락처 생성’</strong> 선택
                  </li>
                  <li>
                    · <strong>갤럭시·안드로이드</strong>: 상단 다운로드 완료
                    알림 또는 내 파일에서 <strong>.vcf 파일</strong>을 눌러
                    연락처 앱에 저장
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-[#755A50]/30 bg-white/60 px-4 py-6 text-center text-sm text-[#6B5B53]">
              위에서 저장하실 연락처(한의원 대표원장 또는 주식회사 경희동행
              CEO)를 선택하시면, 상세 정보를 확인한 뒤 주소록에 저장할 수
              있습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
