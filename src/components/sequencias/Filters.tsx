export default function Filters() {
  return (
    <div className="mb-4 flex w-full flex-col gap-4">
      <div className="relative flex">
        <i className="bi bi-search"></i>
        <input
          id="search-bar"
          className="w-full rounded-md border border-[#ABABAB] bg-white px-5 py-3 text-[#525252]"
          type="text"
          name="search-query"
          placeholder="Digite o termo de pesquisa"
        />
      </div>
      <div className="flex flex-col-reverse gap-3 self-end">
        <select
          name="campus"
          className="w-36 rounded-md border border-[#ABABAB] bg-white px-3 py-2 text-[#525252]"
        >
          <option value="" disabled selected hidden>
            Campus
          </option>
          <option value="BOTH">Leste/Oeste</option>
          <option value="LE">Leste</option>
          <option value="OE">Oeste</option>
        </select>
      </div>
    </div>
  );
}
