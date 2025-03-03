<template>
  <div class="group/editable mt-4">
    <div
      class="editable bg-white rounded-lg overflow-hidden border-2 border-transparent hover:border-orange-200"
    >
      <div
        class="editable-drag h-10 grid place-items-center text-slate-200 cursor-move opacity-0 group-hover/editable:opacity-100"
      >
        <GripHorizontal />
      </div>
      <div class="editable-field">
        <div class="editable-field--label inline-flex items-center mb-2">
          <span class="text-sm text-slate-400 text-end me-2 w-8">{{ index + 1 }}.</span>
          <span class="p-2 outline-cyan-600" @input="handleChangeLabel" contenteditable>{{
            element.label
          }}</span>
          <span v-if="element.validations.required" class="text-red-600 group-hover/field:hidden"
            >*</span
          >
        </div>
        <div class="editable-field--input px-8">
          <!-- ? INPUT (TEXT, NUMBER, COLOR) -->
          <template
            v-if="element.type === 'text' || element.type === 'number' || element.type === 'color'"
          >
            <input
              class="block w-full h-12 px-4 bg-slate-200 inset-shadow-2xs rounded"
              :type="element.type"
              disabled
            />
          </template>

          <!-- ? SELECT OPTIONS -->
          <template v-if="element.type === 'select'">
            <select
              class="block w-full h-12 px-4 bg-slate-200 inset-shadow-2xs rounded"
              :multiple="element.multiple"
              disabled
            ></select>

            <div class="options">
              <Container
                group-name="select-options"
                drag-handle-selector=".option-drag"
                :get-child-payload="getOptionPayload"
                orientation="vertical"
                @drop="handleReorderOptions"
              >
                <Draggable v-for="(option, idx) in element.options" :key="idx">
                  <div class="flex items-center gap-2 mt-2">
                    <div class="option-drag text-slate-300 cursor-move">
                      <GripVertical :size="20" />
                    </div>
                    <button
                      class="text-red-600 hover:bg-red-100 rounded-full cursor-pointer p-2"
                      @click="() => handleRemoveOption(idx)"
                    >
                      <Trash2 :size="20" />
                    </button>
                    <span
                      @input="(e) => handleChangeOption(e, idx)"
                      class="text-slate-700 p-1 outline-cyan-600"
                      contenteditable
                    >
                      {{ option }}
                    </span>
                  </div>
                </Draggable>
              </Container>

              <!-- ? ADD OPTION -->
              <button
                class="flex items-center gap-2 bg-cyan-50 text-cyan-600 hover:bg-cyan-100 rounded-full cursor-pointer py-2 px-4 mt-4"
                @click="handleAddOption"
              >
                <span class="text-slate-900">افزودن مورد</span>
                <Plus :size="20" />
              </button>
            </div>
          </template>

          <!-- ? RADIO BUTTON & CHECKBOX -->
          <template v-if="element.type === 'radio' || element.type === 'checkbox'">
            <div class="options">
              <Container
                group-name="radio-buttons"
                drag-handle-selector=".option-drag"
                :get-child-payload="getOptionPayload"
                orientation="vertical"
                @drop="handleReorderOptions"
              >
                <Draggable v-for="(option, idx) in element.options" :key="idx">
                  <div class="flex items-center gap-2 mt-2">
                    <div class="option-drag text-slate-300 cursor-move">
                      <GripVertical :size="20" />
                    </div>
                    <button
                      class="text-red-600 hover:bg-red-100 rounded-full cursor-pointer p-2"
                      @click="() => handleRemoveOption(idx)"
                    >
                      <Trash2 :size="20" />
                    </button>
                    <span
                      @input="(e) => handleChangeOption(e, idx)"
                      class="text-slate-700 p-1 outline-cyan-600"
                      contenteditable
                    >
                      {{ option }}
                    </span>
                  </div>
                </Draggable>
              </Container>

              <!-- ? ADD OPTION -->
              <button
                class="flex items-center gap-2 bg-cyan-50 text-cyan-600 hover:bg-cyan-100 rounded-full cursor-pointer py-2 px-4 mt-4"
                @click="handleAddOption"
              >
                <span class="text-slate-900">افزودن مورد</span>
                <Plus :size="20" />
              </button>
            </div>
          </template>

          <!-- ? RANGE -->
          <template v-if="element.type === 'range'">
            <input
              class="block w-full h-12 px-4 bg-slate-200 inset-shadow-2xs rounded"
              :type="element.type"
              :min="element.validations.min"
              :max="element.validations.max"
              :step="element.validations.step"
              disabled
            />

            <div class="options grid grid-cols-3 gap-4">
              <div class="min">
                <label :for="`min-${element.id}`"> کمترین </label>
                <input
                  type="number"
                  :id="`min-${element.id}`"
                  class="w-full bg-slate-200 p-2 outline-none rounded"
                  :value="element.validations.min"
                  data-id="min"
                  @input="handleSliderChange"
                />
              </div>
              <div class="step">
                <label :for="`step-${element.id}`"> گام </label>
                <input
                  type="number"
                  :id="`step-${element.id}`"
                  class="w-full bg-slate-200 p-2 outline-none rounded"
                  :value="element.validations.step"
                  data-id="step"
                  @input="handleSliderChange"
                />
              </div>
              <div class="max">
                <label :for="`max-${element.id}`"> بیشترین </label>
                <input
                  type="number"
                  :id="`max-${element.id}`"
                  class="w-full bg-slate-200 p-2 outline-none rounded"
                  :value="element.validations.max"
                  data-id="max"
                  @input="handleSliderChange"
                />
              </div>
            </div>
          </template>
        </div>

        <div
          class="editable-field--options group-hover/editable:opacity-100 flex items-center justify-between py-4 px-8 opacity-0"
        >
          <select class="outline-none" :value="element.elementId" @change="handleTypeChange">
            <option v-for="element in elements" :key="element.elementId" :value="element.elementId">
              {{ element.name }}
            </option>
          </select>

          <div class="flex items-center gap-3">
            <button
              class="flex items-center gap-1 cursor-pointer p-2 rounded hover:bg-slate-100"
              :class="{ 'bg-orange-100': element.validations.required }"
              @click="handleToggleRequired"
            >
              <Asterisk class="text-orange-400" size="18" />
              <span class="font-semibold text-xs">ضروری است؟</span>
            </button>
            <button
              type="button"
              @click="removeElement(formId, element.id)"
              class="flex items-center gap-1 cursor-pointer p-2 rounded hover:bg-slate-100"
            >
              <Trash2 class="text-orange-400" size="18" />
              <span class="font-semibold text-xs">حذف</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { elements } from "@/data/elements";
