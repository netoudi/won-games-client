import { useState } from 'react'
import { ParsedUrlQueryInput } from 'querystring'
import { FilterList as FilterIcon } from '@styled-icons/material-outlined/FilterList'
import { Close as CloseIcon } from '@styled-icons/material-outlined/Close'
import xor from 'lodash.xor'
import Heading from 'components/Heading'
import Checkbox from 'components/Checkbox'
import Radio from 'components/Radio'
import Button from 'components/Button'
import MediaMatch from 'components/MediaMatch'

import * as S from './styles'

type Field = {
  label: string
  name: string
}

type Values = ParsedUrlQueryInput

export type ItemProps = {
  title: string
  name: string
  type: 'checkbox' | 'radio'
  fields: Field[]
}

export type ExploreSidebarProps = {
  items: ItemProps[]
  initialValues?: Values
  onFilter: (values: Values) => void
}

const ExploreSidebar = ({
  items,
  initialValues = {},
  onFilter,
}: ExploreSidebarProps) => {
  const [values, setValues] = useState(initialValues)
  const [isOpen, setIsOpen] = useState(false)

  const handleRadio = (name: string, value: string | boolean) => {
    setValues((s) => ({ ...s, [name]: value }))
  }

  const handleCheckbox = (name: string, value: string) => {
    const currentList = (values[name] as []) || []
    setValues((s) => ({ ...s, [name]: xor(currentList, [value]) }))
  }

  const handleFilter = () => {
    setIsOpen(false)
    onFilter(values)
  }

  return (
    <S.Wrapper isOpen={isOpen}>
      <MediaMatch lessThan="medium">
        <S.Overlay aria-hidden={isOpen} />

        <S.FilterOpen onClick={() => setIsOpen(true)}>
          <FilterIcon aria-label="open filters" />
        </S.FilterOpen>
      </MediaMatch>

      <S.Content>
        <S.FilterClose onClick={() => setIsOpen(false)}>
          <CloseIcon aria-label="close filters" />
        </S.FilterClose>

        {items.map((item) => (
          <div key={item.name}>
            <Heading lineBottom lineColor="secondary" size="small">
              {item.title}
            </Heading>

            {item.type === 'checkbox' &&
              item.fields.map((field) => (
                <Checkbox
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  labelFor={field.name}
                  isChecked={(values[item.name] as string[])?.includes(
                    field.name,
                  )}
                  onCheck={() => handleCheckbox(item.name, field.name)}
                />
              ))}

            {item.type === 'radio' &&
              item.fields.map((field) => (
                <Radio
                  key={field.name}
                  id={field.name}
                  name={item.name}
                  label={field.label}
                  labelFor={field.name}
                  value={field.name}
                  defaultChecked={
                    String(field.name) === String(values[item.name])
                  }
                  onChange={() => handleRadio(item.name, field.name)}
                />
              ))}
          </div>
        ))}
      </S.Content>

      <S.Footer>
        <Button fullWidth size="medium" onClick={handleFilter}>
          Filter
        </Button>
      </S.Footer>
    </S.Wrapper>
  )
}

export default ExploreSidebar
