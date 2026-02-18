import { ref } from 'vue'

const deferredPrompt = ref<any>(null)
const canInstall = ref(false)
const isInAppBrowser = ref(false)

if (import.meta.client) {
  const ua = navigator.userAgent
  isInAppBrowser.value = /KAKAOTALK|Instagram|FBAN|FBAV|Line\/|NAVER|Snapchat/i.test(ua)

  // ?autoinstall=1 감지: Chrome으로 열기를 통해 진입한 경우
  const params = new URLSearchParams(window.location.search)
  const autoInstall = params.has('autoinstall')

  // URL에서 autoinstall 파라미터 제거 (공유 시 재발동 방지)
  if (autoInstall) {
    params.delete('autoinstall')
    const newUrl = [window.location.pathname, params.toString() ? `?${params}` : '', window.location.hash].join('')
    history.replaceState(null, '', newUrl)
  }

  window.addEventListener('beforeinstallprompt', (e) => {
    if (autoInstall) {
      // preventDefault 안 함 → Chrome이 미니 인포바를 자동으로 바닥에 표시
      return
    }
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

  function openInChrome() {
    const url = new URL(window.location.href)
    url.searchParams.set('autoinstall', '1')
    const fullUrl = url.toString().replace(/^https?:\/\//, '')
    window.location.href = `intent://${fullUrl}#Intent;scheme=https;package=com.android.chrome;end`
  }

  return { canInstall, install, isInAppBrowser, openInChrome }
}
