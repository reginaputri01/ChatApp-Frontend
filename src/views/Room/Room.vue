<template>
    <div class="container-fluid chat-container">
        <div class="row">
            <div class="user-container col-md-4">
                <div class="head-user">
                    <div class="d-flex justify-content-between mb-4">
                        <h3>Telegram</h3>
                        <i class="fa fa-bars menu-bar" aria-hidden="true" @click="handleMenuProfile" />
                        <MenuProfile v-show="menuProfil" v-on:handleSetting="openSetting($event)" />
                    </div>
                    <div class="my-profile mb-4">
                        <div class="profile-img">
                            <img :src="image" alt="profile">
                        </div>
                        <h5>{{getName}}</h5>
                        <h6>{{username}}</h6>
                    </div>
                    <div class="d-flex justify-content-between mb-3">
                        <input type="text" class="form-control" placeholder="Search..." v-on:keyup.enter="setSearch">
                        <i class="fa fa-plus" aria-hidden="true" />
                    </div>
                    <div class="d-flex justify-content-between menu">
                        <h5 class="mt-2">All</h5>
                        <h5 class="active">Important</h5>
                        <h5 class="mt-2">Unread</h5>
                    </div>
                </div>
                <div class="list-user">
                    <div v-for="user in listUser" :key="user.id">
                          <CardUser class="card" :item="user" />
                    </div>
                </div>
            </div>
            <div class="col-md-8">
                <div class="container-msg">
                    <ul class="list-group">
                        <div class="row username">
                          <div class="img-container">
                              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTi1fTlnz5L4wjlrDcx91vBh1IZkUl_T36cRQ&usqp=CAU" alt="Avatar" class="right" style="width:100%;">
                          </div>
                          <div>
                              <h6>Putri</h6>
                              <p>Online</p>
                          </div>
                        </div>
                        <li v-for="(message, index) in messages" class="list-group-item" :key="index">{{message.body}} - {{formatDate(message.createdAt)}}</li>
                    </ul>
                </div>
                <InputMessage @handle-send="handleSendMessage"/>
            </div>
        </div>
    </div>
</template>

<script>
import io from 'socket.io-client'
import InputMessage from '../../components/_base/InputMessage'
import CardUser from '../../components/_base/CardUser'
import MenuProfile from '../../components/_base/MenuProfile'
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'
moment.locale('id')

export default {
  name: 'Room',
  components: {
    InputMessage,
    CardUser,
    MenuProfile
  },
  data () {
    return {
      socket: io('http://localhost:4000'),
      name: '',
      messages: [],
      room: '',
      menuProfil: false,
      settingShow: false,
      receiverId: 3
    }
  },
  computed: {
    ...mapGetters({
      listUser: 'listUser',
      userId: 'getUserId',
      getName: 'name',
      username: 'username',
      image: 'image'
    })
  },
  mounted () {
    this.socket.emit('setupUserLogin', this.userId)
    this.socket.on('receiveMessage', data => {
      console.log(data)
      this.messages.push(data)
    })
    this.getUsers()
  },
  methods: {
    handleMenuProfile () {
      if (this.menuProfil === false) {
        this.menuProfil = true
      } else {
        this.menuProfil = false
      }
    },
    openSetting (openSetting) {
      this.settingShow = openSetting
    },
    closeSetting (closeSetting) {
      this.settingShow = closeSetting
    },
    handleSendMessage (data) {
      console.log(data.dom)
      data.dom.value = ''
      data.dom.focus()
      const dataMessage = {
        body: data.msg,
        senderId: this.userId,
        receiverId: this.receiverId
      }
      this.socket.emit('sendMessage', dataMessage, data => {
        this.messages.push(data)
      })
    },
    formatDate (date) {
      return moment(date).format('LT')
    },
    setSearch (e) {
      this.handleSearch(e.target.value)
    },
    ...mapActions(['getUsers', 'handleSearch'])
  }
}
</script>

<style scoped>
.container-msg{
  height: calc(100vh - 100px);
  background-color: #eceaea;
}
.chat-container {
  max-width: 100%;
  overflow: hidden;
  height: 655px;
  padding: 15px;
}
.row {
  height: 580px;
}
.user-container {
  height: auto;
  border-right: 1px solid #E5E5E5;
}
.head-user {
  padding: 20px;
}
.head-user h3 {
  font-style: normal;
  font-weight: bold;
  line-height: 34px;
  color: #7E98DF;
}
.head-user i {
  font-size: 36px;
  font-weight: normal;
  color: #7E98DF;
}
.head-user input {
  width: 85%;
  height: 45px;
  border: none;
  background-color: #FAFAFA;
  border-radius: 15px;
}
.menu {
  padding: 0px 30px;
}
.active {
  background-color:  #7E98DF;
  color: #ffffff;
  border-radius: 15px;
  text-align: center;
  padding-top: 10px;
  width: 130px;
  height: 45px;
}
.list-user {
  padding: 0px 20px;
  height: 200px;
  overflow: auto;
}
.chat {
  padding: 5px 0px;
}
.username {
  height: auto;
  padding: 5px 40px;
  background-color: #fff;
}
.img-container {
  width: 50px;
  height: 50px;
}
img {
  width: 100%;
  height: 100%;
  border-radius: 15px;
}
.username h6 {
  font-weight: bold;
  margin: 8px 15px;
  margin-bottom: 0;
}
.username p {
  font-size: 14px;
  margin-left: 15px;
  color: #7E98DF;
}
.message {
  background: #FAFAFA;
  height: 530px;
  width: 870px;
  padding-top: 20px;
  overflow: auto;
  overflow-x: hidden;
}
.box-chat {
  width: 100%;
  padding: 10px 40px;
}
.menu-bar:hover {
  opacity: 0.5;
  cursor: pointer;
}
.my-profile {
  height: 160px;
  text-align: center;
}
.my-profile .profile-img img {
  width: 100px;
  height: 100px;
}
.my-profile img {
  width: 100%;
  height: 100%;
  padding: 5px;
}
.my-profile h5 {
  font-weight: bold;
  margin-bottom: 0;
}
.my-profile h6 {
  color: #848484;
  margin-top: 2px;
  font-size: 15px;
}
</style>
