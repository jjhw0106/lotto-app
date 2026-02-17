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
      title: '로또 번호 추천 | 연금복권 720+ 번호 생성기',
      meta: [
        { name: 'description', content: '무료 로또 번호 추천, 연금복권 720+ 번호 생성. 랜덤/균형배분/홀짝 전략으로 행운의 번호를 뽑아보세요.' },
        { property: 'og:title', content: '로또 번호 추천 | 연금복권 720+ 번호 생성기' },
        { property: 'og:description', content: '무료 로또 번호 추천, 연금복권 720+ 번호 생성. 랜덤/균형배분/홀짝 전략으로 행운의 번호를 뽑아보세요.' },
        { property: 'og:type', content: 'website' },
      ],
    },
  },
})
