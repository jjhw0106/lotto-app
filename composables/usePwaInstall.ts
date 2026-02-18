import { ref, computed } from 'vue'

const deferredPrompt = ref<any>(null)
const canInstall = ref(false)

// 인앱 브라우저 여부 (카카오톡, 인스타, 페북, 라인, 네이버 등)
const isInAppBrowser = ref(false)

if (import.meta.client) {
  const ua = navigator.userAgent

  isInAppBrowser.value = /KAKAOTALK|Instagram|FBAN|FBAV|Line\/|NAVER|Snapchat/i.test(ua)

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

  // Android Chrome intent URL로 강제 이동
  function openInChrome() {
    const url = window.location.href
    const intentUrl = `intent://${url.replace(/^https?:\/\//, '')}#Intent;scheme=https;package=com.android.chrome;end`
    window.location.href = intentUrl
  }

  return { canInstall, install, isInAppBrowser, openInChrome }
}
