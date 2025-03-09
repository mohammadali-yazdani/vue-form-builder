import {
  CheckSquare,
  ChevronDown,
  CircleCheckBig,
  Hash,
  Layers,
  Palette,
  Sliders,
  TextCursor,
} from "lucide-vue-next";
import { v4 } from "uuid";

export const elements = [
  {
    elementId: 1,
    name: "متن کوتاه",
    label: "یک متن کوتاه وارد کنید.",
    type: "text",
    validations: {
      required: false,
    },
    icon: TextCursor,
    color: "#74B3F2",
  },
  {
    elementId: 2,
    name: "عدد",
    label: "یک عدد وارد کنید.",
    type: "number",
    validations: {
      required: false,
      steps: null,
      min: null,
      max: null,
    },
    icon: Hash,
    color: "#FFC166",
  },
  {
    elementId: 3,
    name: "انتخاب رنگ",
    label: "یک رنگ انتخاب کنید.",
    type: "color",
    validations: {
      required: false,
    },
    icon: Palette,
    color: "#A78BFA",
  },
  {
    elementId: 4,
    name: "چک باکس",
    label: "برای تأیید، این گزینه را فعال کنید.",
    type: "checkbox",
    validations: {
      required: false,
    },
    options: [
      {
        id: v4().slice(0, 5),
        label: "مورد 1",
      },
      {
        id: v4().slice(0, 5),
        label: "مورد 2",
      },
    ],
    icon: CheckSquare,
    color: "#58D68D",
  },
  {
    elementId: 5,
    name: "گزینه رادیویی",
    label: "یک گزینه را انتخاب کنید.",
    type: "radio",
    validations: {
      required: false,
    },
    options: [
      {
        id: v4().slice(0, 5),
        label: "مورد 1",
      },
      {
        id: v4().slice(0, 5),
        label: "مورد 2",
      },
    ],
    icon: CircleCheckBig,
    color: "#F28B82",
  },
  {
    elementId: 6,
    name: "انتخاب تک گزینه‌ای",
    label: "یک گزینه را از لیست انتخاب کنید.",
    type: "select",
    validations: {
      required: false,
    },
    options: [
      {
        id: v4().slice(0, 5),
        label: "مورد 1",
      },
      {
        id: v4().slice(0, 5),
        label: "مورد 2",
      },
    ],
    icon: ChevronDown,
    color: "#74C0FC",
    multiple: false,
  },
  {
    elementId: 7,
    name: "انتخاب چند گزینه‌ای",
    label: "چند گزینه را از لیست انتخاب کنید.",
    type: "select",
    validations: {
      required: false,
    },
    options: [
      {
        id: v4().slice(0, 5),
        label: "مورد 1",
      },
      {
        id: v4().slice(0, 5),
        label: "مورد 2",
      },
    ],
    icon: Layers,
    color: "#FFB074",
    multiple: true,
  },
  {
    elementId: 8,
    name: "اسلایدر عددی",
    label: "مقدار را با اسلایدر تنظیم کنید.",
    type: "range",
    validations: {
      required: false,
      steps: 1,
      min: 0,
      max: 10,
    },
    icon: Sliders,
    color: "#C58CF5",
  },
];
