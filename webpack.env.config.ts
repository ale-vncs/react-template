import dotenv from 'dotenv'

const dotenvParseOutput = dotenv.config().parsed

const env: Record<string, any> = {
  ...dotenvParseOutput,
  PUBLIC_URL: dotenvParseOutput?.PUBLIC_URL || '',
  PORT: dotenvParseOutput?.PORT || 3000
}

export default env
