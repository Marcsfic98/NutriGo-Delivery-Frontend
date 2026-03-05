import type Pedido from "../../models/Pedido"

export const statusOptions = [
  "Pendente",
  "Em preparo",
  "Saiu para entrega",
  "Entregue",
  "Cancelado",
] as const satisfies Pedido["status"][]

export function formatarMoeda(valor: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor)
}

export function formatarData(dataIso: string) {
  const data = new Date(dataIso)

  if (Number.isNaN(data.getTime())) {
    return "Data indisponivel"
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(data)
}

export function classeStatusBadge(status: Pedido["status"]) {
  switch (status) {
    case "Pendente":
      return "bg-amber-100 text-amber-700 ring-1 ring-amber-200"
    case "Em preparo":
      return "bg-sky-100 text-sky-700 ring-1 ring-sky-200"
    case "Saiu para entrega":
      return "bg-violet-100 text-violet-700 ring-1 ring-violet-200"
    case "Entregue":
      return "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200"
    case "Cancelado":
      return "bg-rose-100 text-rose-700 ring-1 ring-rose-200"
    default:
      return "bg-zinc-100 text-zinc-700 ring-1 ring-zinc-200"
  }
}

export function classeStatusLinha(status: Pedido["status"]) {
  switch (status) {
    case "Pendente":
      return "from-amber-300 to-amber-500"
    case "Em preparo":
      return "from-sky-300 to-sky-500"
    case "Saiu para entrega":
      return "from-violet-300 to-violet-500"
    case "Entregue":
      return "from-emerald-300 to-emerald-500"
    case "Cancelado":
      return "from-rose-300 to-rose-500"
    default:
      return "from-zinc-300 to-zinc-500"
  }
}