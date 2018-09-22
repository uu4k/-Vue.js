// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import firebase from 'firebase'

Vue.config.productionTip = false

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDsolAsmrQ504Pw7Yw5Uj56i1MVOPpUT28",
  authDomain: "chat-app-c0599.firebaseapp.com",
  databaseURL: "https://chat-app-c0599.firebaseio.com",
  projectId: "chat-app-c0599",
  storageBucket: "chat-app-c0599.appspot.com",
  messagingSenderId: "317001005268"
};
firebase.initializeApp(config);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
