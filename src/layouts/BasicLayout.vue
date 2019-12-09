<template>
  <div>
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <a-layout-sider v-model="collapsed" collapsible :trigger="null">
        <div class="logo" />
        <SideMenu></SideMenu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="collapsed = !collapsed"
          />
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
    <SettingDrawer></SettingDrawer>
  </div>
</template>

<script>
import SideMenu from './SideMenu.vue'
import Header from './Header.vue'
import Footer from './Footer.vue'
import SettingDrawer from '../components/SettingDrawer.vue'

export default {
  components: {
    SideMenu,
    Header,
    Footer,
    SettingDrawer
  },
  data() {
    return {
      collapsed: false
    }
  }
}
</script>

<style scoped>
.trigger {
  padding: 0 20px;
  line-height: 64px;
  font-size: 20px;
}
</style>
