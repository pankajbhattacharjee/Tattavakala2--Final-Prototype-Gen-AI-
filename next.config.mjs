      /** @type {import('next').NextConfig} */
      const nextConfig = {
        images: {
          remotePatterns: [
            {
              protocol: 'https',
              hostname: 'placehold.co',
            },
            {
             protocol: 'https',
             hostname: 'images.unsplash.com',
           },
           {
             protocol: 'https',
             hostname: 'picsum.photos',
           },
           {
             protocol: 'https',
             hostname: 'firebasestorage.googleapis.com',
           },
           { // ADDED THIS ENTRY
             protocol: 'https',
             hostname: 'res.cloudinary.com',
           },
         ],
       },
       typescript: {
         ignoreBuildErrors: true,
       },
       eslint: {
         ignoreDuringBuilds: true,
       },
     };

     export default nextConfig;
