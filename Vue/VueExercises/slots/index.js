Vue.component('my-vue-component', {
    data() {
        return {
            hello: 'olá vue'
        }
    },

    template: `
    <div class="demo-alert-box">
        <strong>Erro!</strong>
        <slot></slot>
    </div>
    `
})
