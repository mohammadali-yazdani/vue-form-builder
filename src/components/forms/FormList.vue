<template>
  <div class="flex flex-col gap-4 w-full p-6 bg-white rounded-md">
    <div class="flex items-center justify-between">
      <h2>فرم های من</h2>

      <div
        class="relative flex items-center text-slate-400 border border-slate-400 rounded-full ps-2"
      >
        <Search size="18" />
        <input
          type="text"
          placeholder="جستجو..."
          class="ps-2 pe-6 py-1 text-sm outline-none"
          v-model="searchQuery"
        />
        <CircleX
          v-if="searchQuery"
          @click="searchQuery = ''"
          size="16"
          class="cursor-pointer absolute end-1"
        />
      </div>
    </div>
    <div class="flex flex-wrap gap-4">
      <FormAdd />
      <FormItem v-for="form in filteredForms" :key="form.id" :form="form" />
    </div>
  </div>
</template>

<script setup>
import { useFormSore } from "@/stores/forms";
import FormItem from "./FormItem.vue";
import FormAdd from "./FormAdd.vue";
import { CircleX, Search } from "lucide-vue-next";
import { computed, ref } from "vue";

const formStore = useFormSore();

const searchQuery = ref("");

const filteredForms = computed(() => {
  return formStore.searchFormsByName(searchQuery.value);
});
</script>
