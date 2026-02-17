<script setup lang="ts">
type Strategy = 'random' | 'balanced' | 'odd-even'

interface LottoSet {
  id: number
  numbers: number[]
  isNew: boolean
}

const gameCount = ref(5)
const strategy = ref<Strategy>('random')
const lottoSets = ref<LottoSet[]>([])
const isGenerating = ref(false)
const copyMessage = ref('')

const strategyOptions: { value: Strategy; label: string; desc: string }[] = [
  { value: 'random',   label: '완전 랜덤',  desc: '1~45에서 순수하게 랜덤으로 6개 추출' },
  { value: 'balanced', label: '균형 배분',  desc: '각 구간(1-9, 10-19, 20-29, 30-39, 40-45)에서 골고루 추출' },
  { value: 'odd-even', label: '홀짝 균형',  desc: '홀수 3개 + 짝수 3개 조합으로 추출' },
]

function pickRandom(pool: number[], count: number): number[] {
  const shuffled = [...pool].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count).sort((a, b) => a - b)
}

function generateSet(): number[] {
  const all = Array.from({ length: 45 }, (_, i) => i + 1)

  if (strategy.value === 'balanced') {
    const groups = [
      all.filter(n => n >= 1  && n <= 9),
      all.filter(n => n >= 10 && n <= 19),
      all.filter(n => n >= 20 && n <= 29),
      all.filter(n => n >= 30 && n <= 39),
      all.filter(n => n >= 40 && n <= 45),
    ]
    // 각 구간에서 1개씩 뽑고 나머지 1개는 랜덤
    const base: number[] = []
    for (const g of groups) {
      base.push(...pickRandom(g, 1))
    }
    const remaining = all.filter(n => !base.includes(n))
    const extra = pickRandom(remaining, 1)
    return [...base, ...extra].sort((a, b) => a - b)
  }

  if (strategy.value === 'odd-even') {
    const odds  = all.filter(n => n % 2 !== 0)
    const evens = all.filter(n => n % 2 === 0)
    return [...pickRandom(odds, 3), ...pickRandom(evens, 3)].sort((a, b) => a - b)
  }

  return pickRandom(all, 6)
}

async function generateAll() {
  isGenerating.value = true
  lottoSets.value = []

  // 세트마다 살짝 딜레이를 줘서 순차 등장 효과
  for (let i = 0; i < gameCount.value; i++) {
    await new Promise(r => setTimeout(r, i * 120))
    lottoSets.value.push({ id: Date.now() + i, numbers: generateSet(), isNew: true })
    setTimeout(() => {
      if (lottoSets.value[i]) lottoSets.value[i].isNew = false
    }, 600)
  }

  isGenerating.value = false
}

function regenerateSet(index: number) {
  const set = lottoSets.value[index]
  if (!set) return
  set.numbers = generateSet()
  set.isNew = true
  setTimeout(() => { set.isNew = false }, 600)
}

async function copyAll() {
  const text = lottoSets.value
    .map((s, i) => `게임 ${i + 1}: ${s.numbers.join(', ')}`)
    .join('\n')
  await navigator.clipboard.writeText(text)
  copyMessage.value = '복사됨!'
  setTimeout(() => { copyMessage.value = '' }, 2000)
}

// 처음 진입 시 바로 번호 생성
onMounted(() => {
  generateAll()
})
</script>

