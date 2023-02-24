const butter = require('buttercms')('f1c4515bc16329a31dd86ae623f956eb354f5a3d');

async function fetchPage(){
    const page = await butter.page.retrieve('*', "home-page").then(res => res.data.data);
    const menuItems = await butter.content.retrieve(['menu']).then(res=>res.data.data);
    const { testimonial } = await butter.content.retrieve(['testimonial']).then(res=>res.data.data);

    let title = document.querySelector('title');
    title.innerText = page.fields.seo.title;
 
    (function Homapage() {

        let menu = menuItems.menu[0];

        const featureList = document.querySelector('.features');
        const menuList = document.querySelector('.list');
        const testimonials = document.querySelector('.testimonials');

        menu.menu_items.forEach(item => {
            let List =    `<li class="nav-item">
            <a class="nav-link" href="${item.url}">${item.label}</a>
          </li>`
          menuList.insertAdjacentHTML('afterbegin', List)
        })

       let navMarkup = `<div class="container-fluid">
       <a class="navbar-brand" href="">${menu.menu}</a>
       <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
         <span class="navbar-toggle-icon"></span>
       </button>
        </div>`

      
        document.querySelector('.navbar').insertAdjacentHTML('afterbegin',navMarkup);


        page.fields.body.forEach(data => {
            if(data.type == "hero") {
              let heroMarkUp = `<div id="${data.fields.scroll_anchor_id}" class="hero-section mt-5">
              <div class="container">
                  <div class="row align-items-center">
                      <div class="col-xl-6 col-lg-6 col-md-10">
                          <div class="hero-content">
                              <h1>${data.fields.headline}</h1>
                              <p>${data.fields.subheadline}</p>
                              <a
                                href="${data.fields.button_url}"
                                target="_blank"
                                class="btn btn-primary btn-hover btn-main"
                                
                              >
                                ${data.fields.button_label}
                              </a>
                      </div>
                  </div>
                  <div class="col-xxl-6 col-xl-6 col-lg-6">
                      <div class="hero-image text-center text-lg-end">
                          <img src="${data.fields.image}" alt="" />
                      </div>
                  </div>
              </div>
          </div>`
         
          let hero = document.querySelector('.hero');
          hero.innerHTML = heroMarkUp;
          
            }

            
            //Lopp features 
              
            if (data.type == "features"){
                console.log(data, 'datarid');
                
                data.fields.features.forEach(feature => {
                let FList =  `<div class="col-lg-6 col-md-6">
                <div class="single-feature">
                    <div class="feature-icon">
                       <img src="${feature.icon}" alt=""/>
                    </div>
                    <div class="feature-content">
                        <h5>
                            
                          ${feature.headline}
                        </h5>
                        <p>
                            ${feature.description}
                        </p>
                    </div>
                </div>
            </div>`
                   
                  featureList.insertAdjacentHTML('afterbegin', FList)
               })
           
                let featureMarkUp = `<div class="col-lg-5 col-md-10">
                            <div class="section-title mb-60">
                                <h3 class="mb-20">
                                    ${data.fields.headline}
                                </h3>
                                <p>
                                    ${data.fields.subheadline}
                                </p>
                            </div>
                        </div>`
            document.querySelector('.feature').insertAdjacentHTML('afterbegin',featureMarkUp);
            }
        });

        // for testimonial
        testimonial.forEach(info => {

            let TList = `<div class="col-4">
                <div class="card" style="width: 20rem">
                <p class="card-text">${info.content}</p>
                <div class="card-body">
                  <img src="${info.image}" class="card-img-top" alt="...">
                  <h5 class="card-title style="font-size: 2.5rem;"">${info.fullname}</h5>
                  <h4 class="card-title" style="color:lightgray; font-size: 0.9rem;">${info.occupation}</h4>
                </div>
              </div>
            </div>`
             testimonials.insertAdjacentHTML('afterbegin', TList)
        })

        let testimonialMarkup = `<h4 style="margin: 9px">Testimonials</h4>
        <hr>`
        document.querySelector('.t-header').insertAdjacentHTML('afterbegin', testimonialMarkup); 
    })();
    
}

fetchPage();
