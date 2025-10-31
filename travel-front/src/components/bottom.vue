<template>
  <div class="bottom">
    <div class="bottom1">
      <img src="../assets/image/Frame 28.png">
    </div>
    <div class="bottom2">
      <div style="font-size:20px">简介：</div>
      <div>
        © 2025 旅游资讯网 | 提供景点查询、路线预订、酒店预订、旅游资讯等一站式服务。管理员后台支持内容管理与维护，用户可享受便捷的旅游体验。
      </div>
    </div>
    <div class="bottom3">
      <div style="font-size:20px">联系我们：</div>
      <div>邮箱: example@mail.com</div>
      <div>QQ: 1760272627</div>
      <div>微信: 1760272627</div>
      <div>微博: example@mail.com</div>
      <div>电话: 12345678910</div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return{
        
      }
    },
    methods: {
      toPage(name) {
        if (name == "index") {
          this.$router.push("/")
        } else if (name == "vegetable") {
          this.$router.push("/vegetable")
        } else if (name == "information") {
          this.$router.push("/information")
        } else if (name == "shed") {
          this.$router.push("/shed")
        } else if (name == "leave") {
          this.$router.push("/leave")
        } else if (name == "manage") {
          window.open("http://localhost:3000")
        } else if (name == "car") {
          this.$router.push("/car")
        } else if (name == "favor") {
          this.$router.push("/favor")
        } else if (name == "order") {
          this.$router.push("/order")
        } else if (name == "appointment") {
          this.$router.push("/appointment")
        }
      }
    },
 }
</script>

<style scoped>
  .bottom {
      margin-top: 20px;
      width: 100%;
      height: 300px;
      display: flex;
      justify-content: space-around;
      background-color: #89A5C2;
      align-items: center;
      font-family: '黑体';
  }
  .bottom1,.bottom3,.bottom2 {
    color: #000000;
  }
  .bottom2 {
    width: 500px;
    letter-spacing: 2px;
    line-height: 30px;
  }
  .bottom1>div,.bottom3>div,.bottom2>div {
    font-size: 14px;
    margin-top: 12px;
    cursor: pointer;
  }
</style>