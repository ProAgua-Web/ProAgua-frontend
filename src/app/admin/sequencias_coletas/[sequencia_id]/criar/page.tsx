import { API_BASE_URL } from "@/utils/config";
import { Usuario } from "@/utils/api_consumer"
import ColetaForm from "./ColetaForm";

export default async function Page({ params }: { params: {
    sequencia_id: number
}}) {
    // const sequencia = useSequencia(params.sequencia_id);
    // const pontos = usePontos(sequencia?.ponto_url);
    const resp = await fetch(`${API_BASE_URL}/api/v1/usuarios`);
    const users: Usuario[] = (await resp.json()).items;

    return (
        <>
            <h1 className="text-4xl text-neutral-700 font-bold mb-8">Criar nova coleta</h1>
            <ColetaForm 
                users={users}
                api_url={API_BASE_URL}
                sequencia_id={params.sequencia_id}
            ></ColetaForm>
        </>
    )
}