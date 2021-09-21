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
  getTweetMetrics,
  getAccountMetrics,
  getHashtagMetrics
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

/*/125770710/2021-07-01T00:00:00Z/2021-08-31T00:00:00Z
return API.get('/accountmetrics/'+idUser).then(res => res.data);*/
function getAccountMetrics(idUser,fini,ffin) {
  //return API.get('/accountmetrics/'+idUser+'/2021-07-01T00:00:00Z/2021-08-31T00:00:00Z').then(res => res.data);
  return API.get('/accountmetrics/'+idUser+'/'+fini+'/'+ffin).then(res => res.data);

}

function getHashtagMetrics(hashtag) {
  return API.get('/hashtagmetrics/'+hashtag).then(res => res.data);
}