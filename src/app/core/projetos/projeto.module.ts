export interface Projeto {
    
    id: string;
    userId: string;
    situacao: number;

    nomeAtv: string
    responsavel: string;
    dataCadastro: Date;
    classificacao: string;
    areaTematica: string;
    curso: string;
    coordenador: string;
    areaAtuacao: string;

    ministrante: string;
    cpf: string;
    docenteInstituicao: string;
    funcaoCargo: string;
    titulacao: string;
    publicoAlvo: string;

    numPessoasEnvolvidas: number;
    tipoParceria: string;
    nomeInstituicaoApoio: string;

    periodoDe: Date;
    periodoAte: Date;
    horaInicio: string;
    horaFim: string;
    diasDaSemana: string;
    cargaHoraria: number;
    campus: string;
    local: string;

    objetivos: string;
    justificativa: string;
    metodologiaProcedimento: string;
    
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

    receitaIncricao: string;
    receitaInicio: string;
    receitaTermino: string;
    receitaNumMinInsc: string;
    receitaNumMinInscTotal: string;
    receitaNumMaxInsc: string;
    receitaNumMaxInscTotal: string;
    valorDiscenteDoscente: string;
}   