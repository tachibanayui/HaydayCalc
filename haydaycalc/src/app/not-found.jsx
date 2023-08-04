import DefaultLayout from "@/components/layouts/DefaultLayout";
import { Container } from "@/reexports/ReactBootstrap";
import { getLocaleWithFallback } from "@/utils/locale";
import { NextIntlClientProvider } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const NotFound = async () => {
    const [fallback, rlocale, translations] = await getLocaleWithFallback("en");
    return (
        <html data-bs-theme="dark">
            <NextIntlClientProvider locale={rlocale} messages={translations}>
                <body style={{}}>
                    <link
                        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
                        rel="stylesheet"
                        integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
                        crossorigin="anonymous"
                    ></link>
                    <DefaultLayout>
                        <Container className="my-5">
                            <div className="d-flex flex-wrap gap-2 align-items-center justify-content-center">
                                <h1 style={{ fontSize: "5rem" }}>404</h1>
                                <div class="vr my-5 mx-3"></div>
                                <div>
                                    <h2>Not found</h2>

                                    <p>
                                        We have searched far and wide but couldn&apos;t find the
                                        page you requested!
                                    </p>
                                    <Link href="/en" className="btn btn-primary">
                                        Return home!
                                    </Link>
                                </div>
                            </div>
                            <Image
                                src="/Chicken_Walking.webp"
                                alt="Not found message"
                                className="w-50 d-block mx-auto"
                                width={645}
                                height={645}
                            />
                        </Container>
                    </DefaultLayout>
                </body>
            </NextIntlClientProvider>
        </html>
    )
};

export default NotFound;
