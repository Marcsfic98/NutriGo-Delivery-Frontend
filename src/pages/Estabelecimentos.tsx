/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useContext, useEffect, useState } from "react"
import { SyncLoader } from "react-spinners"
import CardEstabelecimento from "../components/cardestabelecimento/CardEstabelecimento"
import { AuthContext } from "../contexts/AuthContext"
import type Estabelecimento from "../models/Estabelecimento"
import { buscar } from "../services/Service"

function Estabelecimentos() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [estabelecimentos, setEstabelecimentos] = useState<Estabelecimento[]>(
    [],
  )
  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token

  useEffect(() => {
    buscarEstabelecimentos()
  }, [])

  async function buscarEstabelecimentos() {
    try {
      setIsLoading(true)
      await buscar("/estabelecimentos", setEstabelecimentos, {
        headers: { Authorization: token },
      })
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout()
      }
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <>
      {isLoading && (
        <div className="my-8 flex w-full justify-center">
          <SyncLoader color="#312e81" size={32} />
        </div>
      )}
      <div className="m-2 flex flex-col gap-2">
        <h1 className="text-center font-semibold">
          Estabelecimentos Cadastrados
        </h1>
        {estabelecimentos.map((estabelecimento) => (
          <CardEstabelecimento
            key={estabelecimento.id}
            estabelecimento={estabelecimento}
          />
        ))}
      </div>
    </>
  )
}
export default Estabelecimentos
