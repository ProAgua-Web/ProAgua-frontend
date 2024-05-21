import { Ponto, Sequencia } from "@/utils/types";
import { API_BASE_URL } from "@/utils/config";

function SequenciaList(props: { sequencias: Sequencia[] }) {
    return (
        <ul>
            {props.sequencias.map((sequencia) => {
                return (
                    <li
                        key={sequencia.id}
                        className="group flex items-center justify-between p-4 border-b border-b-neutral-300 hover:bg-blue-100 last-of-type:border-b-0"
                    >
                        <span>
                            Sequência {sequencia.id} - {sequencia.ponto.ambiente} - {sequencia.ponto.edificacao.nome}
                        </span>
                        <p className="w-[300px] text-nowrap text-ellipsis overflow-hidden group-hover:text-wrap">
                            {sequencia.status_message}
                        </p>
                        <a href={`sequencias_coletas/${sequencia.id}`} className="text-blue-800 font-medium underline hover:bg-white px-4 py-2 rounded">Detalhes</a>
                    </li>
                )
            }
            )}
        </ul>
    )
}
    export default async function page() {
        const resp = await fetch(`${API_BASE_URL}/api/v1/sequencias`, { cache: "no-cache" });
        const pendings: Sequencia[] = (await resp.json()).items.filter((sequencia: Sequencia) => !sequencia.status);

        return (
            <>
                <h1 className="text-3xl font-bold uppercase text-neutral-600">Dashboard</h1>
                <div className="shadow-lg rounded-lg p-4 border border-neutral-200 w-full">
                    <h2 className="text-3xl font-medium text-neutral-600 mb-4 w-full text-center">Coletas pendentes</h2>
                    <SequenciaList sequencias={pendings} />
                </div>
            </>
        );
    }