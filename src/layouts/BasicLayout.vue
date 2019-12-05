<template>
  <div>
    <SideMenu></SideMenu>
    <Header></Header>
    <router-view />
    <Footer></Footer>
  </div>
</template>

<script>
import SideMenu from "./SideMenu.vue";
import Header from "./Header.vue";
import Footer from "./Footer.vue";

export default {
  components: {
    SideMenu,
    Header,
    Footer
  }
};
</script>

<style />
