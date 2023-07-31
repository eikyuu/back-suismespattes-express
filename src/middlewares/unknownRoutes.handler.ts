import { NotFoundException } from '../utils/Exceptions'

/**
 * Pour toutes les autres routes non définies, on retourne une erreur
 */
export const UnknownRoutesHandler = () => {
  throw new NotFoundException(`La resource demandée n'existe pas`)
}