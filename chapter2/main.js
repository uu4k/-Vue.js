var state = {
    count: 0
}
var app = new Vue({
    el: '#app',
    data: {
        message: 'Vue.js!', // リアクティブなデータとして定義(変化の検知ができるデータ)
        state: state, // 既存の変数をリアクティブ化
        // list: ['りんご', 'ばなな', 'いちご'],
        scroll: 0,
        count: 0,
        isChild: true,
        isActive: true,
        textColor: 'red',
        bgColor: 'lightgray',
        classObject: {
            child: true,
            'is-active': false
        },
        styleObject: {
            color: 'red',
            backgroundColor: 'lightgray'
        },
        item: {
            id:1,
            src: 'item1.jpg',
            alt: 'item1thumbnail',
            width: 200,
            height: 200
        },
        radius: 50,
        ok: true,
        type: 'B',
        list: [
            { id: 1, name: "slime", hp: 100 },
            { id: 2, name: "goblin", hp: 200 },
            { id: 3, name: "dragon", hp: 999 },
        ],
        name: 'goast',
        htmlmessage: '<strong>htmlmessage</strong>'
    },
    mounted: function() {
        this.scroll = 100
    },
    created: function(){
        this.list.forEach((item) => {
            this.$set(item, 'active', false)
            // item.active = falseではリアクティブにならない
        })
        this.$set(this.list, 0, { id: 1, name: 'king slime', hp: 399 })

        // axios.get('list.json').then(function(response) {
        //     this.list = response.data
        // }.bind(this)).catch(function(e) {
        //     console.error(e)
        // })
    },
    methods: {
        increment: function() {
            // ここのthisはVueインスタンス
            this.count += 1
        },
        // increment: () => {} はNG(thisがVueインスタンスにならない)
        // increment() {} はOK
        doAdd: function() {
            var max = this.list.reduce(function(a, b) {
                return a.id > b.id ? a.id : b.id
            }, 0)

            this.list.push({
                id: max + 1,
                name: this.name,
                hp: 500
            })

            this.name = ""
        },
        doRemove: function(index) {
            this.list.splice(index, 1)
        }
    }
})

console.log(app.message)