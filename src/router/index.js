import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { Files } from "lucide-vue-next";
import FormBuilderView from "@/views/FormBuilderView.vue";
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import FormBuilderLayout from "@/layouts/FormBuilderLayout.vue";
import FormPreviewView from "@/views/FormPreviewView.vue";
import FormShareView from "@/views/FormShareView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "فرم ساز",
      component: DashboardLayout,
      meta: {
        icon: Files,
      },
      children: [
        {
          name: "فرم های من",
          path: "",
          component: HomeView,
        },
      ],
    },
    {
      path: "/forms/:id",
      component: FormBuilderLayout,
      meta: {
        hidden: true,
      },
      children: [
        {
          path: "",
          component: FormBuilderView,
          meta: {
            showSidebar: true,
          },
        },
        {
          path: "preview",
          component: FormPreviewView,
          meta: {
            showHeader: false,
          },
        },
        {
          path: "share",
          component: FormShareView,
        },
      ],
    },
    {
      path: "/preview/:id",
      component: FormPreviewView,
      meta: {
        hidden: true,
      },
    },
  ],
});

export default router;
