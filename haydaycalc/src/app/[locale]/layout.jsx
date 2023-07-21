import { Inter } from "next/font/google";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import "bootstrap/dist/css/bootstrap.min.css";
import { locales } from "@/utils/locale";
import NextJsDefaultLayout from "@/components/layouts/NextJsDefaultLayout";


/** @type {import('next').Metadata}*/
export const metadata = {
    title: "Hayday Calculator",
    description: "Various tools to simplify planning and playing Hayday",
};

export function generateStaticParams() {
    return locales.map((locale) => ({ locale: locale.code }));
}


export default NextJsDefaultLayout;
