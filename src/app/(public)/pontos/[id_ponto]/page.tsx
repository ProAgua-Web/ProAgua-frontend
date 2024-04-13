import Header from "@/components/layout/Header";
import { Coleta, Ponto } from "@/utils/api_consumer";
import { API_BASE_URL } from "@/utils/config";


export default async function Page(props: { 
    params: { id_ponto:number }
}) {
    const { params } = props;
    var resp = await fetch(`${API_BASE_URL}/api/v1/pontos/${params.id_ponto}`);
    var ponto: Ponto = await resp.json();
    
    resp = await fetch(`${API_BASE_URL}/api/v1/pontos/${params.id_ponto}/coletas`);
    var coletas: Coleta[] = await resp.json();
    var coleta = coletas[coletas.length - 1];

    return (
        <>
            <Header />
            <div className="pt-[calc(clamp(50px,8vh,100px)+2rem)]">
                API URL: {API_BASE_URL} <br />
                Coletas: {coletas.length}

                ID ponto: {ponto.id}<br />
                Prédio: {ponto.edificacao.codigo} - {ponto.edificacao.nome} {ponto.edificacao.campus}
                <br />
                Ambiente: {ponto.ambiente}<br />
                Status: {ponto.status ? "Em conformidade" : "Não conforme"}<br />
            </div>
            <div>
                {coleta && 
                <>
                    id: {coleta.id}; 
                    cloro: {coleta.cloro_residual_livre}; 
                    cor: {coleta.cor}; 
                    data: {coleta.data}; 
                    coliformes: {coleta.coliformes_totais ? "Presença" : "Ausência"}; 
                    escherichia: {coleta.escherichia ? "Presença" : "Ausência"} ; 
                    status: {coleta.status.status ? "Em conformidade" : "Não conforme"};
                </>    
                }
            </div>
        </>
    )
}