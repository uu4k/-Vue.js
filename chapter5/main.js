Vue.component('my-component', {
    template: '<p>{{ message }}</p>',
    // ルート要素が複数はNG
    // template: '<p>{{ message }}</p><p>!!!</p>',
    // オブジェクトを返す関数
    data: function() {
        return {
            message: 'Hello Vue.js'
        }
    },
    // methods: {
    // },
    // watch: {
    // }
})

Vue.component('my-component3', {
    // comp-childはmy-componentの子コンポーネント
    template: '<p><comp-child val="A"></comp-child><comp-child v-bind:val="message" class="item"></comp-child></p>',
    data: function() {
        return {
            message: 'Hello Vue.js'
        }
    },
})

Vue.component('comp-child', {
    // 親の属性とマージされる(この場合だとclassがitem child)
    template: '<p class="child">{{ val }}</p>',
    // 親コンポーネントのvalを利用できるようprops設定
    props: ['val']
})

Vue.component('comp-child-li', {
    template: '<li>{{ name }} HP.{{ hp }} \
    <button v-on:click="doAttack">attack</button></li>',
    props: {
        id: Number,
        name: String,
        hp: Number,
        // power: {
        //     type: Number,
        //     required: true,
        //     default: 100,
        //     validator: function(value) {
        //         return value > 0
        //     }
        // }
    },
    methods: {
        doAttack: function() {
            // 親コンポーネントのリアクティブデータは更新できない
            // this.hp -= 10
            this.$emit('attack', this.id)
        }
    }
})

Vue.component('comp-child-emitter', {
    template: '<button v-on:click="handleClick">emit</button>',
    methods: {
        handleClick: function() {
            // 親のchilds-event発火
            this.$emit('childs-event')
        }
    }
})

Vue.component('comp-child-slot', {
    // slotの中に親のテキストが割り当てられる
    template: '<div class="comp-child-slot">slot(<slot></slot>)</div>'
})

Vue.component('comp-child-multi-slot', {
    template: '<section class="comp-child-multi-slot">\
    <header>\
        <slot name="header">default header</slot>\
    </header>\
    <div class="content">\
        <slot>default content</slot>\
    </div>\
    <slot name="footer"><!-- if empty, invisible --></slot>\
    </section>'
})

Vue.component('comp-child-scope-slot', {
    // 親にtext属性を渡す
    template: '<div class="comp-child-scope-slot">\
    <slot text="Hello!"></slot>\
    </div>'
})

Vue.component('my-calendar', {
    template: '<div class="my-calendar">{{ value }}: <button v-on:click="handleClickDateButton">click</button></div>',
    // v-modelのプロパティはvalueとなる(カスタマイズ可能)
    props: { value: String },
    // model: {
    //     prop: 'current',
    //     event: 'change',
    // },
    methods: {
       handleClickDateButton: function() {
           this.$emit('input', '2018-01-01')
       }
    }
})

Vue.component('my-row', {
    template: '<tr>aaa</tr>'
})

Vue.component('functional-component', {
    // 関数型にすることでライフサイクルや監視がなくなるがパフォーマンス最適化
    functional: true,
    render: function(createElement, context) {
        return createElement('div', context.props.message)
    },
    props: {
        message: String
    }
})

Vue.component('my-monster', {
    template: '<div class="my-monster">\
    <p>name.{{ name }} HP.{{ hp }}</p>\
    <p>name <input v-model="localName"></p>\
    <p>HP <input size="5" v-model.number="localHp"></p>\
    </div>',
    props: {
        name: String,
        hp: Number
    },
    computed: {
        localName: {
            get: function() { return this.name },
            set: function(val) { this.$emit('update:name', val)}
        },
        localHp: {
            get: function() { return this.hp },
            set: function(val) { this.$emit('update:hp', val)}
        }
    }
})

var mixinLog = {
    created: function() {
        this.hello()
    },
    methods: {
        hello: function() {
            console.log('hello from mixin!')
        }
    }
}

Vue.component('my-component-a', {
    mixins: [mixinLog],
    template: '<div class="my-component-a">component A</div>',
    methods: {
        // mixinと被った場合はコンポーネントの定義が優先(data,computedなども)
        hello: function() {
            console.log('hello from my-component-a')
        }
    },
})

Vue.component('my-component-b', {
    mixins: [mixinLog],
    template: '<div class="my-component-b">component B</div>',
    // createdはmixin、コンポーネント両方呼ばれる
    created: function() {
        console.log('my-component-b created.')
    },
})

var myComponent2 = {
    template: '<p>MyComponent2</p>'
}

var app = new Vue({
    el: '#app',
    data: {
        list: [
            { id: 1, name: 'slime',  hp: 100 },
            { id: 2, name: 'kingslime',  hp: 900 },
            { id: 3, name: 'dragonslime',  hp: 350 },
        ],
        message: 'this is parent message.',
        date: '2018-07-18',
        name: 'slime',
        hp: 100,
        componentTypes: ['my-component-a', 'my-component-b'],
        current: 0
    },
    computed: {
        component: function() {
            return this.componentTypes[[this.current]]
        }
    },
    components: {
        'my-component2': myComponent2
    },
    methods: {
        parentsMethod: function() {
            alert('emitted by child')
        },
        handleAttack: function(id) {
            var item = this.list.find(function(el) {
                return el.id === id
            })

            if (item !== undefined && item.hp > 0) item.hp -= 10
        },
        handleClick: function() {
            alert('clicked')
        }
    }
})
