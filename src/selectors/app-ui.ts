import { RootState } from '@/store/root';

export const isAppUIMobileBottonNavHidden = (state: RootState) => state.app.ui.mobileBottonNavHidden;

export const isAppUITopBarHidden = (state: RootState) => state.app.ui.topBarHidden;
