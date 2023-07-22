import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";
import { fallbackLocale, locales } from "@/utils/locale";
import { useLocale, useTranslations } from "next-intl";
import LocaleLink from "./LocaleLink";
import { NavDropdown } from "react-bootstrap";
import { IoLanguage } from "react-icons/io5";
import { FaCaretDown } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";

function Header() {
    const t = useTranslations("header");
    const pathname = usePathname();
    const locale = useLocale();
    return (
        <Navbar expand="lg" className="navbar-dark sticky-top bg-dark">
            <Container style={{ background: "transparent" }}>
                <LocaleLink
                    href="/"
                    passHref
                    legacyBehavior
                    style={{ textDecoration: "none" }}
                >
                    <Navbar.Brand>HayDay Calc</Navbar.Brand>
                </LocaleLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <LocaleLink className="nav-link" href="/">
                            {t("links.home")}
                        </LocaleLink>
                        <LocaleLink className="nav-link" href="/recipe-graph">
                            {t("links.recipe-graph")}
                        </LocaleLink>
                        <LocaleLink
                            className="nav-link"
                            href="/production-planner"
                        >
                            {t("links.production-planner")}
                        </LocaleLink>
                        <LocaleLink
                            className="nav-link"
                            href="/about-us"
                        >
                            {t("links.about-us")}
                        </LocaleLink>
                    </Nav>
                    <div className="justify-content-end">
                        <NavDropdown
                            title={
                                <span style={{ color: "white" }}>
                                    <IoLanguage />
                                    {locales.find(x => x.code === locale)?.name}
                                </span>
                            }
                            id="navbarScrollingDropdown"
                        >
                            {locales?.map((x) => (
                                <Link
                                    key={x.code}
                                    href={pathname?.replace(
                                        /^\/[^/]+/g,
                                        `/${x.code}`
                                    ) ?? `/${x.code}`}
                                    passHref
                                    legacyBehavior
                                >
                                    <NavDropdown.Item>
                                        {x.name}
                                    </NavDropdown.Item>
                                </Link>
                            ))}
                        </NavDropdown>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
