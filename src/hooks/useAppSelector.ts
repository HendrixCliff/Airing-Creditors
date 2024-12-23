import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { RootState } from './../redux/rootReducer'


export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector