"use strict"

let container = document.querySelector('.content-section');
let img = document.createElement('img');
let page = Math.floor(Math.random() * (110 - 0)) + 0;
let info = [];
let popUp = document.querySelector('.popUp');
let closeBtn = document.querySelector('.closeBtn');
let overlay = document.querySelector('.overlay');
let btnChange = document.querySelectorAll('.carrousel');
let count = 1;

function getImages(url) {
    try {
        fetch(url).
            then(data => {
                return data.json();
            }).then(data => {
                console.log(data);
                if (data.length === 0) {
                    window.location.reload()
                }
                data.forEach(element => {
                    info.push(element);


                });
            })        
    } catch (error) {
        console.log(error);
    }
}

setTimeout(() => {
    info.forEach(function(element,index){
    let parameter=`id/${element.id}/300/300`
    let url = element.download_url.slice(0, element.download_url.indexOf('id/',0))
    let newUrl = `${url}${parameter}`
        container.insertAdjacentHTML('beforeend', `<img style="background: black url(${newUrl}) center center no-repeat" alt="" id=${element.id} data-item="${index}">`);
    
    })
    let img = document.querySelectorAll('.content-section img');
    img.forEach(img => {
        img.addEventListener('click', (e) => {

            let imgID = e.target;
            togglePopup(imgID)
        })
    })
}, 1000)

function togglePopup(data) {
    let id = data.id
    let item = +data.dataset.item;
    popUp.firstElementChild.setAttribute('data-item', item)
    popUp.firstElementChild.src = `https://picsum.photos/id/${id}/800/600`



    setTimeout(() => {
        popUp.style.animationName = 'fadeIn'
        popUp.style.top = '50px'
        popUp.style.display = 'flex';
        overlay.style.display = 'flex';

        if (item ===0) {
            document.querySelector('.carrousel-left').style.display = 'none' 
        }
        if (item ===11) {
            document.querySelector('.carrousel-right').style.display = 'none' 
        }

    }, 1000)
}

closeBtn.addEventListener('click', ()=>{
    popUp.style.display = 'none';
    overlay.style.display = 'none';
    count = 0;
})

btnChange.forEach(btn => {
    btn.addEventListener('click', (e) => {
        carrousel(e)
    })
})

overlay.addEventListener('click', ()=>{
    popUp.style.display = 'none';
    overlay.style.display = 'none';
    count = 0;
})

function carrousel(item) {
    
    let direction = item.target.dataset.arrow
    let imgItem = +item.target.closest('.popUp').firstElementChild.dataset.item;
 
    if (direction === 'right' && imgItem - count < 11) {     
        document.querySelector('.carrousel-right').style.display = 'block';
        document.querySelector('.carrousel-left').style.display = 'block'
        if(imgItem - count === 10) document.querySelector('.carrousel-right').style.display = 'none'
        count--
        let newID= document.querySelectorAll('.content-section img')[imgItem - count].id;
        popUp.firstElementChild.src = `https://picsum.photos/id/${newID}/800/600`        
        
    }

    if (direction === 'left' && imgItem - count > 0) {
        document.querySelector('.carrousel-right').style.display = 'block';
        document.querySelector('.carrousel-left').style.display = 'block'
        if(imgItem - count === 1) document.querySelector('.carrousel-left').style.display = 'none'

        count++
        let newID = document.querySelectorAll('.content-section img')[imgItem - count].id;
        popUp.firstElementChild.src = `https://picsum.photos/id/${newID}/800/600`

    }
}



getImages(`https://picsum.photos/v2/list?page=${page}&limit=12`)


