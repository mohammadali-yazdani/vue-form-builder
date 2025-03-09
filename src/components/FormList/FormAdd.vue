<template>
  <button
    type="button"
    @click="openModal"
    class="flex items-center justify-center gap-4 sm:min-w-[300px] min-w-full h-56 bg-white text-slate-600 rounded-md border border-slate-200 cursor-pointer"
  >
    <PlusSquare :size="26" />
    <span class="text-lg"> فرم جدید </span>
  </button>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="form" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all"
            >
              <DialogTitle as="h3" class="text-lg font-medium leading-6 text-center text-gray-900">
                افزودن فرم جدید
              </DialogTitle>
              <div class="mt-2">
                <label for="formName" class="inline-block mb-3 text-sm text-slate-600">
                  نام فرم
                </label>
                <input
                  type="text"
                  id="formName"
                  v-model="formName"
                  class="w-full outline-none border px-4 py-2 rounded"
                />
              </div>

              <div class="flex justify-end items-center gap-2 mt-4">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-slate-200 px-4 py-2 text-sm font-medium text-slate-900 cursor-pointer"
                  @click="closeModal"
                >
                  لغو
                </button>
                <button
                  type="submit"
                  @click="addFormHandler"
                  class="inline-flex justify-center rounded-md border border-transparent bg-red-200 px-4 py-2 text-sm font-medium text-red-900 cursor-pointer"
                >
                  افزودن
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref } from "vue";
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from "@headlessui/vue";
import { PlusSquare } from "lucide-vue-next";
import { useFormStore } from "@/stores/forms";

const { addForm } = useFormStore();

const isOpen = ref(false);
const formName = ref("");

function closeModal() {
  isOpen.value = false;
}
function openModal() {
  isOpen.value = true;
}

function addFormHandler(e) {
  e.preventDefault();

  if (!formName.value.trim()) return;

  addForm({ name: formName.value });

  formName.value = "";
  closeModal();
}
</script>
