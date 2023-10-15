/*!
    * Start Bootstrap - SB Admin v7.0.7 (https://startbootstrap.com/template/sb-admin)
    * Copyright 2013-2023 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
    */
    // 
// Scripts
// 

let flag =false;
window.addEventListener('DOMContentLoaded', event => {


    const root = document.querySelector('#root');
    // console.log(window.location.hostname);
    const hostname = window.location.hostname;
    console.log(hostname);

    if(flag != true){
        fetch(`http://${hostname}/home`).then(res=>res.text().then((data)=>{
            root.innerHTML = data;
            const datatablesSimple = document.getElementById('datatablesSimple');
            if (datatablesSimple) {
                new simpleDatatables.DataTable(datatablesSimple);
            }
        })
        ).catch((err)=>{
            console.log(err);
        })
        flag =true;
    }

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

});

const webBtn = document.querySelectorAll('.button-link');
if(webBtn){
    for(let el of webBtn){
        el.addEventListener('click',tabchange);
    }
}

let tab =''
function tabchange(e){
    const el = e.target;
    const textCon = el.textContent;
    switch(textCon){
        case 'About':
            showContent('about');
            tab ='about'
            break;
        case 'Story':
            showContent('story');
            tab ='story'

            break;
        case 'Privacy':
             showContent('privacy');
             tab ='privacy'
            break;

    }
}

 async function showContent(url){
    const hostname = window.location.hostname;
    // console.log(hostname);
    await fetch(`http://${hostname}/${url}`).then(async(res)=>{
        
    const data = await res.text();
    if(data =='login'){
        window.location ='/login';
    }else{
        root.innerHTML =data;
        if(document.getElementById(url)){
            // console.log("hello from #$3434343");
            document.getElementById(url).addEventListener('click',postSubmit)
        }
    }
      }).catch((err)=>{
        console.log(err);
    })
    
}

async function postSubmit(e){
    const inpuTitle =document.getElementById('inputTitle').value;
    const inputBody = document.getElementById('inputContent').value;
try{
    if(inpuTitle && inputBody){
        const hostname = window.location.hostname;
        const response =await fetch(`http://${hostname}/${tab}`,{
            method:'POST',
            body:JSON.stringify({title:inpuTitle,body:inputBody}),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        const result = await response.json();
        console.log(result);
    }
}catch(err){
    console.log(err);
}
}




