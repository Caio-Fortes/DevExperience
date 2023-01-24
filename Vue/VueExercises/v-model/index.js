Vue.component('my-vue-component', {
    data() {
        return {
            titulo: 'altere este titulo'
        }
    },

    template: `
    <div>
        {{titulo}}
        <input type="text" v-model:input="titulo"> </input>
    </div>
    `
})

/*Esta diretiva tem a função de realizar a instância do Javascript e do 
html em conjunto. Dessa forma,  criando uma sincronia entre o componente html, e os dados do JavaScript,
criando essa dupla atualização.*/
