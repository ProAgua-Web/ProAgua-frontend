export default function Solicitacoes() {
    const solicitacoes = [
        {
            codigo: "S01",
            ponto: {}
        },
        {
            codigo: "S02",
            ponto: {}
        },
    ];

    return (
        <>
        <h1 className="text-3xl font-bold mb-4">Solicitações</h1>
        <div className="w-full bg-white rounded border border-neutral-300 shadow-lg p-4">
            <ul>
                
                {solicitacoes.map(solicitacao => (
                    <li className="flex justify-between p-2 items-center border-b border-neutral-300 last:border-b-0">
                        Solicitação {solicitacao.codigo}
                        <a className="px-4 py-2 rounded border border-blue-500 text-blue-500" href={ "/admin/solicitacoes/" + solicitacao.codigo }>Acessar</a>
                    </li>
                ))}
                
            </ul>
            <a 
                href="/admin/solicitacoes/criar"
                className="ml-auto w-fit px-4 py-2 bg-green-500 border border-green-600 rounded text-white font-semibold"
            >
                + Criar Solicitação
            </a>
        </div>
        </>
    );
}