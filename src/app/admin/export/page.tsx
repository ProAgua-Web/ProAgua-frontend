"use client";

import { useState, useEffect } from "react";
import TableColetas from "@/components/coletas/TabelaColetas";

function toURLParams(data: Object) {
    let params = [];
    
    for (const [key, value] of Object.entries(data)) {
        if (value) {
            params.push(key + "=" + value);
        }
    }

    return params.join('&');
}

export default function Page() {
    const [filters, setFilters] = useState<any>({data_minima: '', data_maxima: ''});
    const [coletas, setColetas] = useState<any[]>([]);

    useEffect(() => {
        (async() => {
            const _filters = {...filters};
            if (_filters.data_minima != '') {
                _filters.data_minima = (new Date(_filters.data_minima)).toISOString().split('T')[0];
            }
            
            if (_filters.data_maxima != '') {
                _filters.data_maxima = (new Date(_filters.data_maxima)).toISOString().split('T')[0];
            }
            
            const query = toURLParams(_filters);

            const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/v1/coletas?` + query);
            const coletas = await resp.json();
            setColetas(coletas);
        })();
    }, [filters]);
    
    const submitForm = async (e) => {
        e.preventDefault();
        const _filters = {...filters};
            if (_filters.data_minima != '') {
                _filters.data_minima = (new Date(_filters.data_minima)).toISOString().split('T')[0];
            }
            
            if (_filters.data_maxima != '') {
                _filters.data_maxima = (new Date(_filters.data_maxima)).toISOString().split('T')[0];
            }
            
        const query = toURLParams(_filters);
        const resp = await fetch(process.env.NEXT_PUBLIC_API_URL + "api/v1/coletas/csv?" + query);
        const blob = await resp.blob();
        
        var file = window.URL.createObjectURL(blob);
        window.location.assign(file);
    }

    return (
        <>  
            <div className="w-full min-w-fit">
                <div className="w-full mb-12">
                    <h1 className="text-2xl mb-4 font-bold text-neutral-600">Filtrar dados</h1>
                    <form 
                        method="GET"
                        onSubmit={submitForm}
                        className="w-full flex gap-4 items-end flex-row px-8 py-6 border border-neutral-300 shadow-lg rounded-lg"
                    >   

                        <div className="flex flex-col">
                            <label htmlFor="start-data">Data inicial</label>
                            <input 
                                type="date"
                                name="data_minima"
                                id="start-data"
                                className="p-4 bg-white border border-neutral-300 rounded-lg"
                                value={ filters.data_minima }
                                onChange={e => setFilters({...filters, data_minima: e.target.value })}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="end-data">Data final</label>
                            <input 
                                type="date"
                                name="data_maxima"
                                id="end-data"
                                className="p-4 bg-white border border-neutral-300 rounded-lg"
                                value={ filters.data_maxima }
                                onChange={e => setFilters({...filters, data_maxima: e.target.value })}
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
                <TableColetas
                    coletas={coletas}
                />
            </div>
        </>
        
    )

}