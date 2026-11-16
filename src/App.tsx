import { useState } from 'react';
import {
  ArrowUpRight,
  CalendarCheck,
  Check,
  ChevronRight,
  ClipboardCheck,
  Coffee,
  ExternalLink,
  Home,
  MapPin,
  MessageSquare,
  Phone,
  Play,
  Share2,
  UserPlus,
} from 'lucide-react';
import { ContactSaveModal } from './components/ContactSaveModal';
import {
  ACTION_LINKS,
  BRANCHES,
  CLINIC_HOURS,
  COMMON_PERSON,
  CONTACT_PROFILES,
  DIRECTOR_HOURS,
} from './data/cardData';

export default function App() {
  const [activeTab, setActiveTab] = useState<'clinic' | 'company'>('clinic');
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [initialContactId, setInitialContactId] = useState<
    'clinic' | 'company' | null
  >(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [logoFailed, setLogoFailed] = useState(false);
  const [mapFailed, setMapFailed] = useState(false);

  const showToast = (message: string) => {
    setToastMessage(message);
    window.setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 2600);
  };

  const openContactModal = (
    preset: 'clinic' | 'company' | null = activeTab,
  ) => {
    setInitialContactId(preset);
    setContactModalOpen(true);
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: '박상용 디지털 명함 · 경희동행',
          text: '경희동행한의원 대표원장 · 주식회사 경희동행 CEO 박상용 디지털 명함입니다.',
          url: shareUrl,
        });
        return;
      } catch {
        // User cancelled or share failed; fall back to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      showToast('명함 웹페이지 주소가 복사되었습니다.');
    } catch {
      showToast('브라우저 주소창의 링크를 복사해 공유해 주세요.');
    }
  };

  const renderLinkBadge = (id: string) => {
    switch (id) {
      case 'clinic-home':
        return (
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#342C29] text-white">
            <Home className="h-5 w-5" />
          </span>
        );
      case 'naver-booking':
        return (
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#03C75A] text-lg font-extrabold text-white">
            N
          </span>
        );
      case 'charoitda-home':
        return (
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#755A50] text-white">
            <Coffee className="h-5 w-5" />
          </span>
        );
      case 'youtube-channel':
        return (
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#D9B694] text-[#292420]">
            <Play className="h-5 w-5 fill-current" />
          </span>
        );
      default:
        return (
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#755A50] text-white">
            <ArrowUpRight className="h-5 w-5" />
          </span>
        );
    }
  };

  return (
    <div id="top" className="min-h-dvh bg-[#F5F1EA] text-[#292420]">
      <div className="mx-auto max-w-5xl lg:px-6 lg:py-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start lg:gap-8">
          {/* LEFT / MOBILE TOP COLUMN: Curved Espresso Hero + Segmented Switch + Profile Details */}
          <div className="space-y-5 lg:col-span-5">
            {/* Curved Dark Espresso Header Card */}
            <section
              aria-labelledby="hero-name"
              className="rounded-b-[2rem] bg-[#342C29] px-5 pt-7 pb-6 text-center text-white shadow-sm lg:rounded-[2rem] lg:px-7"
            >
              {/* Circular Emblem Avatar */}
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#D9B694] bg-[#F8F6F2] shadow-xs">
                {!logoFailed ? (
                  <img
                    src="/assets/khdh_logo_mark.png"
                    alt="경희동행 심볼 로고"
                    referrerPolicy="no-referrer"
                    onError={() => setLogoFailed(true)}
                    className="h-12 w-12 object-contain"
                  />
                ) : (
                  <span className="text-2xl font-bold text-[#342C29]">경</span>
                )}
              </div>

              {/* Brand & Name */}
              <p className="mt-3 text-[11px] font-semibold tracking-[0.18em] text-[#D9B694]">
                {COMMON_PERSON.englishBrand}
              </p>
              <h1
                id="hero-name"
                className="mt-1 text-[28px] font-bold tracking-[0.14em] text-white sm:text-3xl"
              >
                박 상 용
              </h1>
              <div className="mt-2 space-y-0.5 text-sm font-medium text-[#E8DDD3]">
                <p>경희동행한의원 대표원장</p>
                <p>주식회사 경희동행 CEO</p>
              </div>

              {/* 4 Quick Touch Tiles: 전화 · 문자 · 체질검사 · 공유 */}
              <div className="mt-5 grid grid-cols-4 gap-2.5">
                <a
                  href={`tel:${COMMON_PERSON.mobile}`}
                  className="flex min-h-[60px] flex-col items-center justify-center gap-1 rounded-2xl bg-white/10 px-2 py-2.5 text-white transition-colors hover:bg-white/18 active:scale-[0.98]"
                >
                  <Phone className="h-[18px] w-[18px] text-[#E0BEA8]" />
                  <span className="text-[11px] font-medium text-[#F5EFE9]">
                    전화
                  </span>
                </a>
                <a
                  href={`sms:${COMMON_PERSON.mobile}`}
                  className="flex min-h-[60px] flex-col items-center justify-center gap-1 rounded-2xl bg-white/10 px-2 py-2.5 text-white transition-colors hover:bg-white/18 active:scale-[0.98]"
                >
                  <MessageSquare className="h-[18px] w-[18px] text-[#E0BEA8]" />
                  <span className="text-[11px] font-medium text-[#F5EFE9]">
                    문자
                  </span>
                </a>
                <a
                  href={COMMON_PERSON.constitutionTestUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[60px] flex-col items-center justify-center gap-1 rounded-2xl bg-white/10 px-2 py-2.5 text-white transition-colors hover:bg-white/18 active:scale-[0.98]"
                >
                  <ClipboardCheck className="h-[18px] w-[18px] text-[#E0BEA8]" />
                  <span className="whitespace-nowrap text-[11px] font-medium text-[#F5EFE9]">
                    체질검사
                  </span>
                </a>
                <button
                  type="button"
                  onClick={handleShare}
                  className="flex min-h-[60px] flex-col items-center justify-center gap-1 rounded-2xl bg-white/10 px-2 py-2.5 text-white transition-colors hover:bg-white/18 active:scale-[0.98]"
                >
                  <Share2 className="h-[18px] w-[18px] text-[#E0BEA8]" />
                  <span className="text-[11px] font-medium text-[#F5EFE9]">
                    공유
                  </span>
                </button>
              </div>

              {/* Primary CTA: 연락처 저장하기 */}
              <button
                type="button"
                onClick={() => openContactModal(activeTab)}
                className="mt-4 flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-[#D9B694] px-5 py-3 text-[15px] font-bold text-[#292420] shadow-xs transition-all hover:bg-[#e3c3a4] active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F8F6F2]"
              >
                <UserPlus className="h-4.5 w-4.5" />
                <span>연락처 저장하기</span>
              </button>
            </section>

            {/* Segmented Tab Bar + Active Tab Cards */}
            <div className="space-y-4 px-4 lg:px-0">
              <div
                role="tablist"
                aria-label="소속 정보 전환"
                className="grid grid-cols-2 rounded-2xl bg-[#EAE3D8] p-1"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'clinic'}
                  onClick={() => setActiveTab('clinic')}
                  className={`min-h-[44px] rounded-xl px-3 py-2 text-sm transition-all ${
                    activeTab === 'clinic'
                      ? 'bg-white font-bold text-[#292420] shadow-xs'
                      : 'font-semibold text-[#75665C] hover:text-[#292420]'
                  }`}
                >
                  한의원 · 진료
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'company'}
                  onClick={() => setActiveTab('company')}
                  className={`min-h-[44px] rounded-xl px-3 py-2 text-sm transition-all ${
                    activeTab === 'company'
                      ? 'bg-white font-bold text-[#292420] shadow-xs'
                      : 'font-semibold text-[#75665C] hover:text-[#292420]'
                  }`}
                >
                  회사 · 경영
                </button>
              </div>

              {activeTab === 'clinic' ? (
                <div role="tabpanel" className="space-y-4">
                  {/* CLINIC CARD (Address, Office Tel, Email — no personal number) */}
                  <section className="rounded-3xl bg-white p-5 shadow-xs sm:p-6">
                    <p className="text-[11px] font-bold tracking-[0.14em] text-[#8C6B54]">
                      CLINIC
                    </p>
                    <h2 className="mt-1 text-xl font-bold text-[#292420]">
                      경희동행한의원
                    </h2>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#5A4D46]">
                      박상용 대표원장 진료. 예약 후 방문하시면 보다 원활하게
                      진료받으실 수 있습니다.
                    </p>

                    <dl className="mt-4 divide-y divide-[#755A50]/12 border-t border-[#755A50]/12 text-sm">
                      <div className="flex items-start justify-between gap-4 py-2.5">
                        <dt className="shrink-0 text-xs font-medium text-[#755A50]">
                          주소
                        </dt>
                        <dd className="text-right text-[13px] font-medium leading-snug text-[#292420]">
                          {CONTACT_PROFILES.clinic.address}
                        </dd>
                      </div>
                      <div className="flex items-center justify-between gap-3 py-2.5">
                        <dt className="shrink-0 text-xs font-medium text-[#755A50]">
                          대표전화
                        </dt>
                        <dd className="tabular-nums font-bold text-[#292420]">
                          <a
                            href={`tel:${CONTACT_PROFILES.clinic.tel}`}
                            className="hover:underline"
                          >
                            {CONTACT_PROFILES.clinic.tel}
                          </a>
                        </dd>
                      </div>
                      <div className="flex items-center justify-between gap-3 py-2.5">
                        <dt className="shrink-0 text-xs font-medium text-[#755A50]">
                          이메일
                        </dt>
                        <dd className="font-medium text-[#292420]">
                          <a
                            href={`mailto:${CONTACT_PROFILES.clinic.email}`}
                            className="hover:underline"
                          >
                            {CONTACT_PROFILES.clinic.email}
                          </a>
                        </dd>
                      </div>
                    </dl>

                    <div className="mt-4 grid grid-cols-2 gap-2.5">
                      <a
                        href="https://hani.care/5zKGjTywXk"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex min-h-[48px] items-center justify-center gap-1.5 rounded-xl bg-[#342C29] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#292420]"
                      >
                        <CalendarCheck className="h-4 w-4 text-[#D9B694]" />
                        <span>진료 예약</span>
                      </a>
                      <a
                        href={`tel:${CONTACT_PROFILES.clinic.tel}`}
                        className="flex min-h-[48px] items-center justify-center gap-1.5 rounded-xl bg-[#EFEAE1] px-4 py-2.5 text-sm font-bold text-[#292420] transition-colors hover:bg-[#e5ddd1]"
                      >
                        <Phone className="h-4 w-4 text-[#755A50]" />
                        <span>전화 걸기</span>
                      </a>
                    </div>
                  </section>

                  {/* HOURS CARD */}
                  <section
                    id="hours"
                    className="rounded-3xl bg-white p-5 shadow-xs sm:p-6"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[11px] font-bold tracking-[0.14em] text-[#8C6B54]">
                        HOURS
                      </p>
                      <span className="text-xs font-bold text-[#755A50]">
                        연중무휴 · 365일 진료
                      </span>
                    </div>
                    <h2 className="mt-1 text-sm font-bold text-[#292420]">
                      한의원 전체 진료시간
                    </h2>
                    <dl className="mt-2 divide-y divide-[#755A50]/12">
                      {CLINIC_HOURS.map((row) => (
                        <div
                          key={row.label}
                          className="flex items-center justify-between py-2 text-sm"
                        >
                          <dt className="text-[#5A4D46]">{row.label}</dt>
                          <dd className="tabular-nums font-bold text-[#292420]">
                            {row.time}
                          </dd>
                        </div>
                      ))}
                    </dl>

                    <div className="my-3 h-px bg-[#755A50]/15" />

                    <h3 className="text-sm font-bold text-[#292420]">
                      박상용 대표원장 진료시간
                    </h3>
                    <dl className="mt-2 divide-y divide-[#755A50]/12">
                      {DIRECTOR_HOURS.map((row) => (
                        <div
                          key={row.label}
                          className="flex items-center justify-between py-2 text-sm"
                        >
                          <dt className="text-[#5A4D46]">{row.label}</dt>
                          <dd className="tabular-nums font-bold text-[#292420]">
                            {row.time}
                          </dd>
                        </div>
                      ))}
                    </dl>

                    <p className="mt-3 rounded-xl bg-[#F5F1EA] px-3 py-2 text-center text-xs font-semibold text-[#5A4D46]">
                      진료 일정은 예약 전 확인해 주세요
                    </p>
                  </section>
                </div>
              ) : (
                <div role="tabpanel" className="space-y-4">
                  {/* COMPANY CARD (Address, Office Tel, Email — no personal number) */}
                  <section className="rounded-3xl bg-white p-5 shadow-xs sm:p-6">
                    <p className="text-[11px] font-bold tracking-[0.14em] text-[#8C6B54]">
                      COMPANY
                    </p>
                    <h2 className="mt-1 text-xl font-bold text-[#292420]">
                      주식회사 경희동행
                    </h2>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#5A4D46]">
                      경희동행 브랜드와 차로잇다 등 건강한 동행을 이어가는
                      주식회사 경희동행입니다.
                    </p>

                    <dl className="mt-4 divide-y divide-[#755A50]/12 border-t border-[#755A50]/12 text-sm">
                      <div className="flex items-start justify-between gap-4 py-2.5">
                        <dt className="shrink-0 text-xs font-medium text-[#755A50]">
                          주소
                        </dt>
                        <dd className="text-right text-[13px] font-medium leading-snug text-[#292420]">
                          {CONTACT_PROFILES.company.address}
                        </dd>
                      </div>
                      <div className="flex items-center justify-between gap-3 py-2.5">
                        <dt className="shrink-0 text-xs font-medium text-[#755A50]">
                          대표전화
                        </dt>
                        <dd className="tabular-nums font-bold text-[#292420]">
                          <a
                            href={`tel:${CONTACT_PROFILES.company.tel}`}
                            className="hover:underline"
                          >
                            {CONTACT_PROFILES.company.tel}
                          </a>
                        </dd>
                      </div>
                      <div className="flex items-center justify-between gap-3 py-2.5">
                        <dt className="shrink-0 text-xs font-medium text-[#755A50]">
                          이메일
                        </dt>
                        <dd className="font-medium text-[#292420]">
                          <a
                            href={`mailto:${CONTACT_PROFILES.company.email}`}
                            className="hover:underline"
                          >
                            {CONTACT_PROFILES.company.email}
                          </a>
                        </dd>
                      </div>
                    </dl>

                    <div className="mt-4 grid grid-cols-2 gap-2.5">
                      <a
                        href="http://charoitda.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex min-h-[48px] items-center justify-center gap-1.5 rounded-xl bg-[#342C29] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#292420]"
                      >
                        <Coffee className="h-4 w-4 text-[#D9B694]" />
                        <span>차로잇다</span>
                      </a>
                      <a
                        href={`tel:${CONTACT_PROFILES.company.tel}`}
                        className="flex min-h-[48px] items-center justify-center gap-1.5 rounded-xl bg-[#EFEAE1] px-4 py-2.5 text-sm font-bold text-[#292420] transition-colors hover:bg-[#e5ddd1]"
                      >
                        <Phone className="h-4 w-4 text-[#755A50]" />
                        <span>전화 걸기</span>
                      </a>
                    </div>
                  </section>

                  {/* BUSINESS INFO CARD */}
                  <section className="rounded-3xl bg-white p-5 shadow-xs sm:p-6">
                    <p className="text-[11px] font-bold tracking-[0.14em] text-[#8C6B54]">
                      INFO
                    </p>
                    <dl className="mt-2 divide-y divide-[#755A50]/12 text-sm">
                      <div className="flex items-center justify-between gap-3 py-2.5">
                        <dt className="text-[#5A4D46]">직함</dt>
                        <dd className="font-bold text-[#292420]">CEO</dd>
                      </div>
                      <div className="flex items-center justify-between gap-3 py-2.5">
                        <dt className="text-[#5A4D46]">차로잇다 홈페이지</dt>
                        <dd className="font-semibold text-[#292420]">
                          <a
                            href="http://charoitda.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                          >
                            charoitda.com
                          </a>
                        </dd>
                      </div>
                      <div className="flex items-center justify-between gap-3 py-2.5">
                        <dt className="text-[#5A4D46]">체질검사</dt>
                        <dd className="font-semibold text-[#292420]">
                          <a
                            href={COMMON_PERSON.constitutionTestUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                          >
                            바로가기
                          </a>
                        </dd>
                      </div>
                    </dl>
                  </section>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT / MOBILE LOWER COLUMN: 바로가기 + 지점 안내 (Interactive Naver Map) */}
          <div className="space-y-6 px-4 pb-10 lg:col-span-7 lg:px-0 lg:pb-0">
            {/* 바로가기: 5 Primary Destination Links */}
            <section aria-labelledby="quick-links-heading">
              <h2
                id="quick-links-heading"
                className="mb-3 px-1 text-base font-bold text-[#292420]"
              >
                바로가기
              </h2>
              <div className="space-y-2.5">
                {ACTION_LINKS.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex min-h-[68px] items-center justify-between gap-3 rounded-2xl bg-white px-4 py-3 shadow-xs transition-all hover:bg-[#FAF7F2] active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#755A50]"
                  >
                    <div className="flex min-w-0 items-center gap-3.5">
                      {renderLinkBadge(item.id)}
                      <div className="min-w-0">
                        <div className="truncate text-[15px] font-bold text-[#292420]">
                          {item.label}
                        </div>
                        <div className="truncate text-xs text-[#6B5B53]">
                          {item.sublabel}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 shrink-0 text-[#A19186] transition-transform group-hover:translate-x-0.5 group-hover:text-[#342C29]" />
                  </a>
                ))}
              </div>
            </section>

            {/* 지점 안내 + 클릭 가능한 서울 지도 일러스트 */}
            <section
              id="branches"
              className="rounded-3xl bg-[#342C29] p-5 text-[#F8F6F2] shadow-xs sm:p-6"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4.5 w-4.5 text-[#D9B694]" />
                  <h2 className="text-base font-bold text-white">
                    경희동행한의원 지점 안내
                  </h2>
                </div>
                <span className="text-xs font-medium text-[#D9B694]">
                  지점 클릭 시 네이버지도 이동
                </span>
              </div>

              <div className="mt-4 flex items-center justify-center">
                {!mapFailed ? (
                  <div className="relative aspect-[460/370] w-full max-w-[320px]">
                    <img
                      src="/assets/seoul_map_illustration.png"
                      alt="경희동행한의원 서울 지점 위치 일러스트 (수유점, 중랑점, 압구정점, 사당점)"
                      referrerPolicy="no-referrer"
                      onError={() => setMapFailed(true)}
                      className="h-full w-full object-contain"
                    />
                    {/* Interactive Naver Map Hotspots aligned to each branch dot & label */}
                    {BRANCHES.map((branch) => (
                      <a
                        key={branch.name}
                        href={branch.naverMapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`경희동행한의원 ${branch.name} 네이버 지도 플레이스 열기`}
                        title={`경희동행한의원 ${branch.name} 네이버 지도 보기`}
                        className={`absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-colors hover:bg-[#D9B694]/18 active:bg-[#D9B694]/28 focus-visible:outline-2 focus-visible:outline-[#D9B694] ${branch.hotspotClass}`}
                      >
                        <span className="sr-only">
                          {branch.name} 네이버 지도 보기
                        </span>
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="flex aspect-[460/370] w-full max-w-[320px] items-center justify-center rounded-2xl border border-white/15 text-sm text-[#D9B694]">
                    서울 지점 일러스트 (중랑 · 사당 · 수유 · 압구정)
                  </div>
                )}
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2.5 border-t border-white/12 pt-4">
                {BRANCHES.map((branch) => (
                  <a
                    key={branch.name}
                    href={branch.naverMapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex min-h-[48px] items-center justify-between gap-2 rounded-xl bg-white/8 px-3.5 py-2.5 transition-colors hover:bg-white/15 active:scale-[0.98]"
                  >
                    <div className="min-w-0">
                      <div className="text-sm font-bold text-white">
                        {branch.name}
                      </div>
                      <div className="text-[11px] text-[#D9B694]">
                        {branch.note}
                      </div>
                    </div>
                    <ExternalLink className="h-3.5 w-3.5 shrink-0 text-[#D9B694] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                ))}
              </div>

              <p className="mt-3.5 text-[11px] leading-relaxed text-[#E0BEA8]/85">
                지도 표시는 대략적인 지역 표현이며, 실제 길 안내나 상세 위치는
                각 지점을 눌러 네이버 지도에서 확인해 주세요.
              </p>
            </section>
          </div>
        </div>

        {/* Quiet Mobile-Style Footer Note */}
        <footer className="mt-2 pb-8 text-center text-xs text-[#8A7B70] lg:mt-10 lg:pb-2">
          <p>QR코드로 바로 여는 박상용 디지털 명함 · 경희동행</p>
        </footer>
      </div>

      {/* Toast Feedback */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-2xl bg-[#292420] px-4 py-3 text-xs font-semibold text-[#F8F6F2] shadow-lg"
        >
          <Check className="h-4 w-4 shrink-0 text-[#D9B694]" />
          <span className="whitespace-nowrap">{toastMessage}</span>
        </div>
      )}

      {/* Contact Save Modal / Bottom Sheet */}
      <ContactSaveModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        initialProfileId={initialContactId}
      />
    </div>
  );
}
