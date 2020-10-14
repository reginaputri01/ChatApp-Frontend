<template>
    <div class="user">
        <div class="d-flex justify-content-between">
            <div class="img-container">
                <img :src="item.image" alt="img">
            </div>
            <div class="cek">
                <div class="d-flex justify-content-between">
                  <h5>{{item.name}}</h5>
                  <h6>12.00</h6>
                </div>
                <p>Heyy, have a good day!</p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'CardUser',
  props: {
    item: {
      type: Object
    },
    active: {
      type: Boolean
    }
  },
  methods: {
    ...mapActions(['getUsers'])
  },
  computed: {
    ...mapGetters({
      listUser: 'listUser'
    })
  },
  mounted () {
    this.getUsers()
  }
}
</script>

<style scoped>
.user {
  max-height: 75px;
  padding: 10px 20px;
  margin-top: 0;
  border: none;
}
.user:hover {
  text-decoration: none;
  background-color: #e5e9f3;
}
.img-container {
  width: 50px;
  height: 50px;
}
img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
h5 {
  font-weight: bold;
  margin-bottom: 0;
  margin-left: 20px;
  margin-top: 5px;
  font-size: 18px;
}
h6 {
  font-size: 14px;
}
p {
  color: #7E98DF;
  margin-left: 20px;
  margin-top: 2px;
  font-size: 14px;
  padding: 0;
}
.cek {
  width: 290px;
}
</style>
