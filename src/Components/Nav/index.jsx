import { useState, useEffect, useContext } from 'react';
import { Button, createStyles, Navbar, Group, getStylesRef, rem } from '@mantine/core';
import { NavLink, useLocation } from 'react-router-dom';
import { TodoContext } from '../../Context/Settings';

const useStyles = createStyles((theme) => ({
  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  link: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,

      [`& .${getStylesRef('icon')}`]: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      },
    },
  },

  linkIcon: {
    ref: getStylesRef('icon'),
    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
      [`& .${getStylesRef('icon')}`]: {
        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
      },
    },
  },
}));

const data = [
  { link: '/', label: 'Home' },
  { link: '/settings', label: 'Settings' },
];

function NavbarSimple() {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState('Home');
  const location = useLocation().pathname;
  const todo = useContext(TodoContext);

  const links = data.map((item) => (
    <NavLink
      className={cx(classes.link, { [classes.linkActive]: item.label === active })}
      key={item.label}
      to={item.link}
    >
      <span>{item.label}</span>
    </NavLink>
  ));

  //sets current route as active link
  useEffect(() => {
    let link = data.find((ele) => {
      return ele.link === location;
    });
    setActive(link.label);
  },[location]);

  return (
    <Navbar width={{ sm: 300 }} p="md">
      <Navbar.Section grow>
        <Group className={classes.header}>
          <h1>{todo.loggedIn ? `Welcome, ${todo.user.username}!` : `To-Do List`}</h1>
        </Group>
        {todo.loggedIn
        &&
          links
        }
      </Navbar.Section>
      {todo.loggedIn
      &&
        <Navbar.Section p={30} className={classes.footer}>
          <Button onClick={todo.logout}>Log Out</Button>
        </Navbar.Section>
      }
    </Navbar>
  );
}

export default NavbarSimple;