<template>
  <div class="my-hotdogtimer">
    <div v-if="timeToUse===null">
      <button v-on:click='startHotdog'>Start the HotDogTimer</button>
    </div>
    <div v-else>
      <!-- this.$parent.canDraw = false; -->
      <div v-if='this.$parent.canDraw === false'>
        <button v-on:click='startHotdog'>Re-start the HotDogTimer</button>
      </div>
      <p class='countdown'>Countdown!</p>
      <p class='countdown'>{{minutesDisplay}}: {{secondsDisplay}} </p>
    </div>

  </div>
</template>

<style scoped>
  .my-hotdogtimer{
    display: inline-block;
    left: 0px;
    top: 650px;
    width: 100%;
    float: left;
    color: #0D2149;
    background-color: #60492C;
    margin-left:1vw;
    max-width: 7%;
    /*padding:10px;*/
    word-wrap: break-word;
    width:auto;
    position:absolute;
  }
  .countdown{
    color: red;
    font-weight: bolder;
    background-color: white;
    padding: 5px;
    text-align: center;
    border-radius: 3px;
  }
  /*.countdownWord{
    color: red;
    background:
  }*/
</style>

<script>
  export default {
    data: function () {
      return {
        timer: 0,
        timeToUse:null,
        minutesDisplay:"",
        secondsDisplay:"",
        timeoutVar:null
      }
    },
    props: {
      useThisTime: {
        type: Object
      }
    },
    watch: {
      useThisTime (n,o){
        // console.log('useThisSize watch, ', n,o);
        this.timeToUse=n;
        this.timeToEnd();
      },
      minutesDisplay: function(){
        if (this.minutesDisplay(0)==="-"){
          this.minutesDisplay = "TIMES";
          this.secondsDisplay = "UP";
          this.$parent.canDraw = false;
        }
      }
    },
    methods: {
      startHotdog: function(){
        console.log('clicked hotdog button');
        console.log('Date.now() is ', Date.now());
        this.timer = Date.now();
        this.$parent.channel3.push('timer_start', {body:this.timer});
      },
      timeToEnd: function timeToEnd(){
        console.log('inside timeToEnd');
        this.$parent.canDraw = true;
        var updatedTime = 0;
        var secondsLeft = 0;
        var secondsDif = 0;
        updatedTime = Date.now() - this.timeToUse.body;
        secondsDif = Math.floor(updatedTime/1000);
        // total time is 2 minutes that I subtract from
        secondsLeft = 120 - secondsDif;
        this.minutesDisplay = Math.floor(secondsLeft/60).toString();
        if ((secondsLeft-(this.minutesDisplay*60))<10){
          this.secondsDisplay = "0"+(secondsLeft - (this.minutesDisplay*60)).toString();
        }else{
          this.secondsDisplay = (secondsLeft - (this.minutesDisplay*60)).toString();
        }
        if (this.secondsDisplay==="00" && this.minutesDisplay==="0") {
          this.minutesDisplay = "TIMES";
          this.secondsDisplay = "UP";
          this.$parent.canDraw = false;
        } else{
          this.timeoutVar = setTimeout(()=>{this.timeToEnd()},1000);
        }
      }
   }
  }
</script>
