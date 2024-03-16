import { Noto_Sans_Zanabazar_Square } from "next/font/google";
import { useEffect, useState } from "react";

export type Sequencia = {
  id: number;
  amostragem: number;
  ponto_url: string;
};

export type Ponto = {
  id: number;
  ambiente: string;
  edificacao_url: string;
  tipo: number;
};

export type Edificacao = {
  codigo: string;
  nome: string;
  campus: string;
  cronograma: number;
  imagem?: string;
};

export type SequenciaFull = {
  id: number;
  amostragem: number;
  ambiente_ponto: string;
  codigo_edificacao: string;
  nome_edificacao: string;
  tipo: number;
};

export async function fetchJSON(url: string) {
  const response = await fetch(url);
  return response.json();
}

export async function fetchPonto(pontoUrl: string): Promise<Ponto> {
  const ponto = await fetchJSON(pontoUrl);
  return ponto;
}

export async function fetchEdificacao(
  edificacaoUrl: string,
): Promise<Edificacao> {
  const edificacao = await fetchJSON(edificacaoUrl);
  return edificacao;
}

export function useSequencia(sequencia: Sequencia, api_url: String) {
  const [values, setValues] = useState<SequenciaFull | null>(null);

  useEffect(() => {
    async function fetchData() {
      const ponto = await fetchPonto(api_url + sequencia.ponto_url);
      const edificacao = await fetchEdificacao(api_url + ponto.edificacao_url);

      setValues({
        id: sequencia.id,
        amostragem: sequencia.amostragem,
        ambiente_ponto: ponto.ambiente,
        codigo_edificacao: edificacao.codigo,
        nome_edificacao: edificacao.nome,
        tipo: ponto.tipo,
      });
    }

    fetchData();
  }, []);

  return values;
}

export function useSequencias(api_url: String) {
  const [sequencias, setSequencias] = useState<Sequencia[]>([]);

  useEffect(() => {
    fetch(api_url + "api/v1/sequencias/?limit=100&offset=0")
      .then((resp) => resp.json())
      .then((data) => {
        setSequencias(
          data.items.filter((item: any) => item.ponto_url !== null),
        );
      });
  }, []);

  return sequencias;
}

export function usePontos(api_url: string) {
  const [pontos, setPontos] = useState<Ponto[]>([]);

  useEffect(() => {
    fetch(api_url)
      .then((resp) => resp.json())
      .then((data) => setPontos(data.items));
  }, []);

  return pontos;
}

export function useEdificacoes(api_url: string) {
  const [edificacoes, setEdificacoes] = useState<Edificacao[]>([]);

  useEffect(() => {
    fetch(api_url)
      .then((resp) => resp.json())
      .then((data) => setEdificacoes(data.items));
  }, []);

  return edificacoes;
}

const API_BASE_URL = 'http://127.0.0.1:8000'

export function useEdificacao(codigo_edificacao: string) {
  const [edificacao, setEdificacao] = useState<Edificacao | null>(null);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    fetchJSON(`${API_BASE_URL}/api/v1/edificacoes/${codigo_edificacao}`)
      .then(data => {
        setEdificacao(data);
        setLoaded(true);
      })
  
  });

  return { edificacao, loaded };
}

export function usePonto(id_ponto: string) {
  const [ponto, setPonto] = useState<Ponto | null>(null);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    fetchJSON(`${API_BASE_URL}/api/v1/pontos/${id_ponto}`)
      .then(data => {
        setPonto(data);
        setLoaded(true);
      })
  }, [id_ponto]);

  return { ponto, loaded };
}
