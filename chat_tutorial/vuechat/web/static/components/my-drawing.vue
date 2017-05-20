
<template>
  <div class="my-drawing">
    <canvas id="canvas" v-on:mousedown="handleMouseDown" v-on:mouseup="handleMouseUp" v-on:mousemove="handleMouseMove" width="800px" height="800px"></canvas>

  </div>
</template>

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
      sizeToUse: 1
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
    }
  },
  watch: {
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

        if (looplength>1){
          var c = document.getElementById('canvas');
          var ctx = c.getContext('2d');
          // ctx.clearRect(0,0,800,800);
          ctx.beginPath();
          ctx.moveTo(newCanvas[0][0], newCanvas[0][1]);

          for (var x = 0; x<looplength; x++){
            // ctx.beginPath();
            // ctx.clearRect(0,0,800,800);
            // ctx.beginPath();
            ctx.lineTo(newCanvas[x][0], newCanvas[x][1]);
            console.log('newCanvas[x][3] is ', newCanvas[x][3]);
            ctx.strokeStyle = newCanvas[x][2];
            ctx.lineWidth = newCanvas[x][3];
            ctx.stroke();
            // ctx.closePath();
          }
        }
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
    }
  },
  ready: function () {
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    ctx.translate(0.5, 0.5);
    ctx.imageSmoothingEnabled= false;

  }
}
</script>
