
<template>
  <div class="my-drawing">
    <canvas id="canvas" v-on:mousedown="handleMouseDown" v-on:mouseup="handleMouseUp" v-on:mousemove="handleMouseMove" width="800px" height="800px"></canvas>

    <ul v-for="canvas in canvases">
    </ul>

    <p>hello there sailor</p>
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
      channelCanvas:this.$parent.canvases
    }
  },
  computed: {
    canvases() {
      console.log('hey there doggies');
      return this.$parent.canvases
    },
    currentMouse: function () {
      var c = document.getElementById("canvas");
      var rect = c.getBoundingClientRect();

      return {
        x: this.mouse.current.x - rect.left,
        y: this.mouse.current.y - rect.top
      }
    },
    // canvases() {
    //   return{console.log('from the socket, this.$parent.canvases, ', this.$parent.canvases)}
    //   // return this.$parent.messages
    // },
  },
  methods: {
    draw: function (event) {
     if (this.mouse.down ) {
       var c = document.getElementById("canvas");
       var ctx = c.getContext("2d");
       ctx.clearRect(0,0,800,800);
       ctx.lineTo(this.currentMouse.x, this.currentMouse.y);
       ctx.strokeStyle ="#F63E02";
       ctx.lineWidth = 2;
       ctx.stroke();
       var dataArray = [this.currentMouse.x, this.currentMouse.y, "#F63E02", 2];
       this.$set(this.canvasImage, 'myCanvas', this.canvasImage.push(dataArray));
      //  console.log(dataArray);

     }
    },
    // canvases() {
    //   var c = document.getElementById("myCanvas");
    //   var ctx = c.getContext("2d");
    //   console.log(this.$parent.canvases);
    //   ctx.putImageData(this.$parent.canvases, 800, 800);
    // },
    handleMouseDown: function (event) {
      this.mouse.down = true;
      this.mouse.current = {
        x: event.pageX,
        y: event.pageY
      }
      var c = document.getElementById("canvas");
      var ctx = c.getContext("2d");
      ctx.moveTo(this.currentMouse.x, this.currentMouse.y)
    },
    handleMouseUp: function (event) {
      this.mouse.down = false;
      // console.log("this.canvasImage,", this.canvasImage);
      this.$parent.channel2.push('new_img', {body:this.canvasImage});
      // console.log("this.canvasImage after clear ,", this.canvasImage);
      // console.log("this.canvasImage.length, ", this.canvasImage.length);


      var looplength = this.canvasImage.length;
      for(var x=0; x<looplength; x++){
        // this.$delete(this.canvasImage,x);
        // this.canvasImage.splice(x, 1)
        this.canvasImage = this.canvasImage.splice(x,1);
        // console.log("this.canvasImage at index, ", x, "is ", this.canvasImage);
      }

      // this.$set(this.canvasImage, 'myCanvas',[]);
      // pop()

      setTimeout(function(){
        // console.log("inside setTimeout in handleMouseUp");
        // console.log("this.$parent.canvases in handleMouseUp", this.parent);
        console.log(this.channelCanvas);
      },1000);

      // console.log("this.canvasImage after delete for, ", this.canvasImage);

    },
    props: ['canvases'],
    watch: {
      'canvases': function(val, oldVal) {
        this.$nextTick(function() {
          console.log('inside watch and val is ', val);
        });
      }
    },
    // watch: {
    //   this.$parent.canvases:  {
    //     handler:function (val, oldVal){
    //         console.log('new: %s, old: %s', val, oldVal)
    //     },
    //     deep: true
    //   }
    // },
    // sendImage: function () {
    //   console.log('inside sendImage: this.canvasImage.imageObject', this.canvasImage.imageObject);
    //   this.$parent.channel2.push("new_img", { body: this.canvasImage.imageObject })
    // },
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
  },
  updated: function(){
    console.log("hey you updated");
    console.log('inside update and this.$parent.canvases is', this.$parent.canvases);
    // #016FB9

    // var c = document.getElementById("canvas");
    // var ctx = c.getContext("2d");
    // ctx.clearRect(0,0,800,800);
    // ctx.lineTo(this.currentMouse.x, this.currentMouse.y);
    // ctx.strokeStyle ="#F63E02";
    // ctx.lineWidth = 2;
    // ctx.stroke();
    // var dataArray = [this.currentMouse.x, this.currentMouse.y, "#F63E02", 2];
    // this.$set(this.canvasImage, 'myCanvas', this.canvasImage.push(dataArray));


    // ctx.clearRect(0,0,800,800);

    var looplength = this.$parent.canvases.length;

    if (looplength>1){
      var c = document.getElementById('canvas');
      var ctx = c.getContext('2d');
      ctx.clearRect(0,0,800,800);
      ctx.moveTo(this.$parent.canvases[0][0], this.$parent.canvases[0][1]);

      for (var x = 1; x<looplength; x++){
        // console.log('index x is ', x, " lineto x-value, ", this.$parent.canvases[x][0], " lineto y-value", this.$parent.canvases[x][1]);
        ctx.clearRect(0,0,800,800);
        ctx.lineTo(this.$parent.canvases[x][0], this.$parent.canvases[x][1]);
        ctx.linewidth = 2;
        ctx.strokeStyle = "#016FB8";
        ctx.stroke();
      }
    }






  }
}
</script>
