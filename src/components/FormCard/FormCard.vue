<template>
  <div
    class="group relative flex flex-col sm:min-w-[300px] min-w-full h-56 bg-white rounded-md shadow-sm hover:shadow-md"
  >
    <FormInfo :name="form.name" :id="form.id" />
    <FormActions :name="form.name" :id="form.id" />
  </div>
</template>

<script setup>
import FormActions from "./FormActions.vue";
import FormInfo from "./FormInfo.vue";

const { form } = defineProps({
  form: Object,
});
</script>
