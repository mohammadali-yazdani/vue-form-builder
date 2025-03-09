<template>
  <div class="h-full items-center gap-2 p-2 hidden">
    <RouterLink
      :to="`/preview/${id}`"
      class="grid place-items-center flex-1 h-full text-sm text-slate-600 rounded hover:bg-slate-200 cursor-pointer"
    >
      پیشنمایش
    </RouterLink>
    <RouterLink
      :to="`/forms/${id}`"
      class="grid place-items-center flex-1 h-full text-sm text-slate-600 rounded hover:bg-slate-200 cursor-pointer"
    >
      ویرایش
    </RouterLink>
    <button
      class="grid place-items-center flex-1 h-full text-sm text-slate-600 rounded hover:bg-slate-200 cursor-pointer"
    >
      انتشار
    </button>
  </div>
</template>

<script setup>
const { id } = defineProps({
  id: String,
});
</script>
