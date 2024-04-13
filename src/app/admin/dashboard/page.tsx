import { Ponto } from "@/utils/api_consumer";
import { API_BASE_URL } from "@/utils/config";

function PointList(props: {points: Ponto[]}) {
    return (
        <ul>
            {props.points.map((point) => {
                return <li className="p-4 border-b border-b-neutral-300 hover:bg-blue-100 last-of-type:border-b-0">Ponto {point.id} | {point.edificacao.nome}, {point.ambiente} </li>
            })}
        </ul>
    )
}
export default async function page() {
    const resp = await fetch(`${API_BASE_URL}/api/v1/pontos`);
    const pendings: Ponto[] = (await resp.json()).items;
    
    return (
        <>
        <h1 className="text-3xl font-bold uppercase text-neutral-600">Dashboard</h1>
        <div className="shadow-lg rounded-lg p-4 border border-neutral-200 w-full">
            <h2 className="text-3xl font-medium text-neutral-600 mb-4 w-full text-center">Coletas pendentes</h2>
            <PointList points={pendings} />
        </div>
        </>
    );
}