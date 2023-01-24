Vue.component('tabela-jquery-vue', {
    data: function() {
        return{
            dataTables: [
                {produto: 'Feijão', quantidade: 1, Valor: 10.0},
                {produto: 'Arroz', quantidade: 2, Valor: 10.5},
                {produto: 'Batata', quantidade: 3, Valor: 1.10}
            ]
        }
    },

    methods: {
        
    },

    template: `
        <div id="tabela">
            <table id="DataTables" class="table table-striped table-bordered" style="width:100%">
                <thead>
                    <tr>
                        <th>Produto</th>
                        <th>Quantidade</th>
                        <th>R$</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="dado in dataTables" v-model="dataTables">
                        <td>{{dado.produto}}</td>
                        <td>{{dado.quantidade}}</td>
                        <td>{{dado.Valor}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `
})


$(document).ready(function() {
    $('#DataTables').DataTable({
        "language": {
            url: 'traducaoPtbr.json'
        } 
    });
})