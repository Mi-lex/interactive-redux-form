import { CHANGE_TAB, TabActionType } from './types';
import { TabName } from '../../../constants/tabs';

export const changeTab = (tabName: TabName): TabActionType => {
    return {
        type: CHANGE_TAB,
        current: tabName,
    };
};
