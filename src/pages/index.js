import React from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";
import BookItem from '../components/bookItem';
import styled from 'styled-components';

const LinkButton = styled.div`
  text-align: right;
  a {
    padding: 8px;
    background-color: rebeccapurple;
    color: white;
    border-radius: 5px;
    text-decoration: none;
  }

`

const IndexPage = (props) => {
  return (
    <section>
      {props.data.allBook.edges.map(edge => (
        <BookItem
          key={edge.node.id}
          authorName={edge.node.author.name}
          bookCover={edge.node.localImage.childImageSharp.fixed}
          bookSummary={edge.node.summary}
          bookTitle={edge.node.title}
        >
          <LinkButton>
            <Link to={`/book/${edge.node.id}`}>
              Join Conversation
            </Link>
          </LinkButton>
        </BookItem>
      ))}
    </section>
  );
};

export const query = graphql`
  {
    allBook {
      edges {
        node {
          summary
          title
          localImage {
            childImageSharp {
              fixed(width: 200) {
                ...GatsbyImageSharpFixed
              }
            }
          }
          id
          author {
            name
          }
        }
      }
    }
  }
`;

export default IndexPage
