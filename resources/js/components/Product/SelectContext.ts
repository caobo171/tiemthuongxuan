import React from 'react';
import { SelectItemsType } from '../../store/types';


type ContextType = {
    items: SelectItemsType,
    setItems: (value: SelectItemsType) => void
}

export const SelectProductContext = React.createContext<ContextType>({
    items: {},
    setItems: ()=>{}
})

