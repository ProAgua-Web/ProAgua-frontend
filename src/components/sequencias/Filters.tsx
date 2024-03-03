export default function Filters() {
    return (
        <div className="w-full flex flex-col gap-4 mb-4">
            <div className="flex relative">
                <i className="bi bi-search"></i>
                <input
                    id="search-bar"
                    className="w-full bg-white border border-[#ABABAB] text-[#525252] px-5 py-3 rounded-md"
                    type="text"
                    name="search-query"
                    placeholder="Digite o termo de pesquisa"
                />
            </div>
            <div className="flex flex-col-reverse gap-3 self-end">
                <select name="campus" className="w-36 bg-white border border-[#ABABAB] text-[#525252] px-3 py-2 rounded-md">
                    <option value="" disabled selected hidden>Campus</option>
                    <option value="BOTH">Leste/Oeste</option>
                    <option value="LE">Leste</option>
                    <option value="OE">Oeste</option>
                </select>
            </div>
        </div>
    )
}