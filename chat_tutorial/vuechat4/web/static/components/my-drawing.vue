
<template>
  <div class="my-drawing">
    <div v-if="canDrawOK === true">
      <canvas id="canvas" v-on:mousedown="handleMouseDown" v-on:mouseup="handleMouseUp" v-on:mousemove="handleMouseMove" width="800px" height="800px"></canvas>
    </div>
    <div v-else-if="canDrawOK === false">
      <div class="shownotahotdog">
        <h1>Here is the picture everyone made!</h1>
      </div>

        <canvas id="canvas" width="800px" height="800px" style="zoom:50%"></canvas>

      <div class="shownotahotdog">
        <h1>So the question you got to ask yourself punk....</h1>
        <h1>...ishotdog? or isnothotdog?</h1>
          <button class="button" v-on:click='ishotdog'>ishotdog</button>
          <button class="button" v-on:click='isnothotdog'>isnothotdog</button>
        <h1>Number who say ishotdog {{this.$parent.ishotdog}}</h1>
        <h1>Number who say isnothotdog {{this.$parent.isnothotdog}}</h1>
        <h1>Therefore percent hotdog is {{percenthotdog()}}</h1>
      </div>


    </div>
    <div v-else-if="canDrawOK === null">
      <div class="rules">
        <h1>Here are the rules of the game</h1>
        <h2>Once someone presses the hotdogtimer button on the right
        everyone will have 2 minutes to draw notahotdog. The goal of the game
        is to draw whatever you want, as long as it's NOT a hotdog. Of course
        there might be one or two total jabronis that will try and draw a hotdog
        just to mess with everyone's head! Afterwards everyone gets to vote on whether
        it's a hotdog or not, and has the option of playing again.
        Have fun!</h2>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .my-drawing {
    /*display: inline-block;*/
    /*float: left;*/
    display:flex;
    /*width: 50%;*/
    text-align: center;
    align-items:center;
    justify-content:center;
    background-color: #0D2149;
  }
  .rules {
    color: white;
    height: 783px;
    text-align: center;
    padding-left: 10%;
    padding-right: 10%;
  }
  .shownotahotdog{
    color: white;
    /*height: 783px;*/
    text-align: center;
    padding-left: 10%;
    padding-right: 10%;
  }
  .button{
    color: black;
  }
</style>

