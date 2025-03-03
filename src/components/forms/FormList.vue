<template>
  <div class="flex flex-col gap-4 w-full p-6 bg-white rounded-md">
    <h2>فرم های من</h2>
    <div class="flex flex-wrap gap-4">
      <FormAdd />
      <FormItem v-for="form in formStore.forms" :key="form.id" :form="form" />
    </div>
  </div>
</template>

<script setup>
import { useFormSore } from "@/stores/forms";
import FormItem from "./FormItem.vue";
import FormAdd from "./FormAdd.vue";

const formStore = useFormSore();
</script>
