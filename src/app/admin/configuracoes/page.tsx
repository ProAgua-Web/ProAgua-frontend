import { Usuario } from "@/utils/types";
import { getUsuarios } from "@/utils/api_consumer/server_side_consumer";

export default async function Configuracoes() {
    const usuarios: Usuario[] = await getUsuarios();

    return (
        <>
            
            <h1 className="text-3xl font-semibold mb-2">Configurações</h1>

            <h2 className="text-2xl font-semibold mt-8 text-neutral-700">Usuários</h2>
            <div className="w-full bg-white shadow-lg rounded border border-neutral-300 p-4">
                <ul>
                    {usuarios.map(usuario => (
                        <li className="flex justify-between p-4 pr-0 border-b border-neutral-300 last:border-b-0">
                            {usuario.username}
                            <a href={`/admin/configuracoes/usuarios/${usuario.username}`} className="px-4 py-2 border border-blue-500 rounded text-blue-500 hover:text-white hover:bg-blue-500 hover:border-blue-600">Editar</a>
                        </li>
                    ))}
                </ul>
                <button className="ml-auto w-fit px-4 py-2 bg-green-500 border border-green-600 rounded text-white font-semibold">+ Adicionar usuário</button>
            </div>


            <h2 className="text-2xl font-semibold mt-8 text-neutral-700">Parâmetros de referência</h2>
            <p className="text-neutral-500"> Estes valores são serão usados para análise das coletas</p>
            <div className="w-full bg-white shadow-lg rounded border border-neutral-300 p-4">
                <div className="w-full flex gap-4 p-4 border-b border-neutral-300">
                    <label className="flex-grow">Temperatura</label>
                    <input className="w-48 px-4 py-2 border border-neutral-300 rounded" type="number" step="0.1" placeholder="valor mínimo"/>
                    <input className="w-48 px-4 py-2 border border-neutral-300 rounded" type="number" step="0.1" placeholder="valor máximo"/>
                </div>

                <div className="w-full flex gap-4 p-4 border-b border-neutral-300">
                    <label className="flex-grow">Cloro residual livre</label>
                    <input className="w-48 px-4 py-2 border border-neutral-300 rounded" type="number" step="0.1" placeholder="valor mínimo"/>
                    <input className="w-48 px-4 py-2 border border-neutral-300 rounded" type="number" step="0.1" placeholder="valor máximo"/>
                </div>

                <div className="w-full flex gap-4 p-4 border-b border-neutral-300">
                    <label className="flex-grow">Turbidez</label>
                    <input className="w-48 px-4 py-2 border border-neutral-300 rounded" type="number" step="0.1" placeholder="valor mínimo"/>
                    <input className="w-48 px-4 py-2 border border-neutral-300 rounded" type="number" step="0.1" placeholder="valor máximo"/>
                </div>

                <div className="w-full flex gap-4 p-4 border-b border-neutral-300">
                    <label className="flex-grow">Cor</label>
                    <input className="w-48 px-4 py-2 border border-neutral-300 rounded" type="number" step="0.1" placeholder="valor mínimo"/>
                    <input className="w-48 px-4 py-2 border border-neutral-300 rounded" type="number" step="0.1" placeholder="valor máximo"/>
                </div>
                
                <div className="w-full flex gap-4 p-4">
                    <label className="flex-grow">Temperatura</label>
                    <input className="w-48 px-4 py-2 border border-neutral-300 rounded" type="number" step="0.1" placeholder="valor mínimo"/>
                    <input className="w-48 px-4 py-2 border border-neutral-300 rounded" type="number" step="0.1" placeholder="valor máximo"/>
                </div>
                <button className="px-4 py-2 rounded bg-rose-500 text-white font-semibold hover:bg-rose-600 border border-rose-700">
                    Habilitar edição
                </button>
            </div>
        </>
    );
}
