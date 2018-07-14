var app = new Vue({
    el: '#app',
    data: {
        show: false,
        message: 'Hello Vue.js',
        ok: false,
        yn: 'y',
        checklist: ['B'],
        radio: 'b',
        selectbox: [],
        preview: '',
        price: 100
    },
    methods: {
        handleClick: function() {
            alert('handleClick')
        },
        handleInput: function(event) {
            // validationとか挟める
            if (event.target.value != "aaa") {
                this.message = event.target.value
            }
        },
        handleChange: function(event) {
            var file = event.target.files[0]
            if (file && file.type.match(/^image\/(png|jpeg)$/)) {
                this.preview = window.URL.createObjectURL(file)
            } else {
                this.preview = ''
            }
        }
    }
})