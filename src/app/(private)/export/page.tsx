"use client";

import TableColetas from "@/components/coletas/TabelaColetas";
import { useColetas } from "@/utils/api_consumer";
import { useState } from "react";


export default function Page() {
    const [dataMinima, setDataMinima] = useState<string>('');
    const [dataMaxima, setDataMaxima] = useState<string>('');
    
    let query = [];
    
    if (dataMinima != '') {
        let mindate = (new Date(dataMinima)).toISOString().split('T')[0];
        query.push(`data_minima=${mindate}`)
    }

    if (dataMaxima != '') {
        let maxdate = (new Date(dataMaxima)).toISOString().split('T')[0];
        query.push(`data_maxima=${maxdate}`)
    }

    const coletas = useColetas(null, query.length ? query.join('&') : null);
    
    return (
        <>  
            <div className="w-full min-w-fit">
                <div className="w-full mb-12">
                    <h1 className="text-2xl mb-4 font-bold text-neutral-600">Filtrar dados</h1>
                    <form 
                        action="http://localhost:8000/api/v1/coletas/csv" 
                        method="GET"
                        className="w-full flex gap-4 items-end flex-row px-8 py-6 border border-neutral-300 shadow-lg rounded-lg"
                    >   

                        <div className="flex flex-col">
                            <label htmlFor="start-data">Data inicial</label>
                            <input 
                                type="date"
                                name="data_minima"
                                id="start-data"
                                className="p-4 bg-white border border-neutral-300 rounded-lg"
                                value={ dataMinima }
                                onChange={e => setDataMinima(e.target.value) }
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="end-data">Data final</label>
                            <input 
                                type="date"
                                name="data_maxima"
                                id="end-data"
                                className="p-4 bg-white border border-neutral-300 rounded-lg"
                                value={ dataMaxima }
                                onChange={e => setDataMaxima(e.target.value) }
                            />
                        </div>
                        
                        <input 
                            type="submit"
                            value="Exportar"
                            className="bg-blue-500 p-4 h-fit ml-auto rounded-lg hover:bg-blue-600 text-white font-semibold"
                        />   
                    </form>
                </div>
                <h1 className="text-2xl mb-4 font-bold text-neutral-600">Tabela de visualização</h1>
                <TableColetas coletas={coletas} />
            </div>
        </>
        
    )

}