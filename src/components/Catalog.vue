<template>
    <div>
        <h1>Catalogs</h1>
        <ul>
          <li v-for="catalog in catalogData" :key="catalog.id">
            {{ catalog.id }}
          </li>
        </ul>
    </div>
</template>

<script>
import { store } from '../store.js'
import axios from 'axios'
export default {
  name: 'SiteCatalog',
  data() {
    return {
      store,
      catalogData: null
    }
  },
  methods: {
    async getCatalogs() {
      var access_token = await this.getToken();
      var catalogs = await axios.get(process.env.VUE_APP_DATA_URL + '/catalogs', {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
      })
      this.catalogData = catalogs.data.data
    },
    async getToken() {
        if(store.client_token == null)
            await store.getClient_token();
        return store.client_token
    }
  },
  computed: {
    env() {
      return process.env;
    }
  },
  beforeMount() {
    this.getCatalogs();
  }
}
</script>