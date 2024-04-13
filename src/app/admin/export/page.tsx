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
    const [filters, setFilters] = useState<any>({ data_minima: '', data_maxima: '', temperatura_minima: '', temperatura_maxima: '', cloro_residual_livre_minimo: '', cloro_residual_livre_maximo: '', turbidez_minima: '', turbidez_maxima: '', cor_minima: '', cor_maxima: '', coliformes_totais: false, escherichia: false });
    const [coletas, setColetas] = useState<any[]>([]);

    useEffect(() => {
        (async () => {
            const _filters = { ...filters };
            if (_filters.data_minima != '') {
                _filters.data_minima = (new Date(_filters.data_minima)).toISOString().split('T')[0];
            }

            if (_filters.data_maxima != '') {
                _filters.data_maxima = (new Date(_filters.data_maxima)).toISOString().split('T')[0];
            }

            if (_filters.temperatura_minima != '') {
                _filters.temperatura_minima = parseFloat(_filters.temperatura_minima);
            }

            if (_filters.temperatura_maxima != '') {
                _filters.temperatura_maxima = parseFloat(_filters.temperatura_maxima);
            }

            if (_filters.cloro_residual_livre_minimo != '') {
                _filters.cloro_residual_livre_minimo = parseFloat(_filters.cloro_residual_livre_minimo);
            }

            if (_filters.cloro_residual_livre_maximo != '') {
                _filters.cloro_residual_livre_maximo = parseFloat(_filters.cloro_residual_livre_maximo);
            }

            if (_filters.turbidez_minima != '') {
                _filters.turbidez_minima = parseFloat(_filters.turbidez_minima);
            }

            if (_filters.turbidez_maxima != '') {
                _filters.turbidez_maxima = parseFloat(_filters.turbidez_maxima);
            }

            if (_filters.cor_minima != '') {
                _filters.cor_minima = parseFloat(_filters.cor_minima);
            }

            if (_filters.cor_maxima != '') {
                _filters.cor_maxima = parseFloat(_filters.cor_maxima);
            }

            if (_filters.escherichia === 'both') {
                _filters.escherichia =  null;
            }

            if (_filters.coliformes_totais === 'both') {
                _filters.coliformes_totais =  null;
            }

            const query = toURLParams(_filters);

            const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/coletas?` + query);
            const coletas = await resp.json();
            setColetas(coletas);
        })();
    }, [filters]);

    const submitForm = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const _filters = { ...filters };
        if (_filters.data_minima != '') {
            _filters.data_minima = (new Date(_filters.data_minima)).toISOString().split('T')[0];
        }

        if (_filters.data_maxima != '') {
            _filters.data_maxima = (new Date(_filters.data_maxima)).toISOString().split('T')[0];
        }

        if (_filters.temperatura_minima != '') {
            _filters.temperatura_minima = parseFloat(_filters.temperatura_minima);
        }

        if (_filters.temperatura_maxima != '') {
            _filters.temperatura_maxima = parseFloat(_filters.temperatura_maxima);
        }

        if (_filters.cloro_residual_livre_minimo != '') {
            _filters.cloro_residual_livre_minimo = parseFloat(_filters.cloro_residual_livre_minimo);
        }

        if (_filters.cloro_residual_livre_maximo != '') {
            _filters.cloro_residual_livre_maximo = parseFloat(_filters.cloro_residual_livre_maximo);
        }

        if (_filters.turbidez_minima != '') {
            _filters.turbidez_minima = parseFloat(_filters.turbidez_minima);
        }

        if (_filters.turbidez_maxima != '') {
            _filters.turbidez_maxima = parseFloat(_filters.turbidez_maxima);
        }

        if (_filters.cor_minima != '') {
            _filters.cor_minima = parseFloat(_filters.cor_minima);
        }

        if (_filters.cor_maxima != '') {
            _filters.cor_maxima = parseFloat(_filters.cor_maxima);
        }

        const query = toURLParams(_filters);
        const resp = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/v1/coletas/csv?" + query);
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
                        className="w-full flex flex-wrap gap-4 items-end flex-row px-8 py-6 border border-neutral-300 shadow-lg rounded-lg"
                    >

                        <div className="flex flex-col">
                            <label htmlFor="start-data">Data inicial</label>
                            <input
                                type="date"
                                name="data_minima"
                                id="start-data"
                                className="p-4 bg-white border border-neutral-300 rounded-lg"
                                value={filters.data_minima}
                                onChange={e => setFilters({ ...filters, data_minima: e.target.value })}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="end-data">Data final</label>
                            <input
                                type="date"
                                name="data_maxima"
                                id="end-data"
                                className="p-4 bg-white border border-neutral-300 rounded-lg"
                                value={filters.data_maxima}
                                onChange={e => setFilters({ ...filters, data_maxima: e.target.value })}
                            />
                        </div>

                        {/* responsavel__username__contains: Optional[str] = Field(q=["responsavel__username__contains"])
    data__gte: Optional[date] = Field(alias="data_minima")
    data__lte: Optional[date] = Field(alias="data_maxima")
    sequencia_id: Optional[int] = Field(alias="sequencia__id")
    temperatura__gte: Optional[float] = Field(alias="temperatura_minima")
    temperatura__lte: Optional[float] = Field(alias="temperatura_maxima")
    cloro_residual_livre__gte: Optional[float] = Field(alias="cloro_residual_livre_minimo")
    cloro_residual_livre__lte: Optional[float] = Field(alias="cloro_residual_livre_maximo")
    turbidez__gte: Optional[float] = Field(alias="turbidez_minima")
    turbidez__lte: Optional[float] = Field(alias="turbidez_maxima")
    coliformes_totais: Optional[bool] = Field(alias="coliformes_totais")
    escherichia: Optional[bool] = Field(alias="escherichia")
    cor__gte: Optional[float] = Field(alias="cor_minima")
    cor__lte: Optional[float] = Field(alias="cor_maxima")
    ordem: Optional[str] = Field(alias="ordem") */}

                        <div className="flex flex-col">
                            <label htmlFor="min-temp">Temperatura mínima</label>
                            <input
                                type="number"
                                name="temp_minima"
                                id="min-temp"
                                className="p-4 bg-white border border-neutral-300 rounded-lg"
                                value={filters.temperatura_minima}
                                onChange={e => setFilters({ ...filters, temperatura_minima: e.target.value })}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="max-temp">Temperatura máxima</label>
                            <input
                                type="number"
                                name="temp_maxima"
                                id="max-temp"
                                className="p-4 bg-white border border-neutral-300 rounded-lg"
                                value={filters.temperatura_maxima}
                                onChange={e => setFilters({ ...filters, temperatura_maxima: e.target.value })}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="min-cloro">Cloro residual livre mínimo</label>
                            <input
                                type="number"
                                name="cloro_residual_livre_minimo"
                                id="min-cloro"
                                className="p-4 bg-white border border-neutral-300 rounded-lg"
                                value={filters.cloro_residual_livre_minimo}
                                onChange={e => setFilters({ ...filters, cloro_residual_livre_minimo: e.target.value })}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="max-cloro">Cloro residual livre máximo</label>
                            <input
                                type="number"
                                name="cloro_residual_livre_maximo"
                                id="max-cloro"
                                className="p-4 bg-white border border-neutral-300 rounded-lg"
                                value={filters.cloro_residual_livre_maximo}
                                onChange={e => setFilters({ ...filters, cloro_residual_livre_maximo: e.target.value })}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="min-turbidez">Turbidez mínima</label>
                            <input
                                type="number"
                                name="turbidez_minima"
                                id="min-turbidez"
                                className="p-4 bg-white border border-neutral-300 rounded-lg"
                                value={filters.turbidez_minima}
                                onChange={e => setFilters({ ...filters, turbidez_minima: e.target.value })}
                            />

                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="max-turbidez">Turbidez máxima</label>
                            <input
                                type="number"
                                name="turbidez_maxima"
                                id="max-turbidez"
                                className="p-4 bg-white border border-neutral-300 rounded-lg"
                                value={filters.turbidez_maxima}
                                onChange={e => setFilters({ ...filters, turbidez_maxima: e.target.value })}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="coliformes_totais">Presença de Coliformes totais</label>

                            <select className="p-4 bg-white border border-neutral-300 rounded-lg" name="coliformes_totais" id="coliformes_totais" onChange={e => setFilters({ ...filters, coliformes_totais: e.target.value })}>
                                <option value="both">Presença/Ausência</option>
                                <option value="true">Presença</option>
                                <option value="false">Ausência</option>
                            </select>

                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="escherichia">Presença de Escherichia coli</label>

                            <select className="p-4 bg-white border border-neutral-300 rounded-lg" name="escherichia" id="escherichia" onChange={e => setFilters({ ...filters, escherichia: e.target.value })}>
                                <option value="both">Presença/Ausência</option>
                                <option value="true">Presença</option>
                                <option value="false">Ausência</option>
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="min-cor">Cor aparente mínima</label>
                            <input
                                type="number"
                                name="cor_minima"
                                id="min-cor"
                                className="p-4 bg-white border border-neutral-300 rounded-lg"
                                value={filters.cor_minima}
                                onChange={e => setFilters({ ...filters, cor_minima: e.target.value })}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="max-cor">Cor aparente máxima</label>
                            <input
                                type="number"
                                name="cor_maxima"
                                id="max-cor"
                                className="p-4 bg-white border border-neutral-300 rounded-lg"
                                value={filters.cor_maxima}
                                onChange={e => setFilters({ ...filters, cor_maxima: e.target.value })}
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