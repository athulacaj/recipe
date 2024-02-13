
interface Columns {
    mainIngredient?: string,
    isVeg?: boolean,
}

type filter = {
    and?: Columns,
    or?: Columns,
}
export type RecipeFilterFilterType = filter | null | undefined


export type IngredientFilterType = {
    name: string,
    recipeIdList?: Array<string>
}
