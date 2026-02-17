export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  devServer: {
    port: 3001,
  },
  app: {
    head: {
      htmlAttrs: { lang: 'ko' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: '머니뚝 (moneyttuk) | 무료 로또 및 연금복권 번호 생성기',
      meta: [
        { name: 'description', content: '머니뚝(moneyttuk)에서 제공하는 무료 로또 6/45 및 연금복권 720+ 번호 생성 서비스입니다. 다양한 통계 전략과 랜덤 추출로 당신의 행운을 잡으세요.' },
        { property: 'og:title', content: '머니뚝 (moneyttuk) | 무료 로또 번호 생성기' },
        { property: 'og:description', content: '데이터 기반 로또 및 연금복권 번호 추천 서비스. 머니뚝에서 행운이 뚝딱!' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://moneyttuk.com' },
      ],
      link: [
        { rel: 'canonical', href: 'https://moneyttuk.com' }
      ],
      // Google AdSense script placeholder (Replace with your CA-PUB ID later)
      script: [
        // { async: true, src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX', crossorigin: 'anonymous' }
      ]
    },
  },
})
