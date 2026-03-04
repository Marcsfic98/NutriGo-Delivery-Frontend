import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import type Usuario from "../../../models/Usuario";
import { cadastrarUsuario } from "../../../services/Service";
import { ToastAlerta } from "../../../util/ToastAlerta";
import { ClipLoader } from "react-spinners";


export function Cadastro() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [confirmarSenha, setConfirmarSenha] = useState<string>("");

  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
  });

  function retornar() {
    navigate("/");
  }

  useEffect(() => {
    if (usuario.id !== 0) {
      retornar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usuario]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(e.target.value);
  }

  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (confirmarSenha === usuario.senha && usuario.senha.length >= 8) {
      setIsLoading(true);

      try {
        await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario);
        ToastAlerta("Usuário cadastrado com sucesso!", "sucesso");
      } catch {
        ToastAlerta("Erro ao cadastrar o usuário!", "erro");
      }
    } else {
      ToastAlerta(
        "Dados do usuário inconsistentes! Verifique as informações do cadastro.",
        "erro",
      );
      setUsuario({ ...usuario, senha: "" });
      setConfirmarSenha("");
    }

    setIsLoading(false);
  }

  return (
    <>
      <div className="grid h-screen grid-cols-1 place-items-center font-bold lg:grid-cols-2">
        {/* <div className="hidden min-h-screen w-full bg-[url('https://i.imgur.com/ZZFAmzo.jpg')] bg-cover bg-center bg-no-repeat lg:block"></div> */}
        <form
          className="flex w-2/3 flex-col items-center justify-center gap-3"
          onSubmit={cadastrarNovoUsuario}
        >
          <h2 className="text-5xl text-lime-800">Cadastrar</h2>
          <div className="flex w-full flex-col">
            <label htmlFor="nome" className="font-bold text-lime-800">
              Nome
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Digite o seu nome completo"
              className="rounded border-2 border-lime-600 p-2 focus:border-lime-800 focus:ring-1 focus:ring-lime-800 focus:outline-none"
              value={usuario.nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>
          <div className="flex w-full flex-col">
            <label htmlFor="usuario" className="font-bold text-lime-800">
              E-mail
            </label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Digite o seu e-mail"
              className="rounded border-2 border-lime-600 p-2 focus:border-lime-800 focus:ring-1 focus:ring-lime-800 focus:outline-none"
              value={usuario.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>
          <div className="flex w-full flex-col">
            <label htmlFor="foto" className="font-bold text-lime-800">
              Foto
            </label>
            <input
              type="text"
              id="foto"
              name="foto"
              placeholder="Digite o link para a sua foto"
              className="rounded border-2 border-lime-600 p-2 focus:border-lime-800 focus:ring-1 focus:ring-lime-800 focus:outline-none"
              value={usuario.foto}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>
          <div className="flex w-full flex-col">
            <label htmlFor="senha" className="font-bold text-lime-800">
              Senha
            </label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Digite a sua senha"
              className="rounded border-2 border-lime-600 p-2 focus:border-lime-800 focus:ring-1 focus:ring-lime-800 focus:outline-none"
              value={usuario.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>
          <div className="flex w-full flex-col">
            <label htmlFor="confirmarSenha" className="font-bold text-lime-800">
              Confirmar Senha
            </label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              placeholder="Confirme a sua senha"
              className="rounded border-2 border-lime-600 p-2 focus:border-lime-800 focus:ring-1 focus:ring-lime-800 focus:outline-none"
              value={confirmarSenha}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleConfirmarSenha(e)
              }
            />
          </div>
          <div className="flex w-full justify-around gap-8">
            <button
              type="reset"
              className="w-1/2 rounded bg-red-400 py-2 text-white hover:bg-red-700"
              onClick={retornar}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex w-1/2 justify-center rounded bg-lime-600 py-2 text-white hover:bg-lime-800"
            >
              {isLoading ? (
                <ClipLoader color="#3f6212" size={24} />
              ) : (
                <span>Cadastrar</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}