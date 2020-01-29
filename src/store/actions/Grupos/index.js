export const criarNovoGrupo = (novoGrupo)=>{
    return{
        type: 'ADICIONAR_NOVO_GRUPO',
        novoGrupo
    }
}

export const iniciarListaDeGrupos = (grupos)=>{
    return{
        type: 'INICIAR_LISTA_DE_GRUPOS',
        grupos
    }
}

export const atualizarGrupo = (grupo)=>{
    return{
        type: 'ATUALIZAR_GRUPO',
        grupo
    }
}

export const excluirGrupo = (id)=>{
    return{
        type: 'EXCLUIR_GRUPO',
        id
    }
}


export const adicionarParticipante = (idGrupo, participante)=>{
    return{
        type: 'ADICIONAR_PARTICIPANTE',
        idGrupo,
        participante
    }
}


export const excluirParticipante = (idGrupo, idParticipante)=>{
    return{
        type: 'EXCLUIR_PARTICIPANTE',
        idGrupo,
        idParticipante
    }
}

export const atualizarParticipante = (idGrupo, participante)=>{
    return{
        type: 'ATUALIZAR_PARTICIPANTE',
        idGrupo,
        participante
    }
}