<template>
  <div class="my-username">

    <div class="usernameBlock">
      <p>Input the username you want</p>
      <p>
        <input type="text" v-model="username">
        {{username}}
      </p>
    </div>

    <button v-on:click='sendUsername'>Use this name!</button>

  </div>
</template>

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
      }
   }
  }
</script>
