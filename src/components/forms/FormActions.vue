<template>
  <div class="absolute end-4 top-4">
    <Menu as="div" class="relative">
      <MenuButton
        class="grid place-items-center rounded-full p-1 hover:bg-slate-200 cursor-pointer"
      >
        <Ellipsis :size="20" />
      </MenuButton>

      <MenuItems
        class="absolute end-full top-0 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
      >
        <div class="px-1 py-1">
          <MenuItem>
            <button
              type="button"
              @click="() => openModal('rename')"
              class="flex justify-between w-full items-center gap-2 rounded-md px-2 py-2 text-sm cursor-pointer hover:bg-slate-200"
            >
              تغییر نام
              <Edit :size="16" />
            </button>
          </MenuItem>

          <MenuItem>
            <button
              type="button"
              @click="() => openModal('remove')"
              class="flex justify-between w-full items-center gap-2 text-red-600 rounded-md px-2 py-2 text-sm cursor-pointer hover:bg-slate-200"
            >
              حذف
              <Trash2 :size="16" />
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>

    <!-- RENAME DIALOG -->
    <TransitionRoot appear :show="isOpen.rename" as="template">
      <Dialog as="div" @close="() => closeModal('rename')" class="relative z-10">
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
                <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-center text-gray-900"
                >
                  ویرایش نام فرم
                </DialogTitle>
                <div class="mt-2">
                  <label for="formName" class="inline-block mb-3 text-sm text-slate-600">
                    نام جدید فرم
                  </label>
                  <input
                    type="text"
                    id="formName"
                    class="w-full outline-none border px-4 py-2 rounded"
                    :value="name"
                  />
                </div>

                <div class="flex justify-end items-center gap-2 mt-4">
                  <button
                    type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-slate-200 px-4 py-2 text-sm font-medium text-slate-900 cursor-pointer"
                    @click="() => closeModal('rename')"
                  >
                    لغو
                  </button>
                  <button
                    type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-red-200 px-4 py-2 text-sm font-medium text-red-900 cursor-pointer"
                  >
                    ویرایش
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- REMOVE DIALOG -->
    <TransitionRoot appear :show="isOpen.remove" as="template">
      <Dialog as="form" @close="() => closeModal('remove')" class="relative z-10">
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
                <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-center text-gray-900"
                >
                  حذف فرم
                </DialogTitle>
                <div class="mt-2">
                  <p class="text-lg font-semibold text-slate-500">
                    آیا مطمئنید می‌خواهید فرم
                    <span class="font-bold text-black mx-2">{{ name }}</span> را حذف کنید؟
                  </p>
                </div>

                <div class="flex justify-end items-center gap-2 mt-4">
                  <button
                    type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-slate-200 px-4 py-2 text-sm font-medium text-slate-900 cursor-pointer"
                    @click="() => closeModal('remove')"
                  >
                    لغو
                  </button>
                  <button
                    type="submit"
                    @click="removeFormHandler"
                    class="inline-flex justify-center rounded-md border border-transparent bg-red-200 px-4 py-2 text-sm font-medium text-red-900 cursor-pointer"
                    autofocus
                  >
                    حذف شود
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import { useFormSore } from "@/stores/forms";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { Edit, Ellipsis, Trash2 } from "lucide-vue-next";
import { ref } from "vue";

const { name, id } = defineProps({
  name: String,
  id: String,
});

const { removeForm } = useFormSore();

const isOpen = ref({
  rename: false,
  remove: false,
});

function closeModal(name) {
  isOpen.value = { ...isOpen.value, [name]: false };
}
function openModal(name) {
  isOpen.value = { ...isOpen.value, [name]: true };
}

function removeFormHandler(e) {
  e.preventDefault();

  removeForm(id);
  closeModal("remove");
}
</script>
