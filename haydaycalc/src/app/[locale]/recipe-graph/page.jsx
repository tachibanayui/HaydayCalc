"use client";

import { redirect, usePathname } from "next/navigation";

const RecipeGraphScreen = () => {
    const pathname = usePathname();
    redirect(`${pathname}/Egg`);
};

export default RecipeGraphScreen;
