import { Coleta } from "@/utils/types";
import DangerIcon from "../icons/DangerIcon";
import OkIcon from "../icons/OkIcon";

export default function TableColetas(props: {coletas: Coleta[]}) {
    const { coletas } = props;
    return (
        <>
            <table className="max-w-full overflow-x-auto border border-slate-500 mb-8 last:mb-0">
                <thead>
                    <tr className="bg-slate-300 text-neutral-800">
                        <th className="px-2 py-1">ID</th>
                        <th className="px-2 py-1">Ordem</th>
                        <th className="px-2 py-1">Temperatura</th>
                        <th className="px-2 py-1">Cloro residual livre</th>
                        <th className="px-2 py-1">Turbidez</th>
                        <th className="px-2 py-1">Coliformes totais</th>
                        <th className="px-2 py-1">Escherichia coli</th>
                        <th className="px-2 py-1">Cor</th>
                        <th className="px-2 py-1">Data</th>
                        <th className="px-2 py-1">Responsáveis</th>
                        <th className="px-2 py-1">Status</th>
                        <th className="px-2 py-1">Editar</th>
                    </tr>
                </thead>    
                <tbody>
                    {coletas.map(coleta => {
                        return (
                            <tr className="bg-slate-200 even:bg-slate-100">
                                <td className="px-2 py-3">{coleta.id}</td>
                                <td className="px-2 py-3">{coleta.ordem}</td>
                                <td className="px-2 py-3">{coleta.temperatura} ºC</td>
                                <td className="px-2 py-3">{coleta.cloro_residual_livre} mg/L</td>
                                <td className="px-2 py-3">{coleta.turbidez} uT </td>
                                <td className="px-2 py-3">{coleta.coliformes_totais ? 'Presença' : 'Ausência'}</td>
                                <td className="px-2 py-3">{coleta.escherichia ? 'Presença' : 'Ausência'}</td>
                                <td className="px-2 py-3">{coleta.cor}</td>
                                <td className="px-2 py-3">{coleta.data}</td>
                                <td className="px-2 py-3">responsaveis</td>
                                <td className="px-2 py-3 text-center flex gap-2">
                                    {/* {coleta.status.status ? <i className="bi bi-check2"></i> : <i className="bi bi-x"></i>}
                                    {coleta.status.message} */}
                                    {coleta.status ? <OkIcon width="1.5rem" /> : <DangerIcon width="1.5rem"/>} <span className="max-w-40 block text-nowrap text-ellipsis overflow-hidden">{String(coleta.status_messages)}</span>
                                </td>
                                <td className="px-2 py-3">
                                    <a 
                                        href={`/coletas/${coleta.id}`} 
                                        className="text-neutral-600 font-medium hover:text-blue-600"
                                    >
                                        Editar
                                    </a>
                                </td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}