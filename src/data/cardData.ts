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

export interface BranchItem {
  name: string;
  note: string;
  naverMapUrl: string;
  // Tailwind position classes aligned to public/assets/seoul_map_illustration.png (460x370)
  hotspotClass: string;
}

export const COMMON_PERSON = {
  name: '박상용',
  englishBrand: 'KYUNGHEE DONGHAENG',
  mobile: '010-5686-3735',
  constitutionTestUrl: 'https://charoitda.com/constitution-test',
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
    id: 'youtube-channel',
    label: '유튜브 양허인간',
    sublabel: 'youtube.com/@YH-HUMAN',
    href: 'https://www.youtube.com/@YH-HUMAN',
    category: 'media',
  },
  {
    id: 'charoitda-home',
    label: '차로잇다 홈페이지',
    sublabel: 'charoitda.com',
    href: 'http://charoitda.com',
    category: 'company',
  },
  {
    id: 'naver-booking',
    label: '네이버 진료예약',
    sublabel: 'hani.care/5zKGjTywXk',
    href: 'https://hani.care/5zKGjTywXk',
    category: 'clinic',
  },
  {
    id: 'clinic-home',
    label: '한의원 홈페이지',
    sublabel: 'khdhhani1.com',
    href: 'http://khdhhani1.com',
    category: 'clinic',
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

export const BRANCHES: BranchItem[] = [
  {
    name: '중랑점',
    note: '서울 중랑구',
    naverMapUrl: 'https://map.naver.com/p/search/%EA%B2%BD%ED%9D%AC%EB%8F%99%ED%96%89%ED%95%9C%EC%9D%98%EC%9B%90%20%EC%A4%91%EB%9E%91%EC%A0%90',
    hotspotClass: 'left-[78%] top-[43%] w-24 h-14',
  },
  {
    name: '사당점',
    note: '서울 사당 권역',
    naverMapUrl: 'https://map.naver.com/p/search/%EA%B2%BD%ED%9D%AC%EB%8F%99%ED%96%89%ED%95%9C%EC%9D%98%EC%9B%90%20%EC%82%AC%EB%8B%B9%EC%A0%90',
    hotspotClass: 'left-[47%] top-[81%] w-24 h-14',
  },
  {
    name: '수유점',
    note: '서울 강북구',
    naverMapUrl: 'https://map.naver.com/p/search/%EA%B2%BD%ED%9D%AC%EB%8F%99%ED%96%89%ED%95%9C%EC%9D%98%EC%9B%90%20%EC%88%98%EC%9C%A0%EC%A0%90',
    hotspotClass: 'left-[58%] top-[24%] w-24 h-14',
  },
  {
    name: '압구정점',
    note: '서울 강남구',
    naverMapUrl: 'https://map.naver.com/p/search/%EA%B2%BD%ED%9D%AC%EB%8F%99%ED%96%89%ED%95%9C%EC%9D%98%EC%9B%90%20%EC%95%95%EA%B5%AC%EC%A0%95%EC%A0%90',
    hotspotClass: 'left-[69%] top-[62%] w-28 h-14',
  },
];
