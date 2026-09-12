import React from 'react';
import { Flame, Sparkles, Check } from 'lucide-react';
import { FlavorOption, CarbOption } from '../types';

interface SelectionSectionProps {
  flavor: FlavorOption | null;
  carb: CarbOption | null;
  onSelectFlavor: (flavor: FlavorOption) => void;
  onSelectCarb: (carb: CarbOption) => void;
  onGetRecommendation: () => void;
  isReady: boolean;
}

export const SelectionSection: React.FC<SelectionSectionProps> = ({
  flavor,
  carb,
  onSelectFlavor,
  onSelectCarb,
  onGetRecommendation,
  isReady,
}) => {
  return (
    <div className="space-y-6">
      {/* 1단계: 매콤 / 담백 선택 */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-base sm:text-lg font-bold text-slate-800">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 text-orange-600 text-xs font-black">
              1
            </span>
            <span>어떤 맛이 끌리시나요?</span>
          </label>
          <span className="text-xs text-slate-600 font-medium">택 1</span>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {/* 매콤 버튼 */}
          <button
            id="btn-flavor-spicy"
            type="button"
            onClick={() => onSelectFlavor('spicy')}
            className={`group relative flex flex-col items-center text-center p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer ${
              flavor === 'spicy'
                ? 'border-orange-500 bg-orange-50/60 shadow-md shadow-orange-500/10 ring-2 ring-orange-400/20'
                : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/70'
            }`}
          >
            {flavor === 'spicy' && (
              <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
            )}
            <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-2xl mb-2 group-hover:scale-110 transition-transform">
              <span role="img" aria-label="매콤">🌶️</span>
            </div>
            <span className="text-lg sm:text-xl font-bold text-slate-900">매콤한 맛</span>
            <span className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
              칼칼하고 스트레스 풀리는 맛
            </span>
          </button>

          {/* 담백 버튼 */}
          <button
            id="btn-flavor-mild"
            type="button"
            onClick={() => onSelectFlavor('mild')}
            className={`group relative flex flex-col items-center text-center p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer ${
              flavor === 'mild'
                ? 'border-emerald-500 bg-emerald-50/60 shadow-md shadow-emerald-500/10 ring-2 ring-emerald-400/20'
                : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/70'
            }`}
          >
            {flavor === 'mild' && (
              <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
            )}
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-2xl mb-2 group-hover:scale-110 transition-transform">
              <span role="img" aria-label="담백">🌿</span>
            </div>
            <span className="text-lg sm:text-xl font-bold text-slate-900">담백한 맛</span>
            <span className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
              자극 없이 속 편하고 깔끔한 맛
            </span>
          </button>
        </div>
      </div>

      {/* 2단계: 밥 / 면·빵 선택 */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-base sm:text-lg font-bold text-slate-800">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 text-orange-600 text-xs font-black">
              2
            </span>
            <span>주식을 골라주세요</span>
          </label>
          <span className="text-xs text-slate-600 font-medium">택 1</span>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {/* 밥 버튼 */}
          <button
            id="btn-carb-rice"
            type="button"
            onClick={() => onSelectCarb('rice')}
            className={`group relative flex flex-col items-center text-center p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer ${
              carb === 'rice'
                ? 'border-amber-500 bg-amber-50/60 shadow-md shadow-amber-500/10 ring-2 ring-amber-400/20'
                : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/70'
            }`}
          >
            {carb === 'rice' && (
              <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
            )}
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-2xl mb-2 group-hover:scale-110 transition-transform">
              <span role="img" aria-label="밥">🍚</span>
            </div>
            <span className="text-lg sm:text-xl font-bold text-slate-900">든든한 밥</span>
            <span className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
              속을 꽉 채워주는 쌀밥 요리
            </span>
          </button>

          {/* 면 · 빵 버튼 */}
          <button
            id="btn-carb-noodle-bread"
            type="button"
            onClick={() => onSelectCarb('noodle_bread')}
            className={`group relative flex flex-col items-center text-center p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer ${
              carb === 'noodle_bread'
                ? 'border-indigo-500 bg-indigo-50/60 shadow-md shadow-indigo-500/10 ring-2 ring-indigo-400/20'
                : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/70'
            }`}
          >
            {carb === 'noodle_bread' && (
              <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-indigo-500 text-white flex items-center justify-center">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
            )}
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-2xl mb-2 group-hover:scale-110 transition-transform">
              <span role="img" aria-label="면과 빵">🍜</span>
            </div>
            <span className="text-lg sm:text-xl font-bold text-slate-900">면 · 빵</span>
            <span className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
              호로록 면과 맛있는 빵
            </span>
          </button>
        </div>
      </div>

      {/* 3단계: 추천받기 큰 버튼 */}
      <div className="pt-3">
        <button
          id="btn-get-recommendation"
          type="button"
          onClick={onGetRecommendation}
          disabled={!isReady}
          className={`w-full py-4 sm:py-4.5 px-6 rounded-2xl font-bold text-lg sm:text-xl flex items-center justify-center gap-2.5 transition-all duration-200 shadow-md cursor-pointer ${
            isReady
              ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 hover:shadow-lg hover:shadow-orange-500/25 active:scale-[0.99]'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200 shadow-none'
          }`}
        >
          <Sparkles className={`w-5 h-5 ${isReady ? 'text-amber-200 animate-pulse' : 'text-slate-400'}`} />
          <span>오늘의 메뉴 추천받기</span>
        </button>

        {!isReady && (
          <p className="text-center text-xs sm:text-sm text-slate-600 mt-2 font-medium">
            {!flavor && !carb
              ? '맛(매콤/담백)과 주식(밥/면·빵)을 먼저 선택해주세요.'
              : !flavor
              ? '매콤 또는 담백 중 하나를 골라주세요.'
              : '밥 또는 면·빵 중 하나를 골라주세요.'}
          </p>
        )}
      </div>
    </div>
  );
};
