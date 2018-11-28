// /// <reference path="../schema.d.ts" />
// import { Omit } from 'graphql-yoga/dist/types'

// export const Company = {
//   async customers(parent: SproutApi.ICompany) {
//     const customers = await Customer.query().where('company_id', parent.id)
//     return customers as Omit<
//       SproutApi.ICustomer,
//       '__typename' | 'contacts' | 'addresses' | 'jobs'
//     >[]
//   },
// }
