import { Coleta, TIPOS_PONTOS } from "@/utils/types";
import DangerIcon from "../icons/DangerIcon";
import OkIcon from "../icons/OkIcon";

export default function TableColetas(props: { coletas: Coleta[] }) {
    const { coletas } = props;

    function formatDate(date: string) {
        const d = new Date(date);
        const hour = d.toLocaleTimeString().slice(0, 5).replace(':', 'h');
        return `${d.toLocaleDateString()} ${hour}`;
    }

    return (
        <>
            <div className="w-full overflow-x-auto ">
                <table className="border border-slate-500 mb-8 last:mb-0">
                    <thead>
                        <tr className="bg-slate-300 text-neutral-800">
                            <th className="px-2 py-1">ID</th>
                            <th className="px-2 py-1">Edificação</th>
                            <th className="px-2 py-1">Ponto</th>
                            <th className="px-2 py-1">Ordem</th>
                            <th className="px-2 py-1">Temperatura</th>
                            <th className="px-2 py-1">Cloro residual livre</th>
                            <th className="px-2 py-1">Turbidez</th>
                            <th className="px-2 py-1">Coliformes totais</th>
                            <th className="px-2 py-1">Escherichia coli</th>
                            <th className="px-2 py-1">Cor</th>
                            <th className="px-2 py-1">Data</th>
                            <th className="px-2 py-1">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {coletas.map(coleta => {
                            return (
                                <tr className="bg-slate-200 even:bg-slate-100 hover:bg-blue-300 transition-colors duration-200 cursor-pointer select-none"
                                    onClick={() => {
                                        window.location.href = `/admin/coletas/${coleta.id}`;
                                    }}>
                                    <td className="px-2 py-3">{coleta.id}</td>
                                    <td className="px-2 py-3">{coleta.ponto.edificacao.codigo}</td>
                                    <td className="px-2 py-3">
                                        <span className="max-w-40 block text-nowrap text-ellipsis overflow-hidden">{TIPOS_PONTOS[coleta.ponto.tipo]} </span> - {coleta.ponto.ambiente} - {coleta.ponto.tombo}
                                    </td>
                                    <td className="px-2 py-3">{coleta.ordem}</td>
                                    <td className="px-2 py-3">{coleta.temperatura} ºC</td>
                                    <td className="px-2 py-3">{coleta.cloro_residual_livre} mg/L</td>
                                    <td className="px-2 py-3">{coleta.turbidez} uT </td>
                                    <td className="px-2 py-3">{coleta.coliformes_totais ? 'Presença' : 'Ausência'}</td>
                                    <td className="px-2 py-3">{coleta.escherichia ? 'Presença' : 'Ausência'}</td>
                                    <td className="px-2 py-3">{coleta.cor}</td>
                                    <td className="px-2 py-3 text-nowrap">{formatDate(coleta.data)}</td>
                                    <td className="px-2 py-3" title={String(coleta.status_messages)}>
                                        <span className="flex gap-2">
                                            {coleta.status ? <OkIcon width="1.5rem" /> : <DangerIcon width="1.5rem" />}
                                        </span>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}