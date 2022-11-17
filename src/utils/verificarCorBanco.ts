import { Banco } from "../services/api";

export const verificarCorBanco = (banco: Banco) => {
  switch (banco) {
    case Banco.Banco_Do_Brasil:
      return "#E3D824";
      break;
    case Banco.Inter:
      return "#F27400";
      break;
    case Banco.Bradesco:
      return "#C2092D";
      break;
    case Banco.C6_bank:
      return "#202124";
      break;
    case Banco.Caixa:
      return "#175994";
      break;
    case Banco.Carteira_Pessoal:
      return "./src/assets/carteira.svg";
      break;
    case Banco.Itaú:
      return "#E06A00";
      break;
    case Banco.Nubank:
      return "#8305B4";
      break;
    case Banco.Outros:
      return "./src/assets/outros.svg";
      break;
    case Banco.PicPay:
      return "#0FB652";
      break;
    case Banco.Santander:
      return "#D50000";
      break;
    case Banco.Sicoob:
      return "#00313C";
      break;
    case Banco.Sicredi:
      return "#ffffff";
      break;
    default:
      break;
  }
};
