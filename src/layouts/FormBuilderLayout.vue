<script setup>
import FormElementButton from "@/components/FormElementButton.vue";
import { elements } from "@/data/elements";
import { ChevronLeft, Home, Menu } from "lucide-vue-next";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { Container, Draggable } from "vue3-smooth-dnd";

const route = useRoute();
const shouldShowSidebar = computed(() => route.meta.showSidebar);
const sidebar = ref(true);

const activeDragId = ref(null);
const draggedElement = ref(null);

function onDragStart(dragResult) {
  const { payload } = dragResult;

  activeDragId.value = payload.elementId;
  draggedElement.value = payload;
}

function onDragEnd() {
  activeDragId.value = null;
  draggedElement.value = null;
}
</script>

<template>
  <div class="app flex h-screen">
    <aside
      v-if="shouldShowSidebar && sidebar"
      class="flex flex-col min-w-[280px] border-e border-slate-300"
    >
      <header class="flex items-center h-12 p-4 border-b border-slate-400">
        <h1 class="text-xl">فرم ساز</h1>
      </header>
      <Container
        class="flex flex-col gap-2 p-4"
        group-name="form-inputs"
        behaviour="copy"
        orientation="vertical"
        drag-class="border border-slate-900"
        :get-child-payload="(index) => elements[index]"
        @drag-start="onDragStart"
        @drag-end="onDragEnd"
      >
        <Draggable
          v-for="element in elements"
          :key="element.id"
          :class="{ 'opacity-50': activeDragId === element.elementId }"
        >
          <FormElementButton :element="element" />
        </Draggable>
      </Container>
    </aside>

    <div class="flex flex-col w-full">
      <header
        class="flex items-center justify-between bg-white h-12 px-6 border-b border-slate-400"
      >
        <div class="flex items-center gap-2">
          <button
            v-if="shouldShowSidebar"
            type="button"
            class="text-slate-500 p-2 hover:bg-slate-100 rounded cursor-pointer"
            @click="sidebar = !sidebar"
          >
            <Menu size="16" />
          </button>

          <RouterLink
            class="form-builder-link text-sm text-slate-500 font-semibold"
            :to="`/forms/${route.params.id}`"
          >
            طراحی فرم
          </RouterLink>
          <ChevronLeft class="text-slate-500" size="14" />
          <RouterLink
            class="form-builder-link text-sm text-slate-500 font-semibold"
            :to="`/forms/${route.params.id}/preview`"
          >
            پیشنمایش
          </RouterLink>
          <ChevronLeft class="text-slate-500" size="14" />
          <RouterLink
            class="form-builder-link text-sm text-slate-500 font-semibold"
            :to="`/forms/${route.params.id}/share`"
          >
            انتشار
          </RouterLink>
        </div>

        <div class="flex items-center">
          <RouterLink to="/" class="text-slate-500 p-2 hover:bg-slate-100 rounded">
            <Home size="16" />
          </RouterLink>
        </div>
      </header>
      <RouterView />
    </div>
  </div>
</template>
