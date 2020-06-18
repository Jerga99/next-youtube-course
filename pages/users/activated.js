
import { Section, PageTitle } from 'components/shared';
import { Alert } from 'react-bootstrap';
import Link from 'next/link';

const UserActivation = () => {
  return (
    <Section>
      <PageTitle text="User Activation" />
      <Alert variant='success'>
        You have been succesfuly activated. You can login now!{' '}
        <Link href="/login">
          <a>
            Login
          </a>
        </Link>
      </Alert>
    </Section>
  )
}

export default UserActivation;
