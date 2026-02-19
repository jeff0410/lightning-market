interface DropDownProps {
  suggestions: string[];
  onSelect: (keyword: string) => void;
  isVisible?: boolean;
}

export function DropDown({
  suggestions,
  onSelect,
  isVisible = true,
}: DropDownProps) {
  const suggestionList = Array.isArray(suggestions) ? suggestions : [];
  if (!isVisible || suggestionList.length === 0) {
    return null;
  }

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto z-10">
      <ul>
        {suggestionList.map((suggestion) => (
          <li key={suggestion}>
            <button
              type="button"
              className="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => onSelect(suggestion)}
              onKeyDown={(e) => {
                if (e.key === "Enter") onSelect(suggestion);
              }}
            >
              {suggestion}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
