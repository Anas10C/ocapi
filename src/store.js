import { reactive } from 'vue'
import axios from 'axios'

export const store = reactive({
  BM_token: null,
  client_token: null,
  async getBM_token() {
    var result = await axios.request({
        url: '/dw/oauth2/access_token?client_id=' + process.env.VUE_APP_CLIENTID,
        method: "post",
        baseURL: 'https://' + process.env.VUE_APP_HOST_SERVER,
        auth: {
          username: process.env.VUE_APP_BM_USER_LOGIN, // This is the client_id
          password: process.env.VUE_APP_BM_USER_PASSWORD + ':' + process.env.VUE_APP_CLIENTID_PASSWORD // This is the client_secret
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: {
          "grant_type": "urn:demandware:params:oauth:grant-type:client-id:dwsid:dwsecuretoken", 
        }
      })
  this.BM_token = result.data.access_token;
  },
  async getClient_token() {

    var result = await axios.request({
        url: '/dw/oauth2/access_token',
        method: "post",
        baseURL: 'https://account.demandware.com',
        auth: {
          username: process.env.VUE_APP_CLIENTID, // This is the client_id
          password: process.env.VUE_APP_CLIENTID_PASSWORD // This is the client_secret
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: {
            "grant_type": "client_credentials", 
        }
      })
    this.client_token = result.data.access_token;
  }

})