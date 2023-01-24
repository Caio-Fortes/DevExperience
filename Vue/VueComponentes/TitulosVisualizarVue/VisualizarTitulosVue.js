Vue.component('titulos-visualizar-contrato-vue', {
    props: ['contratoId', 'empresaId'],
    data() {
        return {
            boletosDataTables: [],
            dicionaryCorStatusDataTables: [],
            boletosSelecionados: [],
            optionsContasBancariaRemessa: [],
            statusDataTables: [],
            statusFilterDataTablesSelecionados: [],
            dicionaryDadosFiltros: [],
            boletosInicialData: []
        }
    },
    computed: {
        habilitarBotoes() {
            return this.boletosSelecionados.length > 0
        },
        selecionarTodosBoletos: {
            get: function () {
                return this.boletosDataTables ? this.boletosSelecionados.length == this.boletosDataTables.length : false;
            },
            set: function (value) {
                var boletosSelecionados = [];
                if (value) {
                    this.boletosDataTables.forEach(function (boleto) {
                        boletosSelecionados.push({
                            BoletoBancarioId: boleto.BoletoBancarioId,
                            NossoNumero: boleto.NossoNumero
                        });
                    });
                }
                this.boletosSelecionados = boletosSelecionados;
            }
            //mapping the datas of selecionarTodosBoletos
        },
        boletosSelecionadosId() {
            return this.boletosSelecionados.map(b => b.BoletoBancarioId)
        },
        nossosNumerosSelecionados() {
            return this.boletosSelecionados.map(b => b.NossoNumero)
        },
        selecionarTodosFiltros: {
            get: function () {
                this.dicionaryDadosFiltros ? this.statusFilterDataTablesSelecionados.length == this.dicionaryDadosFiltros.length : false;
            },
            set: function (value) {
                var statusFilterDataTablesSelecionados = [];
                if (value) {
                    this.dicionaryDadosFiltros.forEach(function (status) {
                        statusFilterDataTablesSelecionados.push({
                            Descricao: status.Descricao
                        });
                    });
                }
                this.statusFilterDataTablesSelecionados = statusFilterDataTablesSelecionados;
            }
        },
        DescricaoStatusSelecionados() {
            return this.statusFilterDataTablesSelecionados.map(a => a.Descricao)
        },

        habilitarBotaoFiltrarStatus() {
            return this.statusFilterDataTablesSelecionados.length > 0
        }
    },
    mounted() {
        setTimeout(() => {
            this.getBoletos();
            this.getOptionsSelecionarContaRemessa();
            this.tratamentoEnumStatus()
        }, 2000)
        setTimeout(() => {
            this.montarDataTables();
        }, 9000)
    },
    methods: {
        //get datas necessaries
        getBoletos() {
            jsonPost("/Boleto/GetByIdContrato", { id: this.contratoId }, this.boletosInicial)
        }, 
        boletosInicial(boletosInical) {
            const boletosInicialGlobal = boletosInical
            this.boletosInicialData = boletosInicialGlobal
            this.setBoletos(boletosInical)
        },
        setBoletos(boletosInical, DescricaoStatusSelecionados) {
            this.boletosDataTables = boletosInical
            this.tratamentoCorStatusDataTables();
            if (DescricaoStatusSelecionados != null) {
                this.filtrarStatus(DescricaoStatusSelecionados)
            }
        },
        filtrarStatus(DescricaoStatusSelecionados) {
            const boletosInicialConst = this.boletosInicialData

            var boletosStatusDisponiveis;
            var boletosResultPush = [];
            for (var i = 0; i < DescricaoStatusSelecionados.length; i++) {
                boletosStatusDisponiveis = boletosInicialConst.filter((boletosDisponiveis) => { return boletosDisponiveis.StatusBoleto == DescricaoStatusSelecionados[i] });
                boletosResultPush.push(boletosStatusDisponiveis)
            }
            var result = boletosResultPush[0];
            for (var i = 1; i < boletosResultPush.length; i++) {
                result = result.concat(boletosResultPush[i])
            }
            this.setBoletos(result)
        },
        tratamentoCorStatusDataTables() {
            boletos = this.boletosDataTables
            var statusColorName = boletos.map(a => a.StatusColor)
            for (var i = 0; i < statusColorName.length; i++) {
                this.boletosDataTables[i].StatusColor = 'tag bg-color-' + statusColorName[i]
            }
        },
        getOptionsSelecionarContaRemessa() {
            jsonPost("/Contrato/GetAllContas", { id: this.empresaId }, this.setOptionsSelecionarContaRemessa);
        },
        setOptionsSelecionarContaRemessa(opcoesContaBancariaRemessa) {
            this.optionsContasBancariaRemessa = opcoesContaBancariaRemessa
        },
        montarDataTables() {
            $('#boletosDataTables').DataTable({
                responsive: true,
                bSearch: true,
                bStateSave: true,
                bServerSide: false,
                bFilter: true,
                lengthMenu: [[5, 10, 12, 25, 50, -1], ["5", "10", "12", "25", "50", "Todos"]],
                pageLength: 10,
                bAutoWidth: false,
                bDestroy: true,
                aaSorting: [[2, "asc"]],
                language: {
                    sProcessing: "Processando dados...",
                    sLengthMenu: "Mostrar _MENU_ Registros",
                    sZeroRecords: "Não há dados disponíveis",
                    sInfo: "&nbsp;&nbsp;Mostrando _START_ à _END_ de _TOTAL_ registros",
                    sInfoEmpty: "&nbsp;Monstrando 0 à 0 de 0 registros",
                    sInfoFiltered: "(filtrado de _MAX_ registros)",
                    sInfoPostFix: "",
                    sSearch: "Pesquisar ",
                    oPaginate: {
                        sFirst: "Primeira",
                        sPrevious: "Anterior",
                        sNext: "Próxima",
                        sLast: "Última"
                    },
                }
            });
        },
        //actions buttons
        botaoImprimir() {
            var context = this
            var NossosNumerosBoletos = this.nossosNumerosSelecionados
            $.SmartMessageBox({ title: "Imprimir", content: "Imprimir boletos?", buttons: "[Sim][Não]" },
                function (ButtonPressed) {
                    if (ButtonPressed === "Sim") {
                        $.SmartMessageBox({
                            title: "Layout", content: "Escolha o layout!", buttons: "[3 por página][Página Única]",
                        }, function (ButtonPressed) {
                            if (NossosNumerosBoletos.length > 0) {
                                let tresPorPagina = ButtonPressed == "3 por página"
                                const BoletosForm = context.imprimirBoleto(NossosNumerosBoletos, tresPorPagina)
                                BoletosForm.submit();
                            } else
                                addWarning("nenhum boleto foi selecionado")
                        })
                    }
                })
            event.preventDefault();
        },
        imprimirBoleto(NossosNumerosBoletos, tresPorPagina) {
            var form = $("<form action='/Boleto/Imprimir' method='GET' target='_blank'><input type='hidden' name='tresPorFolha' value='' /></form>");
            for (var i = 0; i < NossosNumerosBoletos.length; i++) {
                var input = $('<input name="id">').attr('type', 'hidden')
                input.val(NossosNumerosBoletos[i])
                form.append(input);
            }
            form[0].tresPorFolha.value = tresPorPagina
            $(document.body).append(form);
            return form;
        },
        botaoEnviarBoletosPorEmail() {
            var context = this
            NossosNumerosBoletos = this.nossosNumerosSelecionados
            $.SmartMessageBox({ title: "Enviar Boletos por E-mail", content: "Enviar boletos?", buttons: "[Sim][Não]" },
                function (ButtonPressed) {
                    if (ButtonPressed == "Sim") {
                        jsonPost("/Boleto/EnviarBoletoPorEmailAssincrono", { id: NossosNumerosBoletos },
                            (action) => {
                                context.redirecionarToVisualizarEventoBoletoPorEmail(action.action, action.id)
                            })
                    }
                })
        },
        redirecionarToVisualizarEventoBoletoPorEmail(action, id) {
            window.location = window.location = `/Boleto/${action}/${id}`
        },
        botaoApagarBoleto() {
            nossosNumeros = this.nossosNumerosSelecionados
            $.SmartMessageBox({ title: "Apagar Boletos", content: "Apagar boletos?", buttons: "[Sim][Não]" },
                function (ButtonPressed) {
                    if (ButtonPressed == "Sim") {
                        jsonPost("/Boleto/Delete", { id: nossosNumeros })
                    }
                })
        },
        //list bank accounts available
        async OptionsFormatadaContaCorrente(opcoesContaCorrente) {
            return new Promise((resolve) => {
                var dictionaryIdContas = [];
                var stringOpcoesContas;
                var idConta;
                for (var i = 0; i < opcoesContaCorrente.length; i++) {
                    stringOpcoesContas += "[" + opcoesContaCorrente[i].Text + "]"
                    idConta = opcoesContaCorrente[i].Value
                    dictionaryIdContas.push({ 'Id': idConta, 'Name': stringOpcoesContas })
                }
                resolve({dictionaryIdContas, stringOpcoesContas})
            })
        },
        async botaoGerarRemessa(dictionaryIdContas) {
            return new Promise((resolve) => {
                var stringOpcoesContas = dictionaryIdContas.stringOpcoesContas
                var arrayContas = dictionaryIdContas.dictionaryIdContas
                context = this
                $.SmartMessageBox({
                    title: "Conta Corrente",
                    content: "Selecione uma conta corrente para gerar a remessa. (Obs: A carteira de cobrança utilizada será a padrão)",
                    buttons: "[Confirmar][Cancelar]",
                    input: "select",
                    options: stringOpcoesContas
                }, function (ButtonPressed, Value) {
                    if (ButtonPressed == "Confirmar") {
                        var idContaCorrente = arrayContas.find(d => d.Name = Value).Id;
                        resolve(idContaCorrente)
                    }
                })
            })
        },
        async getCarteiraPadrao(idContaCorrente) {
            return new Promise((resolve) => {
                jsonGet("/Remessa/GetCarteiraPadraoByIdContaCorrente/" + idContaCorrente, function (dadosCarteiraCobranca) {
                    if (dadosCarteiraCobranca != null) {
                        resolve(dadosCarteiraCobranca)
                    }
                })
            })
        },
        async tratamentoDadosGerarRemessa(dadosCarteiraCobranca) {
            return new Promise((resolve) => {
                nossosNumeros = this.nossosNumerosSelecionados
                var objNossosNumeros = nossosNumeros.map(criarIndiceDados);
                function criarIndiceDados(nossosNumeros) {
                    let Titulos = {};
                    Titulos["NossoNumero"] = nossosNumeros;
                    return Titulos
                }
                resolve({objNossosNumeros, dadosCarteiraCobranca})
            })
        },
        async gerarRemessa(objNossosNumeros) {
            console.log(objNossosNumeros)
            var NossosNumeros = objNossosNumeros.objNossosNumeros
            var dadosCarteiraCobranca = objNossosNumeros.dadosCarteiraCobranca
            var idContaCorrente = dadosCarteiraCobranca.ContaCorrenteId
            var objFinal = { Titulos: NossosNumeros, IdContaCorrente: idContaCorrente, CarteiraCobranca: dadosCarteiraCobranca }
            var remessaString = JSON.stringify(objFinal)
            if (remessaString != null) {
                jsonPost("/Remessa/GerarRemessa", { remessaString: remessaString })
            }
        },
       //função assincrona remessa()
       async Remessa(){
        var opcoesContaCorrente = this.optionsContasBancariaRemessa;
        var dictionaryIdContas = await this.OptionsFormatadaContaCorrente(opcoesContaCorrente)
        var idContaCorrente = await this.botaoGerarRemessa(dictionaryIdContas)
        var dadosCarteiraCobranca = await this.getCarteiraPadrao(idContaCorrente)
        var dadosGerarRemessa = await this.tratamentoDadosGerarRemessa(dadosCarteiraCobranca)
        await this.gerarRemessa(dadosGerarRemessa)
        },
        //Status Filters
        async getFiltrosStatusBoletos(variavelGlobal) {
            return new Promise((resolve) => {
                resolve(this.statusDataTables = variavelGlobal)
            })
        },
        async tratamentoEnumStatus() {
            var variavelGlobal = app.statusBoleto 
            var statusBoletos = await this.getFiltrosStatusBoletos(variavelGlobal)
            var decricaoStatusEnum;
            var ValorStatusEnum;
            var corStatusEnum;
            var formatation = /[^a-z0-9]/gi;
            for (var i = 0; i < statusBoletos.length; i++) {
                decricaoStatusEnum = statusBoletos[i].Text
                ValorStatusEnum = statusBoletos[i].Value
                corStatusEnum = statusBoletos[i].Text.toLowerCase()
                corStatusEnum = corStatusEnum.replace(formatation, "");
                this.dicionaryDadosFiltros.push({ 'Descricao': decricaoStatusEnum, 'Valor': ValorStatusEnum, 'Cor': 'smart-form bg-checkbox-color-' + corStatusEnum })
            }
        },
        botaoAplicarFiltroStatusBoleto() {
            return this.setBoletos(this.boletosDataTables, this.DescricaoStatusSelecionados)
        },
        dropdownStatus(dropdown){
            document.getElementById("dropdown").classList.toggle("show");
        }
    },
    template:
        `<div>
            <div class="widget-body smart-form col col-lg-12">
                <div class="row"> <h3>Filtro</h3> <hr /> </div>
                <div class="row col col-lg-1" style="padding-left: 0px; margin-top:10px"></div>
                <div class="row" id="table-remessa">
                    <section class="col col-lg-12">
                        <div class="col-xs-2 col-sm-10 col-md-10 col-lg-10">
                            <div class="col-sm-12">
                                <label class="label">
                                   <label>Status do Boleto</label> 
                                </label>
                                    <span class="multiselect-native-select">
                                        <div class="btn-group">
                                            <div>
                                                <button class="multiselect dropdown-toggle btn btn-default" @click="dropdownStatus">
                                                    <span> Selecione <b class="caret"></b></span>
                                                </button>
                                            </div>
                                            <div id="dropdown" class="listaStatusDropdown">
                                                <scroll-container class="scroll-dropdownStatus">
                                                    <div>
                                                        <div class="botaoSelecionarTodosStatus">
                                                            <input type="checkbox" v-model="selecionarTodosFiltros"></input> Todos
                                                        </div>
                                                        <ul v-for="status in dicionaryDadosFiltros" class="conteiner-status">
                                                            <li :class="status.Cor">
                                                                <a> <label class="checkbox"><input type="checkbox"  v-model="statusFilterDataTablesSelecionados" 
                                                                    class="Status" :value="{Descricao: status.Descricao}">{{status.Descricao}}<i></i></label>
                                                                </a> 
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </scroll-container>
                                                <div class="botaoFiltrarStatus">
                                                <button @click="botaoAplicarFiltroStatusBoleto" :disabled="!habilitarBotaoFiltrarStatus" 
                                                    class="btn btn-primary btn-sm" title="Filtrar Status do boleto" style="margin-top:10px"> Filtrar Status
                                                </button> 
                                            </div>
                                            </div>
                                        </div>
                                    </span>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <hr class="separatorLine">    
            <div class="row">
                <section class="col col-lg-12">
                    <div class="col-xs-8 col-sm-0 col-md-0 col-lg-0">
                        <label class="selecionarTodos">
                            <input type="checkbox" v-model="selecionarTodosBoletos"> Selecionar Todos </input>
                        </label>
                    </div>
                    <div class="col-xs-4">
                        <div class="well well-sm botoesAcaoEmLote">
                            <label class="hidden-xs">  Ações: </label>
                                <button type="button" @click="botaoImprimir" :disabled="!habilitarBotoes"
                                    class="btn btn-primary btn-sm" title="Imprimir Boleto(s)"> <i class="fa fa-print fa-lg"></i> 
                                </button>
                                <button type="button" @click="botaoEnviarBoletosPorEmail" :disabled="!habilitarBotoes"
                                    class="btn btn-primary btn-sm" title="Enviar Boleto(s) por E-mail"> <i class="fa fa-envelope-o fa-lg"></i>
                                </button>
                                <button type="button" @click="Remessa" :disabled="!habilitarBotoes" 
                                    class="btn btn-primary btn-sm" title="Gerar Remessa"> <i class="fa fa-folder-o fa-lg"></i>
                                </button>
                                <button type="button" @click="botaoApagarBoleto" :disabled="!habilitarBotoes"
                                    class="btn btn-primary btn-sm" title="Apagar Boleto(s)"> <i class="fa fa-trash-o fa-lg"></i>
                                </button>
                        </div>
                    </div>
                </section>
            </div>
            <div class="widget-body"><br>
                <div class="row">
                    <section class="col col-lg-12">
                        <div class="table-responsive">
                            <section class="col col-lg-12">
                                <table id="boletosDataTables" class="display table table-bordered table-striped smart-form responsive dt-responsive" cellspacing="0">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Nosso Número</th>
                                            <th>Data de Emissão</th>
                                            <th>Valor do Boleto</th>
                                            <th>Data de Vencimento</th>
                                            <th>Sacado</th>
                                            <th>CPF/CNPJ do Sacado</th>
                                            <th>Status</th>
                                            <th>Cód. Contrato</th>
                                            <th>Última Alteração</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="item in boletosDataTables" v-model="boletosDataTables">
                                            <td id="column-select"><label class="checkbox" style=""> <input type="checkbox" v-model="boletosSelecionados"
                                            :value="{BoletoBancarioId: item.BoletoBancarioId, NossoNumero: item.NossoNumero}" number><i></i></label></td>
                                            <td>{{item.NossoNumero}}</td>
                                            <td>{{item.DataDeEmissao}}</td>
                                            <td>{{item.ValorBoleto}}</td>
                                            <td>{{item.DataDeVencimento}}</td>
                                            <td>{{item.Sacado}}</td>
                                            <td>{{item.NumeroCpfSacado}}</td>
                                            <td><label :class="item.StatusColor">{{item.StatusBoleto}} <label> </td>
                                            <td>{{item.CodVenda}}</td>
                                            <td>{{item.UltimaAlteracao}}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </section>
                        </div>
                    </section>   
                </div>
            </div>
        </div>`
})

new Vue({
    el: '#id-titulos-visualizar-contrato-vue'
})
Vue.config.devtools = true;
