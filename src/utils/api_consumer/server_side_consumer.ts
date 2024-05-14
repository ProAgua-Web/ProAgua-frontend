import { Edificacao, EdificacaoIn, Ponto } from "@/utils/types";

export async function getEdificacoes(limit:number = 100) {
    let resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/edificacoes?limit=${limit}`, {cache: "no-cache"});
    const edificacoes: Edificacao[] = (await resp.json()).items;
    return edificacoes;
}

export async function getEdificacao(codigo_edificacao: string) {
    let resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/edificacoes/${codigo_edificacao}`, {cache: "no-cache"});
    const edificacao: Edificacao = await resp.json();
    return edificacao;
}

export async function getPontos() {
    let resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/pontos`, {cache: "no-cache"});
    const pontos: Ponto[] = (await resp.json()).items;
    return pontos;
}

export async function getPonto(id_ponto: number) {
    let resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/pontos/${id_ponto}`, {
        cache: "no-cache"
    });
    const ponto: Ponto = await resp.json();
    return ponto;
}

export async function createEdificacao(edificacao: EdificacaoIn) {
}

export async function updateEdificacao(edificacao: EdificacaoIn) {
    fetch(process.env.NEXT_PUBLIC_API_URL + "/api/v1/edificacoes/" + edificacao.codigo, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(edificacao),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Erro ao alterar edificação");
            }
        })
        .then(() => {
            window.location.href = "/admin/edificacoes";
        })
        .catch((err) => {
            // alert(err);
        });
}

export async function getUsuarios() {
    let resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/usuarios`, {cache: "no-cache"});
    const usuarios = (await resp.json()).items;
    return usuarios;
}