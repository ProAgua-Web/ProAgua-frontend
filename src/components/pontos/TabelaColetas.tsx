import { Ponto, Coleta } from "@/utils/types";

export default function TablePontos(props: {pontos: Ponto[]}) {
    const { pontos } = props;
    return (
        <>
            <table className="w-full max-w-full overflow-x-auto border border-black mb-8 last:mb-0">
                <thead>
                    <tr className="bg-sky-900 text-white">
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Edificação</th>
                        <th className="px-4 py-2">Tipo do ponto</th>
                        <th className="px-4 py-2">Tombo</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Visualizar</th>
                    </tr>
                </thead>    
                <tbody>
                    {pontos.map((ponto, index) => {
                        return (
                            <tr  key={"tr" + index} className="bg-sky-200 even:bg-sky-50">
                                <td key={"td_id" + index} className="px-4 py-2">{ponto.id}</td>
                                <td key={"td_edificacao" + index}className="px-4 py-2">{ponto.edificacao.nome} | Campus: {ponto.edificacao.campus}</td>
                                <td key={"td_tipo" + index} className="px-4 py-2">{ponto.tipo}</td>
                                <td key={"td_tombo" + index} className="px-4 py-2">{ponto.tombo}</td>
                                <td key={"td_status" + index} className="px-4 py-2">{ponto.status ? "Em conformidade" : "Não conforme"}</td>
                                <td key={"td_detalhes" + index} className="px-4 py-2"><a href={`pontos/${ponto.id}`}>Detalhes</a></td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}