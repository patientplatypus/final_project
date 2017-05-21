<template>
  <div class="my-app">
    <div class='titlebar'>
      <h1>NOTAHOTDOG</h1>
    </div>

    <input class='textinput' type="text" v-model="message" v-on:keyup.13="sendMessage" >
    <ul v-for="message in messages">
      <li>
         {{message.body}}
      </li>
    </ul>
  </div>

</template>

<style scoped>
  .my-app {
    display: inline-block;
    float: left;
    word-wrap: break-word;
    background-color: #208AAE;
    color:#F9EBE0;
    text-align: left;
    width: 20%;
    height: 803px;
    margin: 0;
    padding: 0;
    position:relative;
  }
  .titlebar{
    width: 100%;
    background-color: #F9EBE0;
  }
  .my-app h1{
    color: #60492C;
    text-align: center;
  }
  .textinput{
    width: 100%;
    background-color: #0D2149;
  }
</style>

<script>
export default {
  data() {
    return {
      message: "",
      usernameToUse: "anon",
      tenmessages: ''
    }
  },
  props: {
    useThisUsername: {
      type: String
    }
  },
  watch: {
    useThisUsername (n,o){
      console.log('useThisUsername watch, ', n,o);
      this.usernameToUse=n;
    }
  },
  computed: {
    messages() {
      this.tenmessages = this.$parent.messages.slice(-10);
      return this.tenmessages
    }
  },
  methods: {
    sendMessage() {
      this.message = this.usernameToUse + ": " + this.message;
      this.$parent.channel.push("new_msg", { body: this.message })
      this.message = ''
    }
  }
}
</script>

<style lang="sass">
.my-app {
  margin-left: auto;
  margin-right: auto;
width: 800px;
  h1 {
    text-align: center;
  }
}
</style>
