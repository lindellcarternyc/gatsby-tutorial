import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../../components/layout'

interface BlogNode {
  id: string
  slug: string
  frontmatter: {
    title: string
    date: string
  }
}

interface BlogQuery {
  allMdx: {
    nodes: BlogNode[]
  }
}

interface BlogPageProps {
  data: BlogQuery
}

const BlogPage = ({ data }: BlogPageProps) => {
  console.log(data)
  return (
    <Layout pageTitle="My Blog Posts">
      {data.allMdx.nodes.map(node => (
        <article key={node.id}>
          <h2>
            <Link to={`/blog/${node.slug}`}>
              {node.frontmatter.title}
            </Link>
          </h2>
          <p>Posted: {node.frontmatter.date}</p>
        </article>
      ))}
    </Layout>
  )
}

export default BlogPage

export const query = graphql`
  query {
    allMdx(sort: {fields: frontmatter___date, order: DESC}) {
      nodes {
        frontmatter {
          date(formatString: "MMMM D, YYYY")
          title
        }
        id
        slug
      }
    }
  }
`