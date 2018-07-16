// globalにフィルター登録
// Vueインスタンス作成する前に設定(あとだと反映されない)
Vue.filter('localeNum', function (val) {
    return val.toLocaleString()
})

var app = new Vue({
    el: '#app',
    data: {
        width: 800,
        height: 800,
        budget: 300,
        limit: 2,
        list: [
            { id: 1, name: 'apple', price: 180 },
            { id: 2, name: 'banana', price: 80 },
            { id: 3, name: 'stroberry', price: 320 },
            { id: 4, name: 'orange', price: 120 },
            { id: 5, name: 'melon', price: 800 },
        ],
        order: false,
        val: 'aiueo',
        list: [
            'orange',
            'apple',
            'banana'
        ],
        list2: [{
                name: 'orange',
                price: 300
            },
            {
                name: 'apple',
                price: 500
            },
            {
                name: 'banana',
                price: 200
            },
        ],
        list3: [{
                name: 'orange',
                price: 300
            },
            {
                name: 'apple',
                price: 500
            },
            {
                name: 'banana',
                price: 200
            },
        ],
        height: 500,
        width: 500,
        repolist: [],
        current: '',
        topics: [
            { value: 'vue', name: 'Vue.js' },
            { value: 'jQuery', name: 'jQuery' },
        ],
        price: 19800,
        list4: []
    },
    computed: {
        // 算出プロパティ定義
        halfwidth: function() {
            return this.width / 2
        },
        halfheight: {
            get: function() {
                return this.height / 2
            },
            set: function(val) {
                this.height = val * 2
            }
        },
        computerandomdata: function() {
            return Math.random()
        },
        matched: function() {
            return this.list.filter(function(el) {
                return el.price <= this.budget
            }, this)
        },
        sorted: function() {
            return _.orderBy(this.matched, 'price', this.order ? 'desc': 'asc')
        },
        limited: function() {
            // return this.matched.slice(0, this.limit)
            return this.sorted.slice(0, this.limit)
        },
        size: function() {
            return [this.width, this.height]
        }
    },
    methods: {
        methodsrandomdata: function() {
            return Math.random()
        }
    },
    watch: {
        'val': _.debounce(function (newVal, oldVal) {
                alert('val changed:' + oldVal + ' to ' + newVal)
            }, 5000 // 5000ミリ秒毎に監視
        ),
        'list': function (newVal, oldVal) {
            alert('list changed:' + oldVal + ' to ' + newVal)
        },
        'list2': {
            handler: function (newVal, oldVal) {
                // newValとoldValはlist2(変更されたオブジェクトではない)
                alert(
                    'list2 changed:' + oldVal.name + ' to ' + newVal.name + '\n' +
                    oldVal.price + ' to ' + newVal.price
                )
            },
            deep: true, // ネストされたオブジェクトも対象
            immediate: false, // 初期読み込み時実行
        },
        size: function (newVal, oldVal) {
            alert('size: ' + newVal);
        },
        current: function(val) {
            axios.get('https://api.github.com/search/repositories', {
                params: { q: 'topic:'+val }
            }).then(function(response) {
                this.repolist = response.data.items
            }.bind(this))
        },
        list4: function() {
            // DOM更新前
            console.log('default:', this.$refs.list4.offsetHeight)
            this.$nextTick(function() {
                // DOM更新後の値取得
                console.log('nextTick:', this.$refs.list4.offsetHeight)
            })
        }
    },
    created: function () {
        var unwatch = this.$watch('list3', function (newVal, oldVal) {
            alert('list3 changed')
            // unwatch() // 監視解除
        }, {
            deep: true
        })

    },
    filters: {
        // localeNum: function(val) {
        //     // thisは使えない
        //     return val.toLocaleString()
        // }
    }
})