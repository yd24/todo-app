import { useState, useEffect, useContext } from 'react';
import { Button, createStyles, Navbar, Group, getStylesRef, rem } from '@mantine/core';
import { NavLink, useLocation } from 'react-router-dom';
import { When } from 'react-if';
import { LoginContext } from '../../Context/Login';

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
  const login = useContext(LoginContext);

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
    if (login.loggedIn) {
      let link = data.find((ele) => {
        return ele.link === location;
      });
      setActive(link.label);
    }
  },[location]);

  return (
    <Navbar width={{ sm: 300 }} p="md">
      <Navbar.Section grow>
        <Group className={classes.header}>
          <h1>{login.loggedIn ? `Welcome, ${login.user.name}!` : `To-Do List`}</h1>
        </Group>
        <When condition={login.loggedIn}>
          {links}
        </When>
      </Navbar.Section>
      <When condition={login.loggedIn}>
        <Navbar.Section p={30} className={classes.footer}>
          <Button onClick={login.logout}>Log Out</Button>
        </Navbar.Section>
      </When>
    </Navbar>
  );
}

export default NavbarSimple;