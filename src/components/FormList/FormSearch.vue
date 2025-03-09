<template>
  <div class="relative flex items-center text-slate-400 border border-slate-400 rounded-full ps-2">
    <Search size="18" />
    <input
      type="text"
      placeholder="جستجو..."
      class="ps-2 pe-6 py-1 text-sm outline-none"
      v-model="query"
    />
    <CircleX v-if="query" @click="clearSearch" size="16" class="cursor-pointer absolute end-1" />
  </div>
</template>

<script setup>
// Icons
import { CircleX, Search } from "lucide-vue-next";
// Vue
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: String,
});

const emit = defineEmits(["update:modelValue"]);

const query = ref("");

function clearSearch() {
  query.value = "";
  emit("update:modelValue", "");
}

watch(
  () => props.modelValue,
  (newValue) => {
    query.value = newValue;
  }
);

watch(query, (newValue) => {
  emit("update:modelValue", newValue);
});
</script>
