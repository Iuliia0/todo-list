const todoControl = document.querySelector('.todo-control')
const headerInput = document.querySelector('.header-input')
const todoList = document.querySelector('.todo-list')
const todoCompleted = document.querySelector('.todo-completed')
const todoRemove = document.querySelector('.todo-remove')
let toDoData = []

const render = () => {
  console.log(toDoData)
  todoList.innerHTML = ''
  todoCompleted.innerHTML = ''
  toDoData.forEach((item, index) => { 
    const li = document.createElement('li')
    li.classList.add('todo-item')
    li.innerHTML = '<span class="text-todo">' + item.text + '</span>' +
      '<div class="todo-buttons">' +
			'<button class="todo-remove"></button>' +
			'<button class="todo-complete"></button>' +
			'</div>'
      if(item.completed) {
        todoCompleted.append(li)
      } else {
        todoList.append(li)
      }
    localStorage.setItem('todo', JSON.stringify(toDoData))

      li.querySelector('.todo-remove').addEventListener('click', () => {
        toDoData.splice(index, 1)
        render()
      })

      li.querySelector('.todo-complete').addEventListener('click', () => {
        item.completed = !item.completed
        render()
        // меняем свойсво на противоположное
      })
  })
}

  if (localStorage.getItem('todo')) {
    toDoData = JSON.parse(localStorage.getItem('todo'))
    render()
    console.log('true')
  } else {
    console.log('nop')
  }


todoControl.addEventListener('submit', (event) => {
  event.preventDefault()

  let newToDo = {
    text: headerInput.value,
    completed: false
  }



  if (headerInput.value !== '') {
    toDoData.push(newToDo)
  } else {
    alert('введите дело')
  }
  headerInput.value = ''

  render()
})




/* render - будет отрисовывать все todo 
Отрисовывать будет перебором данный массив. Нужно создать массив, в котором мы будет хранить в объекте каждую todo 

При событие submit необходимо добавлять новый объект в массив toDoData
После того, как мы создали объект, его необходимо добавить в массив

  todoList.innerHTML = ''
  todoCompleted.innerHTML = '' в начале функции render очищает список полностью. Если так не сделать, то все объекты будут дублироваться при записи нового дела. 
*/