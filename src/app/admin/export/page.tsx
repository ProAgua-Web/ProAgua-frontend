"use client";

import { useState, useEffect } from "react";
import TableColetas from "@/components/coletas/TabelaColetas";
import { Edificacao, Ponto, TIPOS_PONTOS, } from "@/utils/types";
import { apiUrl } from "@/utils/api/client_side_consumer";
import { consumerColeta } from "@/utils/api/consumerColeta";
import { consumerPonto } from "@/utils/api/consumerPonto";
import { consumerEdficacao } from "@/utils/api/consumerEdficacao";
import { APIConsumer } from "@/utils/api/APIConsumer";
import { OptionalField, convertTypes } from "./typeUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faFileDownload, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

function DateISO(d: string): String {
    return new Date(d).toISOString().split('T')[0];
}

const SchemaFilter = {
    data_minima: new OptionalField(DateISO),
    data_maxima: new OptionalField(DateISO),
    temperatura_minima: new OptionalField(Number),
    temperatura_maxima: new OptionalField(Number),
    cloro_residual_livre_minimo: new OptionalField(Number),
    cloro_residual_livre_maximo: new OptionalField(Number),
    turbidez_minima: new OptionalField(Number),
    turbidez_maxima: new OptionalField(Number),
    cor_minima: new OptionalField(Number),
    cor_maxima: new OptionalField(Number),
    coliformes_totais: new OptionalField(Boolean),
    escherichia: new OptionalField(Boolean),
};

export default function Page() {
    const [coletas, setColetas] = useState<any[]>([]);
    const [edificacoes, setEdificacoes] = useState<any[]>([]);
    const [pontos, setPontos] = useState<any[]>([]);
    const [pontoId, setPontoId] = useState('');
    const [codEdificacao, setCodEdificacao] = useState('');

    const [filters, setFilters] = useState<{[key: string]: string}>({
        data_minima: '',
        data_maxima: '',
        temperatura_minima: '',
        temperatura_maxima: '',
        cloro_residual_livre_minimo: '',
        cloro_residual_livre_maximo: '',
        turbidez_minima: '',
        turbidez_maxima: '',
        cor_minima: '',
        cor_maxima: '',
        coliformes_totais: 'false',
        escherichia: 'false',
    });

    // Filtrar pontos por edificação (no navegador)
    const filteredPontos = codEdificacao ? pontos.filter(ponto => ponto.edificacao.codigo == codEdificacao) : pontos;

    useEffect(() => {
        consumerEdficacao.list()
            .then(data => setEdificacoes(data));
        
        consumerPonto.list()
            .then(data => setPontos(data));
    }, []);

    useEffect(() => {
        const q = convertTypes(filters, SchemaFilter, false);
        consumerColeta.list('no-cache', q).then(data => setColetas(data));
    }, [filters]);

    async function submitForm(e: { preventDefault: () => void; }) {
        e.preventDefault();

        const q = convertTypes(filters, SchemaFilter, false);
        const excel = new APIConsumer(`${apiUrl}/api/v1/coletas/excel`);
        const blob = await excel.getBlob('no-cache', q);
        const file = window.URL.createObjectURL(blob);
        window.location.assign(file);
    }

    return (
        <div className="ml-[-120px]">
            <h1 className="w-full text-center text-2xl mb-4 font-bold text-neutral-600">Tabela de visualização</h1>

            <div className="w-[calc(100%-100px)] min-w-fit flex mb-14">
                <TableColetas
                    coletas={coletas}
                    />
                <div className="w-[320px] max-h-[calc(100vh-clamp(50px,8vh,100px)-2rem)] mb-12 overflow-y-scroll fixed top-[calc(clamp(50px,8vh,100px)+1rem)] right-4 z-[1000] bg-neutral-50 shadow-xl border border-neutral-300 rounded-xl overflow-x-hidden">
                    
                    <form
                        method="GET"
                        onSubmit={submitForm}
                        className="w-full flex flex-wrap gap-4 items-end flex-col px-6 py-6"
                    >
                        <h1 className="w-full text-center text-2xl mb-4 font-bold text-neutral-600">Filtrar dados</h1>

                        <div className="flex flex-col w-full">
                            <label htmlFor="codigo_edificacao">Código da edificação</label>
                            <select className="p-4 bg-white border border-neutral-300 rounded-lg"
                                id="codigo_edificacao"
                                name="codigo_edificacao"
                                onChange={async e => {
                                    setCodEdificacao(e.target.value);
                                    setPontoId('');
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
                                onChange={e => setPontoId(e.target.value)}>
                                <option value="">-</option>

                                {filteredPontos && filteredPontos.map((ponto: Ponto) => <option key={ponto.id} value={ponto.id}>{ponto.id} - {TIPOS_PONTOS[ponto.tipo]} {ponto.localizacao && '- ' + ponto.localizacao} {ponto.tombo && '- ' + ponto.tombo}</option>)}
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
                                <option value="">Presença/Ausência</option>
                                <option value="true">Presença</option>
                                <option value="false">Ausência</option>
                            </select>

                        </div>

                        <div className="flex flex-col w-full">
                            <label htmlFor="escherichia">Presença de Escherichia coli</label>

                            <select className="p-4 bg-white border border-neutral-300 rounded-lg" name="escherichia" id="escherichia" onChange={e => setFilters({ ...filters, escherichia: e.target.value })}>
                                <option value="">Presença/Ausência</option>
                                <option value="true">Presença</option>
                                <option value="false">Ausência</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="w-fit h-fit px-8 py-4 rounded-lg fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-500  hover:bg-blue-600 text-white font-semibold border border-blue-600 shadow-lg"
                        >
                            <FontAwesomeIcon icon={faDownload}/> Exportar
                        </button>
                    </form>
                </div>
            </div>
        </div>

    )

}