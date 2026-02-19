interface SortButtonProps {
    sort: string;
    onChange: (value: string) => void;
}

export function SortButton({
    sort,
    onChange
}: SortButtonProps) {
    return (
        <div className="flex items-center justify-end gap-4">
            <button type="button" className={`${sort === 'date' && 'font-bold underline'} cursor-pointer hover:text-gray-900 text-gray-500`} onClick={() => onChange('date')}>최신순</button>
            <button type="button" className={`${sort === 'price_asc' && 'font-bold underline'} cursor-pointer hover:text-gray-900 text-gray-500`} onClick={() => onChange('price_asc')}>저가순</button>
            <button type="button" className={`${sort === 'price_desc' && 'font-bold underline'} cursor-pointer hover:text-gray-900 text-gray-500`} onClick={() => onChange('price_desc')}>고가순</button>
        </div>
    )
}
