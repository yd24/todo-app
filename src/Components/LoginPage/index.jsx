import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
} from '@mantine/core';
import { useContext } from 'react';
import { TodoContext } from '../../Context/Settings';

function LoginPage() {
  const todo = useContext(TodoContext);
  const handleLogin = () => {
    let user = document.querySelector('.login-user input').value;
    let pass = document.querySelector('.login-pass input').value;
    todo.login(user, pass);
  };

  return !todo.loggedIn ? (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
      >
        Welcome back!
      </Title>

      <Paper withBorder shadow="md" px={100} py={50} mt={30} radius="md">
        <TextInput className='login-user' label="Email" placeholder="you@gmail.com" required />
        <PasswordInput className='login-pass' label="Password" placeholder="Your password" required mt="md" />
        <Button onClick={handleLogin} fullWidth mt="xl">
          Sign in
        </Button>
        <Button fullWidth mt="xl">
          Create Account
        </Button>
      </Paper>
    </Container>
  )
  : null;
}

export default LoginPage;