<script setup>
import SidebarMenu from "@/components/SidebarMenu.vue";
import { Menu } from "lucide-vue-next";
import { ref } from "vue";

const sidebar = ref(false);
</script>

<template>
  <div class="app flex h-screen">
    <SidebarMenu v-if="sidebar" />

    <div class="flex flex-col w-full">
      <header class="flex items-center gap-4 h-12 px-6 border-b border-slate-400">
        <button
          type="button"
          class="text-slate-500 p-2 hover:bg-slate-100 rounded cursor-pointer"
          @click="sidebar = !sidebar"
        >
          <Menu size="16" />
        </button>
        <h1 class="text-xl">فرم ساز</h1>
      </header>
      <RouterView />
    </div>
  </div>
</template>
