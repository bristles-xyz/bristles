// import { elementProcessors } from '../elements'
import { type DocumentSchemaType, DocumentSchema } from './index'

export const parseDocument = (data: any): DocumentSchemaType => {
  try {
    return DocumentSchema.parse(data /*{ elementProcessors }*/)
  } catch (error) {
    throw new Error('Invalid document data.')
  }
}
