<template>
  <div class="relative">
    <!-- 좌측 사이드 광고 (2xl 이상, 메인 영역 왼쪽 여백에 고정) -->
    <div class="hidden 2xl:block fixed top-10 right-[calc(50%+24rem+2rem)]">
      <AdBanner position="side" />
    </div>

    <!-- 메인 콘텐츠 (기존 그대로) -->
    <div class="mx-auto max-w-3xl px-4 py-10">
      <LottoGenerator />
    </div>

    <!-- 우측 사이드 광고 (2xl 이상, 메인 영역 오른쪽 여백에 고정) -->
    <div class="hidden 2xl:block fixed top-10 left-[calc(50%+24rem+2rem)]">
      <AdBanner position="side" />
    </div>
  </div>
</template>
