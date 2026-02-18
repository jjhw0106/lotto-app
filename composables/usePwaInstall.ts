import { ref } from 'vue'

const deferredPrompt = ref<any>(null)
const canInstall = ref(false)
const isInAppBrowser = ref(false)
const autoInstallMode = ref(false)

if (import.meta.client) {
  const ua = navigator.userAgent
  isInAppBrowser.value = /KAKAOTALK|Instagram|FBAN|FBAV|Line\/|NAVER|Snapchat/i.test(ua)

  const params = new URLSearchParams(window.location.search)
  autoInstallMode.value = params.has('autoinstall')

  if (autoInstallMode.value) {
    params.delete('autoinstall')
    const newUrl = [window.location.pathname, params.toString() ? `?${params}` : '', window.location.hash].join('')
    history.replaceState(null, '', newUrl)
  }

  window.addEventListener('beforeinstallprompt', (e) => {
    // 항상 가로채서 deferredPrompt에 저장 (버튼 클릭 핸들러에서 사용)
    e.preventDefault()
    deferredPrompt.value = e
    canInstall.value = true
  })

  window.addEventListener('appinstalled', () => {
    deferredPrompt.value = null
    canInstall.value = false
    autoInstallMode.value = false
  })
}

export function usePwaInstall() {
  async function install() {
    if (!deferredPrompt.value) return
    deferredPrompt.value.prompt()
    const result = await deferredPrompt.value.userChoice
    if (result.outcome === 'accepted') {
      canInstall.value = false
      autoInstallMode.value = false
    }
    deferredPrompt.value = null
  }

  function openInChrome() {
    const url = new URL(window.location.href)
    url.searchParams.set('autoinstall', '1')
    const fullUrl = url.toString().replace(/^https?:\/\//, '')
    window.location.href = `intent://${fullUrl}#Intent;scheme=https;package=com.android.chrome;end`
  }

  return { canInstall, install, isInAppBrowser, openInChrome, autoInstallMode }
}
