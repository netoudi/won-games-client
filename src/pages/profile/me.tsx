import { GetServerSidePropsContext } from 'next'
import protectedRoutes from 'utils/protected-routes'
import Profile from 'templates/Profile'
import FormProfile, { FormProfileProps } from 'components/FormProfile'
import { initializeApollo } from 'utils/apollo'
import { QUERY_PROFILE_ME } from 'graphql/queries/profile'
import {
  QueryProfileMe,
  QueryProfileMeVariables,
} from 'graphql/generated/QueryProfileMe'

export default function Me(props: FormProfileProps) {
  return (
    <Profile>
      <FormProfile {...props} />
    </Profile>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context)

  if (!session) return { props: {} }

  const apolloClient = initializeApollo(null, session)

  const { data } = await apolloClient.query<
    QueryProfileMe,
    QueryProfileMeVariables
  >({
    query: QUERY_PROFILE_ME,
    variables: {
      identifier: session?.id as string,
    },
  })

  return {
    props: {
      session,
      username: data.user?.username,
      email: data.user?.email,
    },
  }
}
