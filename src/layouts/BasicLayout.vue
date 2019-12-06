<template>
  <div>
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <a-layout-sider v-model="collapsed" collapsible :trigger="null">
        <div class="logo" />
        <SideMenu></SideMenu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <Header></Header>
        </a-layout-header>
        <a-layout-content style="margin: 0 16px">
          <router-view />
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          <Footer></Footer>
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import SideMenu from './SideMenu.vue'
import Header from './Header.vue'
import Footer from './Footer.vue'

export default {
  components: {
    SideMenu,
    Header,
    Footer
  },
  data() {
    return {
      collapsed: false
    }
  }
}
</script>

<style />
