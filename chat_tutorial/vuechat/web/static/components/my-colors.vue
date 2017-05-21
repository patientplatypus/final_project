

<template>
  <div class="my-colors">
    <div class='rBlock' v-bind:style='styleObject'>
      <p>Input the R value you want</p>
      <p>
        <input type="text" v-model="numberR">
        {{numberR}}
      </p>
    </div>
    <div class="gBlock">
      <p>Input the G value you want</p>
      <p>
        <input type="text" v-model="numberG">
        {{numberG}}
      </p>
    </div>
    <div class="bBlock">
      <p>Input the B value you want</p>
      <p>
        <input type="text" v-model="numberB">
        {{numberB}}
      </p>
    </div>
    <div class="sizeBlock">
      <p>Input the line size you want</p>
      <p>
        <input type="text" v-model="lineSize">
        {{lineSize}}
      </p>
    </div>

    <button v-on:click='sendColor'>Use this color!</button>

  </div>
</template>


<style scoped>
  .my-colors {
    display: inline-block;
    float: right;
    width: 10%;
  }
  .rBlock, .bBlock, .gBlock, .sizeBlock{
    display: inline;
  }
</style>

<script>
  export default {
    data: function () {
      return {
        numberR: 0,
        numberG: 0,
        numberB: 0,
        numberA: 1,
        lineSize: 1,
        styleObject: {
          color: 'red',
          fontSize: '13px'
        }
      }
    },
    methods: {
      sendColor: function(){
        var emitString = "rgba("+this.numberR+","+this.numberG+","+this.numberB+","+this.numberA+")";
        console.log("emitString inside my-colors before send ",emitString);
        this.$parent.colorSent = emitString;
        this.$parent.sizeSent = this.lineSize;
      }
   }
  }
</script>
