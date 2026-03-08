import { useContext, useEffect, useState } from "react"
import { SyncLoader } from "react-spinners"
import CardEstabelecimento from "../components/cardestabelecimento/CardEstabelecimento"
import { AuthContext } from "../contexts/AuthContext"
import type Estabelecimento from "../models/Estabelecimento"
import { buscar } from "../services/Service"

export function Estabelecimentos() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [estabelecimentos, setEstabelecimentos] = useState<Estabelecimento[]>(
    [],
  )
  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token

  useEffect(() => {
    async function buscarEstabelecimentos() {
      try {
        setIsLoading(true)
        await buscar("/estabelecimentos", setEstabelecimentos, {
          headers: { Authorization: token },
        })
      } catch (error) {
        if (String(error).includes("401")) {
          handleLogout()
        }
      } finally {
        setIsLoading(false)
      }
    }
    buscarEstabelecimentos()
  }, [token, handleLogout])

  return (
    <>
      <div className="mx-40 mt-30 mb-15">
        <h1 className="mb-8 text-center text-2xl font-semibold text-[#1d5f29] text-shadow-2xs">
          Venha comer com a gente
        </h1>
        {isLoading && (
          <div className="my-8 flex w-full justify-center">
            <SyncLoader color="#312e81" size={32} />
          </div>
        )}

        <div className="grid grid-cols-4 gap-8">
          {estabelecimentos.map((estabelecimento) => (
            <CardEstabelecimento
              key={estabelecimento.id}
              estabelecimento={estabelecimento}
            />
          ))}
        </div>
      </div>
    </>
  )
}
