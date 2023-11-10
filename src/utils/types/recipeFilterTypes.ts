
interface Columns {
    mainIngredient?: string,
    isVeg?: boolean,
}

type filter = {
    and?: Columns,
    or?: Columns,
}
export type RecipeFilter = filter | null | undefined


export type IngredientFilter = {
    name: string,
    recipeIdList?: Array<string>
}
