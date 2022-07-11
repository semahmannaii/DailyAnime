import Head from 'next/head'
import { GraphQLClient, gql } from "graphql-request"
import Link from 'next/link'

const graphCMS = new GraphQLClient("https://api-eu-west-2.graphcms.com/v2/cl4117et42lux01xseuma0ktq/master")

const QUERY = gql`
  {
    posts(orderBy: createdAt_DESC) {
      id,
      title,
      slug,
      cover {
        url
      }
      content {
        html
      }
      published,
      author {
        name
      }
    }
  }
`

export async function getStaticProps() {
  const { posts } = await graphCMS.request(QUERY)
  return {
    props: {
      posts
    }
  }
}

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>Daily Anime</title>
        <meta name="anime" content="Daily Anime Blogs" />
      </Head>

      <main className="container px-5 py-12 mx-auto ">
        <div className="flex flex-col text-center">
          {posts.map((post) => (
            <div className="mb-8" key={post.id}>
              <img src={post.cover.url} alt={post.title} className="rounded-lg mx-auto w-2/3" />
              <h2 className="text-lg sm:text-2xl font-medium text-gray-800 mx-auto mt-4 mb-5">{post.title}</h2>
              <button className="mx-auto text-white bg-rose-700 hover:bg-rose-800 py-2 px-5 rounded"><Link href={"/Post/" + post.slug}>Read</Link></button>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
