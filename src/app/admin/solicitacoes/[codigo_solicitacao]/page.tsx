export default function Page({ params }: { params: {codigo_solicitacao: string}}) {
    const { codigo_solicitacao } = params;
    return (
        <>
            <h1 className="text-3xl font-bold mb-4">Visualizar solicitação {codigo_solicitacao}</h1>
            <form className="w-full flex flex-col gap-2">
                <label>Tipo de solicitação</label>
                <select className="w-full border border-neutral-300 rounded px-4 py-2" disabled >
                    <option>-</option>
                    <option>Solicitação de limpeza de reservatório</option>
                    <option>Solicitação de instalação de ponto de coleta</option>
                    <option>Solicitação de conserto de tampa de reservatório</option>
                </select>

                <label className="mt-4">Edificação</label>
                <select className="w-full border border-neutral-300 rounded px-4 py-2" disabled >
                    <option>-</option>
                </select>

                <label className="mt-4">Ponto</label>
                <select className="w-full border border-neutral-300 rounded px-4 py-2" disabled >
                    <option>-</option>
                </select>
                
                
                <label className="mt-4">Objetivo do serviço solicitado</label>
                <textarea rows={8} className="w-full border border-neutral-300 rounded px-4 py-2" disabled />

                <label className="mt-4">Justificativa da solicitação</label>
                <textarea rows={8} className="w-full border border-neutral-300 rounded px-4 py-2" disabled />

                <label className="mt-4">Imagens</label>
                <input className="w-full" type="file" name="" id="" accept="image/png, image/jpeg" disabled />

                <input
                    className="border text-white bg-green-500 rounded px-4 py-2" type="submit"
                    value="Editar solicitação"
                />
                <button className="text-white bg-blue-500 rounded px-4 py-2">Salvar em PDF</button>
            </form>
        </>
    )
}