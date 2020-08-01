
import { Form, Row, Col, Button, Alert } from 'react-bootstrap';
import { PageTitle } from 'components/shared';
import { useForm } from "react-hook-form";
import { useMutate } from "restful-react";
import { useRouter } from 'next/router';
import Link from 'next/link';

const Login = () => {
  const router = useRouter();
  const { mutate: login, loading, error } = useMutate({
    verb: 'POST',
    path: 'login'
  });
  const { register, handleSubmit } = useForm();

  const onSubmit = data => {
    login(data).then(_ => router.push('/'));
  }

  return (
    <div className="bwm-form">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <PageTitle text="Login"/>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                ref={register}
                type="email"
                name="email"
                placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                ref={register}
                name="password"
                type="password"
                placeholder="Password" />
            </Form.Group>
            { error &&
              <Alert variant="danger">
                {error?.data}
              </Alert>
            }
            <div className="mb-2">
              <Link href="reset-password">
                <a>
                  Reset Password
                </a>
              </Link>
            </div>
            <Button
              disabled={loading}
              variant="primary"
              type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default Login;
