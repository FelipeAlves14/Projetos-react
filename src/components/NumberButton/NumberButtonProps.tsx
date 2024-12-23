export default interface INumberButtonProps {
  /** Função de incremento ou de decremento do botão */
  func: () => void;

  /** Texto interno do botão */
  content: string;
}
