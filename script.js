const addList = document.getElementById('addList')
const add = document.getElementById('add')
const taskList = document.querySelector('.taskList')

// gets value from local storage
let listData = JSON.parse(localStorage.getItem('list')) || []

add.addEventListener('click', function () {
    addListValue = addList.value.trim() || ''

    listData.push({
        id: Date.now(),
        list: addListValue
    })
    addList.value = ''
    saveAndRender()
})

function saveAndRender() {
    localStorage.setItem('list', JSON.stringify(listData))
    createList()

}

function createList() {
    taskList.innerHTML = ''

    listData.forEach(function (item, index) {
        let div = document.createElement('div')
        div.classList.add('task')

        let input = document.createElement('input')
        input.setAttribute('type', 'checkbox')

        let p = document.createElement('p')
        p.textContent = `${item.list}`

        let button = document.createElement('button')
        button.textContent = 'X'

        div.append(input, p, button)
        taskList.appendChild(div)
        // delets the list when clicked using splice and update value in local storage
        button.addEventListener('click', function () {
            listData.splice(index, 1)
            saveAndRender()
        })

        input.addEventListener('change', function () {
            if (input.checked) {
                p.style.textDecoration = 'line-through'
            } else {
                p.style.textDecoration = 'none'
            }
        })
    })
}

createList()

