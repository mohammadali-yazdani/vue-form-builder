<template>
  <div class="flex-1 grid place-items-center text-center text-slate-600 text-lg">{{ name }}</div>
  <div class="h-12 border-t border-slate-300 mt-auto">
    <div class="h-full flex gap-4 justify-evenly items-center px-4 group-hover:hidden">
      <p class="text-sm text-slate-600">10 بازدید</p>
      <p class="text-sm text-slate-600">2 پاسخ</p>
    </div>

    <div class="h-full items-center gap-2 p-2 hidden group-hover:flex">
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
  </div>
</template>

<script setup>
const { name, id } = defineProps({
  name: String,
  id: String,
});
</script>
