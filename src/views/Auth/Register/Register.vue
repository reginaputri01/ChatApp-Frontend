<template>
    <div class="container-fluid register">
      <div class="container register-container">
        <div class="row">
            <router-link to="/login"><i class="fa fa-chevron-left" aria-hidden="true" /></router-link>
            <h5>Register</h5>
        </div>
        <h6>Let's create your account!</h6>
        <form @submit.prevent="handleRegister">
          <div class="form-group">
              <label>Name</label>
              <input type="text" v-model="name" class="form-control">
          </div>
          <div class="form-group">
              <label>Email</label>
              <input type="email" v-model="email" class="form-control">
          </div>
          <div class="form-group">
              <label>Password</label>
              <input type="password" v-model="password" class="form-control">
          </div>
          <div class="btn-container">
              <button type="submit" :disabled="checkSubmit">Register</button>
              <button @click="handleGoogle">Register with Google</button>
          </div>
        </form>
      </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'register',
  data () {
    return {
      errors: [],
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    handleRegister (e) {
      e.preventDefault()
      const data = {
        name: this.name,
        email: this.email,
        password: this.password
      }
      this.registerUser(data)
        .then(() => {
          this.$toast.success('Register Success.')
          this.$router.push('/room')
          this.$router.go(0)
        })
        .catch((err) => {
          this.$toast.error(err.response.data.result)
          console.log(err)
        })
    },
    handleGoogle () {
      window.location.href = 'https://www.google.com'
    },
    ...mapActions(['registerUser'])
  },
  computed: {
    checkSubmit () {
      if (
        this.name &&
        this.email &&
        this.password
      ) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style scoped>
.register {
  margin: 0;
  padding: 0;
  height: 655px;
  padding-top: 90px;
  background-color: #E5E5E5;
}
.register-container {
  width: 330px;
  height: 490px;
  padding: 35px;
  background: #FFFFFF;
  box-shadow: 0px 20px 20px rgba(159, 160, 161, 0.05);
  border-radius: 15px;
}
i {
  color: #7E98DF;
  margin: 5px 15px;
}
h5 {
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 26px;
  margin-bottom: 30px;
  margin-left: 60px;
  color: #7E98DF;
}
h6:first-of-type {
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  margin-bottom: 25px;
  color: #232323;
}
.form-group {
  margin-bottom: 30px;
}
.form-group label {
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  color: #232323;
}
.form-control {
  border: none;
  border-radius: 0;
  padding: 0;
  font-size: 14px;
  height: 20px;
  border-bottom: 1px solid black;
}
p:first-of-type {
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 17px;
  text-align: right;
  margin-bottom: 25px;
  color: #7E98DF;
}
button:first-of-type {
  width: 100%;
  height: 38px;
  border: none;
  font-size: 14px;
  color: #FFFFFF;
  margin-bottom: 10px;
  background-color: #7E98DF;
  border-radius: 20px;
}
button:last-of-type {
  width: 100%;
  height: 38px;
  border: 1px solid #7E98DF;
  font-size: 14px;
  color: #7E98DF;
  background-color: #FFFFFF;
  border-radius: 20px;
}
</style>
