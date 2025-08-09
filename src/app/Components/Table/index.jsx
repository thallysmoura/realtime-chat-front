'use client'

import React, { useState } from 'react';

// @components
import PesquisaTabela   from './Pesquisa';
import Tabela           from './Lista';
import Card             from '@component/Card';


const Table = ({data, ShowSearch = false, SearchVoice, itensPorPagina, tableAction = false, ActionsContent, DataIndiceInteragido}) => {

    const [dadosFiltrados, setDadosFiltrados]       = useState([])
    
    
    return (
        <>
            <Card className='bg-white' borderRadius={3} shadow='lg'>
                {
                    // Habilitar campo de pesquisa na tabela?
                    ShowSearch === true &&  
                    <div className='w-72'>
                        <PesquisaTabela 
                            dados={data} 
                            onFilteredDataChange={setDadosFiltrados}
                            SearchVoice = {SearchVoice}
                        />
                    </div>
                }
               
                <Tabela 
                    tableAction         =   {tableAction}
                    dados               =   {!ShowSearch ? data : dadosFiltrados} 
                    itensPorPagina      =   {itensPorPagina} 
                    ActionsContent      =   {ActionsContent}  
                    CarregaDadosIndice  =   {DataIndiceInteragido}
                />

            </Card>  
        </>
    );
};

export default Table;