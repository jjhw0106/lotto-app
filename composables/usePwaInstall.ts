import { ref } from 'vue'

// 모듈 레벨에서 공유 — 이벤트가 한 번만 발생하므로 싱글턴으로 관리
const deferredPrompt = ref<any>(null)
const canInstall = ref(false)

if (import.meta.client) {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt.value = e
    canInstall.value = true
  })

  window.addEventListener('appinstalled', () => {
    deferredPrompt.value = null
    canInstall.value = false
  })
}

export function usePwaInstall() {
  async function install() {
    if (!deferredPrompt.value) return
    deferredPrompt.value.prompt()
    const result = await deferredPrompt.value.userChoice
    if (result.outcome === 'accepted') {
      canInstall.value = false
    }
    deferredPrompt.value = null
  }

  return { canInstall, install }
}
