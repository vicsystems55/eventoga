import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import DashboardLayout from "../layouts/DashboardLayout.vue";

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    meta: { layout: "default" },
    children: [
      {
        path: "",
        name: "Home",
        component: Home,
      },
      {
        path: "auth",
        name: "Auth",
        component: () => import("../pages/authPage.vue"),
      },
      {
        path: "events",
        name: "Events",
        component: () => import("../pages/eventsPage.vue"),
      },
      {
        path: "organizers",
        name: "Organizers",
        component: () => import("../pages/organizersPage.vue"),
      },
            {
        path: "upgrade",
        name: "Upgrade",
        component: () => import("../pages/Upgrade.vue"),
      },
      {
        path: "marketplace",
        name: "Marketplace",
        component: () => import("../pages/marketplacePage.vue"),
      },
      {
        path: "about",
        name: "About",
        component: () => import("../pages/aboutPage.vue"),
      },
    ],
  },
  {
    path: "/dashboard",
    component: DashboardLayout,
    meta: { layout: "dashboard" },
    children: [
      {
        path: "",
        name: "Dashboard",
        component: () => import("../pages/dashboard/DashboardHome.vue"),
      },
      {
        path: "my-events",
        name: "MyEvents",
        component: () => import("../pages/dashboard/MyEvents.vue"),
      },
      {
        path: "bookings",
        name: "Bookings",
        component: () => import("../pages/dashboard/Bookings.vue"),
      },
      {
        path: "analytics",
        name: "Analytics",
        component: () => import("../pages/dashboard/Analytics.vue"),
      },

            {
        path: "accounts",
        name: "Accounts",
        component: () => import("../pages/dashboard/Accounts.vue"),
      },
      {
        path: "settings",
        name: "Settings",
        component: () => import("../pages/dashboard/Settings.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
