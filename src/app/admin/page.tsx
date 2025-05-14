import { DataListLayout } from '@/components/layout/datalist';

function Page() {
  return (
    <DataListLayout breadcrumbs={[]}>
      <div className="flex w-full flex-col items-center justify-center gap-4 pt-64 text-center">
        <h1 className="text-3xl text-slate-800">
          Seja bem-vindo(a) ao sistema de gestão de dados do projeto ProÁgua
        </h1>
        <p className="text-lg text-slate-600">
          Navegue pelos itens no menu para ter acesso às funcionalidades
        </p>
      </div>
    </DataListLayout>
  );
}
export default Page;
