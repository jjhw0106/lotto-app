<script setup lang="ts">
import { ref } from 'vue'

type Tab = 'lotto' | 'pension'

const activeTab = ref<Tab>('lotto')

const tabs: { value: Tab; label: string; emoji: string }[] = [
  { value: 'lotto',   label: '로또 6/45',     emoji: '🎰' },
  { value: 'pension', label: '연금복권 720+', emoji: '🏠' },
]

const { canInstall, install, isInAppBrowser, openInChrome, autoInstallMode } = usePwaInstall()
</script>

<template>
  <div class="flex flex-col gap-8">

    <!-- autoInstall 모달: 카카오톡에서 Chrome으로 이동 후 자동 노출 -->
    <Teleport to="body">
      <div
        v-if="autoInstallMode && canInstall"
        class="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm"
        @click.self="autoInstallMode = false"
      >
        <div class="w-full max-w-md rounded-t-2xl bg-slate-800 border-t border-slate-600 p-6 pb-10">
          <div class="mx-auto mb-4 h-1 w-12 rounded-full bg-slate-600" />
          <p class="text-center text-2xl mb-2">📲</p>
          <h2 class="text-center text-lg font-bold text-white mb-1">머니뚝 앱 설치</h2>
          <p class="text-center text-sm text-slate-400 mb-6">홈 화면에 추가하면 앱처럼 바로 실행할 수 있어요.</p>
          <button
            @click="install()"
            class="w-full rounded-xl bg-emerald-500 py-4 text-base font-bold text-white transition active:scale-95 hover:bg-emerald-400"
          >
            설치하기
          </button>
          <button
            @click="autoInstallMode = false"
            class="mt-3 w-full rounded-xl py-3 text-sm text-slate-500 hover:text-slate-300"
          >
            나중에
          </button>
        </div>
      </div>
    </Teleport>

    <!-- 상단: 탭 + 점괘 배너 -->
    <div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">

      <!-- 왼쪽: 제목 + 탭 -->
      <div>
        <div class="flex items-center gap-3">
          <h1 class="text-3xl font-bold text-white">번호 추천</h1>
          <!-- 일반 Chrome: 앱 설치 버튼 -->
          <button
            v-if="canInstall && !isInAppBrowser"
            @click="install()"
            class="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-400 transition hover:bg-emerald-500/20 active:scale-95"
          >
            📲 앱 설치
          </button>
          <!-- 인앱 브라우저(카카오톡 등): Chrome으로 열기 버튼 -->
          <button
            v-if="isInAppBrowser"
            @click="openInChrome()"
            class="inline-flex items-center gap-1.5 rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-400 transition hover:bg-amber-500/20 active:scale-95"
          >
            🌐 앱 설치 (Chrome으로 열기)
          </button>
        </div>
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
