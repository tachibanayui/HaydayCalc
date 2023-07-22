import "bootstrap/dist/css/bootstrap.min.css"
import { getLocaleWithFallback, locales } from "@/utils/locale"
import { createTranslator } from "next-intl"

export async function generateMetadata(props, parent) {
    let { params, searchParams } = props
    const { locale } = params
    const recipe = decodeURI(params?.recipe) ?? "Egg"
    let paramCount = parseInt(searchParams?.["count"])
    paramCount = Number.isInteger(paramCount) ? paramCount : 1

    const [_, lang, messages] = await getLocaleWithFallback(locale ?? 'en')
    const t = createTranslator({ locale: lang, messages })

    const title = `${recipe} | ${t("meta.recipe-graph.title")}`
    /** @type {import('next').Metadata} */
    let meta = {
        title: {
            default: title,
        },
        description: t("meta.recipe-graph.description"),
        openGraph: {
            title: title,
            description: t("meta.recipe-graph.description"),
            url: `/${lang}/recipe-graph/${encodeURI(recipe)}`,
            siteName: t("meta.recipe-graph.title"),
            type: "website",
            images: [
                {
                    url: "/banner.png",
                    width: 1800,
                    height: 1600,
                    alt: title,
                },
            ],
        },
    }

    return meta
}

const RootLayout = ({ children }) => {
    return <>{children}</>
}

export default RootLayout
