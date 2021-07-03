import { GetStaticProps, GetStaticPaths } from 'next'

import { User } from '../../interfaces'
import { sampleUserData } from '../../utils/sample-data'
import Layout from '../../components/Layout'
import ListDetail from '../../components/ListDetail'
import axios from 'axios'

type Props = {
  item?: User
  errors?: string
}

const StaticPropsDetail = ({ item, errors }: Props) => {
  if (errors) {
    return (
      <Layout title="Error | Next.js + TypeScript Example">
        <p>
          <span style={{ color: 'red' }}>Error:</span> {errors}
        </p>
      </Layout>
    )
  }

  return (
    <Layout
      title={`${
        item ? item.name : 'User Detail'
      } | Next.js + TypeScript Example`}
    >
      {item && <ListDetail item={item} />}
    </Layout>
  )
}

export default StaticPropsDetail

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await axios.get('http://localhost:3000/api/users');
  const items: User[] = await response.data;

  const paths = items.map((user) => ({
    params: { id: user._id.toString() },
  }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const id = params?.id
    const response = await axios.get(`http://localhost:3000/api/users/${id}`);
    const user: User = await response.data.user;

    return { props: { item: user } };
  } catch (err) {
    return { props: { errors: err.message } }
  }
}
