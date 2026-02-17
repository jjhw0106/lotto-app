<script setup lang="ts">
import { ref } from 'vue'

type Tab = 'lotto' | 'pension'

const activeTab = ref<Tab>('lotto')

const tabs: { value: Tab; label: string; emoji: string }[] = [
  { value: 'lotto',   label: '로또 6/45',     emoji: '🎰' },
  { value: 'pension', label: '연금복권 720+', emoji: '🏠' },
]
</script>

<template>
  <div class="flex flex-col gap-8">

    <!-- 상단: 탭 + 점괘 배너 -->
    <div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">

      <!-- 왼쪽: 제목 + 탭 -->
      <div>
        <h1 class="text-3xl font-bold text-white">번호 추천</h1>
        <p class="mt-2 text-slate-400">전략을 선택하고 행운의 번호를 뽑아보세요.</p>

        <!-- 탭 버튼 -->
        <div class="mt-4 flex gap-2">
          <button
            v-for="tab in tabs"
            :key="tab.value"
            class="rounded-xl border px-5 py-2.5 text-sm font-semibold transition-all duration-200"
            :class="activeTab === tab.value
              ? 'border-blue-500 bg-blue-500/20 text-white shadow-lg shadow-blue-500/10'
              : 'border-slate-600/50 bg-slate-700/40 text-slate-400 hover:border-slate-500 hover:text-white'"
            @click="activeTab = tab.value"
          >
            {{ tab.emoji }} {{ tab.label }}
          </button>
        </div>
      </div>

      <!-- 오른쪽: 점괘 배너 -->
      <div class="w-full lg:w-80 shrink-0 flex flex-col gap-4">
        <FortuneBanner />
      </div>
    </div>

    <!-- 탭 콘텐츠 -->
    <LottoTab v-if="activeTab === 'lotto'" />
    <PensionTab v-if="activeTab === 'pension'" />

    <!-- 하단 광고 배너 -->
    <AdBanner position="bottom" />

  </div>
</template>
