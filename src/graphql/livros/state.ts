import { makeVar } from "@apollo/client";
import { ILivro } from "../../interfaces/ILivro";
import { ICategoria } from "../../interfaces/ICategoria";

interface FiltroLivros {
  categoria?: ICategoria,
  titulo?: string
}

export const FiltroLivrosVar = makeVar<FiltroLivros>({})

export const livrosVar = makeVar<ILivro[]>([])