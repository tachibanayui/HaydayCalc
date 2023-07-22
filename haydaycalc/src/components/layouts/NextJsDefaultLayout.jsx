import { Inter } from "next/font/google";
import DefaultLayout from "./DefaultLayout";
import "bootstrap/dist/css/bootstrap.min.css";
import { fallbackLocale, getLocaleWithFallback, locales } from "@/utils/locale";
import { NextIntlClientProvider } from "next-intl";
import { Alert } from "@/reexports/ReactBootstrap";

const inter = Inter({ subsets: ["latin"] });

const NextJsDefaultLayout = async ({ children, params }) => {
    const [fallback, rlocale, translations] = await getLocaleWithFallback(
        params?.locale ?? fallbackLocale
    );
    return (
        <html lang={rlocale} data-bs-theme="dark">
            <body className={inter.className} data-bs-theme="dark">
                <NextIntlClientProvider
                    locale={rlocale}
                    messages={translations}
                >
                    <DefaultLayout>
                        {fallback && (
                            <Alert variant="warning">
                                This page is not available in your desired
                                language!
                            </Alert>
                        )}
                        {children}
                    </DefaultLayout>
                </NextIntlClientProvider>
            </body>
        </html>
    );
};

export default NextJsDefaultLayout;
