class Despesa{
  constructor(ano, mes, dia, tipo, descricao, valor){
    this.ano = ano;
    this.mes = mes;
    this.dia = dia;
    this.tipo = tipo;
    this.descricao = descricao;
    this.valor = valor;
  }

  validaDados(){
    for(let d in this){
      if(this[d] == undefined || this[d] == "" || this[d] == null){
        return false;
      }
    }
    return true;
  }
}

class Banco{
  
  constructor(){
    let id = localStorage.getItem("id");
    if (id === null){
      localStorage.setItem("id",0);
    }
  }
  
  getProximoId(){
    let proximoId = localStorage.getItem("id")
    return parseInt(proximoId) + 1
  } 
  
  gravar(dado){
    let id = this.getProximoId();

    localStorage.setItem(id, JSON.stringify(dado));

    localStorage.setItem("id", id);
  }

  recuperarRegistros(){
    let despesas = Array();
    let id = localStorage.getItem("id");
    
    // recupera o que está armazenado em localstorage
    for(let i = 1; i <= id; i++){
      let despesa = JSON.parse(localStorage.getItem(i)); // recupera os retornos do objeto
      
      // checar se existem índices ignorados/removidos/pulados
      if (despesa === null){
        continue;
      }
      despesas.push(despesa)
    }
    return despesas;
  }
}

let banco  = new Banco();

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
  let despesa = new Despesa(ano.value,mes.value,dia.value,tipo.value,descricao.value,valor.value);

  if(despesa.validaDados()){
    // DIALOG DE SUCESSO
    banco.gravar(despesa);

    modalTitle.innerHTML = "Seus dados foram adicionados!";
    modalText.innerHTML = "Sucesso! Seus dados foram adicionados à base de dados."
    modalFooter.innerHTML = "Voltar";
    modalColor.className = 'modal-header text-success'
    modalFooter.classname = 'btn btn-success'
    
    $("#modalReferencia").modal("show")
  }
  else{
    // DIALOG DE ERRO

    modalColor.className = "modal-header text-danger";
    modalTitle.innerHTML = "Ocorreu um erro... :(";
    modalText.innerHTML = "Seus dados não foram adicionados, por favor tente novamente!"
    modalFooter.innerHTML = "Voltar e corrigir";
    modalFooter.classname = 'btn btn-danger'

    $("#modalReferencia").modal("show")
  }

}

function carregaListaDespesas(){
  let despesas

  despesas = banco.recuperarRegistros()
  console.log(despesas);
}
