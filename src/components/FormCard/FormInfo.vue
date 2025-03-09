<template>
  <div class="flex-1 grid place-items-center text-center text-slate-600 text-lg">
    <RouterLink :to="`/forms/${id}`">{{ name }}</RouterLink>
  </div>
  <div class="h-12 border-t border-slate-300 mt-auto">
    <div class="h-full flex gap-4 justify-evenly items-center px-4 group-hover:hidden">
      <p class="text-sm text-slate-600">10 بازدید</p>
      <p class="text-sm text-slate-600">2 پاسخ</p>
    </div>

    <FormNavs class="group-hover:flex" :id="id" />
  </div>
</template>

<script setup>
import FormNavs from "./FormNavs.vue";

const { name, id } = defineProps({
  name: String,
  id: String,
});
</script>
