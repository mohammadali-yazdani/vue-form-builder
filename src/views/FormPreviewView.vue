<template>
  <header v-if="shouldShowHeader" class="flex items-center h-12 px-6 shadow-sm">
    <h1 class="text-xl">فرم ساز</h1>
  </header>

  <form class="min-h-[calc(100vh-48px)]" v-if="form.elements.length">
    <div class="p-6">
      <h1 class="font-semibold text-2xl">{{ form.name }}</h1>

      <PreviewInput v-for="element in form.elements" :key="element.id" :element="element" />

      <div class="my-5">
        <button
          class="font-semibold px-5 py-2 text-white bg-cyan-600 hover:bg-cyan-700 rounded cursor-pointer"
          type="submit"
          @click="handleSubmit"
        >
          ثبت
        </button>
      </div>
    </div>
  </form>

  <div class="py-20 grid place-items-center" v-else>
    <p class="text-slate-500">فرم مورد نظر خالی است!</p>
  </div>
</template>

<script setup>
import PreviewInput from "@/components/FormPreview/PreviewInput.vue";
import { useFormStore } from "@/stores/forms";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const formStore = useFormStore();

const shouldShowHeader = computed(() => route.meta.showHeader);

const form = formStore.forms.find((form) => form.id === route.params.id);

const handleSubmit = (event) => {
  event.preventDefault();
  console.log(event);
};
</script>
