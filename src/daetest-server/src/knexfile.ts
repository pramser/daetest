export const test = {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: { min: 0, max: 5 },
    acquireConnectionTimeout: 2000,
  }
  
  export const development = {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: { min: 1, max: 5 },
    acquireConnectionTimeout: 2000,
  }
  
  export const staging = {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: { min: 2, max: 20 },
    acquireConnectionTimeout: 2000,
  }
  
  export const production = {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: { min: 2, max: 20 },
    acquireConnectionTimeout: 2000,
  }