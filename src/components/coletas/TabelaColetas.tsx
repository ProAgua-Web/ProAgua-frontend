import { Coleta } from '@/utils/types';
import {
  faCircleCheck,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function TableColetas(props: { coletas: Coleta[] }) {
  const { coletas } = props;

  function formatDate(date: string) {
    const d = new Date(date);
    const hour = d.toLocaleTimeString().slice(0, 5).replace(':', 'h');
    return `${d.toLocaleDateString()} ${hour}`;
  }

  return (
    <>
      <div className="w-full overflow-x-auto">
        <table className="mb-8 w-full border border-slate-500 last:mb-0">
          <thead>
            <tr className="w-full bg-slate-300 text-neutral-800">
              <th className="px-2 py-1">ID</th>
              <th className="px-2 py-1">Ordem</th>
              <th className="px-2 py-1">Temperatura</th>
              <th className="px-2 py-1">Cloro residual livre</th>
              <th className="px-2 py-1">Turbidez</th>
              <th className="px-2 py-1">Coliformes totais</th>
              <th className="px-2 py-1">Escherichia coli</th>
              <th className="px-2 py-1">Cor</th>
              <th className="px-2 py-1">Data</th>
              <th className="px-2 py-1">Status</th>
            </tr>
          </thead>
          <tbody>
            {coletas && coletas.length > 0 ? (
              coletas.map((coleta) => {
                return (
                  <tr
                    key={'tr' + coleta.id}
                    className="cursor-pointer select-none bg-slate-200 transition-colors duration-200 even:bg-slate-100 hover:bg-blue-300"
                    onClick={() => {
                      window.location.href = `/admin/coletas/${coleta.id}`;
                    }}
                  >
                    <td className="px-2 py-3">{coleta.id}</td>
                    <td className="px-2 py-3">{coleta.ordem}</td>
                    <td className="px-2 py-3">
                      {String(coleta.temperatura).replace('.', ',')} ºC
                    </td>
                    <td className="px-2 py-3">
                      {String(coleta.cloro_residual_livre).replace('.', ',')}
                      mg/L
                    </td>
                    <td className="px-2 py-3">
                      {String(coleta.turbidez).replace('.', ',')} uT{' '}
                    </td>
                    <td className="px-2 py-3">
                      {coleta.coliformes_totais ? 'Presença' : 'Ausência'}/100
                      mL
                    </td>
                    <td className="px-2 py-3">
                      {coleta.escherichia ? 'Presença' : 'Ausência'}/100 mL
                    </td>
                    <td className="px-2 py-3">
                      {String(coleta.cor).replace('.', ',')}uH
                    </td>
                    <td className="text-nowrap px-2 py-3">
                      {formatDate(coleta.data)}
                    </td>
                    <td
                      className="px-2 py-3"
                      title={String(coleta.status_messages)}
                    >
                      <span className="flex w-full justify-center">
                        <FontAwesomeIcon
                          icon={
                            coleta.status ? faCircleCheck : faExclamationCircle
                          }
                          className={
                            coleta.status ? 'text-green-500' : 'text-red-500'
                          }
                          size="xl"
                        />
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={12} className="px-2 py-3 text-center">
                  Nenhuma coleta encontrada
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
