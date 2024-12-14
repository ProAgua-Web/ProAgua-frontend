import z from 'zod';
import { ExportDataTable } from './_datatable';

const FilterSchema = z.object({
  data_minima: z.date().optional(),
  data_maxima: z.date().optional(),
  temperatura_minima: z.number().optional(),
  temperatura_maxima: z.number().optional(),
  cloro_residual_livre_minimo: z.number().optional(),
  cloro_residual_livre_maximo: z.number().optional(),
  turbidez_minima: z.number().optional(),
  turbidez_maxima: z.number().optional(),
  cor_minima: z.number().optional(),
  cor_maxima: z.number().optional(),
  coliformes_totais: z.boolean().optional(),
  echerichia: z.boolean().optional(),
});

// async function submitForm(e: { preventDefault: () => void }) {
//     e.preventDefault();

//     const q = convertTypes(filters, SchemaFilter, false);
//     const excel = new APIConsumer(`${apiUrl}/coletas/excel`);
//     const blob = await excel.getBlob('no-cache', q);
//     const file = window.URL.createObjectURL(blob);
//     window.location.assign(file);
//   }

export default function Page() {
  return (
    <div className="ml-[-120px] w-full">
      <h1 className="mb-4 w-full text-center text-2xl font-bold text-neutral-600">
        Tabela de visualização
      </h1>
      <ExportDataTable
        isLoading={false}
        data={[]}
        cols={['Column1', 'Column2', 'Column3', 'Column4']}
      ></ExportDataTable>
    </div>
  );
}
