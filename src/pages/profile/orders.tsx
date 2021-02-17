import Profile from 'templates/Profile'
import OrdersList, { OrdersListProps } from 'components/OrdersList'
import itemsMock from 'components/OrdersList/mock'

export default function Orders({ items }: OrdersListProps) {
  return (
    <Profile>
      <OrdersList items={items} />
    </Profile>
  )
}

export async function getStaticProps() {
  return {
    props: {
      items: itemsMock,
    },
  }
}
