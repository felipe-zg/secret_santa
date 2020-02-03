import {produce} from 'immer';

export default function Grupos(state = [], action) {
  switch (action.type) {
    case 'ADICIONAR_NOVO_GRUPO': {
      return produce(state, draft => {
        draft.push({
          ...action.novoGrupo,
        });
      });
    }
    case 'INICIAR_LISTA_DE_GRUPOS': {
      return action.grupos;
    }
    case 'ATUALIZAR_GRUPO': {
      return produce(state, draft => {
        const groupIndex = draft.findIndex(g => g.id === action.grupo.id);
        draft[groupIndex] = action.grupo;
      });
    }
    case 'EXCLUIR_GRUPO': {
      return produce(state, draft => {
        const groupIndex = draft.findIndex(g => g.id === action.id);
        draft.splice(groupIndex, 1);
      });
    }
    case 'EXCLUIR_PARTICIPANTE': {
      return produce(state, draft => {
        const groupIndex = draft.findIndex(g => g.id === action.idGrupo);
        const participantIndex = draft[groupIndex].participantes.findIndex(
          p => p.id === action.idParticipante,
        );
        draft[groupIndex].participantes.splice(participantIndex, 1);
      });
    }
    case 'ATUALIZAR_PARTICIPANTE': {
      return produce(state, draft => {
        const groupIndex = draft.findIndex(g => g.id === action.idGrupo);
        const participantIndex = draft[groupIndex].participantes.findIndex(
          p => p.id === action.participante.id,
        );
        draft[groupIndex].participantes[participantIndex] = action.participante;
      });
    }
    case 'ADICIONAR_PARTICIPANTE': {
      return produce(state, draft => {
        const groupIndex = draft.findIndex(g => g.id === action.idGrupo);
        draft[groupIndex].participantes = [
          ...draft[groupIndex].participantes,
          action.participante,
        ];
      });
    }
    default: {
      return state;
    }
  }
}
