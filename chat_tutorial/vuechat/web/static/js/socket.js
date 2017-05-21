// NOTE: The contents of this file will only be executed if
// you uncomment its entry in "web/static/js/app.js".

// To use Phoenix channels, the first step is to import Socket
// and connect at the socket path in "lib/my_app/endpoint.ex":


// When you connect, you'll often need to authenticate the client.
// For example, imagine you have an authentication plug, `MyAuth`,
// which authenticates the session and assigns a `:current_user`.
// If the current user exists you can assign the user's token in
// the connection for use in the layout.
//
// In your "web/router.ex":
//
//     pipeline :browser do
//       ...
//       plug MyAuth
//       plug :put_user_token
//     end
//
//     defp put_user_token(conn, _) do
//       if current_user = conn.assigns[:current_user] do
//         token = Phoenix.Token.sign(conn, "user socket", current_user.id)
//         assign(conn, :user_token, token)
//       else
//         conn
//       end
//     end
//
// Now you need to pass this token to JavaScript. You can do so
// inside a script tag in "web/templates/layout/app.html.eex":
//
//     <script>window.userToken = "<%= assigns[:user_token] %>";</script>
//
// You will need to verify the user token in the "connect/2" function
// in "web/channels/user_socket.ex":
//
//     def connect(%{"token" => token}, socket) do
//       # max_age: 1209600 is equivalent to two weeks in seconds
//       case Phoenix.Token.verify(socket, "user socket", token, max_age: 1209600) do
//         {:ok, user_id} ->
//           {:ok, assign(socket, :user, user_id)}
//         {:error, reason} ->
//           :error
//       end
//     end
//
// Finally, pass the token on connect as below. Or remove it
// from connect if you don't care about authentication.


// // Now that you are connected, you can join channels with a topic:
// let channel = socket.channel("topic:subtopic", {})
// channel.join()
//   .receive("ok", resp => { console.log("Joined successfully", resp) })
//   .receive("error", resp => { console.log("Unable to join", resp) })
//
// export default socket
//
//

import {Socket} from "phoenix"
import Vue from 'vue'
import MyApp from "../components/my-app.vue"
import MyDrawing from "../components/my-drawing.vue"
import MyColors from "../components/my-colors.vue"
import MyUsername from "../components/my-username.vue"
import MyHotdogtimer from '../components/my-hotdogtimer.vue'
// import '../css/app.css'

// var token = $('meta[name=channel_token]').attr('content');

let socket = new Socket("/socket")

// console.log("token is", token);

socket.connect()

let socket2 = new Socket("/socket")

socket2.connect()

let socket3 = new Socket("/socket")

socket3.connect()




const Bus = new Vue({});

Vue.component('my-app', MyApp)

new Vue({
  el: '#app',
  mounted() {
    this.channel = socket.channel("room:lobby", {});
    this.channel.on("new_msg", payload => {
      payload.received_at = Date();
      this.messages.push(payload);
    });
    this.channel.join()
      .receive("ok", response => { console.log("Joined successfully", response) })
      .receive("error", response => { console.log("Unable to join", response) })

    Bus.$on('emitUsername', (username) => {
      // console.log("inside socket.js/my-drawing and emitString is ", emitString);
      console.log('value of username inside bus.on, ', username);
      this.useUsername = username;
      // console.log('inside socket.js/my-drawing and this.useColor after set is ', this.useColor);
    });

  },
  data() {
    return {
      channel: null,
      messages: [],
      useUsername: ''
    }
  },
  render(createElement) {
    return createElement(MyApp, {
      props: {
        'useThisUsername': this.useUsername
      }
    })
  }
});


Vue.component('my-colors', MyColors)

new Vue({
  el: '#colors',
  data: function() {
    return {
      colorSent: '',
      sizeSent: 0
    }
  },
  watch: {
    'colorSent': function() {
      Bus.$emit('emitColorSelection', this.colorSent);
      // console.log('value of emitColorSelection ', this.colorSent);
      // console.log('inside my-colors parent and this.colorsent, ', this.colorSent, " tihs.sizeSent ", this.sizeSent);
    },
    'sizeSent': function(){
      Bus.$emit('emitSizeSelection', this.sizeSent);
    }

  },
  render(createElement){
    return createElement(MyColors, {})
  }
});

Vue.component("my-username", MyUsername)

new Vue({
  el: '#username',
  data: function(){
    return{
      usernameSent: ''
    }
  },
  watch: {
    'usernameSent': function(){
      console.log('inside usernameSent watch in parent');
      console.log('value of usernameSent before bus emit ', this.usernameSent);
      Bus.$emit('emitUsername', this.usernameSent);
    }
  },
  render(createElement){
    return createElement(MyUsername, {})
  }
})



Vue.component("my-hotdogtimer", MyHotdogtimer)

new Vue({
  el: '#hotdogtimer',
  mounted() {
    this.channel3 = socket3.channel("room:lobby3", {});
    this.channel3.on("timer_start", payload => {
      payload.received_at = Date();
      this.timer = payload;
    });
    this.channel3.join()
      .receive("ok", response => { console.log("Joined successfully", response) })
      .receive("error", response => { console.log("Unable to join", response) })

    Bus.$on('emitTimer', (timer) => {
      // console.log("inside socket.js/my-drawing and emitString is ", emitString);
      // console.log('value of username inside bus.on, ', username);
      this.timed = timer;
      // console.log('inside socket.js/my-drawing and this.useColor after set is ', this.useColor);
    });

  },
  data: function(){
    return{
      timer: null,
      timed: null,
      channel3: null,
      canDraw: false
    }
  },
  watch: {
    'timer': function(){
      // console.log('inside usernameSent watch in parent');
      // console.log('value of usernameSent before bus emit ', this.usernameSent);
      Bus.$emit('emitTimer', this.timer);
    },
    'canDraw': function(){
      Bus.$emit('emitCanDraw', this.canDraw);
    }
  },
  render(createElement){
    return createElement(MyHotdogtimer, {
      props: {
        'useThisTime': this.timed
      }
    })
  }
})






Vue.component('my-drawing', MyDrawing)

new Vue({
  el: '#drawing',
  mounted() {
    this.channel2 = socket.channel("room:lobby2", {});
    this.channel2.on("new_img", payload => {
      // console.log('inside channel2.on');
      // console.log('payload in channel2.on ', payload.body);
      payload.received_at = Date();
      this.canvases = (payload.body);
      // console.log('this.canvases after setting payload', this.canvases);
    });
    this.channel2.join()
      .receive("ok", response => { console.log("Joined successfully", response) })
      .receive("error", response => { console.log("Unable to join", response) })

    Bus.$on('emitColorSelection', (emitString) => {
      // console.log("inside socket.js/my-drawing and emitString is ", emitString);
      this.useColor = emitString;
      // console.log('inside socket.js/my-drawing and this.useColor after set is ', this.useColor);
    });
    Bus.$on('emitSizeSelection', (sizeString) => {
      this.useSize = sizeString;
    });
    Bus.$on('emitCanDraw', (canDraw) => {
      this.canDraw = canDraw;
    });
  },
  data() {
    return {
      channel2: null,
      canvases: [],
      useColor: 'rgba(255, 0, 0, 1)',
      useSize: "1",
      canDraw: false
    }
  },
  render(createElement) {
    return createElement(MyDrawing, {
      props: {
        'useThisColor': this.useColor,
        'useThisCanvas': this.canvases,
        'useThisSize': this.useSize,
        'canDraw': this.canDraw
      }
    })
  }
});
