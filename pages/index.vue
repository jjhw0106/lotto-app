<script setup lang="ts">
// 메인 접속 시 /lotto로 즉시 이동
definePageMeta({
  middleware: [
    function () {
      return navigateTo('/lotto', { redirectCode: 301 })
    },
  ],
})
</script>

<template>
  <div></div>
</template>