<script>
export default {
  data: function () {
    return {
      mouse: {
        current: {
          x: 0,
          y: 0
        },
        previous: {
          x: 0,
          y: 0
        },
        down: false
      },
      canvasImage:[],
      colorToUse:"rgba(255,0,0,1)",
      sizeToUse: 1,
      canDrawOK: null,
    }
  },
  props: {
    useThisColor: {
      type: String
    },
    useThisCanvas: {
      type: Array
    },
    useThisSize: {
      type: String
    },
    canDraw: {
      type: Boolean
    }
  },
  watch: {
    canDraw (n,o){
      console.log('canDraw watch ', n,o);
      this.canDrawOK=n
      if (n === true){
        var c = document.getElementById('canvas');
        var ctx = c.getContext('2d');
        ctx.clearRect(0,0,800,800);
      }
    },
    useThisSize (n,o){
      console.log('useThisSize watch, ', n,o);
      this.sizeToUse=n;
    },
    canvasImage (n,o){
      console.log("canvasImage watch, ", n[0], o[0]);
    },
    useThisColor (n, o) {
      console.log("useThisColor watch, ", n, o) // n is the new value, o is the old value.
      this.colorToUse=n;
    },
    useThisCanvas (newCanvas, oldCanvas) {
      console.log("useThisCanvas watch, ", newCanvas[0], oldCanvas[0]) // n is the new value, o is the old value.

        var looplength = newCanvas.length;

        //method for dynamic variable name generation
        //to make sure that no two created canvas elements overlap
        // var pageNumber = 1;
        // window["text" + pageNumber] = 123;
        // alert(window["text" + pageNumber]);

        var canvasID = Date.now();
        window["createCanvas" + canvasID] = document.createElement('canvas');
        window["createCanvas" + canvasID].width = 800;
        window["createCanvas" + canvasID].height = 800;
        window["createCanvas" + canvasID].background = "transparent";
        window["createCanvas" + canvasID].borderRadius = "3px";
        window["createCanvas" + canvasID].borderColor = "black";
        window["createCanvas" + canvasID].borderStyle = "solid";

        window["ctx" + canvasID] = window["createCanvas" + canvasID].getContext('2d');

        // var c = document.getElementById('canvas');
        // var ctx = c.getContext('2d');
        // ctx.closePath();


        if (looplength>1){
          // var c = document.getElementById('canvas');
          // var ctx = c.getContext('2d');
          // ctx.clearRect(0,0,800,800);


          for (var x = 1; x<looplength; x++){
            // ctx.beginPath();
            // ctx.clearRect(0,0,800,800);
            // ctx.beginPath();
            window["ctx" + canvasID].beginPath();
            window["ctx" + canvasID].moveTo(newCanvas[x-1][0], newCanvas[x-1][1]);
            window["ctx" + canvasID].lineTo(newCanvas[x][0], newCanvas[x][1]);
            // console.log('newCanvas[x][3] is ', newCanvas[x][3]);
            window["ctx" + canvasID].strokeStyle = newCanvas[x][2];
            window["ctx" + canvasID].lineWidth = newCanvas[x][3];
            window["ctx" + canvasID].stroke();
            window["ctx" + canvasID].closePath();
          }
        }

        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d');
        ctx.drawImage(window["createCanvas" + canvasID], 0, 0);

        window["createCanvas" + canvasID].remove();

    }
  },
  computed: {
    currentMouse: function () {
      var c = document.getElementById("canvas");
      var rect = c.getBoundingClientRect();

      return {
        x: this.mouse.current.x - rect.left,
        y: this.mouse.current.y - rect.top
      }
    },
    previousMouse: function () {
      var c = document.getElementById("canvas");
      var rect = c.getBoundingClientRect();

      return {
        x: this.mouse.previous.x - rect.left,
        y: this.mouse.previous.y - rect.top
      }
    }
  },
  methods: {
    draw: function (event) {
     if (this.mouse.down) {
       var c = document.getElementById("canvas");
       var ctx = c.getContext("2d");
      //  ctx.clearRect(0,0,800,800);
       ctx.lineTo(this.currentMouse.x, this.currentMouse.y);
       console.log('right before strokeStyle (where you set color) and this.sizeToUse is ', this.sizeToUse);
       ctx.strokeStyle = this.colorToUse;
       ctx.lineWidth = this.sizeToUse;
       ctx.stroke();
       var dataArray = [this.currentMouse.x, this.currentMouse.y, this.colorToUse, this.sizeToUse];
       this.$set(this.canvasImage, 'myCanvas', this.canvasImage.push(dataArray));
     }
    },
    handleMouseDown: function (event) {
      this.mouse.current = {
        x: event.pageX,
        y: event.pageY
      }
      var c = document.getElementById("canvas");
      var ctx = c.getContext("2d");
      ctx.beginPath();
      ctx.moveTo(this.currentMouse.x, this.currentMouse.y);
      // if (this.mouse.down===false){
      //   ctx.beginPath();
      // }
      this.mouse.down = true;
    },
    handleMouseUp: function (event) {
      this.mouse.down = false;
      // var c = document.getElementById("canvas");
      // var ctx = c.getContext("2d");
      // ctx.closePath();
      this.$parent.channel2.push('new_img', {body:this.canvasImage});
      var looplength = this.canvasImage.length;
      for(var x=0; x<=looplength; x++){
        this.canvasImage = this.canvasImage.splice(x,1);
      }
      console.log("after for loop in handleMouseUp and new empy this.canvasImage has length", this.canvasImage.length);

    },
    handleMouseMove: function (event) {
      this.mouse.current = {
        x: event.pageX,
        y: event.pageY
      }
      this.draw(event)
    },
    ishotdog: function(){
      this.$parent.channel4.push('hotdog_counter', {body:"ishotdog"});
    },
    isnothotdog: function(){
      this.$parent.channel4.push('hotdog_counter', {body:"isnothotdog"});
    },
    percenthotdog: function(){
      if (this.$parent.ishotdog===0 && this.$parent.ishotdog===0){
        return "_____"
      }else{
        return 100*this.$parent.ishotdog/(this.$parent.ishotdog+this.$parent.isnothotdog)
      }
    }
  },
  // clearfunction: function(){
  //     console.log("INSIDE CLEARFUNCTION *****************");
  //     var c = document.getElementById('canvas');
  //     var ctx = c.getContext('2d');
  //     ctx.clearRect(0,0,800,800);
  //     return true
  // },
  ready: function () {
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    ctx.translate(0.5, 0.5);
    ctx.imageSmoothingEnabled= false;

  }
}
</script>
