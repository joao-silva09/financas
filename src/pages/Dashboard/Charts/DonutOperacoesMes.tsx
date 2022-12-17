import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { GetDadosByMonth } from "../../../store/slices/Dashboard.store";
import store, { RootState } from "../../../store";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DonutOperacoesMes() {

  const dados = useSelector((root: RootState) => root.dashboardStore);
  const data = {
    labels: ["Entradas", "Saídas"],
    datasets: [
      {
        label: "Operações",
        data: [dados.numeroRecebimentos, dados.numeroGastos],
        backgroundColor: ["rgba(75, 192, 192, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={data} />;
}
