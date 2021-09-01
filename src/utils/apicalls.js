import API from './api';

export {
  login,
  getAllPosts,
  getMyPosts,
  postNewPost,
  putExistingPost,
  deletePost,
  postNewUser,
  getTweet,
  getAccount,
  getTweetMetrics
};

function login(username, password) {
  return API.post('/users/signin', {
    username,
    password
  }).then(result => result.data)
  .catch(function(error){
        //TODO When an error status is sent by server (also in the rest of calls!)
  });
}

function getAllPosts() {
  return API.get('/posts').then(res => res.data);
}

function getMyPosts(iduser) {
  return API.get('/posts/all/'+iduser).then(res => res.data);
}

function postNewUser(username, password, fullname, email, role) {
  return API.post('/users', {
    username,
    password,
    fullname,
    email,
    role }).then(result => result.data);
}

function postNewPost(iduser, title, description) {
  return API.post('/posts', {
    iduser,
    title,
    description}).then(result => result.data);
}

function putExistingPost(idpost, title, description) {
  return API.put('/posts/'+idpost, {
    title,
    description}).then(result => result.data);
}

function deletePost(idpost) {
  return API.delete('/posts/'+idpost).then(result => result.data);
}


function getTweet(idTweet) {
  return API.get('/tweets/'+idTweet).then(res => res.data);
}

function getAccount(username) {
  return API.get('/accounts/'+username).then(res => res.data);
}

function getTweetMetrics(idTweet) {
  return API.get('/tweetmetrics/'+idTweet).then(res => res.data);
}
