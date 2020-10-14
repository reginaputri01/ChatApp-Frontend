<template>
    <div class="container-fluid forgotPassword">
      <div class="container forgot-container">
        <div class="row">
            <router-link to="/login"><i class="fa fa-chevron-left" aria-hidden="true" /></router-link>
            <h5>Forgot Password</h5>
        </div>
        <h6>You’ll get messages soon on your e-mail</h6>
        <div class="form">
          <div class="form-group">
              <label>Email</label>
              <input type="email" v-model="email" class="form-control">
          </div>
        </div>
        <div class="btn-container">
          <button type="submit" id="btn" class="btn text-white" @click="handleForgotPass">Send</button>
        </div>
      </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'forgotPassword',
  data () {
    return {
      email: ''
    }
  },
  computed: {
    ...mapGetters({
      resetId: 'resetId'
    })
  },
  methods: {
    ...mapActions(['forgotPassword']),
    handleForgotPass (e) {
      e.preventDefault()
      const data = {
        email: this.email
      }
      this.forgotPassword(data)
        .then((res) => {
          alert(res.data.result.message)
        })
    },
    back () {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.forgotPassword {
  margin: 0;
  padding: 0;
  height: 655px;
  padding-top: 90px;
  background-color: #E5E5E5;
}
.forgot-container {
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
  margin-left: 25px;
  color: #7E98DF;
}
h6 {
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
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
button {
  width: 100%;
  height: 38px;
  border: none;
  font-size: 14px;
  color: #FFFFFF;
  margin-bottom: 10px;
  background-color: #7E98DF;
  border-radius: 20px;
}
</style>
