<template>
  <div>
    <input v-model="customerMail" placeholder="customer email" />
    <button @click="getOrders">Search</button>
    <p>{{ this.ordersData }}</p>
  </div>
</template>

<script>
import { store } from '../store.js'
import axios from 'axios'
export default {
  name: 'SiteOrder',
  data() {
    return {
      store,
      ordersData: null,
      customerMail: ''
    }
  },
  computed: {
    env() {
      return process.env;
    }
  },
  methods: {
    async getOrders() {
      var access_token = await this.getToken();
      var orders = await axios.post(process.env.VUE_APP_SHOP_URL + '/order_search', {
        "query": {
          "text_query": {
            "fields": [
              "customer_email"
            ],
            "search_phrase": `${this.customerMail}`
          }
        },
        "select": "(**)",
        "sorts": [{ "field": "customer_name", "sort_order": "asc" }]

      },
        {
          headers: {
            'Authorization': `Bearer ${access_token}`
          }
        })
      this.ordersData = orders.data
    },
    async getToken() {
      if (store.client_token == null)
        await store.getClient_token();
      return store.client_token
    }
  },
}
</script>