<template>
  <div class="flex flex-col gap-8">

    <!-- 헤더 -->
    <div>
      <h1 class="text-3xl font-bold text-white">🎰 로또 번호 추천</h1>
      <p class="mt-2 text-slate-400">전략을 선택하고 행운의 번호를 뽑아보세요.</p>
    </div>

    <!-- 옵션 패널 -->
    <div class="rounded-2xl bg-slate-800/60 border border-slate-700/50 p-6 flex flex-col gap-6 backdrop-blur-sm">

      <!-- 전략 선택 -->
      <div>
        <p class="mb-3 text-sm font-medium text-slate-300">추천 전략</p>
        <div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <button
            v-for="opt in strategyOptions"
            :key="opt.value"
            class="rounded-xl border p-4 text-left transition-all duration-200"
            :class="strategy === opt.value
              ? 'border-blue-500 bg-blue-500/20 shadow-lg shadow-blue-500/10'
              : 'border-slate-600/50 bg-slate-700/40 hover:border-slate-500 hover:bg-slate-700/70'"
            @click="strategy = opt.value"
          >
            <p class="font-semibold text-white">{{ opt.label }}</p>
            <p class="mt-1 text-xs text-slate-400">{{ opt.desc }}</p>
          </button>
        </div>
      </div>

      <!-- 게임 수 + 생성 버튼 -->
      <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="mb-2 text-sm font-medium text-slate-300">게임 수</p>
          <div class="flex items-center gap-2">
            <button
              v-for="n in [1, 2, 3, 4, 5]"
              :key="n"
              class="h-10 w-10 rounded-lg border text-sm font-bold transition-all duration-150"
              :class="gameCount === n
                ? 'border-blue-500 bg-blue-500 text-white shadow-md shadow-blue-500/30'
                : 'border-slate-600 bg-slate-700 text-slate-300 hover:border-slate-500 hover:bg-slate-600'"
              @click="gameCount = n"
            >
              {{ n }}
            </button>
          </div>
        </div>

        <button
          class="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-600/30 transition-all duration-200 hover:bg-blue-500 hover:shadow-blue-500/40 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="isGenerating"
          @click="generateAll"
        >
          <span class="text-lg" :class="{ 'animate-spin': isGenerating }">{{ isGenerating ? '⏳' : '🎲' }}</span>
          {{ isGenerating ? '생성 중...' : '번호 생성' }}
        </button>
      </div>
    </div>

    <!-- 결과 -->
    <div v-if="lottoSets.length > 0">

      <!-- 결과 헤더 -->
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-xl font-semibold text-white">추천 번호</h2>
        <button
          class="flex items-center gap-1.5 rounded-lg border border-slate-600 bg-slate-700/50 px-4 py-2 text-sm font-medium text-slate-300 transition-all hover:border-slate-500 hover:bg-slate-700 hover:text-white"
          @click="copyAll"
        >
          <span>{{ copyMessage || '📋 전체 복사' }}</span>
        </button>
      </div>

      <!-- 번호 카드 목록 -->
      <div class="flex flex-col gap-3">
        <div
          v-for="(set, index) in lottoSets"
          :key="set.id"
          class="group flex items-center gap-4 rounded-2xl border border-slate-700/50 bg-slate-800/60 px-6 py-4 backdrop-blur-sm transition-all duration-300"
          :class="set.isNew ? 'animate-fade-in opacity-0' : 'opacity-100'"
        >
          <!-- 게임 번호 뱃지 -->
          <span class="w-16 shrink-0 text-center text-xs font-bold tracking-widest text-slate-500 uppercase">
            Game {{ index + 1 }}
          </span>

          <!-- 번호 볼 -->
          <div class="flex flex-1 flex-wrap gap-2">
            <LottoBall
              v-for="num in set.numbers"
              :key="num"
              :number="num"
              size="md"
            />
          </div>

          <!-- 개별 재생성 버튼 -->
          <button
            class="shrink-0 rounded-lg border border-slate-600/50 bg-slate-700/40 px-3 py-1.5 text-xs font-medium text-slate-400 opacity-0 transition-all duration-150 hover:border-slate-500 hover:text-white group-hover:opacity-100"
            title="이 게임만 다시 생성"
            @click="regenerateSet(index)"
          >
            ↺ 재생성
          </button>
        </div>
      </div>
    </div>

    <!-- 생성 전 빈 상태 (초기 로딩 시 짧게만 보임) -->
    <div v-else-if="!isGenerating" class="flex h-40 flex-col items-center justify-center gap-2 text-slate-500">
      <span class="text-4xl">🎰</span>
      <p>번호 생성 버튼을 눌러보세요.</p>
    </div>

  </div>
</template>
