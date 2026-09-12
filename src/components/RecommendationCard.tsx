import React, { useState } from 'react';
import { RefreshCw, RotateCcw, Copy, Check, Lightbulb, ChefHat, Tag } from 'lucide-react';
import { MenuItem } from '../types';

interface RecommendationCardProps {
  item: MenuItem;
  onReroll: () => void;
  onReset: () => void;
  totalCandidates: number;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  item,
  onReroll,
  onReset,
  totalCandidates,
}) => {
  const [copied, setCopied] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  const handleCopy = async () => {
    const textToCopy = `[오늘 뭐 먹지? 2.0 추천]\n메뉴: ${item.name}\n추천 이유: ${item.reason}`;
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(textToCopy);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleRerollClick = () => {
    setIsRotating(true);
    setTimeout(() => setIsRotating(false), 500);
    onReroll();
  };

  const flavorLabel = item.flavor === 'spicy' ? '🌶️ 매콤한 맛' : '🌿 담백한 맛';
  const carbLabel = item.carb === 'rice' ? '🍚 든든한 밥' : '🍜 면 · 빵';

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 선택된 조건 배지 */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
            선택 조건
          </span>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-orange-100/80 text-orange-800">
            {flavorLabel}
          </span>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100/80 text-amber-800">
            {carbLabel}
          </span>
        </div>
        <span className="text-xs text-slate-600 font-medium">
          후보 {totalCandidates}종 중 추천
        </span>
      </div>

      {/* 메인 메뉴 영역 */}
      <div className="text-center py-3">
        <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-amber-50 border border-amber-200/60 text-4xl sm:text-5xl mb-4 shadow-sm">
          <span role="img" aria-label={item.name}>
            {item.emoji}
          </span>
        </div>

        <div className="inline-block px-3 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-semibold mb-2">
          {item.category}
        </div>

        <h2 
          id="recommended-menu-name"
          className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight"
        >
          {item.name}
        </h2>
      </div>

      {/* 한 줄 추천 이유 카드 (사용자 요구사항 핵심) */}
      <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 relative">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-amber-200/80 text-amber-900 flex items-center justify-center shrink-0 mt-0.5">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div className="space-y-1 text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
              오늘의 한 줄 추천 이유
            </span>
            <p 
              id="recommended-menu-reason"
              className="text-base sm:text-lg font-bold text-slate-900 leading-snug"
            >
              "{item.reason}"
            </p>
          </div>
        </div>
      </div>

      {/* 꿀팁 & 태그 */}
      {item.tip && (
        <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200/70 text-left flex items-start gap-2.5">
          <ChefHat className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-slate-600">
            <strong className="text-slate-800 font-semibold mr-1">더 맛있게 먹는 꿀팁:</strong>
            {item.tip}
          </div>
        </div>
      )}

      {/* 태그 모음 */}
      <div className="flex items-center gap-1.5 flex-wrap justify-center pt-1">
        <Tag className="w-3.5 h-3.5 text-slate-600 mr-1" />
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* 액션 버튼 그룹 */}
      <div className="pt-2 space-y-2.5">
        {/* 다른 메뉴 추천받기 (메인 버튼) */}
        <button
          id="btn-reroll-menu"
          type="button"
          onClick={handleRerollClick}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-lg flex items-center justify-center gap-2.5 shadow-md hover:from-orange-600 hover:to-amber-600 hover:shadow-lg hover:shadow-orange-500/20 active:scale-[0.99] transition-all cursor-pointer"
        >
          <RefreshCw className={`w-5 h-5 ${isRotating ? 'animate-spin' : ''}`} />
          <span>다른 메뉴 추천받기</span>
        </button>

        <div className="grid grid-cols-2 gap-2.5">
          {/* 복사하기 버튼 */}
          <button
            id="btn-copy-menu"
            type="button"
            onClick={handleCopy}
            className="py-3 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                <span className="text-emerald-700 font-bold">복사 완료!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-600" />
                <span>메뉴 정보 복사</span>
              </>
            )}
          </button>

          {/* 처음부터 다시 고르기 */}
          <button
            id="btn-reset-selection"
            type="button"
            onClick={onReset}
            className="py-3 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-slate-600" />
            <span>조건 다시 고르기</span>
          </button>
        </div>
      </div>
    </div>
  );
};
