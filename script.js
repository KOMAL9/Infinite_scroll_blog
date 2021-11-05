const postsContainer = document.getElementById('posts-container');
const loader = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 6;
let page = 1;

// Fetch posts from (fakeREST) API
async function getPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );

  const data = await res.json();
  console.log(data);
  return data; // this is also a promise
  
}
 


// Show posts in DOM
async function showPosts() {
  const posts = await getPosts();
  console.log(posts);

  posts.forEach(post => {

    const postEl = document.createElement('div');
    postEl.classList.add('post');

    postEl.innerHTML = `
      <div class="number">${post.id}</div>
      <div class="post-info">
        <h2 class="post-title">${post.title}</h2>
        <p class="post-body">${post.body}</p>
      </div>
    `;
    postsContainer.appendChild(postEl);
  });
}


// Show loader & fetch more posts when user scrolls to bottom of screen

function showLoading()
{
  loader.classList.add('show');
  // loader show class is removed after a second
  setTimeout( () => 
  {
    loader.classList.remove('show');
    setTimeout(() => {
       page++;
       showPosts();
      }, 300);
    },
  1000
  );

}

//we can only filter by posts already in the DOM
// Filter posts by input
function filterPosts(e) 
{
  const term = e.target.value.toLowerCase();
   /* Could have been uppercase too, just for uniformity */
  const posts = document.querySelectorAll('.post');

  posts.forEach(post => {

    const title = post.querySelector('.post-title').innerText.toLowerCase(); 
   
    const body = post.querySelector('.post-body').innerText.toLowerCase();
     
    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = 'flex';
    } else {
      post.style.display = 'none';
     
    }
  });
}


/*---------------------------------------------------------------------------------------------*/

// Show initial posts
showPosts();
 

//event listener on window -- listen for scroll 

window.addEventListener('scroll', () => {
  window.onscroll = function(ev) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        showLoading();
    }
};
   /* copied from stack overflow */
   /* alternate -> */
  /* const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  } */

});


filter.addEventListener('input', filterPosts);
