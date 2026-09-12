/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { SelectionSection } from './components/SelectionSection';
import { RecommendationCard } from './components/RecommendationCard';
import { RecentRecommendations } from './components/RecentRecommendations';
import { MENU_ITEMS } from './data/menus';
import { FlavorOption, CarbOption, MenuItem } from './types';
import { Sparkles, Heart } from 'lucide-react';

export default function App() {
  const [flavor, setFlavor] = useState<FlavorOption | null>(null);
  const [carb, setCarb] = useState<CarbOption | null>(null);
  const [currentRecommendation, setCurrentRecommendation] = useState<MenuItem | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [history, setHistory] = useState<MenuItem[]>([]);

  // Filter items matching the current selection
  const candidateItems = useMemo(() => {
    if (!flavor || !carb) return [];
    return MENU_ITEMS.filter(
      (item) => item.flavor === flavor && item.carb === carb
    );
  }, [flavor, carb]);

  const isReadyToRecommend = Boolean(flavor && carb);

  // Handle recommendation trigger
  const handleGetRecommendation = () => {
    if (!flavor || !carb || candidateItems.length === 0) return;

    // Pick random item
    let pick: MenuItem;
    if (candidateItems.length === 1) {
      pick = candidateItems[0];
    } else {
      // Avoid immediate repeat if possible
      const filtered = candidateItems.filter(
        (item) => item.id !== currentRecommendation?.id
      );
      const pool = filtered.length > 0 ? filtered : candidateItems;
      const randomIndex = Math.floor(Math.random() * pool.length);
      pick = pool[randomIndex];
    }

    setCurrentRecommendation(pick);
    setHistory((prev) => [pick, ...prev.filter((item) => item.id !== pick.id)]);
    setShowResult(true);

    // Scroll smoothly to top of card on mobile
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reroll from same category
  const handleReroll = () => {
    if (candidateItems.length === 0) return;

    let pick: MenuItem;
    if (candidateItems.length === 1) {
      pick = candidateItems[0];
    } else {
      const filtered = candidateItems.filter(
        (item) => item.id !== currentRecommendation?.id
      );
      const pool = filtered.length > 0 ? filtered : candidateItems;
      const randomIndex = Math.floor(Math.random() * pool.length);
      pick = pool[randomIndex];
    }

    setCurrentRecommendation(pick);
    setHistory((prev) => [pick, ...prev.filter((item) => item.id !== pick.id)]);
  };

  // Reset to initial state
  const handleReset = () => {
    setShowResult(false);
    // Keep previously selected options for convenience or clear if preferred:
    // Let's clear so user can start fresh
    setFlavor(null);
    setCarb(null);
    setCurrentRecommendation(null);
  };

  // Select directly from recent history
  const handleSelectFromHistory = (item: MenuItem) => {
    setFlavor(item.flavor);
    setCarb(item.carb);
    setCurrentRecommendation(item);
    setShowResult(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between py-6 px-4 sm:px-6">
      <main className="w-full max-w-md mx-auto">
        <Header onReset={handleReset} />

        {/* 메인 화이트 카드 */}
        <div 
          id="main-recommendation-card"
          className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-6 sm:p-7 relative transition-all duration-300"
        >
          {!showResult ? (
            <SelectionSection
              flavor={flavor}
              carb={carb}
              onSelectFlavor={(f) => setFlavor(f)}
              onSelectCarb={(c) => setCarb(c)}
              onGetRecommendation={handleGetRecommendation}
              isReady={isReadyToRecommend}
            />
          ) : currentRecommendation ? (
            <div className="space-y-6">
              <RecommendationCard
                item={currentRecommendation}
                onReroll={handleReroll}
                onReset={handleReset}
                totalCandidates={candidateItems.length}
              />

              <RecentRecommendations
                history={history}
                onSelect={handleSelectFromHistory}
                currentItemId={currentRecommendation.id}
              />
            </div>
          ) : null}
        </div>

        {/* 빠른 안내 배너 */}
        {!showResult && (
          <div className="mt-4 p-4 rounded-2xl bg-amber-50/60 border border-amber-200/60 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-snug">
              결정이 힘들 땐 고민하지 마세요! 선택하신 취향에 맞춰 한 끼를 추천해 드립니다.
            </p>
          </div>
        )}
      </main>

      {/* 푸터 */}
      <footer className="w-full max-w-md mx-auto text-center mt-8 pb-4">
        <div className="flex items-center justify-center gap-1.5 text-xs text-slate-600 font-medium">
          <span>맛있게 드시고 든든한 하루 보내세요!</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
        </div>
        <p className="text-[11px] text-slate-600 mt-1">
          오늘 뭐 먹지? 2.0 • 맞춤형 음식 추천
        </p>
      </footer>
    </div>
  );
}
