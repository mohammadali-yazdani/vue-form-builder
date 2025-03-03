import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { useToast } from "vue-toastification";

const toast = useToast();

export const useFormSore = defineStore("form", {
  state: () => {
    return {
      forms: useLocalStorage("pinia/forms", []),
    };
  },

  actions: {
    addForm(form) {
      this.forms.push(form);
    },
    removeForm(id) {
      this.forms = this.forms.filter((form) => form.id !== id);
    },
    updateForm(id, name) {
      const form = this.forms.find((form) => form.id === id);

      if (form) {
        form.name = name;
      }
    },
    updateFormElements(id, elements) {
      const form = this.forms.find((form) => form.id === id);
      if (form) {
        form.elements = elements;
      }
    },
    addElement(formId, element) {
      const form = this.forms.find((form) => form.id === formId);
      if (form) {
        form.elements.push(element);
      }
    },
    removeElement(formId, elementId) {
      const form = this.forms.find((form) => form.id === formId);
      if (form) {
        form.elements = form.elements.filter((el) => el.id !== elementId);
      }
    },
    updateElement(formId, elementId, newData) {
      const form = this.forms.find((form) => form.id === formId);
      if (form) {
        const element = form.elements.find((element) => element.id === elementId);
        if (element) {
          Object.assign(element, newData);

          // toast
          toast("تغییرات ذخیره شد");
        }
      }
    },
  },

  persist: true,
});
