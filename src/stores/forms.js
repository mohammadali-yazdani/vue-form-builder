import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { useToast } from "vue-toastification";
import { v4 } from "uuid";

const toast = useToast();

export const useFormStore = defineStore("form", () => {
  // * STATES
  const forms = useLocalStorage("formStore.forms", []);

  // * ACTIONS
  function addForm(form) {
    forms.value.push({ ...form, id: v4().slice(0, 5), elements: [] });
  }

  function updateForm(formId, newName) {
    const form = forms.value.find((form) => form.id === formId);

    if (form) {
      form.name = newName;
    }
  }

  function updateFormElements(formId, elements) {
    const form = forms.value.find((form) => form.id === formId);
    if (form) {
      form.elements = elements;
      toast("تغییرات ذخیره شد");
    }
  }

  function removeForm(formId) {
    forms.value = forms.value.filter((f) => f.id !== formId);
  }

  function addElement(formId, element) {
    const form = forms.value.find((f) => f.id === formId);
    if (form) {
      form.elements.push(element);
    }
  }

  function updateElement(formId, elementId, updates) {
    const form = forms.value.find((f) => f.id === formId);

    if (form) {
      const element = form.elements.find((el) => el.id === elementId);
      if (element) {
        Object.assign(element, updates);
        toast("تغییرات ذخیره شد");
      }
    }
  }

  function removeElement(formId, elementId) {
    const form = forms.value.find((f) => f.id === formId);
    if (form) {
      form.elements = form.elements.filter((el) => el.id !== elementId);
    }
  }

  function searchFormsByName(query) {
    return forms.value.filter((f) => f.name.toLowerCase().includes(query.trim().toLowerCase()));
  }

  return {
    forms,

    addForm,
    updateForm,
    updateFormElements,
    removeForm,
    addElement,
    updateElement,
    removeElement,
    searchFormsByName,
  };
});
