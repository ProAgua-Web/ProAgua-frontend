"use client";

import { useState, useEffect } from "react";
import TableColetas from "@/components/coletas/TabelaColetas";
import { Edificacao, Ponto, TIPOS_PONTOS } from "@/utils/types";

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
    const [filters, setFilters] = useState<any>({ data_minima: '', data_maxima: '', temperatura_minima: '', temperatura_maxima: '', cloro_residual_livre_minimo: '', cloro_residual_livre_maximo: '', turbidez_minima: '', turbidez_maxima: '', cor_minima: '', cor_maxima: '', coliformes_totais: false, escherichia: false, codigo_edificacao: '', ponto_id: '' });
    const [coletas, setColetas] = useState<any[]>([]);
    const [edificacoes, setEdificacoes] = useState<any[]>([]);
    const [pontos, setPontos] = useState<any[]>([]);
    const filteredPontos = filters.codigo_edificacao ? pontos.filter(ponto => ponto.edificacao.codigo == filters.codigo_edificacao) : pontos;

    useEffect(() => {
        (async () => {
            const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/edificacoes`);
            const edificacoes = await resp.json();
            setEdificacoes(edificacoes.items);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/pontos`);
            const pontos = await resp.json();
            setPontos(pontos.items);
        })();
    }, []);

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
                _filters.escherichia = null;
            }

            if (_filters.coliformes_totais === 'both') {
                _filters.coliformes_totais = null;
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
        const resp = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/v1/coletas/excel?" + query);
        const blob = await resp.blob();

        var file = window.URL.createObjectURL(blob);
        window.location.assign(file);
    }

    return (
        <div className="ml-[-120px]">
            <h1 className="ml-[-26px] w-full text-center text-2xl mb-4 font-bold text-neutral-600">Tabela de visualização</h1>

            <div className="w-md min-w-fit flex mb-14">
                <TableColetas
                    coletas={coletas}
                />
                <div className="max-h-[calc(100vh-clamp(50px,8vh,100px)-2rem)] mb-12 overflow-y-scroll fixed top-[calc(clamp(50px,8vh,100px)+1rem)] right-4 z-[1000] bg-white shadow-xl border border-neutral-300 rounded-xl">
                    <form
                        method="GET"
                        onSubmit={submitForm}
                        className="w-[320px] flex flex-wrap gap-4 items-end flex-col px-8 py-6 "
                    >
                        <h1 className="w-full text-center text-2xl mb-4 font-bold text-neutral-600">Filtrar dados</h1>

                        <div className="flex flex-col w-full">
                            <label htmlFor="codigo_edificacao">Código da edificação</label>
                            <select className="p-4 bg-white border border-neutral-300 rounded-lg"
                                id="codigo_edificacao"
                                name="codigo_edificacao"
                                onChange={async e => {
                                    setFilters({ ...filters, codigo_edificacao: e.target.value, ponto_id: ''})
                                }}>
                                <option value="">-</option>

                                {edificacoes && edificacoes.map((edificacao: Edificacao) => (
                                    <option key={edificacao.codigo} value={edificacao.codigo} className="">{edificacao.codigo} - {edificacao.nome.length < 30 ? edificacao.nome : edificacao.nome.slice(0, 30).trim() + "..."}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col w-full">
                            <label htmlFor="ponto_id">Ponto de coleta</label>

                            <select className="p-4 bg-white border border-neutral-300 rounded-lg"
                                id="ponto_id"
                                name="ponto_id"
                                onChange={e => setFilters({ ...filters, ponto_id: e.target.value })}>
                                <option value="">-</option>

                                {filteredPontos && filteredPontos.map((ponto: Ponto) => (
                                    <option key={ponto.id} value={ponto.id}>{TIPOS_PONTOS[ponto.tipo - 1]} {ponto.ambiente.trim() != "-" && ponto.ambiente.trim() != "nan" && ponto.ambiente.trim() != "" ? "- " + ponto.ambiente : ""} {ponto.tombo.trim() != "-" && ponto.tombo.trim() != "nan" && ponto.tombo.trim() ? "- " + ponto.tombo : ""}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="">Intervalo de Data</label>

                            <div>
                                <input
                                    type="date"
                                    name="data_minima"
                                    id="start-data"
                                    className="w-1/2 p-4 bg-white border border-r-0 border-neutral-300 rounded-lg rounded-r-none"
                                    value={filters.data_minima}
                                    onChange={e => setFilters({ ...filters, data_minima: e.target.value })}
                                />
                                <input
                                    type="date"
                                    name="data_maxima"
                                    id="end-data"
                                    className="w-1/2 p-4 bg-white border border-neutral-300 rounded-lg rounded-l-none"
                                    value={filters.data_maxima}
                                    onChange={e => setFilters({ ...filters, data_maxima: e.target.value })}
                                />
                            </div>

                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="">Temperatura (°C)</label>
                            <div>
                                <input
                                    type="number"
                                    name="temp_minima"
                                    id="min-temp"
                                    className="w-1/2 p-4 bg-white border border-r-0 border-neutral-300 rounded-lg rounded-r-none"
                                    value={filters.temperatura_minima}
                                    step={0.1}
                                    placeholder="min"
                                    onChange={e => setFilters({ ...filters, temperatura_minima: e.target.value })}
                                />
                                <input
                                    type="number"
                                    name="temp_maxima"
                                    id="max-temp"
                                    className="w-1/2 p-4 bg-white border border-neutral-300 rounded-lg rounded-l-none"
                                    value={filters.temperatura_maxima}
                                    step={0.1}
                                    placeholder="max"
                                    onChange={e => setFilters({ ...filters, temperatura_maxima: e.target.value })}
                                />

                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="">Cloro residual livre (mg/L)</label>
                            <div>
                                <input
                                    type="number"
                                    name="cloro_residual_livre_minimo"
                                    id="min-cloro"
                                    className="w-1/2 p-4 bg-white border border-r-0 border-neutral-300 rounded-lg rounded-r-none"
                                    value={filters.cloro_residual_livre_minimo}
                                    step={0.1}
                                    placeholder="min"
                                    onChange={e => setFilters({ ...filters, cloro_residual_livre_minimo: e.target.value })}
                                />
                                <input
                                    type="number"
                                    name="cloro_residual_livre_maximo"
                                    id="max-cloro"
                                    className="w-1/2 p-4 bg-white border border-neutral-300 rounded-lg rounded-l-none"
                                    value={filters.cloro_residual_livre_maximo}
                                    step={0.1}
                                    placeholder="max"
                                    onChange={e => setFilters({ ...filters, cloro_residual_livre_maximo: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="">Turbidez (uT)</label>

                            <div>
                                <input
                                    type="number"
                                    name="turbidez_minima"
                                    id="min-turbidez"
                                    className="w-1/2 p-4 bg-white border border-r-0 border-neutral-300 rounded-lg rounded-r-none"
                                    value={filters.turbidez_minima}
                                    step={0.1}
                                    placeholder="min"
                                    onChange={e => setFilters({ ...filters, turbidez_minima: e.target.value })}
                                />
                                <input
                                    type="number"
                                    name="turbidez_maxima"
                                    id="max-turbidez"
                                    className="w-1/2 p-4 bg-white border border-neutral-300 rounded-lg rounded-l-none"
                                    value={filters.turbidez_maxima}
                                    step={0.1}
                                    placeholder="max"
                                    onChange={e => setFilters({ ...filters, turbidez_maxima: e.target.value })}
                                />
                            </div>

                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="">Cor aparente</label>
                            <div>
                                <input
                                    type="number"
                                    name="cor_minima"
                                    id="min-cor"
                                    className="w-1/2 p-4 bg-white border border-r-0 border-neutral-300 rounded-lg rounded-r-none"
                                    value={filters.cor_minima}
                                    step={0.1}
                                    placeholder="min"
                                    onChange={e => setFilters({ ...filters, cor_minima: e.target.value })}
                                />
                                <input
                                    type="number"
                                    name="cor_maxima"
                                    id="max-cor"
                                    className="w-1/2 p-4 bg-white border border-neutral-300 rounded-lg rounded-l-none"
                                    value={filters.cor_maxima}
                                    step={0.1}
                                    placeholder="max"
                                    onChange={e => setFilters({ ...filters, cor_maxima: e.target.value })}
                                />

                            </div>
                        </div>

                        <div className="flex flex-col w-full">
                            <label htmlFor="coliformes_totais">Presença de Coliformes totais</label>

                            <select className="p-4 bg-white border border-neutral-300 rounded-lg" name="coliformes_totais" id="coliformes_totais" onChange={e => setFilters({ ...filters, coliformes_totais: e.target.value })}>
                                <option value="both">Presença/Ausência</option>
                                <option value="true">Presença</option>
                                <option value="false">Ausência</option>
                            </select>

                        </div>

                        <div className="flex flex-col w-full">
                            <label htmlFor="escherichia">Presença de Escherichia coli</label>

                            <select className="p-4 bg-white border border-neutral-300 rounded-lg" name="escherichia" id="escherichia" onChange={e => setFilters({ ...filters, escherichia: e.target.value })}>
                                <option value="both">Presença/Ausência</option>
                                <option value="true">Presença</option>
                                <option value="false">Ausência</option>
                            </select>
                        </div>

                        <input
                            type="submit"
                            value="Exportar"
                            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-500 p-4 h-fit w-[320px] rounded-lg hover:bg-blue-600 text-white font-semibold border border-blue-600 shadow-lg"
                        />
                    </form>
                </div>
            </div>
        </div>

    )

}