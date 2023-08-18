import { Component } from '@angular/core';
import { Cliente } from '../modelo/Cliente';
import { ClienteService } from '../servico/cliente.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {

  filtroNome: string = '';
  filtroCnpj: string = '';

  filtrar(): void {
    this.servico.selecionar(this.filtroNome, this.filtroCnpj)
      .subscribe(retorno => this.clientes = retorno);
  }


  posicao = {
    lat:-34.681,
    lng:-58.371
  };


  label = {
    color: 'red',
    text: 'Marcador'
  }

  //Obj do tipo Cliente
  cliente = new Cliente();


  //Variavel para visibilidade dos botoes
  btnCadastro:boolean = true;

  //variavel para visibilidade da tabela
  tabela:boolean = true;


  //JSON de clientes
  clientes:Cliente[] = [];

  //Construtor
  constructor(private servico:ClienteService){}

  //metodo para selecionar clientes
  selecionar():void{
    this.servico.selecionarClicando()
    .subscribe(retorno => this.clientes = retorno)
  }

  //metodo de cadastro
  cadastrar():void{
    if (this.validForm()) {
    this.servico.cadastrar(this.cliente)
    .subscribe(retorno =>{

      //cadastrar cliente no vetor
      this.clientes.push(retorno);

      // limpar formulario
      this.cliente = new Cliente();

      //mensagem
      alert('Cliente cadastrado com sucesso!');

     });
    }else{
      alert('Por favor, preencha o nome e o CNPJ corretamente.');
    }
  }

  private validForm(): boolean {
    return !!this.cliente.nome && !!this.cliente.cnpj && /^[0-9]{14}$/.test(this.cliente.cnpj.toString());
  }


  //metodo para selecionar um cliente especifico
  selecionarCliente(posicao:number):void{

      //selecionar cliente no vetor
      this.cliente = this.clientes[posicao];

      //visibilidade dos botoes
      this.btnCadastro = false;

      //visibilidade da tabela
      this.tabela = false;

  }


  //metodo para editar cliente
  editar():void{

    this.servico.alterar(this.cliente)
    .subscribe(retorno => {

      //obter posicao do vetor onde esta o cliente
      let posicao = this.clientes.findIndex(obj =>{
        return obj.codigo == retorno.codigo;
      });

      //alterar os dados do cliente no vetor
      this.clientes[posicao] = retorno;

      //limpar formulario
      this.cliente = new Cliente();

    //visibilidade dos botoes
        this.btnCadastro = true;

    //visibilidade da tabela
        this.tabela = true;

    //mensagem
        alert('Cliente alterado com sucesso!');

    });
  }


  //metodo para remover clientes
  remover():void{

    this.servico.remover(this.cliente.codigo)
    .subscribe(retorno => {

      //obter posicao do vetor onde esta o cliente
      let posicao = this.clientes.findIndex(obj =>{
        return obj.codigo == this.cliente.codigo;
      });

      //remover cliente do vetor
      this.clientes.splice(posicao, 1);

      //limpar formulario
      this.cliente = new Cliente();

      //visibilidade dos botoes
      this.btnCadastro = true;

      //visibilidade da tabela
      this.tabela = true;

      //mensagem
      alert('Cliente removido com sucesso!');

    });
  }

  //metodo para cancelar
  cancelar():void{

    //limpar formulario
    this.cliente = new Cliente();

    //visibilidade dos botoes
    this.btnCadastro = true;

    //visibilidade da tabela
    this.tabela = true;

  }

  //metodo de inicializacao
  ngOnInit(){
    this.selecionar();
    this.filtrar();
  }


}
