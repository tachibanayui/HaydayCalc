"use client"

import { useTranslations } from "next-intl"
import { AiFillFacebook, AiFillLinkedin, AiOutlineGithub } from "react-icons/ai"

const Footer = () => {
    const t = useTranslations("footer")

    return (
        <div className="p-3" style={{ background: "black" }}>
            <div class="container">
                <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                    <div class="col-md-4 d-flex align-items-center">
                        <a href="/" class="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
                            <svg class="bi" width="30" height="24">
                                <use href="#bootstrap"></use>
                            </svg>
                        </a>
                        <span class="mb-3 mb-md-0 text-muted">
                            {t("created-by")} sharpi (Tachibana Yui)
                        </span>
                    </div>

                    <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
                        <li class="ms-3">
                            <a
                                class="text-muted"
                                target="_blank"
                                rel="noreferrer"
                                href="https://github.com/tachibanayui"
                                title="github (tachibana-yui)"
                            >
                                <AiOutlineGithub />
                            </a>
                        </li>
                        <li class="ms-3">
                            <a
                                class="text-muted"
                                target="_blank"
                                rel="noreferrer"
                                href="https://www.facebook.com/TachibanaYui.desu/"
                                title="Facebook"
                            >
                                <AiFillFacebook />
                            </a>
                        </li>

                        <li class="ms-3">
                            <a
                                class="text-muted"
                                target="_blank"
                                rel="noreferrer"
                                href="https://github.com/tachibanayui"
                                title="linkedin"
                            >
                                <AiFillLinkedin />
                            </a>
                        </li>
                    </ul>
                </footer>
            </div>
        </div>
    )
}

export default Footer
