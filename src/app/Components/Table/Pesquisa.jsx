'use client'

import 'regenerator-runtime/runtime';
import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Input from '@component/Input';



const PesquisaTabela = ({ dados, onFilteredDataChange, SearchVoice = false }) => {

  const [termoPesquisa, setTermoPesquisa]           = useState('');
  const { transcript, listening, resetTranscript }  = useSpeechRecognition();

  const handleSearch = (event) => {
    const termo = event.target.value;
    setTermoPesquisa(termo);
  };

  const handleListenClick = () => {
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
      if (listening) {
        SpeechRecognition.stopListening();
        setTermoPesquisa(transcript);
        resetTranscript();
      } else {
        SpeechRecognition.startListening({ continuous: true });
      }
    } else {
      console.warn('Speech recognition is not supported in this browser.');
    }
  };

  useEffect(() => {
    const dadosFiltrados = termoPesquisa
      ? dados.filter(item =>
          Object.keys(item).some(key =>
            item[key] && item[key].toString().toLowerCase().includes(termoPesquisa.toLowerCase())
          )
        )
      : dados;

    onFilteredDataChange(dadosFiltrados);
  }, [dados, termoPesquisa, onFilteredDataChange]);



  return (
    <div className="mb-5">
      <div className="relative w-full">
        <Input
          onChange={handleSearch}
          value={termoPesquisa}
          type="text"
          id="search"
          placeholder="Busca"
          className="w-full"
          autoComplete='off'
          autoCapitalize='none'
        />
        {
          SearchVoice &&
            <button type="button" onClick={handleListenClick} className={`absolute inset-y-0 end-0 flex items-center pe-3 ${listening ? 'text-red-500 animate-pulse' : 'text-gray-500'} dark:${listening ? 'text-blue-100' : 'text-gray-400'}`}>
            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7v3a5.006 5.006 0 0 1-5 5H6a5.006 5.006 0 0 1-5-5V7m7 9v3m-3 0h6M7 1h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z"/>
            </svg>
          </button>
        }
       
      </div>
    </div>
  );
};

export default PesquisaTabela;
