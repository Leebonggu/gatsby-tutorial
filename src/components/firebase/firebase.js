import firebaseConfig from "./config";
import axios from 'axios';

class Firebase {
  constructor(app) {
    if(!firebaseInstance) {
      app.initializeApp(firebaseConfig);

      this.auth = app.auth();
      this.db = app.firestore();
      this.functions = app.functions();
      this.storage = app.storage();
    }
  }

  async getUserProfile({ userId }) {
    return this.db.collection('publicProfiles').where('userId', '==', userId).get();
  }

  async register({ email, password, username }) {
    const newUser = await this.auth.createUserWithEmailAndPassword(email, password);
    return this.db.collection('publicProfiles').doc(username).set({
      userId: newUser.user.uid,
    })
  }

  subscribeToBookComments({ bookId, onSnapshotCallback }) {
    const bookRef = this.db.collection('books').doc(bookId);
    return this.db.collection('comments')
      .where('book', '==', bookRef)
      .orderBy('dateCreated', 'desc')
      .onSnapshot((snapshot) => {
      onSnapshotCallback(snapshot);
    });
  }

  async login({email, password}) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  async logout() {
    await this.auth.signOut();
  }

  async postComment({text, bookId}) {
    const postCommentCallabe = this.functions.httpsCallable('postComment');
    return postCommentCallabe({
      text,
      bookId
    })
  }
}

let firebaseInstance;

function getFirebaseInstance(app) {
  if(!firebaseInstance && app){
    firebaseInstance = new Firebase(app);
    return firebaseInstance;
  }else if(firebaseInstance){
    return firebaseInstance
  }else{
    return null;
  }
}

export default getFirebaseInstance;
