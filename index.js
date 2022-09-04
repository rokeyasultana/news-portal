// Spinner

const spinner = document.getElementById('spinner');
spinner.style.display = 'none';

const toggleSpinner = isLoading => {
   const spinnerField = document.getElementById('spinner');
   if (isLoading === true) {
       spinnerField.classList.remove('d-none')
   }
   else {
       spinnerField.classList.add('d-none')
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
       noData.classList.remove('d-none')
   }
   else {
       noData.classList.add('d-none')
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
   
   <div class="card card-side bg-base-100 shadow-xl">
  <figure><img src=${article.image_url} alt="Movie"></figure>
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
      <button onclick="detailsBtn('${article._id}') class="btn btn-outline" >News Detail</button>
    </div>
  </div>
</div>
       `
       newsParentDiv.appendChild(newsChildDiv);
   })
}