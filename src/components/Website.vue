<template>
    <div>
        <h1>Sites</h1>
        <ul>
          <li v-for="site in sites" :key="site.id">
            {{site.id}}
          </li>
        </ul>
    </div>
</template>

<script>
import { store } from '../store.js'
import axios from 'axios'
export default {
  name: 'WebsiteOnInstance',
  data() {
    return {
      store,
      sites:null
    }
  },
  computed: {
    env() {
      return process.env;
    }
  },
  methods: {
    async getSite() {
      var access_token = await this.getToken();
      var website = await axios.get(process.env.VUE_APP_DATA_URL + '/sites', {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
      })
      this.sites = website.data.data
    },
    async getToken() {
        if(store.client_token == null)
            await store.getClient_token();
        return store.client_token
    }
  },
  beforeMount() {
    this.getSite();
  }
}
</script>