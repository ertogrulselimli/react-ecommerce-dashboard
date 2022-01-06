import {
    TAB_OPENED,
    TAB_CLOSED
} from "../constants";



let defaultState = {
    active: null,
    list: {}
};


export default (state = defaultState, action) => {

    switch (action.type) {
        case TAB_OPENED:
            const {tab, props} = action.payload || {};

            return {
                active: tab,
                list: {
                    ...state.list, [tab]: {
                        time: Date.now(),
                        props: props || {},
                        component: tab
                    }
                }
            };
        case TAB_CLOSED:
            let removedTab = action.payload.tab;
            let activeTab = state.active;
            if(removedTab === activeTab){
                let tabs = Object.values(state.list).filter(t => t.component !== removedTab).sort((a, b) => a.time - b.time);
                activeTab = tabs.length ? tabs[0].component: null
            }

            const {[removedTab]: value, ...rest} = state.list;

            return {
                active: activeTab,
                list: rest
            };
        default:
            return state

    }
}