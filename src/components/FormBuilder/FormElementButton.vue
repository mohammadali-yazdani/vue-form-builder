<template>
  <button
    class="flex items-center gap-2 md:px-4 md:py-2 rounded-md text-slate-700 bg-slate-200 hover:shadow-sm cursor-pointer mx-auto md:w-full"
    ref="elementRef"
    :title="element.name"
  >
    <div class="p-1 rounded" :style="{ backgroundColor: element.color }">
      <component v-if="element?.icon" :is="element.icon" size="16" />
    </div>
    <span class="hidden md:inline">
      {{ element.name }}
    </span>
  </button>
</template>

<script setup>
import { ref } from "vue";

const { element } = defineProps({
  element: Object,
});

const elementRef = ref(null);
</script>
