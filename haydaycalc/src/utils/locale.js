export const locales = [
    {
        "code": "en",
        "name": "English",
    },
    {
        "code": "vi",
        "name": "Tiếng Việt",
    }, 
    {
        "code": "ja",
        "name": "日本語",
    }
]
export const fallbackLocale = "en";

export const getLocaleWithFallback = async (locale, fallback = fallbackLocale) => {
    try {
        return [
            false,
            locale,
            (await import(`../i18n/${locale}.json`)).default,
        ];
    } catch (e) {
        return [
            true,
            fallback,
            (await import(`../i18n/${fallback}.json`)).default,
        ];
    }
};
