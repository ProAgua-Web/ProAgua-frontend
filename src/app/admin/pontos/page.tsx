'use client';

import { Select } from '@/components/form/input/select';
import { DataListPage } from '@/components/layout/datalist';
import { Input } from '@/components/ui/input';
import { useEdificacoes } from '@/core/components/edificacao/edificacao.service';
import { usePontos } from '@/core/components/ponto/ponto.service';
import { campusOptions } from '@/lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { DeckEdificacoes } from './components/CardEdificacao';

const DEFAULT_SEARCH_VALUE = '';
const DEFAULT_CAMPUS_VALUE = 'all';

const breadcrumbs = [
  {
    label: 'Edificações e Pontos de Coleta',
    route: '/admin/pontos',
  },
];

export default function Page() {
  const searchParams = useSearchParams();

  const search = searchParams.get('q') ?? DEFAULT_SEARCH_VALUE;
  const campusFilter = searchParams.get('campus') ?? DEFAULT_CAMPUS_VALUE;

  const { data: pontos = [] } = usePontos({
    ...(search && { q: search }),
    limit: 0,
  });
  const { data: edificacoes = [] } = useEdificacoes({
    ...(search && { q: search }),
    ...(campusFilter !== DEFAULT_CAMPUS_VALUE && { campus: campusFilter }),
    limit: 0,
  });

  return (
    <DataListPage
      title="Edificações e Pontos de Coleta"
      subtitle="Gerencie as edificações e os pontos de coleta do sistema."
      newItemButton={{
        label: 'Criar edificação',
        link: '/admin/edificacoes/criar',
      }}
      breadcrumbs={breadcrumbs}
    >
      <div className="mb-4 flex w-full flex-col gap-4">
        <SearchFilterSection />
      </div>
      <DeckEdificacoes edificacoes={edificacoes} pontos={pontos} />
    </DataListPage>
  );
}

function SearchFilterSection() {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = useDebouncedCallback((query: string) => {
    updateQueryParam('q', query);
  }, 300);

  const handleCampusChange = (selected: string) => {
    updateQueryParam('campus', selected === 'all' ? '' : selected);
  };

  const updateQueryParam = (key: string, value: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (!value) {
      newSearchParams.delete(key);
    } else {
      newSearchParams.set(key, value);
    }

    router.push(`${pathName}?${newSearchParams.toString()}`);
  };

  const campusSelectOptions = [
    ...campusOptions,
    { value: 'all', label: 'Todos' },
  ];

  return (
    <div className="space-between relative flex gap-2">
      <Input
        className="w-full rounded-md border bg-white px-5 py-3 text-[#525252]"
        type="text"
        name="search-query"
        placeholder="Digite o termo de pesquisa"
        defaultValue={searchParams.get('q') ?? ''}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <Select
        className="w-36 rounded-md border bg-white px-3 py-2 text-[#525252]"
        options={campusSelectOptions}
        value={searchParams.get('campus') ?? 'all'}
        onChange={handleCampusChange}
      />
    </div>
  );
}
