import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/user",
    component: () =>
      import(/* webpackChunkName: "user-layout" */ "../layouts/UserLayout.vue"),
    children: [
      {
        path: "",
        redirect: "login"
      },
      {
        path: "login",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "login" */ "../views/User/Login.vue")
      },
      {
        path: "register",
        name: "register",
        component: () =>
          import(
            /* webpackChunkName: "register" */ "../views/User/Register.vue"
          )
      }
    ]
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: { render: h => h("router-view") },
    children: [
      {
        path: "analysis",
        name: "analysis",
        component: () =>
          import(
            /* webpackChunkName: "analysis" */ "../views/Dashboard/Analysis.vue"
          )
      },
      {
        path: "monitor",
        name: "monitor",
        component: () =>
          import(
            /* webpackChunkName: "monitor" */ "../views/Dashboard/Monitor.vue"
          )
      }
    ]
  },
  {
    path: "/form",
    name: "form",
    component: { render: h => h("router-view") },
    children: [
      {
        path: "basic-form",
        name: "basic-form",
        component: () =>
          import(
            /* webpackChunkName: "basic-form" */ "../views/Form/BasicForm.vue"
          )
      },
      {
        path: "step-form",
        name: "step-form",
        component: () =>
          import(
            /* webpackChunkName: "step-form" */ "../views/Form/StepForm.vue"
          )
      },
      {
        path: "advanced-form",
        name: "advanced-form",
        component: () =>
          import(
            /* webpackChunkName: "advanced-form" */ "../views/Form/AdvancedForm.vue"
          )
      }
    ]
  },
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
