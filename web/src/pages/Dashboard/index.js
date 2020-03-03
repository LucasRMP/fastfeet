import React from 'react';
import { useDispatch } from 'react-redux';
import { MdLeakRemove } from 'react-icons/md';

import { signOut } from '~/store/modules/auth/actions';

import Button from '~/components/Button';

function Dashboard() {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(signOut());
  };

  return (
    <div>
      <title>Hello World</title>
      <h1>Dashboard</h1>
      <Button
        onClick={handleClick}
        color="#fff"
        background="#7159c1"
        icon={MdLeakRemove}
      >
        Sair
      </Button>
    </div>
  );
}

export default Dashboard;
