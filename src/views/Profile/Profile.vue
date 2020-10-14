<template>
    <div class="container">
      <button class="btn" @click="backRoom">Back</button>
      <div class="profile">
        <div class="img-container mb-2">
          <img :src="image" alt="img">
        </div>
        <h5>{{username}}</h5>
        <h6>Name : {{getName}}</h6>
        <p class="mt-1">Phone : {{phoneNumber}}</p>
        <div class="map">
          <GmapMap
            :center="{lat:location.lat, lng:location.lng}"
            :zoom="10"
            map-type-id="terrain"
            style="width: 440px; height: 240px;"
          >
          </GmapMap>
        </div>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Profile',
  data: () => ({
    location: {
      lat: 1,
      lng: 1
    }
  }),
  methods: {
    backRoom () {
      this.$router.push('/room')
    }
  },
  mounted () {
    this.$getLocation()
      .then(coordinates => {
        this.location.lat = coordinates.lat
        this.location.lng = coordinates.lng
      })
  },
  computed: {
    ...mapGetters({
      listUser: 'listUser',
      userId: 'getUserId',
      getName: 'name',
      username: 'username',
      image: 'image',
      phoneNumber: 'phoneNumber'
    })
  }
}
</script>

<style scoped>
.container {
  margin-top: 40px;
  padding: 30px;
  background-color: #fff;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  height: 600px;
  width: 800px;
  border-radius: 20px;
}
.img-container {
  width: 150px;
  height: 150px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
img{
  width: 100%;
  height: 100%;
}
.profile {
  text-align: center;
}
h5 {
  font-weight: bold;
  font-size: 18px;
  color: #7E98DF;
}
h6 {
  font-weight: bold;
  margin-bottom: 0;
  font-size: 15px;
}
p {
  font-size: 15px;
}
.map {
  margin-left: 160px;
}
.btn {
  background-color: #7E98DF;
  color: #fff;
}
</style>
