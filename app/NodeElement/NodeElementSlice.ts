import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NodeTypes } from '~/utils/CanvasNode';

interface SelectedNodeState {
    id: string | null;
    type: NodeTypes | null;
}

const initialState: SelectedNodeState = {
    id: null,
    type: null,
};

const selectedNodeSlice = createSlice({
    name: 'selectedNode',
    initialState,
    reducers: {
        selectNode: (state, action: PayloadAction<{ id: string; type: NodeTypes }>) => {
            state.id = action.payload.id;
            state.type = action.payload.type;
        },
    },
});

export const { selectNode } = selectedNodeSlice.actions;
export default selectedNodeSlice.reducer;
