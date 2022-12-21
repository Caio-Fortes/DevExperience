Vue.component('legenda-status-renegociacao-vue', {
    data() {
        return {
            legendasStatus: [],
            legendasStatusDicionary: [],
        }
    },
    mounted() {
        setTimeout(() => {
            this.getLegendasEnum();
        }, "1000")
    },
    methods: {
        getLegendasEnum(){
            context = this
            jsonGetSemBloqueio("/Renegociacao/StatusRenegociacao/", function (response) {
                this.legendasStatus = response
                console.log(this.legendasStatus)
                context.formatarToAplicarCor(this.legendasStatus)
            });
        },
        formatarToAplicarCor(legendas){
            var formatation = /[^a-z0-9]/gi;
            var corLegendaStatus;
            var descricaoLegenda;
            for (var i = 0; i < legendas.length; i++) {
                descricaoLegenda = legendas[i].Descricao;
                descricaoLegenda = descricaoLegenda.toUpperCase()
                corLegendaStatus = legendas[i].Descricao;
                corLegendaStatus = corLegendaStatus.toLowerCase()
                corLegendaStatus = corLegendaStatus.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                corLegendaStatus = corLegendaStatus.replace(formatation, "")
                this.legendasStatusDicionary.push({ 'Cor': "fa-fw fa fa-square txt-color-" + corLegendaStatus, 'legenda': descricaoLegenda });
            }
        },
    },

    template: 
    `<div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <ul id="sparks" class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <li v-for="legenda in legendasStatusDicionary"> <i :class="legenda.Cor"></i> {{legenda.legenda}}</li> 
            </ul>
        </div></br >
    </div>`
})