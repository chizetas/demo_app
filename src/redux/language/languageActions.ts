export const CHANGE_LANGUAGE = "change_language";

export const changeLanguageActionCreator = (languageCode: "zh" | "en") : ChangeLanguageAction => {
    return {
        type: CHANGE_LANGUAGE,
        payload: languageCode
    }
}

interface ChangeLanguageAction {
    type: typeof CHANGE_LANGUAGE
    payload: "zh" | "en"
}

export type LanguageActionTypes = ChangeLanguageAction