<script setup lang="ts">
definePageMeta({
  middleware: [
    function (to, from) {
      return navigateTo('/lotto', { redirectCode: 301 })
    },
  ],
})
</script>
