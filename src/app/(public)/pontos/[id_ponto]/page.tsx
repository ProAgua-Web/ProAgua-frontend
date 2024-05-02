import Header from "@/components/layout/Header";
import { Coleta, Ponto } from "@/utils/types";
import { API_BASE_URL } from "@/utils/config";


function PointDashboard(props: {coleta: Coleta}) {
    const { coleta } = props;
    const bg_color = coleta.status ? "bg-green-200" : "bg-orange-200";
    return (
        <div className="flex gap-8 p-8">
            <div className={"rounded-lg p-4 shadow " + bg_color}>
                <h1>Coliformes totais</h1>
                <p>
                    {coleta.coliformes_totais ? "Presença" : "Ausência"}
                </p>
            </div>
            
            <div className={"rounded-lg p-4 shadow " + bg_color}>
                <h1>Escherichia coli</h1>
                <p>
                    {coleta.escherichia ? "Presença" : "Ausência"}
                </p>
            </div>
            
            <div className={"rounded-lg p-4 shadow " + bg_color}>
                <h1>Turbidez</h1>
                <p>
                    {coleta.turbidez} uT
                </p>
            </div>
            
            <div className={"rounded-lg p-4 shadow " + bg_color}>
                <h1>Cloro residual livre</h1>
                <p>
                    {coleta.cloro_residual_livre} mg/L
                </p>
            </div>

            <div className={"rounded-lg p-4 shadow " + bg_color}>
                <h1>Temperatura</h1>
                <p>
                    {coleta.temperatura} ºC
                </p>
            </div>
        </div>
    )
}

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
            <div className="pt-[calc(clamp(50px,8vh,100px)+2rem)] px-8">
                <div className="p-4 rounded border border-neutral-300 shadow">
                    ID ponto: {ponto.id}<br />
                    Prédio: {ponto.edificacao.codigo} - {ponto.edificacao.nome} {ponto.edificacao.campus}
                    <br />
                    Ambiente: {ponto.ambiente}<br />
                    Status: {ponto.status ? "Em conformidade" : "Não conforme"}<br />
                </div>
                <div>
                    {/* {coleta && 
                        <>
                            id: {coleta.id}; 
                            cloro: {coleta.cloro_residual_livre}; 
                            cor: {coleta.cor}; 
                            data: {coleta.data}; 
                            coliformes: {coleta.coliformes_totais ? "Presença" : "Ausência"}; 
                            escherichia: {coleta.escherichia ? "Presença" : "Ausência"} ; 
                            status: {coleta.status.status ? "Em conformidade" : "Não conforme"};
                        </>    
                    } */}
                    {coleta && <PointDashboard coleta={coleta} />}
                </div>
            </div>
            
        </>
    )
}