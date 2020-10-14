<template>
    <div class="container-fluid login">
        <div class="container login-container">
        <h5>Login</h5>
        <h6>Hi, Welcome back!</h6>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
              <label>Email</label>
              <input type="email" v-model="email" class="form-control">
          </div>
          <div class="form-group">
              <label>Password</label>
              <input type="password" v-model="password" class="form-control">
          </div>
          <router-link to="/forgotPassword"><p>Forgot password?</p></router-link>
          <div class="btn-container">
              <button type="submit" :disabled="checkSubmit">Login</button>
              <button @click="handleGoogle">Login with Google</button>
          </div>
        </form>
        <div class="row footer">
            <h6>Don’t have an account?</h6>
            <router-link to="/register"><p>Sign Up</p></router-link>
        </div>
      </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    handleLogin (e) {
      e.preventDefault()
      const data = {
        email: this.email,
        password: this.password
      }
      this.loginUser(data)
        .then(() => {
          this.$toast.success('Login Success.')
          this.$router.push('/room')
        })
        .catch((err) => {
          this.$toast.error(err.response.data.result)
        })
    },
    handleGoogle () {
      window.location.href = 'https://www.google.com'
    },
    ...mapActions(['loginUser'])
  },
  computed: {
    checkSubmit () {
      if (
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
.login {
  margin: 0;
  padding: 0;
  height: 655px;
  padding-top: 90px;
  background-color: #E5E5E5;
}
.login-container {
  width: 330px;
  height: 480px;
  padding: 35px;
  background: #FFFFFF;
  box-shadow: 0px 20px 20px rgba(159, 160, 161, 0.05);
  border-radius: 15px;
}
h5 {
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 26px;
  margin-bottom: 30px;
  text-align: center;
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
.footer {
  justify-content: center;
}
.footer h6 {
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  margin-top: 20px;
  line-height: 17px;
  margin-bottom: 25px;
  color: #232323;
}
.footer p {
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  margin-top: 20px;
  margin-left: 5px;
  line-height: 17px;
  margin-bottom: 25px;
  color: #7E98DF;
}
</style>
