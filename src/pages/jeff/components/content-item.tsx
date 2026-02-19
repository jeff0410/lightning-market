interface ContentItemProps {
    item: any
}

export function ContentItem({
    item
}: ContentItemProps) {
    console.log('test')
    return (
        <div className="w-56 flex flex-col h-full">
            <img src={item.productImage} alt={item.name} className="h-56 w-56 object-cover shrink-0" />
            <div className="flex flex-col gap-2 w-56 mt-1 flex-1 min-h-0">
                <span className="break-words">{item.name}</span>
                <span className="mt-auto">{item.price}</span>
            </div>
        </div>
    )
}
