import { createRouter, createWebHistory } from "vue-router";
import { routes } from "vue-router/auto-routes";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
  if (to.path.startsWith("/hymns/") || to.path.startsWith("/slides/")) {
    const hymnNumber = to.path.split("/")[2];
    if (isNaN(Number(hymnNumber))) {
      return next({ name: "/error" });
    }
  }
  next();
});

export default router;
