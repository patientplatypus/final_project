

<template>
  <div class="my-colors">
    <div class='rBlock' v-bind:style='styleObject'>
      <p>
        <input id="sliderR" v-on:mouseup="sendColor" v-model="numberR" type="range" min="0" max="255" step="1" />
      </p>
    </div>
    <div class="gBlock">
      <p>
        <input id="sliderG" v-on:mouseup="sendColor" v-model="numberG" type="range" min="0" max="255" step="1" />
      </p>
    </div>
    <div class="bBlock">
      <p>
        <input id="sliderB" v-on:mouseup="sendColor" v-model="numberB" type="range" min="0" max="255" step="1" />
      </p>
    </div>

    <div class='pencildiv'>
      <i id="pencil1" v-on:mousedown="setSize2" class="fa fa-pencil" style="border-width: 7px; border-style: solid; border-color:black; font-size:48px; background-color: #F9EBE0; border-radius: 5px;" aria-hidden="true"></i>
      <i id="pencil2" v-on:mousedown="setSize4" class="fa fa-pencil" style="font-size:70px; background-color: #F9EBE0; border-radius: 5px;" aria-hidden="true"></i>
      <i id="pencil3" v-on:mousedown="setSize8" class="fa fa-pencil" style="font-size:120px; background-color: #F9EBE0; border-radius: 5px;" aria-hidden="true"></i>
    </div>


  </div>
</template>


