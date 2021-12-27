import YInput from 'libs/ui-components/src/lib/YInput';
import { useState } from 'react';
import { SignUpUseCase } from '../usecases/login/SignUpUseCase';

import axios from 'axios';
import { toast } from 'react-toastify';
import { YCard } from '@muvs/ui-components';

type RegisterForm = {
  name: string;
  email: string;
  password: string;
  username: string;
};

export function Register() {
  const [form, setForm] = useState<RegisterForm>({
    name: '',
    email: '',
    password: '',
    username: '',
  });

  function resetForm() {
    setForm({
      email: '',
      password: '',
      username: '',
      name: '',
    });
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const registerUseCase = await new SignUpUseCase(axios, form).execute();

      console.log(registerUseCase);

      toast.success('Cadastro Realizado!');

      resetForm();
    } catch (erro) {
      toast('Não foi possivel realizar o Cadastro', { type: 'error' });
    }
  };

  return (
    <div>
      <h1>Register</h1>

      <form onSubmit={onSubmit}>
        <YInput
          placeholder="Nome"
          type="text"
          value={form.name}
          onChange={({ target }) => setForm({ ...form, name: target.value })}
        />
        <YInput
          placeholder="Email"
          type="text"
          value={form.email}
          onChange={({ target }) => setForm({ ...form, email: target.value })}
        />
        <YInput
          placeholder="Senha"
          type="password"
          value={form.password}
          onChange={({ target }) =>
            setForm({ ...form, password: target.value })
          }
        />
        <YInput
          placeholder="username"
          type="text"
          value={form.username}
          onChange={({ target }) =>
            setForm({ ...form, username: target.value })
          }
        />
        <button type="submit">Registrar</button>
      </form>
      <YCard />
    </div>
  );
}

export default Register;
