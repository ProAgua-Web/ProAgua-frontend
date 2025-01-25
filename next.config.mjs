/** @type {import('next').NextConfig} */

const nextConfig = {
	async rewrites() {
		return [
			{
				source: '/api/v1/:path*',
				destination: `${process.env.API_URL}/api/v1/:path*`,
			},
			{
				source: '/files/:path*',
				destination: `${process.env.STATIC_FILES_URL}/:path*`
			}
		]
	},
}

export default nextConfig;
