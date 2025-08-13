'use client'
import React, { useState, useEffect } from 'react';
import API from 'app/Service/API';
import { gerarHashSala } from '@utils/Utils';
import { useRouter } from 'next/navigation'


const CreateRoom = () => {

    const router = useRouter()


    const [nomeSala, setNomeSala] = useState('')
    const [loading, setLoading] = useState(false)



    async function handleCreateRoom() {
        const token = localStorage.getItem("token");
        if (!token) return;
        if (!nomeSala.trim()) return;

        const hashSala = await gerarHashSala(nomeSala);
        setLoading(true)
        try {
            const req = await API.post(
                "/create-room",
                { salaId: hashSala, nomeSala: nomeSala },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (req.data) {
                setLoading(false)
                router.push(`/Room/${req.data.room}`)
            }
        } catch (error) {
            console.error("Erro ao criar sala:", error);
            setLoading(false)
        }
    }

    return (
        <>
            <section className="flex flex-col gap-2">
                <div>
                    <small className="text-gray-700 text-xl font-medium">Informe um nome para sua sala:</small>
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Exemplo: Sala de Reunião"
                        value={nomeSala}
                        autoFocus
                        onChange={(e) => setNomeSala(e.target.value)}
                        className="p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <button
                        onClick={handleCreateRoom}
                        disabled={loading || !nomeSala.trim()}
                        className="w-full bg-[#405DA1] text-white px-4 py-2 rounded-md hover:bg-[#31477a] disabled:opacity-30 disabled:cursor-not-allowed"
                    >

                        {loading ? 'Criando...' : 'Criar Sala'}
                    </button>
                </div>
            </section>
        </>
    );
};

export default CreateRoom;