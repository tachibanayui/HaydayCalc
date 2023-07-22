import { Inter } from "next/font/google"
import DefaultLayout from "../../components/layouts/DefaultLayout"
import "bootstrap/dist/css/bootstrap.min.css"
import { getLocaleWithFallback, locales } from "@/utils/locale"
import NextJsDefaultLayout from "@/components/layouts/NextJsDefaultLayout"
import { createTranslator } from "next-intl"

export async function generateMetadata({ params, searchParams }, parent) {
    const { locale } = params
    const [fallback, lang, messages] = await getLocaleWithFallback(locale)
    const t = createTranslator({ locale: lang, messages })

    /** @type {import('next').Metadata}*/
    let meta = {
        title: {
            default: t("meta.homepage.title"),
            template: "%s | Hayday Calculator",
        },
        description: t("meta.homepage.description"),
        keywords: ["hayday", "calculator", "farm", "game", "planner", "wiki", "recipe"],
        authors: [{ name: "Tachibana Yui", url: "https://github.com/tachibanayui" }],
        colorScheme: "dark",
        themeColor: "black",
        creator: "Tachibana Yui",
        publisher: "Tachibana Yui",
        openGraph: {
            title: `${t("meta.homepage.title")} | Hayday Calculator`,
            description: t("meta.homepage.description"),
            url: "https://haydaycalc.sharpi.co",
            siteName: t("meta.homepage.title"),
            images: [
                {
                    url: "/banner.png",
                    width: 1800,
                    height: 1600,
                    alt: `${t("meta.homepage.title")} | Hayday Calculator`,
                },
            ],
            locale: lang,
            type: "website",
        },
        icons: {
            icon: "/icon.png",
            shortcut: "/icon.png",
            apple: "/icon.png",
        },
        manifest: "/manifest.json",
        viewport: {
            width: "device-width",
            initialScale: 1,
            maximumScale: 1,
        },
    }

    return meta
}

export function generateStaticParams() {
    return locales.map(locale => ({ locale: locale.code }))
}

export default NextJsDefaultLayout
