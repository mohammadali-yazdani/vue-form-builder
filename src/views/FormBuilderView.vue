<template>
  <main class="form-design pb-5">
    <div class="form-design--inputs pb-4 px-6">
      <template v-if="!form.elements.length">
        <Container
          class="mt-4"
          @drag-enter="isEnter = true"
          @drag-leave="isEnter = false"
          @drop="onDropFromList"
          group-name="form-inputs"
          :get-child-payload="(index) => elements[index]"
          behaviour="drop-zone"
        >
          <div
            class="border border-dashed border-slate-500 h-12 rounded-md"
            :class="{ 'bg-slate-300': isEnter }"
          ></div>
        </Container>
        <div class="flex justify-center gap-1 text-slate-500 text-center mt-3">
          <p class="text-sm leading-7">نوع سوال مورد نظر را از ستون سمت راست به اینجا بکشید</p>
          <CornerLeftUp :size="20" />
        </div>
      </template>
      <Container
        v-else
        @drop="onDropFromList"
        drag-handle-selector=".editable-drag"
        drag-class="form-ghost"
        drop-class="form-ghost-drop"
        :get-child-payload="(index) => form.elements[index]"
        orientation="vertical"
        group-name="form-inputs"
      >
        <Draggable v-for="(element, index) in form.elements" :key="element.id">
          <EditableField :element="element" :index="index" :formId="id" />
        </Draggable>
      </Container>
    </div>
  </main>
</template>

<script setup>
import EditableField from "@/components/EditableField.vue";
import { elements } from "@/data/elements";
import { useFormSore } from "@/stores/forms";
import { applyDrag } from "@/utils/helper";
import { CornerLeftUp } from "lucide-vue-next";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { Container, Draggable } from "vue3-smooth-dnd";
import { v4 as uuid4 } from "uuid";

const {
  params: { id },
} = useRoute();
const formStore = useFormSore();

const isEnter = ref(false);

const form = computed(() => formStore.forms.find((form) => form.id === id));

const onDropFromList = (dropResult) => {
  const { payload } = dropResult;

  dropResult.payload = {
    ...payload,
    id: uuid4().slice(0, 5),
  };

  let updatedElements;
  if (dropResult.addedIndex !== null || dropResult.removedIndex !== null) {
    updatedElements = applyDrag(form.value.elements, dropResult);
  } else if (dropResult.payload) {
    updatedElements = [...form.value.elements, dropResult.payload];
  }

  formStore.updateFormElements(form.value.id, updatedElements);
};
</script>
