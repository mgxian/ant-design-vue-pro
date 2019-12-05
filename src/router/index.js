import Vue from "vue";
import VueRouter from "vue-router";
import NotFound from "../views/404.vue";

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
    component: () =>
      import(
        /* webpackChunkName: "basic-layout" */ "../layouts/BasicLayout.vue"
      ),
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
    component: () =>
      import(
        /* webpackChunkName: "basic-layout" */ "../layouts/BasicLayout.vue"
      ),
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
        component: { render: h => h("router-view") },
        children: [
          {
            path: "",
            redirect: "info"
          },
          {
            path: "info",
            name: "info",
            component: () =>
              import(
                /* webpackChunkName: "step-form" */ "../views/Form/StepForm/Step1.vue"
              )
          },
          {
            path: "confirm",
            name: "confirm",
            component: () =>
              import(
                /* webpackChunkName: "step-form" */ "../views/Form/StepForm/Step2.vue"
              )
          },
          {
            path: "result",
            name: "result",
            component: () =>
              import(
                /* webpackChunkName: "step-form" */ "../views/Form/StepForm/Step3.vue"
              )
          }
        ]
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
    redirect: "/dashboard/analysis"
  },
  {
    path: "*",
    name: "404",
    component: NotFound
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
