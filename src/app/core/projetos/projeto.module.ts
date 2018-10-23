export interface Projeto {
    id: string;

    dataCadastro: Date;
    userId: string;
    nomeAtv: string
    classificacao: string;
    curso: string;
    coordenador: string;
    responsavel: string;
    campus: string;
    areaAtuacao: string;
    local: string;
    periodoDe: Date;
    periodoAte: Date;
    horaInicio: string;
    horaFim: string;
    cargaHoraria: number;
    diasDaSemana: string;
    ministrante: string;
    cpf: string;
    funcaoCargo: string;
    titulacao: string;
    numPessoasEnvolvidas: number;
    tipoParceria: string;
    nomeInstituicaoApoio: string;
    justificativa: string;
    metodologiaProcedimento: string;
    docenteInstituicao: string;
    docenteEnvolvido1: string;
    docenteEnvolvido2: string;
    cursoDocenteEnvolvido1: string;
    cursoDocenteEnvolvido2: string;
    funcaoDocenteEnvolvido1: string;
    funcaoDocenteEnvolvido2: string;
    discenteEnvolvido1: string;
    discenteEnvolvido2: string;
    cursoDiscenteEnvolvido1: string;
    cursoDiscenteEnvolvido2: string;
    periodoDiscenteEnvolvido1: string;
    periodoDiscenteEnvolvido2: string;
    matriculaDiscenteEnvolvido1: string;
    matriculaDiscenteEnvolvido2: string;
    cronograma: string;
    situacao: number;
    areaTematica: string;
}   