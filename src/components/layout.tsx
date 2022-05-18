import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'

import {
  container,
  heading,
  navLinks,
  navLinkItem,
  navLinkText,
  siteTitle
} from './layout.module.css'

interface LayoutProps {
  pageTitle?: string
  children: React.ReactNode
}

interface Data {
  site: {
    siteMetadata: {
      title: string
    }
  }
}

const Layout = ({ pageTitle, children }: LayoutProps): JSX.Element => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `) as Data

  return (
    <div className={container}>
      <title>{pageTitle} | {data.site.siteMetadata.title}</title>
      <header className={siteTitle}>{data.site.siteMetadata.title}</header>
      <nav>
        <ul className={navLinks}>
          <li className={navLinkItem}>
            <Link className={navLinkText} to='/'>Home</Link>
          </li>
          <li className={navLinkItem}>
            <Link className={navLinkText} to='/about'>About</Link>
          </li>
          <li className={navLinkItem}>
            <Link to='/blog' className={navLinkText}>Blog</Link>
          </li>
        </ul>
      </nav>
      <main>
        <h1 className={heading}>{pageTitle}</h1>
        {children}
      </main>
    </div>
  )
}

export default Layout