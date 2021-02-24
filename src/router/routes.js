const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),

    children: [
      {
        path: "epochConverter",
        component: () => import("pages/EpochConverter.vue")
      },
      {
        path: "jsonValidator",
        component: () => import("pages/JsonValidator.vue")
      },
      {
        path: "jwtDebugger",
        component: () => import("pages/JwtDebugger.vue")
      },
      {
        path: "about",
        component: () => import("pages/About.vue")
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
