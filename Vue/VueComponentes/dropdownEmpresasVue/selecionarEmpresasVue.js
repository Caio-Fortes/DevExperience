Vue.component("seletor-vue", {
    props: ['empresas'],
    data() {
        return {
            empresasDisponiveis: [],
            todasSelecionadas: false,
            empresasSelecionadas: [],
        }
    },

    computed: {
        contador() {
            return this.empresasSelecionadas.length
        }
    },

    methods: {
        dropdownEmpresas(dropdown) {
            document.getElementById("dropdown").classList.toggle("show");
        },

        selecionarTodasEmpresas() {
            if (this.todasSelecionadas) {
                this.empresasSelecionadas = [];
                this.todasSelecionadas = false;
            } else {
                for (empresa in this.empresas) {
                    this.empresasSelecionadas.push(this.empresas[empresa].id.toString());
                }
                this.todasSelecionadas = true;
            }
        },

        selecionadas() {
            this.todasSelecionadas = false;
        },

        //Carregar Empresas
        cookieEmpresasHandler() {
            if (this.empresas == null)
                return

            data = this.empresas;
            //Recuperar Cookies
            var duracao = new Date();
            duracao.setTime(duracao.getTime() + (8 * 60 * 60 * 1000));
            cookie = getCookie("EmpresasSelecionadas");
            var cookieVazio = !cookie || cookie == "";
            var empresas = "";
            if (cookieVazio) {
                cookie = "";
            }
            for (var i = 0; i < data.length; i++) {
                var selecionada = cookieVazio
                    ? data[i].Selecionado
                    : cookie.indexOf("[" + data[i].Id + "]") >= 0;
                if (data[i].Selecionado) {
                    empresas += "[" + data[i].Id + "]";
                }
                this.empresasDisponiveis.push(new EmpresaResumidaViewModel(data[i], selecionada));
            }
            if (cookieVazio) {
                setCookie("EmpresasSelecionadas", empresas, duracao, "/");
            }
            this.empresasDisponiveis.sort(function (left, right) {
                return left.NomeFantasia() == right.NomeFantasia() ? 0 : (left.NomeFantasia() < right.NomeFantasia() ? -1 : 1)
            })
            app.empresasCarregadas = true;
        }

    },
    mounted() {
        this.cookieEmpresasHandler()
        console.log(this.empresas)
    },

    template:`
<div>
    <div>
        <button class="botaoDropDown" @click="dropdownEmpresas()"><i class="fa-solid fa-building" style="font-size: 19px"></i> 
        <span class="contador">{{contador}}</span></button>
    </div>

    <div id="dropdown" class="listaEmpresasDropdown">
        <scroll-container class="scroll-container">
            <ul>
                <li v-for="empresa in empresas" class="conteiner-empresas">
                    <input type="checkbox" @click="selecionadas" :value="empresa.EmpresaId" v-model="empresasSelecionadas">
                    <label class="nomeEmpresa">{{empresa.NomeFantasia}}</label>
                </li>
            </ul>
        </scroll-container>

        <div class="botoesAcao">
            <span><button title="Marcar/Desmarcar Todas"><i class="fa-solid fa-square-check"></i> Marcar Todas</button></span>
            <span> <button title="Recarregar Empresas"><i class="fa-solid fa-arrows-rotate"></i> Recarregar</button> </span>
        </div>
    </div>
</div>`
})

