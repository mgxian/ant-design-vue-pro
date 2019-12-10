<template>
  <div>
    <a-drawer
      placement="right"
      :closable="false"
      :visible="visible"
      width="300px"
      @close="onClose"
    >
      <template v-slot:handle>
        <a-icon
          class="handle"
          :type="visible ? 'close' : 'setting'"
          @click="visible = !visible"
        />
      </template>
      <div>
        <h2>整体风格设置</h2>
        <a-radio-group :value="navTheme" @change="handleNavThemeChange">
          <a-radio value="dark">黑色</a-radio>
          <a-radio value="light">白色</a-radio>
        </a-radio-group>
        <h2>导航模式</h2>
        <a-radio-group :value="navPosition" @change="handleNavPostionChange">
          <a-radio value="left">左侧</a-radio>
          <a-radio value="top">顶部</a-radio>
        </a-radio-group>
      </div>
    </a-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false
    }
  },
  computed: {
    navTheme() {
      return this.$route.query.navTheme || 'dark'
    },
    navPosition() {
      return this.$route.query.navPostion || 'left'
    }
  },
  methods: {
    onClose() {
      this.visible = false
    },
    handleNavThemeChange(e) {
      let theme = e.target.value
      this.$router.push({
        query: {
          ...this.$route.query,
          navTheme: theme
        }
      })
    },
    handleNavPostionChange(e) {
      let position = e.target.value
      this.$router.push({
        query: {
          ...this.$route.query,
          navPostion: position
        }
      })
    }
  }
}
</script>

<style scoped>
.handle {
  position: absolute;
  display: flex;
  top: 240px;
  right: 300px;
  width: 48px;
  height: 48px;
  font-size: 20px;
  color: white;
  background-color: #1890ff;
  border-radius: 4px 0 0 4px;
  align-items: center;
  justify-content: center;
}
</style>
