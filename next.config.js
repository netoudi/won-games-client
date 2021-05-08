// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require('next-pwa')
const isProd = process.env.NODE_ENV === 'production'

module.exports = withPWA({
  pwa: {
    dest: 'public',
    disable: !isProd,
  },
  images: {
    domains: [
      'localhost',
      'res.cloudinary.com',
      'aws-wongames.s3.us-west-2.amazonaws.com',
    ],
  },
  future: {
    webpack5: true,
  },
})
