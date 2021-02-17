const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),

    children: [
      {
        path: "epochConverter",
        component: () => import("components/EpochConverter.vue")
      },
      {
        path: "jsonValidator",
        component: () => import("components/JsonValidator.vue")
      },
      {
        path: "about",
        component: () => import("components/About.vue")
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
