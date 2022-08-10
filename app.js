class Despesa {
  constructor(ano, mes, dia, tipo, descricao, valor) {
    this.ano = ano;
    this.mes = mes;
    this.dia = dia;
    this.tipo = tipo;
    this.descricao = descricao;
    this.valor = valor;
  }

  validaDados() {
    for (let d in this) {
      if (this[d] == undefined || this[d] == "" || this[d] == null) {
        return false;
      }
      if (this[d] === "Tipo") {
        return false;
      }
    }
    return true;
  }
}

class Banco {

  constructor() {
    let id = localStorage.getItem("id");
    if (id === null) {
      localStorage.setItem("id", 0);
    }
  }

  getProximoId() {
    let proximoId = localStorage.getItem("id")
    return parseInt(proximoId) + 1
  }

  gravar(dado) {
    let id = this.getProximoId();

    localStorage.setItem(id, JSON.stringify(dado));

    localStorage.setItem("id", id);
  }

  recuperarRegistros() {
    let despesas = Array();
    let id = localStorage.getItem("id");

    // recupera o que está armazenado em localstorage
    for (let i = 1; i <= id; i++) {
      let despesa = JSON.parse(localStorage.getItem(i)); // recupera os retornos do objeto

      // checar se existem índices ignorados/removidos/pulados
      if (despesa === null) {
        continue;
      }
      despesas.push(despesa)
    }
    return despesas;
  }
  pesquisar(despesa) {
    let despesasFiltradas = Array();
    let backup = Array();
    console.log(despesa)
    despesasFiltradas = this.recuperarRegistros();
    backup = this.recuperarRegistros();

    // Filtro do ano
    if (despesa.ano != "") {
      despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
      console.log("filtro do ano")
    }

    // Filtro do mes
    if (despesa.mes != "") {
      despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
      console.log("filtro do mês")

    }

    // Filtro do dia
    if (despesa.dia != "") {
      despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
      console.log("filtro do dia")
      cont++;
    }

    // Filtro do tipo
    if (despesa.tipo != "") {
      despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
      console.log("filtro do tipo")
      cont++;
    }

    // Filtro da descrição
    if (despesa.descricao != "") {
      despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
      console.log("filtro do descrição")
      cont++;
    }
    // Filtro do valor
    if (despesa.valor != "") {
      despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
      console.log("filtro do valor")
      cont++;
    }

    // console.log(despesasFiltradas[0])
    if (despesasFiltradas[0] === undefined) {
      let modalColor = document.getElementById('modalColor')
      let modalTitle = document.getElementById('modalLabel')
      let modalText = document.getElementById('modalText')
      let modalFooter = document.getElementById('modalFooter')

      modalColor.className = "modal-header text-info";
      modalTitle.innerHTML = "Não existem correspondências";
      modalText.innerHTML = "Os dados informados não constam na base de dados"
      modalFooter.innerHTML = "Voltar";
      modalFooter.classname = 'btn btn-info'

      $("#modalReferencia").modal("show")
    }

    return despesasFiltradas;
  }
}

let banco = new Banco();

function cadastrarDespesa() {

  let ano = document.getElementById('ano')
  let mes = document.getElementById('mes')
  let dia = document.getElementById('dia')
  let tipo = document.getElementById('tipo')
  let descricao = document.getElementById('descricao')
  let valor = document.getElementById('valor')
  let modalColor = document.getElementById('modalColor')
  let modalTitle = document.getElementById('modalLabel')
  let modalText = document.getElementById('modalText')
  let modalFooter = document.getElementById('modalFooter')
  let despesa = new Despesa(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value);

  if (despesa.validaDados()) {
    // DIALOG DE SUCESSO
    banco.gravar(despesa);

    modalTitle.innerHTML = "Seus dados foram adicionados!";
    modalText.innerHTML = "Sucesso! Seus dados foram adicionados à base de dados."
    modalFooter.innerHTML = "Voltar";
    modalColor.className = 'modal-header text-success'
    modalFooter.classname = 'btn btn-success'

    $("#modalReferencia").modal("show")

    this.mes.value = "";
    this.dia.value = "";
    this.tipo.value = "";
    this.descricao.value = "";
    this.valor.value = "";

  }
  else {
    // DIALOG DE ERRO

    modalColor.className = "modal-header text-danger";
    modalTitle.innerHTML = "Ocorreu um erro... :(";
    modalText.innerHTML = "Seus dados não foram adicionados, por favor tente novamente!"
    modalFooter.innerHTML = "Voltar e corrigir";
    modalFooter.classname = 'btn btn-danger'

    $("#modalReferencia").modal("show")
  }

}


function carregaListaDespesas(despesas = Array(), filtro = false ){

  if (despesas.length == 0 && filtro == false) {
    despesas = banco.recuperarRegistros();
  }

  var listaDespesas = document.getElementById('listaDespesas')
  listaDespesas.innerHTML = ""

  // percorrer, utilizando uma função de callback, e listar todos os elementos de forma dinâmica
  despesas.forEach(function (d) { // funções de callback são caracterizadas como essa ao lado 
    // criando as linhas na tabela
    let linha = listaDespesas.insertRow();
    function checkType() {
      switch (d.tipo) {
        case "1":
          d.tipo = "Alimentação"
          break;
        case "2":
          d.tipo = "Educação"
          break;
        case "3":
          d.tipo = "Lazer"
          break;
        case 4:
          d.tipo = "Saúde"
          break;
        case 5:
          d.tipo = "Transporte"
          break
      }
    }
    checkType();
    // criando as colunas
    linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
    linha.insertCell(1).innerHTML = d.tipo
    linha.insertCell(2).innerHTML = d.descricao
    linha.insertCell(3).innerHTML = d.valor
  })

}

function pesquisarDespesa() {
  let ano = document.getElementById('ano').value;
  let mes = document.getElementById('mes').value;
  let dia = document.getElementById('dia').value;
  let tipo = document.getElementById('tipo').value;
  let descricao = document.getElementById('descricao').value;
  let valor = document.getElementById('valor').value;

  let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor);

  let despesas = banco.pesquisar(despesa);
  carregaListaDespesas(despesas);
}
