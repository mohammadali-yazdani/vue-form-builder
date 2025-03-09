<template>
  <div class="flex flex-col gap-4 w-full p-6 bg-white rounded-md">
    <div class="sm:flex items-center justify-between">
      <h2 class="mb-4 sm:mb-0">فرم های من</h2>

      <FormSearch v-model="searchQuery" />
    </div>
    <div class="flex flex-wrap gap-4">
      <FormAdd />
      <FormCard v-for="form in filteredForms" :key="form.id" :form="form" />
    </div>
  </div>
</template>

<script setup>
// Components
import FormSearch from "./FormSearch.vue";
import FormAdd from "./FormAdd.vue";
import FormCard from "../FormCard/FormCard.vue";
// Vue
import { computed, ref } from "vue";
// Store
import { useFormStore } from "@/stores/forms";

const formStore = useFormStore();

const searchQuery = ref("");

const filteredForms = computed(() => {
  return formStore.searchFormsByName(searchQuery.value);
});
</script>
