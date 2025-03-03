<template>
  <div class="input-field mt-6">
    <label :for="element.id" class="text-lg inline-block text-slate-600 mb-2">
      {{ element.label }}
      <span v-if="element.validations.required" class="text-red-600"> * </span>
    </label>

    <!-- ? TEXT, NUMBER, COLOR, RANGE -->
    <input
      class="block h-12 bg-slate-200 rounded px-2 outline-none"
      :class="element.type === 'color' ? 'w-20' : 'w-full'"
      v-if="['text', 'number', 'color', 'range'].includes(element.type)"
      :type="element.type"
      :id="element.id"
      :required="element.validations.required"
      v-bind:min="['number', 'range'].includes(element.type) ? element.validations.min : null"
      v-bind:max="['number', 'range'].includes(element.type) ? element.validations.max : null"
      v-bind:step="['number', 'range'].includes(element.type) ? element.validations.step : null"
    />

    <!-- ? SELECT -->
    <select
      class="block w-full px-4 py-3 bg-slate-200 rounded outline-none"
      v-if="element.type === 'select'"
      :name="element.id"
      :id="element.id"
      :multiple="element.multiple"
      :required="element.validations.required"
    >
      <option v-for="option in element.options" :key="option" :value="option">{{ option }}</option>
    </select>

    <!-- ? RADIO -->
    <template v-if="element.type === 'radio'">
      <div class="flex items-center gap-2" v-for="option in element.options" :key="option">
        <input
          class="size-4"
          :type="element.type"
          :id="option"
          :name="element.id"
          :value="option"
          :required="element.validations.required"
        />
        <label :for="option">{{ option }}</label>
      </div>
    </template>
  </div>
</template>

<script setup>
const { element } = defineProps({
  element: Object,
});
</script>
