import { useEffect } from 'react';
import { Download, X } from 'lucide-react';

interface CardImageModalProps {
  card: {
    id: string;
    title: string;
    subtitle: string;
    src: string;
    downloadName: string;
    surface: 'light' | 'dark';
  } | null;
  onClose: () => void;
}

export function CardImageModal({ card, onClose }: CardImageModalProps) {
  useEffect(() => {
    if (!card) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [card, onClose]);

  if (!card) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1c1613]/80 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="card-preview-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-[#F8F6F2] text-[#292420] shadow-2xl border border-[#755A50]/20">
        <div className="flex items-center justify-between gap-4 border-b border-[#755A50]/15 px-5 py-3.5">
          <div className="min-w-0">
            <h2
              id="card-preview-title"
              className="truncate text-base font-bold text-[#292420]"
            >
              {card.title}
            </h2>
            <p className="text-xs text-[#6B5B53]">{card.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="이미지 크게 보기 닫기"
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl text-[#6B5B53] transition-colors hover:bg-[#755A50]/10 hover:text-[#292420]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="bg-[#EFEAE1] p-4 sm:p-6">
          <div className="aspect-[9/5] w-full overflow-hidden rounded-xl shadow-md">
            <img
              src={card.src}
              alt={card.title}
              referrerPolicy="no-referrer"
              className="h-full w-full object-contain"
            />
          </div>
          <p className="mt-3 text-center text-xs text-[#5A4D46]">
            모바일에서는 이미지를 길게 누른 뒤 ‘사진에 저장’을 선택하거나 아래
            버튼으로 저장할 수 있습니다.
          </p>
        </div>

        <div className="flex items-center justify-end gap-2.5 border-t border-[#755A50]/15 px-5 py-3.5">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] rounded-xl px-4 py-2 text-sm font-medium text-[#6B5B53] hover:bg-[#755A50]/10"
          >
            닫기
          </button>
          <a
            href={card.src}
            download={card.downloadName}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[#342C29] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#292420]"
          >
            <Download className="h-4 w-4 text-[#E0BEA8]" />
            <span>이미지 저장</span>
          </a>
        </div>
      </div>
    </div>
  );
}