import { useFormSore } from "@/stores/forms";
import { applyDrag } from "@/utils/helper";
import { Asterisk, GripHorizontal, GripVertical, Plus, Trash2 } from "lucide-vue-next";
import { Container, Draggable } from "vue3-smooth-dnd";

const { removeElement, updateElement } = useFormSore();

const { element, index, formId } = defineProps({
  element: Object,
  index: Number,
  formId: String,
});

const getOptionPayload = (index) => {
  return element.options[index];
};

const handleChangeLabel = (event) => {
  updateElement(formId, element.id, {
    label: event.target.innerText,
  });
};

const handleToggleRequired = () => {
  updateElement(formId, element.id, {
    validations: { ...element.validations, required: !element.validations.required },
  });
};

const handleSliderChange = (event) => {
  const newVal = event.target.value;
  updateElement(formId, element.id, {
    validations: { ...element.validations, [event.target.dataset.id]: newVal },
  });
};

const handleTypeChange = (event) => {
  const newType = Number(event.target.value);
  const newElement = elements.find((el) => el.elementId === newType);
  newElement.id = element.id;

  updateElement(formId, element.id, newElement);
};

const handleAddOption = () => {
  const newIndex = element.options.length + 1;
  updateElement(formId, element.id, {
    ...element,
    options: [...element.options, `آیتم ${newIndex}`],
  });
};

const handleRemoveOption = (idx) => {
  const newOptions = [...element.options];
  newOptions.splice(idx, 1);

  updateElement(formId, element.id, {
    ...element,
    options: newOptions,
  });
};

const handleChangeOption = (event, idx) => {
  const newOptions = [...element.options];
  newOptions[idx] = event.target.innerText;

  updateElement(formId, element.id, {
    options: newOptions,
  });
};

const handleReorderOptions = (event) => {
  const newOptions = applyDrag([...element.options], event); // ایجاد نسخه جدید از لیست
  updateElement(formId, element.id, { options: newOptions });
};
</script>
