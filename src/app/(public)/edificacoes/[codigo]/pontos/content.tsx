'use client';

import { CardPonto } from '@/core/components/coleta/ui/card-ponto';
import { usePontosPublicos } from '@/core/components/ponto/ponto.service';

interface Props {
  codigo: string;
}
export function Pontos({ codigo }: Props) {
  const { data: pontos = [] } = usePontosPublicos({ q: codigo });

  return pontos.map((ponto) => <CardPonto key={ponto.id} ponto={ponto} />);
}
