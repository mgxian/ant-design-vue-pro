<template>
  <div>
    <a-drawer
      title="Basic Drawer"
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
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
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
  methods: {
    onClose() {
      this.visible = false
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
