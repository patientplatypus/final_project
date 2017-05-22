<template>
  <div class="my-username">

    <div class="usernameBlock">
      <p>
        <input id="inputname" placeholder="what's your name? :D" type="text" v-model="username" v-on:keyup.13="sendUsername">
      </p>
    </div>

  </div>
</template>

<style scoped>
  .my-username{
    /*display: inline-block;
    left: 0px;
    top: 510px;
    float: left;
    color: #F9EBE0;
    background-color: #0D2149;
    margin:10px;
    padding:10px;
    width:auto;
    position:absolute;*/
    display: inline-block;
    top: 80px;
    left: 8px;
    /*float: left;
    clear: both;*/
    word-wrap: break-word;
    background-color: transparent;
    color:#F9EBE0;
    text-align: left;
    width: 9.86%;
    margin: 0;
    padding: 0;
    position:absolute;
  }
  #inputname{
    background-color: #F9EBE0;
    outline: none;
    outline-width: 0;
    border-width: 0;
    text-align: left;
    width: 100%;
    margin: 0;
    padding: 0;
  }
  .usernameBlock h4{
    color: #0D2149;
  }
</style>

<script>
  export default {
    data: function () {
      return {
        username: ''
      }
    },
    methods: {
      sendUsername: function(){
        // var \ = "rgba("+this.numberR+","+this.numberG+","+this.numberB+","+this.numberA+")";
        // console.log("emitString inside my-colors before send ",emitString);
        // this.$parent.colorSent = emitString;
        console.log("sendUsername button has been pressed");
        console.log('value of this.username ', this.username);
        this.$parent.usernameSent = this.username;
        console.log('value of this.$parent.usernameSent ', this.$parent.usernameSent);
        this.username="";
        var inputbox = document.getElementById('inputname');
        inputbox.setAttribute('placeholder','name has been changed :)');
      }
   }
  }
</script>
