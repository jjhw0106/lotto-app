<script setup lang="ts">
import { ref, computed } from 'vue'

type Mode = 'each' | 'same'

interface PensionSet {
  id: number
  group: number       // 조 (1~5)
  digits: number[]    // 6자리 각 0~9
  isNew: boolean
}

const mode = ref<Mode>('each')
const setCount = ref(5)
const selectedGroups = ref<number[]>([1, 2, 3, 4, 5])
const pensionSets = ref<PensionSet[]>([])
const isGenerating = ref(false)
const copyMessage = ref('')

const modeOptions: { value: Mode; label: string; desc: string }[] = [
  { value: 'each', label: '조별 랜덤',  desc: '각 Set마다 조와 번호를 랜덤 생성' },
  { value: 'same', label: '같은 번호 다조', desc: '같은 번호로 여러 조를 선택 (1·2등 동시 공략)' },
]

/** 같은번호 다조 모드에서 조 토글 */
function toggleGroup(g: number) {
  const idx = selectedGroups.value.indexOf(g)
  if (idx >= 0) {
    if (selectedGroups.value.length > 1) {
      selectedGroups.value.splice(idx, 1)
    }
  } else {
    selectedGroups.value.push(g)
    selectedGroups.value.sort((a, b) => a - b)
  }
}

/** 같은번호 다조에서 전체선택 */
function selectAllGroups() {
  selectedGroups.value = [1, 2, 3, 4, 5]
}

function generateDigits(): number[] {
  return Array.from({ length: 6 }, () => Math.floor(Math.random() * 10))
}

function formatSet(set: PensionSet): string {
  return `${set.group}조 ${set.digits.join('')}`
}

async function generateAll() {
  isGenerating.value = true
  pensionSets.value = []

  if (mode.value === 'same') {
    // 같은 번호, 선택된 조들로 생성
    const digits = generateDigits()
    const groups = [...selectedGroups.value]

    for (let i = 0; i < groups.length; i++) {
      await new Promise(r => setTimeout(r, i * 120))
      pensionSets.value.push({
        id: Date.now() + i,
        group: groups[i],
        digits: [...digits],
        isNew: true,
      })
      setTimeout(() => {
        if (pensionSets.value[i]) pensionSets.value[i].isNew = false
      }, 600)
    }
  } else {
    // 각 Set 독립 랜덤
    for (let i = 0; i < setCount.value; i++) {
      await new Promise(r => setTimeout(r, i * 120))
      pensionSets.value.push({
        id: Date.now() + i,
        group: Math.floor(Math.random() * 5) + 1,
        digits: generateDigits(),
        isNew: true,
      })
      setTimeout(() => {
        if (pensionSets.value[i]) pensionSets.value[i].isNew = false
      }, 600)
    }
  }

  isGenerating.value = false
}

function regenerateSet(index: number) {
  const set = pensionSets.value[index]
  if (!set) return

  if (mode.value === 'same') {
    // 같은번호 모드에서 개별 재생성 → 해당 조의 번호만 재생성
    set.digits = generateDigits()
  } else {
    set.group = Math.floor(Math.random() * 5) + 1
    set.digits = generateDigits()
  }
  set.isNew = true
  setTimeout(() => { set.isNew = false }, 600)
}

async function copyAll() {
  const text = pensionSets.value
    .map((s, i) => `Set ${i + 1}: ${formatSet(s)}`)
    .join('\n')
  await navigator.clipboard.writeText(text)
  copyMessage.value = '복사됨!'
  setTimeout(() => { copyMessage.value = '' }, 2000)
}
</script>

