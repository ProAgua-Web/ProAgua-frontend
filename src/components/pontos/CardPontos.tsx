import { BASE_URL } from "@/utils/config";
import { Ponto, TIPOS_PONTOS } from "@/utils/types";


export default function CardPonto(props: { ponto: Ponto, publicCard: boolean }) {
  const { ponto, publicCard = false } = props;
  const edificacao = ponto.edificacao;

  return (
    ponto && (
      <div className="relative flex aspect-square w-[260px] flex-col items-center justify-between rounded-md border border-neutral-300 bg-white px-2 py-4 text-center">
        <h3>{edificacao?.codigo}</h3>
        <h2 className="text-center text-xl">{TIPOS_PONTOS[ponto.tipo]}</h2>
        <p className="text-sm">{ponto.localizacao}</p>

        <a
          href={publicCard ? `${BASE_URL}/pontos/${ponto.id}` : `pontos/${ponto.id}`}
          className="filled-button rounded-md bg-primary-500 p-3 text-xs font-semibold text-white"
        >
          <i className="bi bi-eye-fill"></i>
          Detalhes
        </a>
      </div>
    )
  );
}


export function AddCard({ cod_edificacao }: { cod_edificacao?: string }) {
  return (
    <a href={`/admin/pontos/criar${cod_edificacao ? `/${cod_edificacao}` : ''}`}>
      <div
        className="relative px-2 py-4 flex aspect-square w-[260px] flex-col items-center justify-center rounded-md border border-neutral-300 bg-white hover:bg-slate-50 hover:text-green-500 text-center cursor-pointer"
      >
        <h2 className="text-center text-3xl select-none">+</h2>
      </div>
    </a>
  );
}