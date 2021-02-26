import { ParsedUrlQueryInput } from 'querystring'
import { ItemProps } from 'components/ExploreSidebar'

export type ParseArgs = {
  queryString: ParsedUrlQueryInput
  filterItems: Pick<ItemProps, 'type' | 'name'>[]
}

export const parseQueryStringToWhere = ({
  queryString,
  filterItems,
}: ParseArgs) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const obj: any = {}

  Object.keys(queryString).forEach((key) => {
    if (key === 'sort') return

    const item = filterItems.find((el) => el.name === key)

    obj[key] =
      item?.type === 'checkbox'
        ? { name_contains: queryString[key] }
        : queryString[key]
  })

  return obj
}

export const parseQueryStringToFilter = ({
  queryString,
  filterItems,
}: ParseArgs) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const obj: any = {}

  Object.keys(queryString).forEach((key) => {
    const item = filterItems.find((el) => el.name === key)

    obj[key] =
      item?.type === 'checkbox' && !Array.isArray(queryString[key])
        ? [queryString[key]]
        : queryString[key]
  })

  return obj
}
