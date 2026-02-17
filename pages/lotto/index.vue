<template>
  <div class="relative">
    <!-- 좌측 사이드 광고 (2xl 이상, 메인 영역 왼쪽 여백에 고정) -->
    <div class="hidden 2xl:block fixed top-10 right-[calc(50%+24rem+2rem)]">
      <AdBanner position="side" />
    </div>

    <!-- 메인 콘텐츠 (기존 그대로) -->
    <div class="mx-auto max-w-3xl px-4 py-10">
      <LottoGenerator />

      <!-- 정보성 텍스트 섹션 (구글 애드센스 승인을 위한 텍스트 보강) -->
      <section class="mt-20 border-t border-slate-800 pt-16">
        <h2 class="text-2xl font-bold text-white mb-8">당첨 확률을 높이는 전략적인 번호 선택</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-slate-400 text-sm leading-relaxed">
          <div class="flex flex-col gap-4">
            <h3 class="text-lg font-semibold text-blue-400 italic">로또 6/45 분석의 기초</h3>
            <p>
              로또 6/45는 45개의 숫자 중 6개를 맞추는 게임으로, 당첨 확률은 약 814만 분의 1입니다. 단순한 랜덤 추출도 좋지만, 
              많은 분석가들이 추천하는 <strong>'균형 배분'</strong> 방식은 숫자가 특정 구간에 쏠리지 않도록 각 10단위 별로 숫자를 고루 배치하는 전략입니다.
            </p>
            <p>
              또한 <strong>'홀짝 균형'</strong>은 홀수와 짝수의 비율을 3:3 혹은 2:4로 맞추어 확률적인 균형을 유지하는 방식입니다. 
              머니뚝(moneyttuk)에서는 이러한 인기 분석 로직을 기반으로 번호를 생성해 드립니다.
            </p>
          </div>
          
          <div class="flex flex-col gap-4">
            <h3 class="text-lg font-semibold text-emerald-400 italic">연금복권 720+ 특징</h3>
            <p>
              연금복권 720+는 1등 당첨 시 매월 700만 원씩 20년간 지급받는 연금형 복권입니다. 로또보다 당첨 확률이 약 1.6배 높으며(500만 분의 1), 
              조합에 따라 2등 당첨 기회도 함께 노릴 수 있는 매력적인 상품입니다.
            </p>
            <p>
              연금복권은 조와 6자리의 번호를 선택해야 하며, 머니뚝 번호 생성기는 사용자가 편리하게 번호를 고를 수 있도록 최적화된 조합을 제공합니다. 
              오늘의 행운 숫자를 머니뚝에서 지금 바로 확인해 보세요.
            </p>
          </div>
        </div>

        <div class="mt-12 rounded-xl bg-blue-500/5 border border-blue-500/10 p-6">
          <h4 class="text-sm font-bold text-blue-300 mb-2 uppercase tracking-widest">⚠️ 복권 구매 가이드</h4>
          <p class="text-xs text-slate-500 leading-relaxed">
            복권은 지나친 몰입을 피하고 즐거움으로 구매하는 것이 중요합니다. 당첨 번호 생성기는 과거 통계와 수학적 알고리즘을 활용한 도구일 뿐, 
            실제 당첨 결과와는 무관할 수 있습니다. 무리한 투자는 금물이며, 복권 판매는 반드시 19세 미만 청소년에게 금지되어 있음을 알려드립니다.
          </p>
        </div>
      </section>
    </div>

    <!-- 우측 사이드 광고 (2xl 이상, 메인 영역 오른쪽 여백에 고정) -->
    <div class="hidden 2xl:block fixed top-10 left-[calc(50%+24rem+2rem)]">
      <AdBanner position="side" />
    </div>

    <!-- 하단 푸터 (법적 필수 링크 포함) -->
    <SiteFooter />
  </div>
</template>
