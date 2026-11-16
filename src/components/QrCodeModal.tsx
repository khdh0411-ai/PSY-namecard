import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Check, Copy, Download, X } from 'lucide-react';

interface QrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
}

export function QrCodeModal({ isOpen, onClose, url }: QrCodeModalProps) {
  const [svgMarkup, setSvgMarkup] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    let active = true;
    QRCode.toString(url, {
      type: 'svg',
      margin: 3,
      errorCorrectionLevel: 'M',
      color: { dark: '#000000', light: '#FFFFFF' },
    })
      .then((svg) => {
        if (active) setSvgMarkup(svg);
      })
      .catch(() => {
        // Ignore
      });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      active = false;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, url, onClose]);

  if (!isOpen) return null;

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Ignore
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#1c1613]/65 backdrop-blur-xs sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="qr-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full overflow-hidden rounded-t-3xl border border-[#342C29]/15 bg-[#F5F1EA] text-[#292420] shadow-2xl sm:max-w-sm sm:rounded-3xl">
        <div className="pt-3 pb-1 sm:hidden" aria-hidden="true">
          <div className="mx-auto h-1.5 w-10 rounded-full bg-[#755A50]/25" />
        </div>

        <div className="flex items-center justify-between border-b border-[#755A50]/15 px-5 py-4">
          <div>
            <h2 id="qr-modal-title" className="text-base font-bold text-[#292420]">
              디지털 명함 QR코드
            </h2>
            <p className="mt-0.5 text-xs text-[#6B5B53]">
              스캔하거나 이미지로 저장해 명함에 인쇄하세요
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl text-[#6B5B53] hover:bg-[#755A50]/10 hover:text-[#292420]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4 p-5 pb-safe sm:p-6">
          {/* High-Contrast Scannable QR Preview */}
          <div className="mx-auto w-56 rounded-2xl border border-[#755A50]/15 bg-white p-3 shadow-xs">
            {svgMarkup ? (
              <div
                aria-label={`${url} QR코드`}
                className="aspect-square w-full [&>svg]:h-full [&>svg]:w-full"
                dangerouslySetInnerHTML={{ __html: svgMarkup }}
              />
            ) : (
              <img
                src="/assets/psy_card_qr.png"
                alt={`${url} QR코드`}
                referrerPolicy="no-referrer"
                className="aspect-square w-full object-contain"
              />
            )}
          </div>

          {/* URL Copy Bar */}
          <div className="flex items-center justify-between gap-2 rounded-xl border border-[#755A50]/18 bg-white px-3.5 py-2">
            <span className="truncate text-xs font-semibold text-[#053754]">
              {url}
            </span>
            <button
              type="button"
              onClick={handleCopyUrl}
              className="inline-flex min-h-[36px] shrink-0 items-center gap-1 rounded-lg bg-[#F5F1EA] px-2.5 py-1 text-xs font-semibold text-[#292420] hover:bg-[#EAE3D8]"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-[#053754]" />
                  <span>복사됨</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-[#755A50]" />
                  <span>복사</span>
                </>
              )}
            </button>
          </div>

          {/* Print-Ready Downloads */}
          <div className="grid grid-cols-2 gap-2.5">
            <a
              href="/assets/psy_card_qr.png"
              download="박상용_명함_QR코드.png"
              className="flex min-h-[48px] items-center justify-center gap-1.5 rounded-xl bg-[#053754] px-3 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#042B42]"
            >
              <Download className="h-4 w-4 text-[#D9B694]" />
              <span>PNG 저장 (고화질)</span>
            </a>
            <a
              href="/assets/psy_card_qr.svg"
              download="박상용_명함_QR코드.svg"
              className="flex min-h-[48px] items-center justify-center gap-1.5 rounded-xl bg-[#EFEAE1] px-3 py-2.5 text-xs font-bold text-[#292420] transition-colors hover:bg-[#e5ddd1]"
            >
              <Download className="h-4 w-4 text-[#053754]" />
              <span>SVG 저장 (인쇄용)</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
