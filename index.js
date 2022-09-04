// Spinner

const spinner = document.getElementById('spinner');
// spinner.style.display = 'none';


const toggleSpinner = isLoading => {
   const spinnerField = document.getElementById('spinner');
   if (isLoading === true) {
       spinnerField.classList.remove('hidden')
   }
   else {
       spinnerField.classList.add('hidden')
   }
};


// category
 fetch('https://openapi.programming-hero.com/api/news/categories').then((data)=>{
    return data.json();
 }).then((completeData)=>{
    // console.log(completeData.data.news_category[2].category_name);

    let data1 ='';
    completeData.data.news_category.map((values)=>{
   data1 += `<div class="">
   <ul  class="menu text-black p-2 rounded-box">
   <li onclick="catagoriesClick('${values.category_id}','${values.category_name}')"> <a >${values.category_name}</a></li>
   
</ul>
 </div> `

    });

    document.getElementById('category').innerHTML = data1
    

 }).catch((err)=>{
    console.log(err);
 })

 // category details
   
const catagoriesClick = (id, name) => {

   toggleSpinner(true)
   const url = `https://openapi.programming-hero.com/api/news/category/${id}`
   fetch(url)
       .then(res => res.json())
       .then(data => displayNews(data.data, name))
       .catch(error => console.log(error));

}

catagoriesClick()

// news details
const displayNews = (articles, name) => {
   toggleSpinner(false)

   // no data found 
   const noData = document.getElementById('no-data');
   if (articles.length === 0) {
       noData.classList.remove('hidden')
   }
   else {
       noData.classList.add('hidden')
   }

   //news count 
   const sortId = document.getElementById('sort')
   const countId = document.getElementById('counting');
   countId.innerHTML = `
   <h5 class="fw-normal border bg-white px-4 py-2 my-4">${articles.length} items found for category <span class="text-danger">${name}</span></h5>
   `
   sortId.classList.remove('d-none')
   const newsParentDiv = document.getElementById('news-field');
   newsParentDiv.innerHTML = '';

   // sorting 
   articles.sort((a, b) => b.total_view - a.total_view);
   articles.forEach(article => {
       const newsChildDiv = document.createElement('div');
       newsChildDiv.classList.add('card', 'mb-3', 'p-3')
       newsChildDiv.innerHTML = `
   <div  class="card lg:card-side bg-base-100 shadow-xl">
  <figure><img  class= "responsive"src=${article.image_url} alt="Movie"></figure>
  <div class="card-body">
    <h2 class="card-title">${article.title}</h2>
    <p>${article.details.slice(0, 300)}...</p>
    <div class="avatar">
    <div class="w-24 rounded-full">
      <img src='${article.author.img}' />
    </div>
  </div>
    <p>${article.author.name ? article.author.name : 'Authors not found'}</p>
    <div class="card-actions justify-end">
    <p>${article.author.published_date ? article.author.published_date : 'Publish date not found'}</p>
    <div class='flex align-items-center gap-1'>
                       <i class="fa-regular fa-eye"></i>
                       <div>
                           <p>${article.total_view ? article.total_view : 'No data found'}</p>
                       </div>
                   </div>
    <div class='d-flex align-items-center text-warning'>
                       <div>
                           <i class="fa-sharp fa-solid fa-star"></i>
                           <i class="fa-sharp fa-solid fa-star"></i>
                           <i class="fa-solid fa-star-half-stroke"></i>
                       </div>
                   </div>
     
   
      <!-- The button to open modal -->
      <label  onclick="details('${article._id}')" for="my-modal-6" class="btn modal-button">News Details</label>
      </div>
  </div>
</div>
       `
       newsParentDiv.appendChild(newsChildDiv);
   })
}
// modal

const details = id => {
   // console.log(id)

   const url = `https://openapi.programming-hero.com/api/news/${id}`;
   fetch(url)
       .then(res => res.json())
       .then(data => displayModal(data.data[0]))
       .catch(error => console.log(error))
}

const displayModal = info => {

   // console.log(info)

   const  modalFieldParent = document.getElementById('modal-body');
   // console.log(modalField);

   modalFieldParent.innerHTM = "";
   const modalFieldChild = document.createElement('div');
   modalFieldChild .classList.add('card')

   modalFieldChild .innerHTML = `
   <div class="card w-96 bg-base-100 shadow-xl">
   <h2 class= "text-rose-500 text-2xl mb-3 text-center">News Details</h2>
   <figure><img src='${info.image_url}' alt= /></figure>
   <div class="avatar">
  <div class="w-24 rounded-full mx-auto">
    <img src='${info.author.img}'/>
  </div>
</div>
   <div class="card-body">
   <p>${info.details.slice(0, 400)}...</p>
     <h2 class="card-title">${info.author.name ? info.author.name : 'Authors not found'}</h2>
     <p>${info.author.published_date ? info.author.published_date : 'Publish date not found'}</p>
     <p> ${info.rating.badge ? info.rating.badge : 'Badge not found'}</p>
     <p></i>
     <i class="fa-sharp fa-solid fa-star"></i>
     <i class="fa-sharp fa-solid fa-star"></i>
     <i class="fa-sharp fa-solid fa-star"></i>
     <i class="fa-solid fa-star-half-stroke"></i></</p>
     
   </div>
 </div>

   `
   modalFieldParent.appendChild( modalFieldChild);
 
}

catagoriesClick('08', 'All News');