import { useState, useEffect } from 'react';
import { Paragraph } from '../Typography';
import Button2 from '@component/Button2';

const Tabela = ({ dados, itensPorPagina, tableAction, ActionsContent, CarregaDadosIndice }) => {

  const [paginaAtual, setPaginaAtual] = useState(1);
  const [dadosOrdenados, setDadosOrdenados] = useState(dados);
  const [configuracaoDeOrdenacao, setConfiguracaoDeOrdenacao] = useState({ chave: null, direcao: 'asc' });


  // Deriva os cabeçalhos das chaves do primeiro objeto de dados
  const cabecalhos = dados.length > 0 ? Object.keys(dados[0]) : [];

  useEffect(() => {
    let dadosOrdenados = [...dados];
    if (configuracaoDeOrdenacao.chave) {
      dadosOrdenados.sort((a, b) => {
        if (a[configuracaoDeOrdenacao.chave] < b[configuracaoDeOrdenacao.chave]) {
          return configuracaoDeOrdenacao.direcao === 'asc' ? -1 : 1;
        }
        if (a[configuracaoDeOrdenacao.chave] > b[configuracaoDeOrdenacao.chave]) {
          return configuracaoDeOrdenacao.direcao === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    setDadosOrdenados(dadosOrdenados);
  }, [configuracaoDeOrdenacao, dados]);

  // Função para lidar com a ordenação dos dados
  const lidarComOrdenacao = (chave) => {
    let direcao = 'asc';
    if (configuracaoDeOrdenacao.chave === chave && configuracaoDeOrdenacao.direcao === 'asc') {
      direcao = 'desc';
    }
    setConfiguracaoDeOrdenacao({ chave, direcao });
  };

  // Função para alterar a página atual
  const lidarComMudancaDePagina = (pagina) => {
    setPaginaAtual(pagina);
  };

  // Função para obter os dados da página atual
  const obterDadosDaPagina = () => {
    const inicio = (paginaAtual - 1) * itensPorPagina;
    const fim = inicio + itensPorPagina;
    return dadosOrdenados.slice(inicio, fim);
  };

  // Calcular o total de páginas
  const totalDePaginas = Math.ceil(dados.length / itensPorPagina);

  return (
     
        <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 ">
            <thead className="bg-gray-50 font-semibold">
            <tr>
                {cabecalhos.map((cabecalho) => (
                <th key={cabecalho} onClick={() => lidarComOrdenacao(cabecalho)} className="px-6 py-3 text-left text-xs font-bold text-textDefault uppercase tracking-wider cursor-pointer" >
                    {cabecalho}
                    {configuracaoDeOrdenacao.chave === cabecalho && (
                    <span className={`ml-2 ${configuracaoDeOrdenacao.direcao === 'asc' ? 'text-gray-300' : 'text-gray-500'}`}>
                        {configuracaoDeOrdenacao.direcao === 'asc' ? '▲' : '▼'}
                    </span>
                    )}
                </th>
                ))}
                 { dados.length > 0 && tableAction && 
                  <th className="px-6 py-3 text-left text-xs font-bold text-textDefault uppercase tracking-wider cursor-pointer">AÇÕES</th>
                 }
            </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {obterDadosDaPagina().map((linha, indice) => (
           
                <tr key={indice}>
                {cabecalhos.map((cabecalho) => (
                    <td key={cabecalho} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {linha[cabecalho]}
                    </td>
                 
                ))}
                {
                  tableAction && 
                    <td onClick={()=>CarregaDadosIndice(linha)} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {ActionsContent}
                    </td>
                }
                </tr>
            ))}
            </tbody>
        </table>

        <div className="mt-4 flex justify-end items-center gap-5">
            <Button2 size='small' variant='secondary' onClick={() => lidarComMudancaDePagina(paginaAtual - 1)} disabled={paginaAtual === 1} className=" bg-gray-800 text-white  disabled:opacity-10 disabled:cursor-not-allowed">
              <svg className="w-5 h-5 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m15 19-7-7 7-7"/>
              </svg>
            </Button2>
            
            <Paragraph>
                Página {paginaAtual} de {totalDePaginas}
            </Paragraph>

            <Button2 size='small' variant='secondary' onClick={() => lidarComMudancaDePagina(paginaAtual + 1)} disabled={paginaAtual === totalDePaginas} className=" bg-gray-800 text-white disabled:opacity-10 disabled:cursor-not-allowed">
              <svg className="w-5 h-5 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round"  strokeWidth="2" d="m9 5 7 7-7 7"/>
              </svg>
            </Button2>
        </div>
        </div>

  );
};

export default Tabela;
