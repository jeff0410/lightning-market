import { DropDown } from "./drop-down";

interface SearchBarProps {
  keyword: string;
  onChange: (value: string) => void;
  doSearch: (keyword?: string) => void;
  suggestions: string[];
  onSelectSuggestion: (keyword: string) => void;
}

export function SearchBar({
  keyword,
  onChange,
  doSearch,
  suggestions,
  onSelectSuggestion,
}: SearchBarProps) {
  const handleSelect = (selectedKeyword: string) => {
    onChange(selectedKeyword);
    onSelectSuggestion(selectedKeyword);
    doSearch(selectedKeyword);
  };

  return (
    <div className="w-full flex items-center justify-center relative">
      <div className="relative w-[350px]">
        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-white">
          <input
            type="text"
            value={keyword}
            className="flex-1 px-3 py-2 outline-none min-w-0"
            onChange={(e) => {
              const keyword = e.target.value;
              onChange(keyword);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                doSearch();
              }
            }}
          />
          <button
            type="button"
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors shrink-0 border-l border-gray-300"
            onClick={() => doSearch()}
          >
            검색
          </button>
        </div>
        <DropDown
          suggestions={suggestions}
          onSelect={handleSelect}
          isVisible={suggestions.length > 0}
        />
      </div>
    </div>
  );
}
