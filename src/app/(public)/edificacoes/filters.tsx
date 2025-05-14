import { Select } from '@/components/form/input/select';
import { Input } from '@/components/ui/input';
import { campusOptions } from '@/lib/utils';
import { useQueryState } from 'nuqs';
import { useDebouncedCallback } from 'use-debounce';

const DEFAULT_CAMPUS_VALUE = 'all';

export function useSearchFilter() {
  const [search, setSearch] = useQueryState('q', { defaultValue: '' });
  const [campus, setCampus] = useQueryState('campus', { defaultValue: '' });

  const handleSearch = useDebouncedCallback((query: string) => {
    setSearch(query || null); // Remove o parâmetro da URL se vazio
  }, 300);

  const handleCampusChange = (selected: string) => {
    setCampus(selected === DEFAULT_CAMPUS_VALUE ? null : selected); // Remove o parâmetro da URL se for o valor padrão
  };

  return {
    search,
    campus,
    handleSearch,
    handleCampusChange,
    DEFAULT_CAMPUS_VALUE,
  };
}

export function Filters() {
  const {
    search,
    campus,
    handleSearch,
    handleCampusChange,
    DEFAULT_CAMPUS_VALUE,
  } = useSearchFilter();

  const campusSelectOptions = [
    ...campusOptions,
    { value: DEFAULT_CAMPUS_VALUE, label: 'Todos' },
  ];

  return (
    <div className="space-between relative flex gap-2">
      <Input
        className="w-full rounded-md border bg-white px-5 py-3 text-[#525252]"
        placeholder="Digite o termo de pesquisa"
        defaultValue={search ?? ''}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <Select
        className="w-36 rounded-md border bg-white px-3 py-2 text-[#525252]"
        options={campusSelectOptions}
        value={campus !== '' ? campus : DEFAULT_CAMPUS_VALUE}
        onChange={handleCampusChange}
      />
    </div>
  );
}
