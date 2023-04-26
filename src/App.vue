<script>
import Catalog from './components/Catalog.vue'
import Order from './components/Order.vue'
import Website from './components/Website.vue'
import NotFound from './components/NotFound.vue'

const routes = {
  '/': Website,
  '/Catalog': Catalog,
  '/Order': Order,
}

export default {
  data() {
    return {
      currentPath: window.location.hash
    }
  },
  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || '/'] || NotFound
    }
  },
  mounted() {
    window.addEventListener('hashchange', () => {
      this.currentPath = window.location.hash
    })
  }
}
</script>

<template>
  <a href="#/">Websites</a> |
  <a href="#/Order">Orders</a> |
  <a href="#/Catalog">Catalogs</a>
  <component :is="currentView" />
</template>