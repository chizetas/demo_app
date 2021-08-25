
export interface LanguageState {
    language: "EN" | "ZH"
    languageList: {name: string, code: string}[]
}

const defaultState: LanguageState = {
    language: "EN",
    languageList: [
        {name : "English", code: "EN"},
        {name : "中文", code: "ZH"},
    ],
};


export default (state = defaultState, action) => {
    switch(action.type) {
        case "change_language":
            return {...state, language: action.payload}
        default:
            return state
    }

    
    return state;
};