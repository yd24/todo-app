import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Container,
  Button,
} from '@mantine/core';
import { useContext } from 'react';
import { LoginContext } from '../../Context/Login';
import { If, Else, Then } from 'react-if';
import { Navigate } from "react-router-dom";

function LoginPage() {
  const login = useContext(LoginContext);
  const handleLogin = () => {
    let user = document.querySelector('.login-user input').value;
    let pass = document.querySelector('.login-pass input').value;
    login.login(user, pass);

  };

  return (
    <If condition={!login.loggedIn}>
      <Then>
        <Container size={420} my={40}>
          <Title
            align="center"
            sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
          >
            Welcome back!
          </Title>

          <Paper withBorder shadow="md" px={100} py={50} mt={30} radius="md">
            <TextInput className='login-user' label="Username" placeholder="Your username" required />
            <PasswordInput className='login-pass' label="Password" placeholder="Your password" required mt="md" />
            <Button onClick={handleLogin} fullWidth mt="xl">
              Sign in
            </Button>
            <Button fullWidth mt="xl">
              Create Account
            </Button>
          </Paper>
        </Container>
      </Then>
      <Else>
        <Navigate to='/' replace />
      </Else>
    </If>
  );
}

export default LoginPage;