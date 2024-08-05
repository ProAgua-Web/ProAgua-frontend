"use client";

import { Ponto, Sequencia } from "@/utils/types";
import { apiUrl, toURLParams } from "@/utils/api/client_side_consumer";
import { useEffect, useState } from "react";

import DataTable from "@/components/widgets/datatable";
import { columns } from "./_components/columns";
import Spinner from "@/components/widgets/spinner";
import { Button } from "@/components/ui/button";


export default function Page() {
    const [sequencias, setSequencias] = useState<Sequencia[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [filters, setFilters] = useState<any>({ q: "", campus: "BOTH" });
    const [checkPendentes, setCheckPendentes] = useState<boolean>(false);
    const [checkConcluidas, setCheckConcluidas] = useState<boolean>(false);

    const [pontos, setPontos] = useState<Ponto[]>([]);
    const [abortController, setAbortController] = useState(new AbortController());

    const [filteredSequencias, setFilteredSequencias] = useState<Sequencia[]>(sequencias);

    useEffect(() => {
        if (abortController) {
            abortController.abort();
        }

        const newAbortController = new AbortController();
        setAbortController(newAbortController);
        setLoading(true);

        const fetchData = async () => {
            const _filters = { ...filters };
            if (_filters.campus === "BOTH") {
                delete _filters.campus;
            }

            const url = `${apiUrl}/api/v1/sequencias?limit=10000`
            let query = toURLParams(_filters);

            const res = await fetch(`${url}&${query}`, { signal: newAbortController.signal, cache: "no-cache", 'credentials': 'include' });

            if (!res.ok) {
                throw new Error('Network response was not ok');
            }

            const response = await res.json();
            let filtered = response.items;
            filtered = filtered.filter((sequencia: Sequencia) => {
                if (checkConcluidas && checkPendentes) {
                    return true;
                }
                return !(checkConcluidas && !sequencia.status) && !(checkPendentes && sequencia.status);
            });

            setFilteredSequencias(filtered);
            setLoading(false);
        };

        fetchData();
    }, [filters, checkPendentes, checkConcluidas]);

    return (
        <>
            <h2 className="text-3xl text-[#525252]">Sequência de Coletas</h2>
            <div className="flex w-full flex-col items-center">
                {loading
                    ?
                    <div className="w-full bg-neutral-50 rounded p-4 flex justify-center align-middle border border-neutral-300">
                        <Spinner />
                        <span className="text-neutral-700 block h-full align-middle text-center">Carregando...</span>
                    </div>
                    :
                    <DataTable columns={columns} data={filteredSequencias} />
                }

                <Button
                    asChild
                    variant={"add"}
                >
                    <a
                        href="sequencias_coletas/criar"
                        className="w-[320px] h-fit fixed bottom-4 left-1/2 transform -translate-x-1/2 mt-4 px-6 py-4"
                    >
                        + Criar Sequência de Coleta
                    </a>
                </Button>
            </div>
        </>
    );


}
