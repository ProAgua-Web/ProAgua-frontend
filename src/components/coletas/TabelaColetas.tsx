import { Coleta } from "@/utils/api_consumer";

export default function TableColetas(props: {coletas: Coleta[]}) {
    const { coletas } = props;
    return (
        <>
            <table className="max-w-full overflow-x-auto border border-black mb-8 last:mb-0">
                <thead>
                    <tr className="bg-sky-900 text-white">
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Ordem</th>
                        <th className="px-4 py-2">Temperatura</th>
                        <th className="px-4 py-2">Cloro residual livre</th>
                        <th className="px-4 py-2">Turbidez</th>
                        <th className="px-4 py-2">Coliformes totais</th>
                        <th className="px-4 py-2">Escherichia coli</th>
                        <th className="px-4 py-2">Cor</th>
                        <th className="px-4 py-2">Data</th>
                        <th className="px-4 py-2">Responsáveis</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Editar</th>
                    </tr>
                </thead>    
                <tbody>
                    {coletas.map(coleta => {
                        return (
                            <tr className="bg-sky-200 even:bg-sky-50">
                                <td className="px-4 py-2">{coleta.id}</td>
                                <td className="px-4 py-2">{coleta.ordem}</td>
                                <td className="px-4 py-2">{coleta.temperatura} ºC</td>
                                <td className="px-4 py-2">{coleta.cloro_residual_livre} mg/L</td>
                                <td className="px-4 py-2">{coleta.turbidez} uT </td>
                                <td className="px-4 py-2">{coleta.coliformes_totais ? 'Presença' : 'Ausência'}</td>
                                <td className="px-4 py-2">{coleta.escherichia ? 'Presença' : 'Ausência'}</td>
                                <td className="px-4 py-2">{coleta.cor}</td>
                                <td className="px-4 py-2">{coleta.data}</td>
                                <td className="px-4 py-2">responsaveis</td>
                                <td className="px-4 py-2 text-center">
                                    {coleta.status.status ? <i className="bi bi-check2"></i> : <i className="bi bi-x"></i>}
                                    {coleta.status.message}
                                </td>
                                <td className="px-4 py-2">
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