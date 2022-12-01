import { Banco } from "../services/api";

interface BancosType {
  icon: string;
  label: Banco;
  cor?: string;
}

export const bancosOptions: readonly BancosType[] = [
  {
    icon: "./src/assets/bancodobrasil.svg",
    label: Banco.Banco_Do_Brasil,
    cor: "yellow",
  },
  {
    icon: "./src/assets/bradesco.svg",
    label: Banco.Bradesco,
  },
  {
    icon: "./src/assets/c6bank.png",
    label: Banco.C6_bank,
  },
  {
    icon: "./src/assets/caixa.png",
    label: Banco.Caixa,
  },
  {
    icon: "./src/assets/inter.png",
    label: Banco.Inter,
  },
  {
    icon: "./src/assets/itau.svg",
    label: Banco.Itaú,
  },
  {
    icon: "./src/assets/nubank.png",
    label: Banco.Nubank,
  },
  {
    icon: "./src/assets/picpay.webp",
    label: Banco.PicPay,
  },
  {
    icon: "./src/assets/santander.png",
    label: Banco.Santander,
  },
  {
    icon: "./src/assets/sicoob.png",
    label: Banco.Sicoob,
  },
  {
    icon: "./src/assets/sicredi.png",
    label: Banco.Sicredi,
  },
  {
    icon: "./src/assets/carteira.svg",
    label: Banco.Carteira_Física,
  },
  {
    icon: "./src/assets/outros.svg",
    label: Banco.Outros,
  },
];
