import type {LayoutServerLoad} from './$types'

export const load: LayoutServerLoad = ({locals: {locale, user}}) => {
    return {locale, user}
}