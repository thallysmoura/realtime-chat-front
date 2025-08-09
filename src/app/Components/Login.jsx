"use client";

import React from "react";

// @Components
import Button    from "./Button2";
import { H2 }    from '@component/Typography';
import Loading   from "./Loading";

const Login = () => {

return (
    <div className="w-full max-w-sm p-8 bg-white border border-gray-200 rounded shadow sm:p-8 md:p-5">
      <form className="space-y-3" action="#">
      <H2>
        Login
      </H2>
        <div>
          <label
            htmlFor="email"
            className="block mb-1 text-sm font-medium text-gray-900"
          >
            Usuário
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Código do Usuário"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-900">
            Senha
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div>
          <label htmlFor="password"  className="block mb-1 text-sm font-medium text-gray-900">
            Empresa
          </label>
          <input
            disabled
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <Button type="button" className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm px-5 py-2.5 text-center'>
          {
            /*<Loading />*/
          }
          Entrar
        </Button>
       
      </form>
    </div>
  );
};

export default Login;
