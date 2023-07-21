"use client"
import { useLocale } from "next-intl";
import Link from "next/link";

const LocaleLink = ({ children, ...rest }) => {
    const lang = useLocale();
    const href = !rest.href?.startsWith("/") ? rest.href : `/${lang}${rest.href}`;
    return <Link {...rest} href={href}>{children}</Link>;
};

export default LocaleLink;
