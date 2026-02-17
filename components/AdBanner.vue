<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  position?: 'bottom' | 'side'
}>(), {
  position: 'bottom',
})

const isBottom = computed(() => props.position === 'bottom')
</script>

<template>
  <!-- 하단: 가로형 배너 -->
  <div v-if="isBottom" class="rounded-2xl border border-slate-700/50 bg-slate-800/60 backdrop-blur-sm overflow-hidden">
    <div class="flex h-[90px] items-center justify-center border-b border-dashed border-slate-700">
      <!-- AdSense slot: 승인 후 여기에 광고 코드 삽입 -->
      <p class="text-xs text-slate-600">AD - Google AdSense 배너 영역</p>
    </div>
    <p class="px-4 py-2 text-center text-[10px] text-slate-600">광고</p>
  </div>

  <!-- 사이드: 세로형 배너 -->
  <div v-else class="rounded-2xl border border-slate-700/50 bg-slate-800/60 backdrop-blur-sm overflow-hidden">
    <div class="flex h-[600px] w-[160px] items-center justify-center border-b border-dashed border-slate-700">
      <!-- AdSense slot: 승인 후 여기에 광고 코드 삽입 -->
      <p class="text-xs text-slate-600 [writing-mode:vertical-lr]">AD - Google AdSense</p>
    </div>
    <p class="px-2 py-1.5 text-center text-[10px] text-slate-600">광고</p>
  </div>
</template>
