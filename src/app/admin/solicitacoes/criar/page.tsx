'use client'

import MultipleImageInput from "@/components/MultipleImageInput";
import { useEdificacoes, useEdificacao, usePontos, usePonto } from "@/utils/api_consumer/client_side_consumer"
import { TIPOS_PONTOS } from "@/utils/types";
import { useEffect, useState } from "react";

export default function Page() {
    const edificacoes = useEdificacoes();
    const pontos = usePontos();
    const [tipoSolicitacao, setTipoSolicitacao] = useState<string>('-');
    const [codEdificacao, setCodEdificacao] = useState<string>("");
    const edificacao = useEdificacao(codEdificacao);
    const [idPonto, setIdPonto] = useState<number>(0);
    const ponto = usePonto(idPonto);

    const [images, setImages] = useState([]);


    interface solicitacao {
        objetivo: string,
        justificativa: string
    }

    //TODO: Melhorar sistema de solicitações
    const objDefaultValue: Record<string, solicitacao> = {
        "": {
            objetivo: "Selecione um tipo de solicitação.",
            justificativa: "Selecione um tipo de solicitação."
        },
        "limpeza_reservatorio": {
            "objetivo": "Contribuir para a preservação da potabilidade da água para consumo humano da UFERSA.",
            justificativa: "- Comprovação da necessidade de limpeza do reservatório de água, a partir de amostragem de água no âmbito do projeto “Qualidade da água para consumo humano: estudo no sistema da UFERSA-Mossoró” (cadastro na PROPPG: PIB10009-2019).\n\n" +
                "- Preservação da potabilidade da água conforme previsto na NBR 5626/2020 (ABNT, 2020, p. 40)¹:\n" +
                "[...] “Todas as partes acessíveis dos componentes que têm contato com a água devem ser limpas periodicamente.” [...]\n\n" +
                "Obs.: Para limpeza de reservatório de água, recomenda-se o procedimento especificado no Anexo F da NBR 5626/2020."
        },
        "instalacao_ponto": {
            objetivo: "Possibilitar a coleta de água a montante do reservatório superior.",
            justificativa: "Verificação no local com apoio do encanador, assim como, comprovação da necessidade de existência de ponto de coleta de água, a partir de amostragem de água no âmbito do projeto “Qualidade da água para consumo humano: estudo no sistema da UFERSA-Mossoró” (cadastro na PROPPG: PIB10009- 2019).\n"
        },
        "conserto_tampa": {
            objetivo: "Contribuir para a proteção sanitária e preservação da potabilidade da água para consumo humano na UFERSA.",
            justificativa: "Verificação no local e comprovação da necessidade de substituição ou conserto da tampa do reservatório de água inferior, a partir de amostragem de água no âmbito do projeto “Qualidade da água para consumo humano: estudo no sistema da UFERSA-Mossoró” (cadastro na PROPPG: PIB10009-2019).\n\n" +
                "- Proteção sanitária e preservação da potabilidade de água conforme previsto na NBR 5626/2020 (ABNT, 2020, p. 14) ¹:\n" +
                "[...] “O reservatório deve ser um recipiente estanque, com tampa ou abertura\n" +
                "com porta de acesso, opaca, firmemente presa na sua posição quando fechada.”\n\n" +
                "- Preservação da potabilidade da água conforme previsto na NBR 5626/2020 (ABNT, 2020, p. 40):\n" +
                "[...] “Deve-se fazer uma verificação periódica para se assegurar que as tampas dos reservatórios estão posicionadas e fixadas nos locais corretos e impedem o ingresso de corpos estranhos ou água de outras fontes no reservatório.” [...]\n\n" +
                "- O padrão de potabilidade da água para consumo humano é estabelecido em\n" +
                "Portaria do Ministério da Saúde² ³ ⁴;"
        }

    }

    useEffect(() => {
        if (edificacao) {
            setImages(edificacao?.imagens);
        }
    }, [edificacao]);

    return (
        <>
            <h1 className="text-3xl font-bold mb-4">Criar solicitação</h1>
            <form className="w-full flex flex-col gap-2">
                <label>Tipo de solicitação</label>
                <select className="w-full border border-neutral-300 rounded px-4 py-2"
                    onChange={(e) => setTipoSolicitacao(e.target.value)}>
                    <option value="">-</option>
                    <option value="limpeza_reservatorio" >Solicitação de limpeza de reservatório</option>
                    <option value="instalacao_ponto" >Solicitação de instalação de ponto de coleta</option>
                    <option value="conserto_tampa" >Solicitação de conserto de tampa de reservatório</option>
                </select>


                <label className="mt-4">Edificação</label>
                <div className="flex">
                    <select onChange={(e) => setCodEdificacao(e.target.value)} defaultValue={"-"}
                        className="w-full border border-neutral-300 rounded px-4 py-2">
                        <option value="-" disabled selected>-</option>
                        {edificacoes.map(edificacao => (
                            <option value={edificacao.codigo}> {edificacao.codigo} - {edificacao.nome} </option>
                        ))}
                    </select>
                    <a className="flex justify-center" href={edificacao ? "/admin/edificacoes/" + codEdificacao : "#"} target={edificacao ? "_blank" : "_self"}>
                        <svg className={edificacao ? `w-6 mx-4 fill-primary-600` : `w-6 mx-4 fill-neutral-500`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 576 512">
                            <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.
                        2 3.3 20.3z" />
                        </svg>
                    </a>
                </div>

                <label className="mt-4">Ponto</label>
                <div className="flex">
                    <select onChange={(e) => setIdPonto(parseInt(e.target.value))}
                        className="w-full border border-neutral-300 rounded px-4 py-2">
                        <option value="" disabled selected>-</option>
                        {pontos.map(ponto => (
                            <option value={ponto.id}> {TIPOS_PONTOS[ponto.tipo]}, {ponto.ambiente} </option>
                        ))}
                    </select>

                    <a className="flex justify-center" href={ponto ? "/admin/pontos/" + idPonto : "#"} target={ponto ? "_blank" : "_self"}>
                        <svg className={ponto ? `w-6 mx-4 fill-primary-600` : `w-6 mx-4 fill-neutral-500`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 576 512">
                            <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                        </svg>
                    </a>
                </div>

                <label className="mt-4">Objetivo do serviço solicitado</label>
                <textarea rows={8} defaultValue={objDefaultValue[tipoSolicitacao]?.objetivo || ''}
                    className="w-full border border-neutral-300 rounded px-4 py-2" />

                <label className="mt-4">Justificativa da solicitação</label>
                <textarea rows={10} defaultValue={objDefaultValue[tipoSolicitacao]?.justificativa || ''}
                    className="w-full border border-neutral-300 rounded px-4 py-2" />

                <label className="mt-4">Imagens:</label>
                <MultipleImageInput images={images} setImages={setImages} />
                <input className="w-full" type="file" name="" id="" accept="image/png, image/jpeg" />

                <button className="text-white bg-blue-500 rounded px-4 py-2">Criar e salvar em PDF</button>
                <input
                    className="border text-white bg-green-500 rounded px-4 py-2" type="submit"
                    value="Criar solicitação"
                />
            </form>

        </>
    )
}

function onEffect(arg0: () => void, arg1: string[]) {
    throw new Error("Function not implemented.");
}
