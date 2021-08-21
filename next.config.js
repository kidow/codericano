module.exports = {
  devIndicators: {
    autoPrerender: false
  },
  webpack5: false,
  env: {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_KEY: process.env.SUPABASE_KEY
  }
}
