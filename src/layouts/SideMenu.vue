<template>
  <div style="width: 256px">
    <a-menu
      :selected-keys="selectedKeys"
      :open-keys.sync="openKeys"
      mode="inline"
      :theme="theme"
    >
      <template v-for="item in menu">
        <a-menu-item
          v-if="!item.children"
          :key="item.path"
          @click="goto(item.path)"
        >
          <a-icon :type="item.meta.icon" />
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
        <sub-menu v-else :key="item.path" :menu-info="item" />
      </template>
    </a-menu>
  </div>
</template>

<script>
import SubMenu from './SubMenu.vue'
export default {
  components: {
    'sub-menu': SubMenu
  },
  props: {
    theme: {
      type: String,
      default: 'dark'
    },
    menuFold: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const menu = this.generateMenu()
    this.openKeysMap = {}
    this.selectedKeysMap = {}
    this.generateOpenAndSelectedKeys(this.openKeysMap, this.selectedKeysMap)
    return {
      menu,
      openKeys: this.menuFold ? [] : [this.openKeysMap[this.$route.path]],
      selectedKeys: [this.selectedKeysMap[this.$route.path]]
    }
  },
  watch: {
    '$route.path': function(path) {
      this.openKeys = this.menuFold ? [] : [this.openKeysMap[path]]
      this.selectedKeys = [this.selectedKeysMap[path]]
    },
    menuFold: function() {
      this.openKeys = this.menuFold ? [] : [this.openKeysMap[this.$route.path]]
    }
  },
  mounted() {
    // console.log(this.openKeys, this.selectedKeys)
  },
  methods: {
    goto(path) {
      if (path === this.$route.path) {
        return
      }
      this.$router.push({ path: path, query: this.$route.query })
    },
    generateOpenAndSelectedKeys(openKeys, selectedKeys) {
      const routes = this.getRoutes()
      this._generateOpenAndSelectedKeys(
        openKeys,
        selectedKeys,
        routes,
        '/',
        false
      )
    },
    _generateOpenAndSelectedKeys(
      openKeys,
      selectedKeys,
      routes,
      parentPath,
      hiddenChildren
    ) {
      routes.map(route => {
        if (route.hiddenInMenu) {
          return
        }

        if (route.path == parentPath) {
          return
        }
        openKeys[route.path] = parentPath
        selectedKeys[route.path] = route.path
        if (hiddenChildren) {
          openKeys[route.path] = openKeys[parentPath]
          selectedKeys[route.path] = parentPath
        }
        if (!route.children) {
          return
        }
        let isHiddenChildren = false
        if (route.hiddenChildrenInMenu) {
          isHiddenChildren = true
        }
        this._generateOpenAndSelectedKeys(
          openKeys,
          selectedKeys,
          route.children,
          route.path,
          isHiddenChildren
        )
      })
    },
    getRoutes() {
      const routes = this.$router.options.routes
      this._relative2AbsolutePath(routes, '')
      return routes
    },
    _relative2AbsolutePath(routes, parentPath) {
      return routes.map(route => {
        if (route.path === '*') {
          return
        }
        if (route.path === '') {
          route.path = parentPath
          return
        }
        if (!route.path.startsWith('/')) {
          route.path = parentPath + '/' + route.path
        }
        if (route.children) {
          this._relative2AbsolutePath(route.children, route.path)
        }
      })
    },
    generateMenu() {
      const routes = this.getRoutes()
      return this._filterRoutes(routes)
    },
    _filterRoutes(routes) {
      let result = []
      routes.forEach(route => {
        if (route.hiddenInMenu) {
          return
        }

        if (route.path === '') {
          return
        }

        if (!route.children) {
          result.push(route)
          return
        }

        const newRoute = Object.assign({}, route)
        if (route.hiddenChildrenInMenu) {
          delete newRoute.children
        } else {
          const children = this._filterRoutes(route.children)
          newRoute.children = children.filter(child => child.meta != undefined)
        }
        result.push(newRoute)
      })
      return result
    }
  }
}
</script>
