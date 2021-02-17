import Heading from 'components/Heading'
import Checkbox from 'components/Checkbox'
import Radio from 'components/Radio'
import Button from 'components/Button'

import * as S from './styles'

const ExploreSidebar = () => {
  return (
    <S.Wrapper>
      <Heading lineBottom lineColor="secondary" size="small">
        Price
      </Heading>
      <Checkbox name="under-50" label="Under $50" labelFor="under-50" />
      <Checkbox name="under-100" label="Under $100" labelFor="under-100" />
      <Checkbox name="under-150" label="Under $150" labelFor="under-150" />
      <Checkbox name="under-200" label="Under $200" labelFor="under-200" />
      <Checkbox name="free" label="Free" labelFor="free" />
      <Checkbox name="discounted" label="Discounted" labelFor="discounted" />

      <Heading lineBottom lineColor="secondary" size="small">
        Sort by
      </Heading>
      <Radio
        id="high-to-low"
        name="short-by"
        label="High to low"
        labelFor="high-to-low"
        value="high-to-low"
      />
      <Radio
        id="low-to-high"
        name="short-by"
        label="Low to high"
        labelFor="low-to-high"
        value="low-to-high"
      />

      <Heading lineBottom lineColor="secondary" size="small">
        System
      </Heading>
      <Checkbox name="windows" label="Windows" labelFor="windows" />
      <Checkbox name="linux" label="Linux" labelFor="linux" />
      <Checkbox name="mac" label="Mac" labelFor="mac" />

      <Heading lineBottom lineColor="secondary" size="small">
        Genre
      </Heading>
      <Checkbox name="action" label="Action" labelFor="action" />
      <Checkbox name="adventure" label="Adventure" labelFor="adventure" />
      <Checkbox name="fps" label="FPS" labelFor="fps" />
      <Checkbox name="mmorpg" label="MMORPG" labelFor="mmorpg" />
      <Checkbox name="rpg" label="RPG" labelFor="rpg" />
      <Checkbox name="indie" label="Indie" labelFor="indie" />
      <Checkbox name="shooters" label="Shooters" labelFor="shooters" />
      <Checkbox name="simulation" label="Simulation" labelFor="simulation" />

      <Button fullWidth size="medium">
        Filter
      </Button>
    </S.Wrapper>
  )
}

export default ExploreSidebar
