<template>
    <div class="container-fluid splash">
        <div class="row">
            <img src="../../assets/icon.png" alt="icon">
            <div class="column">
                <h1>Telegram</h1>
                <h6>Start to enjoy the ease of communicating</h6>
            </div>
        </div>
        <router-link to="/login">
            <button>Get Started</button>
        </router-link>
    </div>
</template>

<script>
export default {
  name: 'Landing'
}
</script>

<style scoped>
.splash {
  margin: 0;
  padding: 0;
  width: auto;
  height: 657px;
  padding: 140px 400px;
  text-align: center;
  background-color: #7E98DF;
}
img {
    width: 250px;
    height: 250px;
}
h1 {
    margin-top: 80px;
    font-size: 70px;
    font-weight: bolder;
}
h6 {
    margin-left: 10px;
}
button {
    width: 200px;
    height: 50px;
    border-radius: 30px;
    margin-top: 30px;
    border: none;
    background-color: #5d80e0;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
    color: #fff;
    font-weight: 500;
}
button:hover {
    background-color: #3f6be4;
}
@media screen and (min-width: 200px) and (max-width: 980px) {
    .splash {
        margin: 0;
        padding: 0;
        width: auto;
        height: 640px;
        padding: 20px;
        text-align: center;
        background-color: #7E98DF;
    }
    img{
        display: block;
        margin: auto;
        padding: auto;
    }
    h1 {
        margin-left: 20px;
    }
    h6 {
        margin-left: 20px;
    }
}
</style>
