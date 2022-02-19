import dotenv from 'dotenv'

const dotenvParseOutput = { ...process.env, ...dotenv.config().parsed }

const env: Record<string, any> = {
  ...dotenvParseOutput,
  PUBLIC_URL: dotenvParseOutput?.PUBLIC_URL || '',
  PORT: dotenvParseOutput?.PORT || 3000,
  OPEN_IN_BROWSER: dotenvParseOutput?.OPEN_IN_BROWSER ?? 'true'
}

export default env
