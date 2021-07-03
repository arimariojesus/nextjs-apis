import { GetServerSideProps } from 'next';
import Link from 'next/link';

import { User } from '../../interfaces';
import { Form } from '../../components/Form';
import Layout from '../../components/Layout';
import List from '../../components/List';

const RegisterPage = () => (
  <Layout title="Register USer | Next.js + TypeScript Example">
    <h1>Register User</h1>
    <p>
      Example adding data to the mongodb <code>getStaticProps()</code>.
    </p>
    <p>You are currently on: /users/register</p>
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
    <Form />
  </Layout>
)

export default RegisterPage;
