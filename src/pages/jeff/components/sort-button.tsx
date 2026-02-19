const SORT_OPTIONS = [
  { value: "date", label: "최신순" },
  { value: "price_asc", label: "저가순" },
  { value: "price_desc", label: "고가순" },
] as const;

interface SortButtonProps {
  sort: string;
  onChange: (value: string) => void;
}

export function SortButton({ sort, onChange }: SortButtonProps) {
  return (
    <div className="flex items-center justify-end gap-4">
      {SORT_OPTIONS.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          className={`${sort === value ? "font-bold underline text-gray-900" : ""} cursor-pointer hover:text-gray-900 text-gray-500`}
          onClick={() => onChange(value)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
