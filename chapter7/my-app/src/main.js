// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

var MyPlugin = {
  // installはplugin登録されたタイミングにのみ動作
  install: function(Vue, options) {
    console.log(options)
  }
}

var WindowPlugin = {
  install: function(Vue) {
    var store = new Vue({
      data: { scrollY: 0 }
    })

    var timer = null
    window.addEventListener('scroll', function() {
      if (timer === null) {
        timer = setTimeout(function() {
          store.scrollY = window.scrollY
          clearTimeout(timer)
          timer = null
        }, 200)
      }
    })
    
    Vue.prototype.$window = store.$data
  }
}

Vue.use(MyPlugin, { lang: 'ja' })
Vue.use(WindowPlugin)

Vue.component('my-component', {
  template: '<div>{{ scrollY }}</div>',
  computed: {
    scrollY: function() { return this.$window.scrollY }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
