export interface Projeto {
    
    id: string;
    userId: string;
    situacao: number;

    atualizacaoAprovado: number;
    atualizacaoIndeferido: number;
    atualizacaoEditado: number;
    atualizacaoCancelado:number;

    nomeAtv: string
    responsavel: string;
    dataCadastro: number;
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

    addMinistrante2: string;
    ministrante2: string;
    cpf2: string;
    docenteInstituicao2: string;
    funcaoCargo2: string;
    titulacao2: string;
    publicoAlvo2: string;

    numPessoasEnvolvidas2: number;
    tipoParceria2: string;
    nomeInstituicaoApoio2: string;

    addMinistrante3: string;
    ministrante3: string;
    cpf3: string;
    docenteInstituicao3: string;
    funcaoCargo3: string;
    titulacao3: string;
    publicoAlvo3: string;

    numPessoasEnvolvidas3: number;
    tipoParceria3: string;
    nomeInstituicaoApoio3: string;

    periodoDe: Date;
    periodoAte: Date;
    horaInicio: string;
    horaFim: string;
    diasDaSemana: Array<string>;
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
    outrosValores: string;

    especificacaoRecursos1: string;
    quantidadeRecursos1: string;
    valorUnitarioRecursos1: string;
    totalRecursos1: string;

    especificacaoRecursos2: string;
    quantidadeRecursos2: string;
    valorUnitarioRecursos2: string;
    totalRecursos2: string;

    especificacaoRecursos3: string;
    quantidadeRecursos3: string;
    valorUnitarioRecursos3: string;
    totalRecursos3: string;

    especificacaoRecursos4: string;
    quantidadeRecursos4: string;
    valorUnitarioRecursos4: string;
    totalRecursos4: string;

    totalDespesas: string;


}   