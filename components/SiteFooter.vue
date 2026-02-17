<template>
  <footer class="mt-20 border-t border-slate-800 bg-slate-900/50 py-12 backdrop-blur-sm">
    <div class="mx-auto max-w-4xl px-4">
      <div class="grid grid-cols-1 gap-10 md:grid-cols-3">
        <!-- Brand -->
        <div class="flex flex-col gap-4">
          <h2 class="text-xl font-bold text-white">moneyttuk.com</h2>
          <p class="text-sm text-slate-400 leading-relaxed">
            무료 로또 및 연금복권 번호 생성기.<br>
            당신의 행운이 머니뚝(moneyttuk)에서<br>
            지금 시작됩니다.
          </p>
        </div>

        <!-- Links -->
        <div class="flex flex-col gap-4">
          <h3 class="text-sm font-semibold uppercase tracking-wider text-slate-300">Information</h3>
          <ul class="flex flex-col gap-2 text-sm text-slate-400">
            <li><NuxtLink to="/about" class="hover:text-blue-400 transition-colors">회사소개</NuxtLink></li>
            <li><NuxtLink to="/privacy" class="hover:text-blue-400 transition-colors">개인정보처리방침</NuxtLink></li>
            <li><NuxtLink to="/terms" class="hover:text-blue-400 transition-colors">이용약관</NuxtLink></li>
          </ul>
        </div>

        <!-- Contact & Support -->
        <div class="flex flex-col gap-4">
          <h3 class="text-sm font-semibold uppercase tracking-wider text-slate-300">Support</h3>
          <p class="text-sm text-slate-400">
            서비스 이용 및 제휴 문의는<br>
            이용약관 내 안내된 절차를<br>
            확인해 주세요.
          </p>
        </div>
      </div>

      <div class="mt-12 border-t border-slate-800 pt-8 text-center">
        <p class="text-xs text-slate-500 italic">
          ※ 본 사이트는 무료로 번호를 추천하는 도구이며, 실제 당첨을 보장하지 않습니다. 복권 구매는 공식 판매처를 이용해 주세요.
        </p>
        <p class="mt-4 text-xs text-slate-600">
          &copy; 2026 moneyttuk.com All Rights Reserved.
        </p>
      </div>
    </div>
  </footer>
</template>