<template>
  <div class="flex flex-col gap-6">

    <!-- 옵션 패널 -->
    <div class="rounded-2xl bg-slate-800/60 border border-slate-700/50 p-6 flex flex-col gap-6 backdrop-blur-sm">

      <!-- 연금복권 설명 -->
      <div class="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
        <p class="text-sm font-medium text-emerald-300">연금복권 720+ 구조</p>
        <p class="mt-1 text-xs text-slate-400">조(1~5조) + 6자리 번호(각 자리 0~9)로 구성됩니다. 1등 월 700만원 x 20년!</p>
      </div>

      <!-- 모드 선택 -->
      <div>
        <p class="mb-3 text-sm font-medium text-slate-300">생성 모드</p>
        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <button
            v-for="opt in modeOptions"
            :key="opt.value"
            class="rounded-xl border p-4 text-left transition-all duration-200"
            :class="mode === opt.value
              ? 'border-emerald-500 bg-emerald-500/20 shadow-lg shadow-emerald-500/10'
              : 'border-slate-600/50 bg-slate-700/40 hover:border-slate-500 hover:bg-slate-700/70'"
            @click="mode = opt.value"
          >
            <p class="font-semibold text-white">{{ opt.label }}</p>
            <p class="mt-1 text-xs text-slate-400">{{ opt.desc }}</p>
          </button>
        </div>
      </div>

      <!-- 조별 랜덤: Set 수 선택 -->
      <div v-if="mode === 'each'" class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="mb-2 text-sm font-medium text-slate-300">Set 수</p>
          <div class="flex items-center gap-2">
            <button
              v-for="n in [1, 2, 3, 4, 5]"
              :key="n"
              class="h-10 w-10 rounded-lg border text-sm font-bold transition-all duration-150"
              :class="setCount === n
                ? 'border-emerald-500 bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                : 'border-slate-600 bg-slate-700 text-slate-300 hover:border-slate-500 hover:bg-slate-600'"
              @click="setCount = n"
            >
              {{ n }}
            </button>
          </div>
        </div>

        <button
          class="flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white shadow-lg shadow-emerald-600/30 transition-all duration-200 hover:bg-emerald-500 hover:shadow-emerald-500/40 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="isGenerating"
          @click="generateAll"
        >
          <span class="text-lg" :class="{ 'animate-spin': isGenerating }">{{ isGenerating ? '⏳' : '🏠' }}</span>
          {{ isGenerating ? '생성 중...' : '번호 생성' }}
        </button>
      </div>

      <!-- 같은 번호 다조: 조 선택 -->
      <div v-else class="flex flex-col gap-4">
        <div>
          <div class="mb-2 flex items-center justify-between">
            <p class="text-sm font-medium text-slate-300">구매할 조 선택</p>
            <button
              class="text-xs text-emerald-400 hover:text-emerald-300 transition"
              @click="selectAllGroups"
            >
              전체 선택
            </button>
          </div>
          <div class="flex items-center gap-2">
            <button
              v-for="g in [1, 2, 3, 4, 5]"
              :key="g"
              class="h-10 rounded-lg border px-4 text-sm font-bold transition-all duration-150"
              :class="selectedGroups.includes(g)
                ? 'border-emerald-500 bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                : 'border-slate-600 bg-slate-700 text-slate-300 hover:border-slate-500 hover:bg-slate-600'"
              @click="toggleGroup(g)"
            >
              {{ g }}조
            </button>
          </div>
          <p class="mt-2 text-xs text-slate-500">
            같은 번호로 {{ selectedGroups.length }}개 조 구매 → 1등 + 2등({{ selectedGroups.length - 1 }}개) 동시 당첨 가능!
          </p>
        </div>

        <button
          class="flex items-center gap-2 self-end rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white shadow-lg shadow-emerald-600/30 transition-all duration-200 hover:bg-emerald-500 hover:shadow-emerald-500/40 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="isGenerating"
          @click="generateAll"
        >
          <span class="text-lg" :class="{ 'animate-spin': isGenerating }">{{ isGenerating ? '⏳' : '🏠' }}</span>
          {{ isGenerating ? '생성 중...' : '번호 생성' }}
        </button>
      </div>
    </div>

    <!-- 결과 -->
    <div v-if="pensionSets.length > 0">

      <!-- 결과 헤더 -->
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-xl font-semibold text-white">
          추천 번호
          <span v-if="mode === 'same'" class="ml-2 text-sm font-normal text-emerald-400">(같은 번호 다조)</span>
        </h2>
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
          v-for="(set, index) in pensionSets"
          :key="set.id"
          class="group flex items-center gap-4 rounded-2xl border border-slate-700/50 bg-slate-800/60 px-6 py-4 backdrop-blur-sm transition-all duration-300"
          :class="set.isNew ? 'animate-fade-in opacity-0' : 'opacity-100'"
        >
          <!-- Set 번호 뱃지 -->
          <span class="w-14 shrink-0 text-center text-xs font-bold tracking-widest text-slate-500 uppercase">
            Set {{ index + 1 }}
          </span>

          <!-- 조 표시 -->
          <span class="shrink-0 rounded-lg bg-emerald-500/20 border border-emerald-500/30 px-3 py-1.5 text-sm font-bold text-emerald-300">
            {{ set.group }}조
          </span>

          <!-- 6자리 번호 -->
          <div class="flex flex-1 gap-1.5">
            <span
              v-for="(digit, dIdx) in set.digits"
              :key="dIdx"
              class="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-700 text-base font-bold text-white shadow-md"
            >
              {{ digit }}
            </span>
          </div>

          <!-- 개별 재생성 버튼 -->
          <button
            class="shrink-0 rounded-lg border border-slate-600/50 bg-slate-700/40 px-3 py-1.5 text-xs font-medium text-slate-400 opacity-0 transition-all duration-150 hover:border-slate-500 hover:text-white group-hover:opacity-100"
            title="이 Set만 다시 생성"
            @click="regenerateSet(index)"
          >
            ↺ 재생성
          </button>
        </div>
      </div>
    </div>

    <!-- 빈 상태 -->
    <div v-else-if="!isGenerating" class="flex h-40 flex-col items-center justify-center gap-2 text-slate-500">
      <span class="text-4xl">🏠</span>
      <p>번호 생성 버튼을 눌러보세요.</p>
    </div>

  </div>
</template>
