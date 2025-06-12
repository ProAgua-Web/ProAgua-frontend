import { type PontoDto } from '@/core/components/ponto/ponto.model';
import { useExcluirPonto } from '@/core/components/ponto/ponto.service';
import { useAutenticacao } from '@/lib/autenticacao';
import { cn } from '@/lib/utils';
import QRCode from '@/utils/qr_code';
import { useEffect, useState } from 'react';
import { Card } from '../../../../components/common/card';
import { tipoOptionsLabel } from '../../ponto/ponto.utils';

interface Props {
  ponto: PontoDto;
}

export function CardPonto(props: Readonly<Props>) {
  const { autenticado } = useAutenticacao();
  const { ponto } = props;
  const tipo = ponto.tipo < 2 ? 'pontos' : 'reservatorios';
  const excluirPonto = useExcluirPonto();
  const isPublic = !autenticado;

  const adminBaseUrl = !isPublic ? '/admin' : '';
  const pathImage = ponto.imagens[0]?.src || '/sem-imagem.png';

  // Estado para controlar o modal do QR Code
  const [showQrModal, setShowQrModal] = useState(false);
  const [qrValue, setQrValue] = useState('');

  // URL do ponto
  const pontoUrl = `/edificacoes/${ponto.edificacao.codigo}/pontos/${ponto.id}`;

  // Garante que o valor do QR só é montado no client
  useEffect(() => {
    setQrValue(`${window.location.origin}${pontoUrl}`);
  }, [pontoUrl]);

  return (
    <>
      <Card>
        {pathImage && (
          <Card.Image
            src={pathImage}
            alt={`Imagem do ponto de coleta ${ponto.id}`}
            link={pontoUrl}
          />
        )}

        <Card.Content isPublic={isPublic}>
          <Card.Header>
            <Card.Subtitle>
              {tipoOptionsLabel(ponto.tipo)}
              {ponto.tombo && ` (${ponto.tombo})`}
            </Card.Subtitle>

            <Card.Title>{ponto.localizacao}</Card.Title>

            <Card.Actions className={cn(!autenticado && 'hidden')}>
              <Card.Action
                href={`${adminBaseUrl}/edificacoes/${ponto.edificacao.codigo}/${tipo}/${ponto.id}/editar`}
              >
                Editar
              </Card.Action>

              <Card.DestructiveAction
                onConfirm={() => excluirPonto.mutate(ponto.id!)}
              >
                Excluir
              </Card.DestructiveAction>

              {/* Botão para abrir o modal do QR Code */}
              <Card.Action onClick={() => setShowQrModal(true)}>
                QR Code
              </Card.Action>
            </Card.Actions>
          </Card.Header>
        </Card.Content>
      </Card>

      {/* Modal simples para exibir o QR Code */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg p-6 flex flex-col items-center gap-4 shadow-lg min-w-[300px]">
            <h2 className="text-xl font-semibold">QR Code do Ponto</h2>
            {qrValue ? (
              <QRCode data={qrValue} width={220} />
            ) : (
              <span>Carregando QR Code...</span>
            )}
            <p className="text-center text-slate-600 text-sm">
              Escaneie para acessar a página deste ponto.
            </p>
            <button
              className="mt-2 rounded bg-primary-500 px-4 py-2 text-white hover:bg-primary-600"
              onClick={() => setShowQrModal(false)}
              autoFocus
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  );
}