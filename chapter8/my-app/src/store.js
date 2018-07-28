import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'

// 外部ファイルのモジュール読み込み
import moduleA from '@/store/moduleA.js'
import moduleB from '@/store/moduleB.js'

Vue.use(Vuex)


const moduleC = {
    namespaced: true,
    // stateを関数にすることで再利用可能に
    state() {
        return {
            count: 3
        }
    },
    mutations: {
        update(state, payload) { state.count += 100 }
    }
}

const store = new Vuex.Store({
    strict: true, // 警告モード。本番では不要
    modules: {
        // moduleA,
        // moduleB,
        // moduleC
        moduleA: moduleA,
        moduleB: moduleB,
        // moduleCを再利用
        moduleC: moduleC,
        moduleC2: moduleC,
    },
    state: {
        message: '初期メッセージ'
    },
    getters: {
        message(state) { return state.message }
    },
    mutations: {
        setMessage(state, payload) {
            state.message = payload.message
        }
    },
    actions: {
        doUpdate({ commit }, message) {
            commit('setMessage', { message })
        }
    }
})

// 状態監視
const unwatch = store.watch(
    (state, getters) => {
        return state.message
    },
    (newVal, oldVal) => {
        console.log(oldVal + '=>' + newVal)
    }
)

export default store