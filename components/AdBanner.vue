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
  <div v-if="isBottom" class="rounded-2xl border border-slate-700/50 bg-slate-800/60 backdrop-blur-sm overflow-hidden min-h-[120px]">
    <div class="flex h-[90px] items-center justify-center border-b border-dashed border-slate-700 bg-slate-900/40">
      <!-- AdSense placeholder: Replace with actual ad slot when approved -->
      <ins class="adsbygoogle"
           style="display:inline-block;width:728px;height:90px"
           data-ad-client="ca-pub-XXXXXXXXXXXX"
           data-ad-slot="XXXXXXXXXXXX"></ins>
      <p class="absolute text-[10px] text-slate-700 pointer-events-none italic uppercase tracking-widest">AdSense Horizontal Slot</p>
    </div>
    <p class="px-4 py-2 text-center text-[10px] text-slate-600 font-medium">광고 협찬 영역</p>
  </div>

  <!-- 사이드: 세로형 배너 -->
  <div v-else class="rounded-2xl border border-slate-700/50 bg-slate-800/60 backdrop-blur-sm overflow-hidden w-[160px]">
    <div class="flex h-[600px] w-full items-center justify-center border-b border-dashed border-slate-700 bg-slate-900/40">
      <!-- AdSense placeholder: Replace with actual ad slot when approved -->
      <ins class="adsbygoogle"
           style="display:inline-block;width:160px;height:600px"
           data-ad-client="ca-pub-XXXXXXXXXXXX"
           data-ad-slot="XXXXXXXXXXXX"></ins>
      <p class="absolute text-[10px] text-slate-700 pointer-events-none italic uppercase tracking-widest [writing-mode:vertical-lr]">AdSense Vertical Slot</p>
    </div>
    <p class="px-2 py-1.5 text-center text-[10px] text-slate-600 font-medium">AD</p>
  </div>
</template>
