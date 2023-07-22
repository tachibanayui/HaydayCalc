import jdata from "../assets/output.json"
import { onlyUnique } from "./array"

export const defaultRecipeSelector = current => current.recipes[0]

export const calculatePosition = (
    origins,
    data,
    recipeSelector = defaultRecipeSelector,
    horizontalSpacing = 100,
    verticalSpacing = 100
) => {
    const poses = {}
    const spacingData = { depth: 0, hSize: 0 }

    origins.forEach(root => {
        poses[root.name] = {
            x: -spacingData.depth * horizontalSpacing,
            y: spacingData.hSize * verticalSpacing,
        }
        spacingData.depth++
        populateChildren({
            data,
            root,
            recipeSelector,
            poses,
            spacingData,
            horizontalSpacing,
            verticalSpacing,
        })
        //
        spacingData.depth--

    })
    return poses
}

const populateChildren = ({
    data,
    root,
    recipeSelector,
    poses,
    spacingData,
    horizontalSpacing,
    verticalSpacing,
}) => {
    const ingridients = recipeSelector(root).ingridients
    let count = 0;
    for (const { product } of ingridients) {
        if (poses[product]) continue
        count++;
        poses[product] = {
            x: -spacingData.depth * horizontalSpacing,
            y: spacingData.hSize * verticalSpacing,
        }

        spacingData.depth++
        populateChildren({
            data,
            root: data[product],
            recipeSelector,
            poses,
            spacingData,
            horizontalSpacing,
            verticalSpacing,
        })
        spacingData.depth--
        spacingData.hSize++
    }

    if(count > 0) spacingData.hSize--
}

export const calculateDependencies = (
    origins,
    goodsList,
    recipeSelector = defaultRecipeSelector
) => {
    const { result, remainder } = calculateDependencies0(origins, goodsList, recipeSelector)
    const postCalc = remainder.filter(onlyUnique)

    for (const item of postCalc) {
        const itemCount = result[item].count
        const resultCount = recipeSelector(goodsList[item]).resultCount
        const mod = itemCount % resultCount
        if (mod === 0) continue

        const { result: itemRes } = calculateDependencies0(
            [{ product: item, count: 1 }],
            goodsList,
            recipeSelector
        )
        for (const prod in itemRes) {
            result[prod].count += itemRes[prod].count * (resultCount - mod)
        }
    }

    return result
}

// Maybe don't use recursion for performance?
const calculateDependencies0 = (origins, goodsList, recipeSelector) => {
    const result = {}
    const remainder = []

    for (const origin of origins) {
        const originData = goodsList[origin.product]
        const recipe = recipeSelector(originData)

        if (result[origin.product]) {
            result[origin.product].count += origin.count
        } else {
            result[origin.product] = {
                count: origin.count,
                source: recipe.source,
            }
        }

        const { result: childrenResult, remainder: childrenRemainder } = calculateDependencies0(
            recipe.ingridients.filter(x => x.product !== origin.product),
            goodsList,
            recipeSelector
        )

        for (const resultItem in childrenResult) {
            if (result[resultItem]) {
                result[resultItem].count +=
                    (childrenResult[resultItem].count * origin.count) / recipe.resultCount
            } else {
                result[resultItem] = childrenResult[resultItem]
                result[resultItem].count *= origin.count / recipe.resultCount
            }
        }

        remainder.push(...childrenRemainder)
        if (recipe.resultCount > 1) {
            remainder.push(origin.product)
        }
    }

    return { result, remainder }
}