<style scoped>

  .pencildiv{
    text-align: center;
    margin: 0 auto;
  }

  .my-colors {
    display: inline-block;
    float: right;
    background-color: #208AAE;
    height: 803px;
    width: 20%;
  }
  .rBlock, .bBlock, .gBlock, .sizeBlock{
    display: inline-block;
    width: 100%;
    height: 20%;
    margin-left: 5%;
    float:left;
  }
  #sliderR, #sliderG, #sliderB, #sliderS{
    height: 40px;
    width: 80%;
  }

  /*slider styling courtesy of http://danielstern.ca/range.css/#/*/


  #sliderR {
    -webkit-appearance: none;
    width: 90%;
    margin: 13.8px 0;
    background: transparent;
  }
  #sliderR:focus {
    outline: none;
  }
  #sliderR::-webkit-slider-runnable-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    background: #f9ebe0;
    border-radius: 1.3px;
    border: 0.2px solid #000000;
  }
  #sliderR::-webkit-slider-thumb {
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    border: 1px solid #000000;
    height: 36px;
    width: 16px;
    border-radius: 3px;
    background: #ff0000;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -14px;
  }
  #sliderR:focus::-webkit-slider-runnable-track {
    background: #fdf9f5;
  }
  #sliderR::-moz-range-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    background: #f9ebe0;
    border-radius: 1.3px;
    border: 0.2px solid #000000;
  }
  #sliderR::-moz-range-thumb {
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    border: 1px solid #000000;
    height: 36px;
    width: 16px;
    border-radius: 3px;
    background: #ff0000;
    cursor: pointer;
  }
  #sliderR::-ms-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
  #sliderR::-ms-fill-lower {
    background: #f5ddcb;
    border: 0.2px solid #000000;
    border-radius: 2.6px;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  }
  #sliderR::-ms-fill-upper {
    background: #f9ebe0;
    border: 0.2px solid #000000;
    border-radius: 2.6px;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  }
  #sliderR::-ms-thumb {
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    border: 1px solid #000000;
    height: 36px;
    width: 16px;
    border-radius: 3px;
    background: #ff0000;
    cursor: pointer;
    height: 8.4px;
  }
  #sliderR:focus::-ms-fill-lower {
    background: #f9ebe0;
  }
  #sliderR:focus::-ms-fill-upper {
    background: #fdf9f5;
  }


  #sliderG {
    -webkit-appearance: none;
    width: 90%;
    margin: 13.8px 0;
    background: transparent;
  }
  #sliderG:focus {
    outline: none;
  }
  #sliderG::-webkit-slider-runnable-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    background: #f9ebe0;
    border-radius: 1.3px;
    border: 0.2px solid #000000;
  }
  #sliderG::-webkit-slider-thumb {
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    border: 1px solid #000000;
    height: 36px;
    width: 16px;
    border-radius: 3px;
    background: #00ff00;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -14px;
  }
  #sliderG:focus::-webkit-slider-runnable-track {
    background: #fdf9f5;
  }
  #sliderG::-moz-range-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    background: #f9ebe0;
    border-radius: 1.3px;
    border: 0.2px solid #000000;
  }
  #sliderG::-moz-range-thumb {
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    border: 1px solid #000000;
    height: 36px;
    width: 16px;
    border-radius: 3px;
    background: #00ff00;
    cursor: pointer;
  }
  #sliderG::-ms-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
  #sliderG::-ms-fill-lower {
    background: #f5ddcb;
    border: 0.2px solid #000000;
    border-radius: 2.6px;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  }
  #sliderG::-ms-fill-upper {
    background: #f9ebe0;
    border: 0.2px solid #000000;
    border-radius: 2.6px;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  }
  #sliderG::-ms-thumb {
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    border: 1px solid #000000;
    height: 36px;
    width: 16px;
    border-radius: 3px;
    background: #00ff00;
    cursor: pointer;
    height: 8.4px;
  }
  #sliderG:focus::-ms-fill-lower {
    background: #f9ebe0;
  }
  #sliderG:focus::-ms-fill-upper {
    background: #fdf9f5;
  }

  #sliderB {
    -webkit-appearance: none;
    width: 90%;
    background: transparent;
    margin: 13.8px 0;
  }
  #sliderB:focus {
    outline: none;
  }
  #sliderB::-webkit-slider-runnable-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    background: #f9ebe0;
    border-radius: 1.3px;
    border: 0.2px solid #000000;
  }
  #sliderB::-webkit-slider-thumb {
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    border: 1px solid #000000;
    height: 36px;
    width: 16px;
    border-radius: 3px;
    background: #0000ff;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -14px;
  }
  #sliderB:focus::-webkit-slider-runnable-track {
    background: #fdf9f5;
  }
  #sliderB::-moz-range-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    background: #f9ebe0;
    border-radius: 1.3px;
    border: 0.2px solid #000000;
  }
  #sliderB::-moz-range-thumb {
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    border: 1px solid #000000;
    height: 36px;
    width: 16px;
    border-radius: 3px;
    background: #0000ff;
    cursor: pointer;
  }
  #sliderB::-ms-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
  #sliderB::-ms-fill-lower {
    background: #f5ddcb;
    border: 0.2px solid #000000;
    border-radius: 2.6px;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  }
  #sliderB::-ms-fill-upper {
    background: #f9ebe0;
    border: 0.2px solid #000000;
    border-radius: 2.6px;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  }
  #sliderB::-ms-thumb {
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    border: 1px solid #000000;
    height: 36px;
    width: 16px;
    border-radius: 3px;
    background: #0000ff;
    cursor: pointer;
    height: 8.4px;
  }
  #sliderB:focus::-ms-fill-lower {
    background: #f9ebe0;
  }
  #sliderB:focus::-ms-fill-upper {
    background: #fdf9f5;
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
        lineSize: 2,
        emitString: ""
      }
    },
    methods: {
      sendColor: function(){
        this.emitString = "rgba("+this.numberR+","+this.numberG+","+this.numberB+","+this.numberA+")";
        // var pencil1 = document.getElementById("pencil1");
        // pencil1.setAttribute('style', color: emitstring);
        document.getElementById("pencil1").style["color"] = this.emitString;
        document.getElementById("pencil2").style["color"] = this.emitString;
        document.getElementById("pencil3").style["color"] = this.emitString;

        document.getElementById("pencil1").style["border-color"] = this.emitString;
        document.getElementById("pencil2").style["border-color"] = this.emitString;
        document.getElementById("pencil3").style["border-color"] = this.emitString;

        console.log("emitString inside my-colors before send ",this.emitString);
        this.$parent.colorSent = this.emitString;
        this.$parent.sizeSent = this.lineSize;
      },
      setSize2: function(){

        document.getElementById("pencil2").style["border-width"] = "0px";
        document.getElementById("pencil3").style["border-width"] = "0px";

        document.getElementById("pencil1").style["border-width"] = "7px";
        document.getElementById("pencil1").style["border-style"] = "solid";
        document.getElementById("pencil1").style["border-color"] = this.emitString;

        this.lineSize = 2;
        this.sendColor();

      },
      setSize4: function(){

        document.getElementById("pencil1").style["border-width"] = "0px";
        document.getElementById("pencil3").style["border-width"] = "0px";

        document.getElementById("pencil2").style["border-width"] = "7px";
        document.getElementById("pencil2").style["border-style"] = "solid";
        document.getElementById("pencil2").style["border-color"] = this.emitString;

        this.lineSize = 4;
        this.sendColor();
      },
      setSize8: function(){

        var emitString = "rgba("+this.numberR+","+this.numberG+","+this.numberB+","+this.numberA+")";

        document.getElementById("pencil1").style["border-width"] = "0px";
        document.getElementById("pencil2").style["border-width"] = "0px";

        document.getElementById("pencil3").style["border-width"] = "7px";
        document.getElementById("pencil3").style["border-style"] = "solid";
        document.getElementById("pencil3").style["border-color"] = this.emitString;

        this.lineSize = 8;
        this.sendColor();
      }
   }
  }
</script>
