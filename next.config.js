module.exports = {
    reactStrictMode: false,
    // serverRuntimeConfig: {
    //     NEXT_PUBLIC_WEBSOCKET_URL: process.env.NEXT_PUBLIC_WEBSOCKET_URL, 
    //     NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL
    // },
    //   publicRuntimeConfig: {
    //     NEXT_PUBLIC_WEBSOCKET_URL: process.env.NEXT_PUBLIC_WEBSOCKET_URL, 
    //     NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    // },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'ham-storage-faces.s3.amazonaws.com',
            port: '',
            pathname: '**',
          },
        ],
      },
}
