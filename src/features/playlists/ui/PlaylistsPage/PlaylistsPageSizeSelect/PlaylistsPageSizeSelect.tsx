import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/common/components'

const PAGE_SIZES = [2, 4, 8, 16, 32]

type Props = {
  pageSize: number
  changePageSize: (size: number) => void
}

export const PlaylistsPageSizeSelect = ({ pageSize, changePageSize }: Props) => {
  return (
    <div className={'flex items-center gap-2'}>
      <span>Show</span>
      <Select value={String(pageSize)} onValueChange={(value) => changePageSize(Number(value))}>
        <SelectTrigger className={'w-[80px]'}>
          <SelectValue placeholder={'Page size'} />
        </SelectTrigger>
        <SelectContent>
          {PAGE_SIZES.map((size) => (
            <SelectItem value={String(size)} key={size}>
              {size}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <span>per page</span>
    </div>
  )
}
