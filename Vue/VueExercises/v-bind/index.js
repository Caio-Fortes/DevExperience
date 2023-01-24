Vue.component('my-vue-component', {
    data() {
        return {
            link: 'https://vuejs.org/',
            titulo: 'Hello Vue',
            titulos:[
                { id: 1, title: 'Minha jornada com Vue' },
                { id: 2, title: 'Postagens com Vue' },
                { id: 3, title: 'Porque Vue é tão divertido' }
            ]
        }
    },

    template: `
    <div>
        <h3>acessando atributos pelo v-bind</h3>

        <h5>Acessando link</h5>
        <a :href="link">Link Vue</a>
        <p>----------------------------</p>

        <h5>Acessando um titulo com v-bind double mustashes</h5>
        <p>{{ titulo }}</p>
        <p>----------------------------</p>

        <h5>Acessando titulos</h5>
        <p>Objeto Titulos: {{titulos}}</p>
        <p v-for="titulo in titulos"> 
            id: {{titulo.id}} - title: {{titulo.title}}
        </p>
        <p>----------------------------</p>
    </div>
    `
})