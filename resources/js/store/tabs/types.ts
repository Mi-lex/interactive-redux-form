import { TabName } from '../../../constants/tabs';

export const CHANGE_TAB = 'CHANGE_TAB';

export interface TabActionType {
    type: typeof CHANGE_TAB;
    current: TabName;
}

export interface TabsState {
    current: TabName;
}
