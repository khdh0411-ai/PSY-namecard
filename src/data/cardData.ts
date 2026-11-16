export interface ContactProfile {
  id: 'clinic' | 'company';
  label: string;
  shortLabel: string;
  organization: string;
  title: string;
  name: string;
  mobile: string;
  tel: string;
  email: string;
  address: string;
  url: string;
  fileName: string;
  theme: 'light' | 'dark';
}

export interface ActionLink {
  id: string;
  label: string;
  sublabel: string;
  href: string;
  category: 'clinic' | 'company' | 'media';
}

export const COMMON_PERSON = {
  name: '박상용',
  englishBrand: 'KYUNGHEE DONGHAENG',
  mobile: '010-5686-3735',
};

export const CONTACT_PROFILES: Record<'clinic' | 'company', ContactProfile> = {
  clinic: {
    id: 'clinic',
    label: '한의원 대표원장 연락처',
    shortLabel: '경희동행한의원',
    organization: '경희동행한의원',
    title: '대표원장',
    name: '박상용',
    mobile: '010-5686-3735',
    tel: '02-433-7579',
    email: 'khdh0411@naver.com',
    address: '서울특별시 중랑구 겸재로 237, 2층',
    url: 'http://khdhhani1.com',
    fileName: '박상용_경희동행한의원_대표원장.vcf',
    theme: 'light',
  },
  company: {
    id: 'company',
    label: '주식회사 경희동행 CEO 연락처',
    shortLabel: '주식회사 경희동행',
    organization: '주식회사 경희동행',
    title: 'CEO',
    name: '박상용',
    mobile: '010-5686-3735',
    tel: '070-7875-9040',
    email: 'corpkhdh@naver.com',
    address: '남양주시 순화궁로 418, 현대그리너리캠퍼스 1층-31호',
    url: 'http://charoitda.com',
    fileName: '박상용_주식회사경희동행_CEO.vcf',
    theme: 'dark',
  },
};

export const ACTION_LINKS: ActionLink[] = [
  {
    id: 'clinic-home',
    label: '한의원 홈페이지',
    sublabel: 'khdhhani1.com',
    href: 'http://khdhhani1.com',
    category: 'clinic',
  },
  {
    id: 'naver-booking',
    label: '네이버 예약하기',
    sublabel: 'hani.care/5zKGjTywXk',
    href: 'https://hani.care/5zKGjTywXk',
    category: 'clinic',
  },
  {
    id: 'charoitda-home',
    label: '차로잇다 홈페이지',
    sublabel: 'charoitda.com',
    href: 'http://charoitda.com',
    category: 'company',
  },
  {
    id: 'youtube-channel',
    label: '유튜브 양허인간',
    sublabel: 'youtube.com/@YH-HUMAN',
    href: 'https://www.youtube.com/@YH-HUMAN',
    category: 'media',
  },
];

export const CLINIC_HOURS = [
  { label: '평일', time: '09:30~20:30' },
  { label: '주말·공휴일', time: '09:30~15:30' },
];

export const DIRECTOR_HOURS = [
  { label: '월·금', time: '09:30~18:30' },
  { label: '수', time: '09:30~20:30' },
  { label: '토', time: '09:30~15:30' },
];

export const BRANCHES = [
  { name: '중랑점', note: '서울 중랑구' },
  { name: '사당점', note: '서울 사당 권역' },
  { name: '수유점', note: '서울 강북구' },
  { name: '압구정점', note: '서울 강남구' },
];

export const CARD_IMAGES = [
  {
    id: 'clinic-card',
    title: '경희동행한의원 명함',
    subtitle: '밝은 아이보리 디자인 · 대표원장',
    src: '/assets/aistudio/clinic_90x50_v3_0f7b40f8.png',
    downloadName: '박상용_경희동행한의원_명함.png',
    surface: 'light' as const,
  },
  {
    id: 'company-card',
    title: '주식회사 경희동행 명함',
    subtitle: '짙은 브라운 디자인 · CEO',
    src: '/assets/aistudio/company_90x50_final_ce2e9ef0.png',
    downloadName: '박상용_주식회사경희동행_명함.png',
    surface: 'dark' as const,
  },
];
