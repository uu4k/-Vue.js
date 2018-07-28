<template>
    <div class="edit-form">
        <!-- <input type="text" :value="message" @input="doUpdate> -->
        <!-- <input type="text" v-bind:value="message" v-on:input="doUpdate"> -->
        <input v-model="message">
    </div>
</template>

<script>
import store from '../store'

export default {
    name: 'EditForm',
    computed: {
        // message() { return this.$store.getters.message }
        message: {
            get() { return this.$store.getters.message },
            set(value) { this.$store.dispatch('doUpdate', value) }
        }
    },
    created() {
        console.log(store.state.moduleA.count)
        console.log(store.state.moduleB.count)
        console.log(store.state.moduleC.count)
        // moduleA,B両方のupdateのmutationが実行される
        store.commit('update')
        console.log(store.state.moduleA.count)
        console.log(store.state.moduleB.count)
        console.log(store.state.moduleC.count)

        // moduleのnamespace: trueにしている場合
        store.commit('moduleC/update')
        console.log(store.state.moduleC.count)
        console.log(store.state.moduleC2.count)

    },
    // methods: {
    //     doUpdate(event) {
    //         store.dispatch('doUpdate', event.target.value)
    //     }
    // }
}
</script>
