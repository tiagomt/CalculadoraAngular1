import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculadoraService {

  // Definição das constantes de cálculo
  static readonly SOMA: string = '+';
  static readonly SUBTRACAO: string = '-';
  static readonly MULTIPLICACAO: string = '*';
  static readonly DIVISAO: string = '/';

  constructor() { }

  /**
   * Método que calcula uma operação matemática dado dois números
   * 
   * @param num1 number
   * @param num2 number
   * @param operacao string
   * @returns resultado number
   */
  calcular(num1: number, num2: number, operacao: string): number {

    let resultado: number;

    switch (operacao) {
      case CalculadoraService.SOMA:
        resultado = num1 + num2;
        break;
      case CalculadoraService.SUBTRACAO:
        resultado = num1 - num2;
        break;
      case CalculadoraService.MULTIPLICACAO:
        resultado = num1 * num2;
        break;
      case CalculadoraService.DIVISAO:
        resultado = num1 / num2;
        break;
      default:
        resultado = 0;
        break;
    }

    return resultado;
  }
}
