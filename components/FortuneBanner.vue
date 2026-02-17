<script setup lang="ts">
import { ref, onUnmounted } from 'vue'

type BannerState = 'idle' | 'watching' | 'result'

interface Fortune {
  grade: string
  emoji: string
  message: string
  color: string
}

const state = ref<BannerState>('idle')
const showModal = ref(false)
const countdown = ref(0)
const totalTime = ref(0)
const fortune = ref<Fortune | null>(null)
let timer: ReturnType<typeof setInterval> | null = null

const fortunes: Fortune[] = [
  { grade: '대길', emoji: '🌟', message: '대박 조짐! 오늘 번호에 행운이 깃듭니다.', color: 'text-yellow-300' },
  { grade: '길',   emoji: '✨', message: '좋은 기운이 감돌고 있어요. 자신감을 가지세요!', color: 'text-emerald-300' },
  { grade: '소길', emoji: '🍀', message: '작지만 확실한 행운이 옵니다.', color: 'text-green-300' },
  { grade: '평',   emoji: '☁️', message: '평범한 하루, 꾸준함이 답입니다.', color: 'text-slate-300' },
  { grade: '흉',   emoji: '🌧️', message: '오늘은 조심스럽게. 내일은 더 나을 거예요.', color: 'text-orange-300' },
  { grade: '대흉', emoji: '⛈️', message: '잠시 쉬어가는 것도 전략입니다.', color: 'text-red-300' },
]

function startFortune() {
  // 모달 열고 카운트다운 시작
  showModal.value = true
  state.value = 'watching'
  totalTime.value = Math.floor(Math.random() * 6) + 10 // 10~15초
  countdown.value = totalTime.value

  timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearTimer()
      showResult()
    }
  }, 1000)
}

function showResult() {
  fortune.value = fortunes[Math.floor(Math.random() * fortunes.length)]
  state.value = 'result'
}

function clearTimer() {
  if (timer) clearInterval(timer)
  timer = null
}

/** 광고 도중 닫기 → 결과 미노출, 처음부터 다시 */
function cancelWatching() {
  clearTimer()
  showModal.value = false
  state.value = 'idle'
  fortune.value = null
}

/** 결과 확인 후 모달 닫기 */
function closeResult() {
  showModal.value = false
  // state는 result 유지 → 배너에 결과 표시
}

/** 다시 보기 */
function reset() {
  clearTimer()
  state.value = 'idle'
  fortune.value = null
  showModal.value = false
}

onUnmounted(() => clearTimer())
</script>

<template>
  <!-- 배너 (인라인) -->
  <div class="rounded-2xl border border-slate-700/50 bg-slate-800/60 backdrop-blur-sm overflow-hidden">

    <!-- 대기 상태: 점괘 보기 버튼 -->
    <button
      v-if="state === 'idle'"
      class="flex w-full items-center gap-3 px-5 py-4 text-left transition-all duration-200 hover:bg-slate-700/50"
      @click="startFortune"
    >
      <span class="text-2xl">🔮</span>
      <div>
        <p class="text-sm font-semibold text-white">오늘의 점괘 보기</p>
        <p class="text-xs text-slate-400">번호 뽑기 전 운세를 확인해보세요</p>
      </div>
    </button>

    <!-- 결과 상태: 배너에 결과 요약 -->
    <div v-else-if="state === 'result' && fortune" class="px-5 py-4">
      <div class="flex items-center gap-3">
        <span class="text-2xl">{{ fortune.emoji }}</span>
        <div class="flex-1">
          <p class="text-sm font-bold" :class="fortune.color">오늘의 운세: {{ fortune.grade }}</p>
          <p class="text-xs text-slate-400 truncate">{{ fortune.message }}</p>
        </div>
      </div>
      <button
        class="mt-2 w-full rounded-lg border border-slate-600 bg-slate-700/50 py-1.5 text-xs font-medium text-slate-400 transition-all hover:border-slate-500 hover:text-white"
        @click="reset"
      >
        🔮 다시 보기
      </button>
    </div>

    <!-- watching 상태에서 배너는 진행중 표시 -->
    <div v-else-if="state === 'watching'" class="flex items-center gap-3 px-5 py-4">
      <span class="text-2xl animate-pulse">🔮</span>
      <p class="text-sm text-slate-400">점괘 확인 중... ({{ countdown }}초)</p>
    </div>
  </div>

  <!-- 모달 오버레이 (watching + result) -->
  <Teleport to="body">
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
    >
      <div class="w-full max-w-md mx-4 rounded-2xl border border-slate-700 bg-slate-800 shadow-2xl overflow-hidden">

        <!-- 모달 헤더 -->
        <div class="flex items-center justify-between border-b border-slate-700 px-6 py-4">
          <h3 class="text-lg font-bold text-white">🔮 오늘의 점괘</h3>
          <!-- watching 중에는 X 버튼 누르면 취소 (결과 미노출) -->
          <button
            v-if="state === 'watching'"
            class="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-700 hover:text-slate-300"
            title="광고를 끝까지 시청해야 점괘를 볼 수 있습니다"
            @click="cancelWatching"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- 광고 시청 중 -->
        <div v-if="state === 'watching'" class="px-6 py-6">
          <p class="mb-4 text-center text-sm text-slate-400">광고가 끝나면 점괘가 공개됩니다</p>

          <!-- AdSense 슬롯 (플레이스홀더) -->
          <div class="flex h-[250px] items-center justify-center rounded-xl border border-dashed border-slate-600 bg-slate-900/50">
            <!-- AdSense slot: 승인 후 여기에 광고 코드 삽입 -->
            <div class="text-center">
              <p class="text-2xl text-slate-600">AD</p>
              <p class="mt-1 text-xs text-slate-700">광고 영역</p>
            </div>
          </div>

          <!-- 카운트다운 + 프로그레스 -->
          <div class="mt-4 flex items-center gap-3">
            <div class="flex-1 h-2 rounded-full bg-slate-700 overflow-hidden">
              <div
                class="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000 ease-linear"
                :style="{ width: `${((totalTime - countdown) / totalTime) * 100}%` }"
              />
            </div>
            <span class="shrink-0 rounded-full bg-blue-500/20 border border-blue-500/30 px-3 py-0.5 text-xs font-bold text-blue-300">
              {{ countdown }}초
            </span>
          </div>

          <p class="mt-3 text-center text-xs text-slate-500">
            닫으면 처음부터 다시 시청해야 합니다
          </p>
        </div>

        <!-- 결과 -->
        <div v-else-if="state === 'result' && fortune" class="px-6 py-8">
          <div class="flex flex-col items-center gap-4 text-center">
            <span class="text-6xl">{{ fortune.emoji }}</span>
            <p class="text-3xl font-extrabold" :class="fortune.color">{{ fortune.grade }}</p>
            <p class="text-base text-slate-300">{{ fortune.message }}</p>
          </div>

          <button
            class="mt-8 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition-all hover:bg-blue-500 active:scale-95"
            @click="closeResult"
          >
            확인
          </button>
        </div>

      </div>
    </div>
  </Teleport>
</template>
