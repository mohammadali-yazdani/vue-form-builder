<template>
  <aside class="w-12 md:min-w-[280px] h-screen max-h-screen border-e border-slate-300">
    <header
      class="flex items-center justify-center md:justify-start h-12 p-2 md:p-4 border-b border-slate-400"
    >
      <h1 class="text-xl hidden md:block">فرم ساز</h1>
      <Target class="md:hidden" />
    </header>
    <nav class="flex flex-col gap-2 py-4 px-2 md:p-4">
      <ul class="flex flex-col gap-2">
        <li v-for="route in visibleRoutes" v-bind:key="route.path">
          <router-link
            class="flex items-center justify-center md:justify-start gap-2 p-2 md:px-4 md:py-2 rounded-md text-slate-600 hover:bg-slate-200"
            active-class="bg-slate-200"
            :to="route.path"
          >
            <component v-if="route.meta?.icon" :is="route.meta.icon" class="icon" size="16" />
            <span class="text-sm hidden md:inline">{{ route.name }}</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
import { Target } from "lucide-vue-next";
import { RouterLink, useRouter } from "vue-router";

const router = useRouter();
const visibleRoutes = router.options.routes.filter((route) => !route.meta?.hidden);
</script>
