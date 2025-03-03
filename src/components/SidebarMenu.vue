<template>
  <aside class="min-w-[280px] h-screen max-h-screen border-e border-slate-300">
    <header class="flex items-center h-12 p-4 border-b border-slate-400">
      <h1 class="text-xl">فرم ساز</h1>
    </header>
    <nav class="flex flex-col gap-2 p-4">
      <ul class="flex flex-col gap-2">
        <li v-for="route in visibleRoutes" v-bind:key="route.path">
          <router-link
            class="flex items-center gap-2 px-4 py-2 rounded-md text-slate-600 hover:bg-slate-200"
            active-class="bg-slate-200"
            :to="route.path"
          >
            <component v-if="route.meta?.icon" :is="route.meta.icon" class="icon" size="16" />
            <span class="text-sm">{{ route.name }}</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
import { RouterLink, useRouter } from "vue-router";

const router = useRouter();
const visibleRoutes = router.options.routes.filter((route) => !route.meta?.hidden);
</script>
