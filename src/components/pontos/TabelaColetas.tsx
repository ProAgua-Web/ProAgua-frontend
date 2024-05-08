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
                    {pontos.map(ponto => {
                        return (
                            <tr className="bg-sky-200 even:bg-sky-50">
                                <td className="px-4 py-2">{ponto.id}</td>
                                <td className="px-4 py-2">{ponto.edificacao.nome} | Campus: {ponto.edificacao.campus}</td>
                                <td className="px-4 py-2">{ponto.tipo}</td>
                                <td className="px-4 py-2">{ponto.tombo}</td>
                                <td className="px-4 py-2">{ponto.status ? "Em conformidade" : "Não conforme"}</td>
                                <td className="px-4 py-2"><a href={`pontos/${ponto.id}`}>Detalhes</a></td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}