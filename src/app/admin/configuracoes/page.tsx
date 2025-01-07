'use client';

import {
  useParametrosReferencia,
  useUsuarios,
} from '@/utils/api/client_side_consumer';
import { consumerParametrosReferencia } from '@/utils/api/consumerParametrosReferencia';
import { ParametroReferencia, Usuario } from '@/utils/types';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

export default function Configuracoes() {
  const usuarios: Usuario[] = useUsuarios();
  const parametroReferencia = useParametrosReferencia();

  const [editable, setEditable] = useState(false);
  const [submiting, setSubmiting] = useState(false);

  async function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSubmiting(true);

    const formData = new FormData(event.currentTarget);
    const data: ParametroReferencia = {
      min_temperatura: Number(formData.get('min_temperatura')),
      max_temperatura: Number(formData.get('max_temperatura')),
      min_cloro_residual_livre: Number(
        formData.get('min_cloro_residual_livre'),
      ),
      max_cloro_residual_livre: Number(
        formData.get('max_cloro_residual_livre'),
      ),
      min_turbidez: Number(formData.get('min_turbidez')),
      max_turbidez: Number(formData.get('max_turbidez')),
      min_cor: Number(formData.get('min_cor')),
      max_cor: Number(formData.get('max_cor')),
      coliformes_totais: false,
      escherichia: false,
    };

    const response = await consumerParametrosReferencia.put('', data);

    if (response.status === 200) {
      alert('Parâmetros de referência atualizados com sucesso');
    } else {
      alert('Erro ao atualizar parâmetros de referência');
    }

    setSubmiting(false);
    setEditable(false);
  }

  return (
    <>
      <h1 className="mb-2 text-3xl font-semibold">Configurações</h1>

      <h2 className="mt-8 text-2xl font-semibold text-neutral-700">Usuários</h2>
      <div className="w-full rounded border border-neutral-300 bg-white p-4 shadow-lg">
        <ul>
          {usuarios.map((usuario) => (
            <li
              key={usuario.username}
              className="flex items-center justify-between border-b border-neutral-300 p-4 pr-0"
            >
              {usuario.username}
              <a
                href={`/admin/configuracoes/usuarios/${usuario.username}`}
                className="rounded border border-blue-500 px-4 py-2 text-blue-500 hover:border-blue-600 hover:bg-blue-500 hover:text-white"
              >
                Editar
              </a>
            </li>
          ))}
        </ul>

        <div className="flex w-full justify-center pt-4">
          <a
            href="/admin/configuracoes/usuarios/criar"
            className=" w-fit rounded border border-green-600 bg-green-500 px-4 py-2 font-semibold text-white"
          >
            + Adicionar usuário
          </a>
        </div>
      </div>

      {parametroReferencia && (
        <>
          <h2 className="mt-8 text-2xl font-semibold text-neutral-700">
            Parâmetros de referência
          </h2>
          <p className="text-neutral-500">
            {' '}
            Estes valores são serão usados para análise das coletas
          </p>

          <form
            onSubmit={(e) => submitForm(e)}
            onReset={() => setEditable(false)}
            method="PUT"
            className="w-full rounded border border-neutral-300 bg-white p-4 shadow-lg"
          >
            <div className="flex w-full items-center border-b border-neutral-300 p-4">
              <label className="flex-grow">Temperatura (°C)</label>
              <input
                name="min_temperatura"
                defaultValue={parametroReferencia.min_temperatura}
                disabled={!editable}
                className="w-48 rounded-lg rounded-r-none border border-r-0 border-neutral-300 px-4 py-2 disabled:bg-neutral-200 disabled:text-neutral-500"
                type="number"
                step="0.1"
                placeholder="valor mínimo"
              />
              <input
                name="max_temperatura"
                defaultValue={parametroReferencia.max_temperatura}
                disabled={!editable}
                className="w-48 rounded-lg rounded-l-none border border-neutral-300 px-4 py-2 disabled:bg-neutral-200 disabled:text-neutral-500"
                type="number"
                step="0.1"
                placeholder="valor máximo"
              />
            </div>

            <div className="flex w-full items-center border-b border-neutral-300 p-4">
              <label className="flex-grow">Cloro residual livre (mg/L)</label>
              <input
                name="min_cloro_residual_livre"
                defaultValue={parametroReferencia.min_cloro_residual_livre}
                disabled={!editable}
                className="w-48 rounded-lg rounded-r-none border border-r-0 border-neutral-300 px-4 py-2 disabled:bg-neutral-200 disabled:text-neutral-500"
                type="number"
                step="0.1"
                placeholder="valor mínimo"
              />
              <input
                name="max_cloro_residual_livre"
                defaultValue={parametroReferencia.max_cloro_residual_livre}
                disabled={!editable}
                className="w-48 rounded-lg rounded-l-none border border-neutral-300 px-4 py-2 disabled:bg-neutral-200 disabled:text-neutral-500"
                type="number"
                step="0.1"
                placeholder="valor máximo"
              />
            </div>

            <div className="flex w-full items-center border-b border-neutral-300 p-4">
              <label className="flex-grow">Turbidez (uT)</label>
              <input
                name="min_turbidez"
                defaultValue={parametroReferencia.min_turbidez}
                disabled={!editable}
                className="w-48 rounded-lg rounded-r-none border border-r-0 border-neutral-300 px-4 py-2 disabled:bg-neutral-200 disabled:text-neutral-500"
                type="number"
                step="0.1"
                placeholder="valor mínimo"
              />
              <input
                name="max_turbidez"
                defaultValue={parametroReferencia.max_turbidez}
                disabled={!editable}
                className="w-48 rounded-lg rounded-l-none border border-neutral-300 px-4 py-2 disabled:bg-neutral-200 disabled:text-neutral-500"
                type="number"
                step="0.1"
                placeholder="valor máximo"
              />
            </div>

            <div className="flex w-full items-center border-b border-neutral-300 p-4">
              <label className="flex-grow">Cor (uH)</label>
              <input
                name="min_cor"
                defaultValue={parametroReferencia.min_cor}
                disabled={!editable}
                className="w-48 rounded-lg rounded-r-none border border-r-0 border-neutral-300 px-4 py-2 disabled:bg-neutral-200 disabled:text-neutral-500"
                type="number"
                step="0.1"
                placeholder="valor mínimo"
              />

              <input
                name="max_cor"
                defaultValue={parametroReferencia.max_cor}
                disabled={!editable}
                className="w-48 rounded-lg rounded-l-none border border-neutral-300 px-4 py-2 disabled:bg-neutral-200 disabled:text-neutral-500"
                type="number"
                step="0.1"
                placeholder="valor máximo"
              />
            </div>

            <div className="flex w-full justify-center gap-8 pt-4">
              <button
                id="editar"
                type="submit"
                className={`w-fit rounded-lg border ${editable ? 'bg-green-500 hover:bg-green-600' : 'bg-rose-500 hover:bg-rose-600'}  px-6 py-4 text-center font-semibold text-white disabled:bg-green-900`}
                onClick={(event) => {
                  if (!editable) {
                    event.preventDefault();
                    setEditable(true);
                  }
                }}
                disabled={submiting}
              >
                {editable ? (
                  submiting ? (
                    'Editando...'
                  ) : (
                    'Salvar'
                  )
                ) : (
                  <>
                    <FontAwesomeIcon icon={faPenToSquare} /> Habilitar edição
                  </>
                )}
              </button>

              {editable && (
                <>
                  <input
                    type="reset"
                    className={`rounded-lg border bg-gray-500 px-6 py-4 text-center font-semibold text-white hover:bg-gray-600`}
                    value="Cancelar"
                  ></input>
                </>
              )}
            </div>
          </form>
        </>
      )}
    </>
  );
}
