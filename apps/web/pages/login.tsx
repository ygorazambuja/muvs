import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { SignInUseCase } from '../usecases/login/SignInUseCase';

import { useSelector, useDispatch } from 'react-redux';
import { setUser, setToken } from '../store/user';
import YInput from 'libs/ui-components/src/lib/YInput';
import { YButton } from '@muvs/ui-components';

type LoginForm = {
  username: string;
  password: string;
};

export function Login() {
  const router = useRouter();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.userStore.user.token);

  const [form, setForm] = useState<LoginForm>({
    username: '',
    password: '',
  });

  useEffect(() => {
    if (token) router.push('/');
  });

  function resetForm() {
    setForm({
      username: '',
      password: '',
    });
  }

  function handleRedirectRegister() {
    router.push('/register');
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { user, token } = await new SignInUseCase(axios, form).execute();

      dispatch(setUser(user));
      dispatch(setToken(token));

      toast.success('Login Realizado!');

      resetForm();
    } catch (error) {
      toast(error.message, { type: 'error' });
    }
  };

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={onSubmit}>
        <YInput
          placeholder="Username"
          type="text"
          value={form.username}
          onChange={({ target }) =>
            setForm({ ...form, username: target.value })
          }
        />
        <YInput
          placeholder="Senha"
          type="password"
          value={form.password}
          onChange={({ target }) =>
            setForm({ ...form, password: target.value })
          }
        />
        <YButton type="submit" content="Entrar" />
        <YButton
          type="button"
          onClick={handleRedirectRegister}
          content="Registrar"
        />
      </form>
    </div>
  );
}

export default Login;
