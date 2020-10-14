import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    token: localStorage.getItem('token') || null,
    userId: localStorage.getItem('userId') || null,
    name: localStorage.getItem('name') || null,
    username: localStorage.getItem('username') || null,
    image: localStorage.getItem('image') || null,
    phoneNumber: localStorage.getItem('phoneNumber') || null,
    listUser: [],
    friendList: []
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
      state.token = payload.token
      state.userId = payload.id
      state.name = payload.name
      state.username = payload.username
      state.image = payload.image
      state.phoneNumber = payload.phoneNumber
    },
    setListUser (state, payload) {
      state.listUser = payload
    },
    setResetId (state, payload) {
      state.resetId = payload
    },
    setLocation (state, payload) {
      state.location = payload
    }
  },
  getters: {
    isRegister (state) {
      return state.token == null
    },
    isLogin (state) {
      return state.token !== null
    },
    listUser (state) {
      return state.listUser
    },
    resetId (state) {
      return state.resetId
    },
    token (state) {
      return state.token
    },
    getUserId (state) {
      return state.userId
    },
    name (state) {
      return state.name
    },
    username (state) {
      return state.username
    },
    image (state) {
      return state.image
    },
    phoneNumber (state) {
      return state.phoneNumber
    }
  },
  actions: {
    interceptorsResponse (context) {
      axios.interceptors.response.use(function (response) {
        return response
      }, function (error) {
        console.log(error.response.data.result.message)
        if (error.response.status === 401) {
          console.log(error.response)
          if (error.response.data.result.message === 'invalid token') {
            context.commit('setToken', null)
            localStorage.removeItem('token')
            router.push('/login')
            alert('maaf anda tidak boleh merubah token dengan sendirinya')
          } else if (error.response.data.result.message === 'token expired') {
            context.commit('setToken', null)
            localStorage.removeItem('token')
            router.push('/login')
            alert('maaf session habis silahkan login kembali')
          }
        }
        return Promise.reject(error)
      })
    },
    interceptorsRequest (context) {
      axios.interceptors.request.use(function (config) {
        // Do something before request is sent
        config.headers.Authorization = `Bearer ${context.state.token}`
        return config
      }, function (error) {
        // Do something with request error
        return Promise.reject(error)
      })
    },
    registerUser (context, payload) {
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_BASE_URL}/api/v1/users/register`, payload)
          .then((res) => {
            // console.log(res)
            context.commit('setUser', res.data.result)
            resolve(res.data.result[0])
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      })
    },
    loginUser (context, payload) {
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_BASE_URL}/api/v1/users/login`, payload)
          .then(res => {
            // console.log(res)
            context.commit('setUser', res.data.result)
            localStorage.setItem('token', this.state.token)
            localStorage.setItem('userId', this.state.userId)
            localStorage.setItem('name', this.state.name)
            localStorage.setItem('username', this.state.username)
            localStorage.setItem('image', this.state.image)
            localStorage.setItem('phoneNumber', this.state.phoneNumber)
            router.push('/room')
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getUsers (context) {
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.VUE_APP_BASE_URL}/api/v1/users`)
          .then((res) => {
            // console.log(res)
            context.commit('setListUser', res.data.result)
            resolve(res.data.result)
          })
          .catch((err) => {
            // console.log(err)
            reject(err)
          })
      })
    },
    handleSearch (context, key) {
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.VUE_APP_BASE_URL}/api/v1/users?search=${key}`)
          .then((res) => {
            resolve(res.data.result)
            context.commit('setListUser', res.data.result)
          })
          .catch((err) => {
            // console.log(err)
            reject(err)
          })
      })
    },
    forgotPassword (context, payload) {
      console.log(payload)
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_BASE_URL}/api/v1/users/forgotpassword`, payload)
          .then((res) => {
            context.commit('setResetId', res.data.result)
            localStorage.setItem('resetId', this.state.resetId)
            console.log(res.data.message)
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    resetPassword (setex, payload) {
      console.log(payload)
      return new Promise((resolve, reject) => {
        axios.patch(`${process.env.VUE_APP_BASE_URL}/api/v1/users/resetpassword/${this.state.resetId}`, payload)
          .then((res) => {
            console.log(res.data.message)
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    updateUser (context, payload) {
      return new Promise((resolve, reject) => {
        axios.patch(`${process.env.VUE_APP_BASE_URL}/api/v1/users/update/${this.state.userId}`, payload)
          .then((res) => {
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    logout () {
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      localStorage.removeItem('name')
      localStorage.removeItem('username')
      localStorage.removeItem('image')
      localStorage.removeItem('phoneNumber')
    }
  },
  modules: {
  }
})
