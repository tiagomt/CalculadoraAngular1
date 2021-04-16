import { Component, OnInit } from '@angular/core';
import { CalculadoraService } from '../service';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent implements OnInit {

  private numero1: string;
  private numero2: string;
  private resultado: number;
  private operacao: string;

  constructor(private calculadoraService: CalculadoraService) { }

  ngOnInit(): void {
    //limpa a tela ao iniciar
    this.limpar();
  }

  /**
   * Inicializa os operadores com valores padrão
   */
  limpar(): void {

    this.numero1 = '0';
    this.numero2 = null;
    this.resultado = null;
    this.operacao = null;

  }

  /**
   * Adiciona o número selecionado para posterior cálculo
   * 
   * @param numero 
   */
  adicionarNumero(numero: string): void {

    if (this.operacao === null) {
      this.numero1 = this.concatenarNumero(this.numero1, numero);
    } else {
      this.numero2 = this.concatenarNumero(this.numero1, numero);
    }

  }

  /**
   * Retorna valores concatenados. Trata o separador decimal
   * 
   * @param numAtual string
   * @param numConcat string
   * @returns string
   */
  concatenarNumero(numAtual: string, numConcat: string): string {

    //caso numAtual seja 0 ou null, reinicia o valor
    if (numAtual === '0' || numAtual === null) {
      numAtual = '';
    }

    //primeiro digitado é '.', concatena '0' antes do ponto
    if (numConcat === '.' && numAtual === '0') {
      return '0.';
    }

    if (numConcat === '.' && numAtual.indexOf('.') > -1) {
      return numAtual;
    }

    return numAtual + numConcat;
  }

  /**
   * Executa a lógica quando um operador for selecionado.
   * Caso já possua uma operação selecionada, executa 
   * a operação anterior, e define a nova operação.
   * 
   * @param operacao string
   * @returns void
   */
  definirOperacao(operacao: string): void {

    //define a operação caso não exista uma
    if (this.operacao === null) {
      this.operacao = operacao;
      return;
    }

    /*caso operação definida e número 2 selecionado, efetua
    efetua o cálculo da operação*/
    if (this.numero2 !== null) {

      this.resultado = this.calculadoraService.calcular(
        parseFloat(this.numero1),
        parseFloat(this.numero2),
        this.operacao
      );

      this.operacao = operacao;
      this.numero1 = this.resultado.toString();
      this.numero2 = null;
      this.resultado = null;

    }

  }

  /**
   * Efetua o cálculo da operação
   * 
   * @returns void
   */
  calcular(): void {

    if (this.numero2 === null) {
      return;
    }

    this.resultado = this.calculadoraService.calcular(
      parseFloat(this.numero1),
      parseFloat(this.numero2),
      this.operacao)
  }


  get display(): string { //get cria um atributo chamado display

    if (this.resultado !== null) {
      return this.resultado.toString();
    }

    if (this.numero2 !== null) {
      return this.numero2;
    }

    return this.numero1;
  }


}
