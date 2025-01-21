export interface IReview {
    idAvaliacao: number,
    nota: number,
    statusNPS: string,
    comentario: string,
    dataCadastro: Date,
    horaAvaliacao: string,
    unidadeId: number,
    clienteEmail?: string,
    clienteNome?: string,
    clienteTelefone?: string,
    mesaId: number,
    mesa: string,
    pracaId: number,
    praca: string,
    idUnidade: number,
    unidade: string
}