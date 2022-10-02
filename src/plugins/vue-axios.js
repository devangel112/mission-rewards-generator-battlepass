import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

axios.defaults.baseURL = "http://localhost:8181/"

Vue.use(VueAxios, axios)