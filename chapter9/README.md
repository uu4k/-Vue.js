# Vue Routerの使い方

## Vue Routerのインストール

```
npm install vue-router
```

## router.js配置

```router.js
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
```

## ページ用のコンポーネントのフォルダ作成

```
mkdir views # or pages
```

## router.jsでrouterインスタンス作成してルーティング設定してエクスポート

```router.js
import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home.vue'
import Product from '@/views/Product.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        { path: '/', component: Home },
        { path: '/product', component: Product },
    ]
})

export default router
```

## main.jsでrouter登録

```
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
```

## routerのリンクとテンプレート表示用のタグを設定

```
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/product">商品情報</router-link>
    </nav>
    <!-- ここにパスと一致したコンポーネントが読み込まれる -->
    <router-view></router-view>
```

## URLの#を取り除く場合

- routerインスタンス作る際に`mode: 'history'`にする
- ただし、そのままだとURL直接開いたりリロードした場合にページが見つからないので、サーバ側のリライトの設定が必要