<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  number: number;
  isBonus?: boolean;
  isMatched?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  isBonus: false,
  isMatched: false
})

const colorClass = computed(() => {
  // 보너스 번호는 금색 테두리로 구분
  if (props.isBonus) {
    return 'bg-gradient-to-br from-amber-400 to-orange-500 text-white ring-2 ring-amber-300 ring-offset-2 ring-offset-slate-900'
  }

  const num = props.number
  if (num <= 10) return 'bg-yellow-500 text-yellow-950'
  if (num <= 20) return 'bg-blue-500 text-white'
  if (num <= 30) return 'bg-red-500 text-white'
  if (num <= 40) return 'bg-gray-500 text-white'
  return 'bg-green-500 text-white'
})

const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm': return 'w-8 h-8 text-sm'
    case 'lg': return 'w-12 h-12 text-lg'
    default: return 'w-10 h-10 text-base'
  }
})

const matchedClass = computed(() => {
  return props.isMatched ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900 shadow-[0_0_15px_rgba(255,255,255,0.5)]' : ''
})
</script>

<template>
  <div
    class="flex items-center justify-center rounded-full font-bold shadow-lg transition-all duration-300"
    :class="[colorClass, sizeClass, matchedClass]"
  >
    {{ number }}
  </div>
</template>
