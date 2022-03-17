import type { NextPage } from 'next'
import { getSession } from 'next-auth/client';

const Profile: NextPage = () => {
  return <div>Profile</div>
}

export const getServerSideProps = async (context: any) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false
      }
    }
  }

  return {
    props: {
      session
    }
  }
}

export default Profile;