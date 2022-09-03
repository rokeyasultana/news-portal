// Spinner

const spinner = document.getElementById('spinner');
spinner.style.display = 'none';


// api url
// const api_url = 
//       "https://openapi.programming-hero.com/api/news/categories";


 fetch('https://openapi.programming-hero.com/api/news/categories').then((data)=>{
    return data.json();
 }).then((completeData)=>{
    // console.log(completeData.data.news_category[2].category_name);

    let data1 ='';
    completeData.data.news_category.map((values)=>{
   data1 += `<div class="">
   <ul  class="menu text-black p-2 rounded-box">
   <li><a>${values.category_name}</a></li>
   
</ul>
 </div> `

    });

    document.getElementById('category').innerHTML = data1
    

 }).catch((err)=>{
    console.log(err);
 })
   


