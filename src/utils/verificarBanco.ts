import { Banco } from "../services/api";

export const verificarBanco = (banco: Banco) => {
  switch (banco) {
    case Banco.Banco_Do_Brasil:
      return "./src/assets/bancodobrasil.svg";
      break;
    case Banco.Inter:
      return "./src/assets/inter.png";
      break;
    case Banco.Bradesco:
      return "./src/assets/bradesco.svg";
      break;
    case Banco.C6_bank:
      return "./src/assets/c6bank.png";
      break;
    case Banco.Caixa:
      return "./src/assets/caixa.png";
      break;
    case Banco.Carteira_Física:
      return "./src/assets/carteira.svg";
      break;
    case Banco.Itaú:
      return "./src/assets/itau.svg";
      break;
    case Banco.Nubank:
      return "./src/assets/nubank.png";
      break;
    case Banco.Outros:
      return "./src/assets/outros.svg";
      break;
    case Banco.PicPay:
      return "./src/assets/picpay.webp";
      break;
    case Banco.Santander:
      return "./src/assets/santander.png";
      break;
    case Banco.Sicoob:
      return "./src/assets/sicoob.png";
      break;
    case Banco.Sicredi:
      return "./src/assets/sicredi.png";
      break;
    default:
      break;
  }
};
