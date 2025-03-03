<template>
  <button
    class="flex items-center gap-2 px-4 py-2 rounded-md text-slate-700 bg-slate-200 hover:shadow-sm cursor-pointer w-full"
    ref="elementRef"
  >
    <div class="p-1 rounded" :style="{ backgroundColor: element.color }">
      <component v-if="element?.icon" :is="element.icon" size="16" />
    </div>
    <span>
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
