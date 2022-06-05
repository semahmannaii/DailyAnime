import { GraphQLClient, gql } from "graphql-request"

const graphCMS = new GraphQLClient("https://api-eu-west-2.graphcms.com/v2/cl4117et42lux01xseuma0ktq/master")

const QUERY = gql`
  query Post($slug: String!){
      post(where: {slug: $slug}){
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

const SLUG = gql`
  {
      posts {
          slug
      }
  }
`

export async function getStaticPaths() {
  const { posts } = await graphCMS.request(SLUG)
  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const slug = params.slug
  const data = await graphCMS.request(QUERY, { slug })
  const post = data.post
  return {
    props: {
      post
    }
  }
}

export default function Post({ post }) {
  return (
    <div className="container mx-auto flex flex-col px-12 py-8 items-center justify-center text-center">
      <img src={post.cover.url} alt="" className="mx-auto mb-8 rounded-lg w-96" />
      <h2 className="text-lg sm:text-2xl font-medium text-gray-800 mx-auto mb-8">{post.title}</h2>
      <h4 className="text-sm font-medium text-gray-700 mx-auto mb-5">Published on {post.published}</h4>
      <h3 className="text-base font-medium text-gray-800 mx-auto mb-8">Created By {post.author.name}</h3>
      <p className="leading-relaxed mx-auto mb-5 text-gray-700" dangerouslySetInnerHTML={{ __html: post.content.html }}></p>
    </div>
  )
}