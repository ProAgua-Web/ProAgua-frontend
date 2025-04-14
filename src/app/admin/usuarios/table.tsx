'use client';

import { DestructiveAlert } from '@/components/alert-dialog';
import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import {
  useExcluirUsuario,
  useUsuarios,
} from '@/core/components/usuario/usuario.service';

import Link from 'next/link';
import { FaRegTrashCan } from 'react-icons/fa6';
import { PiNotePencilBold } from 'react-icons/pi';

export const UsuarioDataTable = () => {
  const usuarios = useUsuarios();
  const excluirUsuario = useExcluirUsuario();

  return (
    <DataTable
      isLoading={usuarios.isLoading || excluirUsuario.isPending}
      cols={[
        'ID',
        'Nome',
        'Sobrenome',
        'Email',
        'Nome de usuário',
        'Administrador',
      ]}
      data={
        usuarios.data?.map((usuario) => ({
          'id': usuario.id!,
          'ID': String(usuario.id!).padStart(4, '0'),
          'Nome': usuario.first_name,
          'Sobrenome': usuario.last_name,
          'Email': usuario.email,
          'Nome de usuário': usuario.username,
          'Administrador': usuario.is_superuser ? 'Sim' : 'Não',
        })) ?? []
      }
      actions={(usuario) => (
        <div className="flex gap-2">
          <Link href={`usuarios/${usuario['Nome de usuário']}/editar`}>
            <Button variant="table-edit">
              <PiNotePencilBold />
            </Button>
          </Link>
          <DestructiveAlert
            onConfirm={() => excluirUsuario.mutate(usuario['Nome de usuário'])}
          >
            <Button variant="table-delete">
              <FaRegTrashCan />
            </Button>
          </DestructiveAlert>
        </div>
      )}
    />
  );
};
