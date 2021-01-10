import React, { useContext } from 'react';
import { graphql } from 'gatsby';
import BookItem from '../components/bookItem';
import { BookComment } from '../components/common';
import { FirebaseContext } from '../components/firebase';

export default function BookTemplate(props) {
  const { firebase } = useContext(FirebaseContext);
  return (
    <section>
      <BookItem
        bookCover={props.data.book.localImage.childImageSharp.fixed}
        authorName={props.data.book.author.name}
        bookSummary={props.data.book.summary}
        bookTitle={props.data.book.title}
      />
      {!!firebase && (
        <BookComment
          bookId={props.data.book.id}
          firebase={firebase}
        />
      )}
    </section>
  )
}

export const query = graphql`
  query BookQuery($bookId: String!) {
    book(id: {eq: $bookId}) {
      title
      summary
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
`;
