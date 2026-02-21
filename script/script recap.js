const header = document.getElementById('header');
// const header = document.querySelector('#header')
console.log(header.innerText);
// header.innerHTML = "I have changed it"

// const para = document.getElementsByClassName('text')
// console.log(para);

const para = document.querySelectorAll('.text')
// console.log(para[0].innerText= 'okay');

// para[0].classList.add('hidden')
// para[1].classList.add('highlight')



const btn = document.getElementById('handle')
btn.addEventListener('click', function () {
    // para[0].classList.remove('hidden','highlight')
    para[1].classList.add('highlight', 'bold')
})


// for (let p of para) {
//     p.style.color = 'red'
// }

let box = document.getElementById('box');
box.innerHTML = "<h1>Hello</h1>"


let container = document.getElementById('container')
console.log(container);

const card = document.createElement('div')
// container.appendChild(div)

let name = "Jodu"

card.innerHTML = `<p>my name is ${name}</p>
                    <button>Click</button>`

// container.appendChild(div)

const delegation = document.getElementById('body');

delegation.addEventListener('click', function(event){
    console.log(event.target.parentNode.parentNode);
})


let arr = [1,2,5,7,5];
// [1,2,5,5]

const filterMethod = arr.filter(i=> i != 7);
console.log(filterMethod);
arr = filterMethod
console.log("arr", arr);