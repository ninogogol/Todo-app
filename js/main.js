// Get reference to the text input
const newTodoInput = document.getElementById('new-todo-item')

// Get reference to the submit button
const submitBtn = document.getElementById('submitBtn')

// Get reference to the container element where the to-do items will be displayed
const todoListContainer = document.querySelector('#container')

// Update the item count
const itemCount = document.getElementById('item-count')

// Create an empty array to store the new to-do items
const newTodos = []

// Create a counter variable to keep track of the to-do item IDs
let counter = 0


// Create an array of pre-existing to-do items
const todosArray = [
    {
        id: 'todoItem_0',
        text: 'Complete online JavaScript course',
        isPriority: true
    },
    {
        id: 'todoItem_1',
        text: 'Jog around the park 3x',
        isPriority: true
    },
    {
        id: 'todoItem_2',
        text: '10 minutes meditation',
        isPriority: false
    },
    {
        id: 'todoItem_3',
        text: 'Read for 1 hour',
        isPriority: true
    },
    {
        id: 'todoItem_4',
        text: 'Pick up groceries',
        isPriority: false
    },
    {
        id: 'todoItem_5',
        text: 'Complete Todo App on Frontend Mentor',
        isPriority: true
    }
]

// Loop through the pre-existing to-do items and call the renderHtmlContent function for each item
todosArray.forEach(todoItem => {
    renderHtmlContent(todoItem)
    newTodos.push(todoItem)
})

// Add an event listener to the submit button to create a new to-do item when clicked
submitBtn.addEventListener("click", handleClick)

// Add an event listener to the new-todo-item input field to create a new to-do item when the ENTER key is pressed
newTodoInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        handleClick(e)
    }
})



/*
    This function handleClick is an event handler that is called when the user clicks on the submit button 
    or press the "Enter" key. 
    The function is responsible for creating a new to-do item and adding it to the list.
*/
function handleClick(e) {
    
    e.preventDefault()

    // Get the value entered in the input field
    const todoItemValue = document.getElementById('new-todo-item').value

    // Check if the value entered is not an empty string
    if(todoItemValue === '') {
        alert('Please enter a valid todo item')
        return ''
    }

    // Get the checked state of the priority checkbox
    const checkboxValue = document.getElementById('priority').checked

    // Create a new to-do item object
    const newTodoItem = {
        id: 'todoItem_' + counter,
        text: todoItemValue,
        isPriority: checkboxValue
    }

    // Call the renderHtmlContent function to add the new to-do item to the list
    renderHtmlContent(newTodoItem)


    // Add the new to-do item to the newTodos array
    newTodos.push(newTodoItem)

    // Clear the input field and checkbox
    document.getElementById('new-todo-item').value = ''
    document.getElementById('priority').checked = false

    const itemCount = document.getElementById('item-count')
    itemCount.innerHTML = `${newTodos.length} items left`

     // Call the filterAll function to clear the current to-do items in the list and re-render all items
     filterAll()

}


// Function to create and append the HTML elements for each to-do item
function renderHtmlContent(todoItem) {

    // Create a div element to wrap the to-do item
    const todoWrapper = document.createElement('div')

    // Create a form element to hold the checkbox and label
    const form = document.createElement('form')
    form.classList.add('form')

    // Create a div element to hold the checkbox
    const inputWrapper = document.createElement('div')

    // Create a label element to display the to-do text
    const todoInputLabel = document.createElement('label')
    todoInputLabel.setAttribute('for', `newTodoItem_${counter}`)
    todoInputLabel.setAttribute('class', 'todoInputItem')

    // Create a checkbox input element
    const todoInputCheckbox = document.createElement('input')
    todoInputCheckbox.setAttribute('type', 'checkbox')
    todoInputCheckbox.classList.add('checkbox')
    todoInputCheckbox.id = `newTodoItem_${counter}`
    
    // Create an image element to delete the to-do item
    const deleteX = document.createElement('img')
    deleteX.id = `deleteX_${counter}`
    deleteX.setAttribute('src', 'images/icon-cross.svg')

    // Check the class of the container and add appropriate classes to the to-do wrapper
    if(todoListContainer.classList.contains('container-light-mode')) {
        todoWrapper.classList.add('todoItemWrapper', 'border-bottom-light')
        todoInputLabel.classList.add('color-light-mode')
    } else {
        todoWrapper.classList.add('todoItemWrapper', 'border-bottom-dark')
        todoInputLabel.classList.add('color-dark-mode')
    }

    // Check if the to-do item is marked as priority and add the 'priority' class if true
    if(todoItem.isPriority) {
        todoInputLabel.textContent = `Priority: ${todoItem.text}`
        todoInputLabel.classList.add('priority')
    } else {
        todoInputLabel.textContent = todoItem.text
    }
    
    // Prepend the HTML element to the container and append each other elemnts in the appropriate order
    todoListContainer.prepend(todoWrapper)
    todoWrapper.append(form, deleteX)
    form.append(inputWrapper, todoInputLabel)
    inputWrapper.append(todoInputCheckbox)

    // Add an event listener to the deleteX image to remove the to-do item when clicked
    deleteX.addEventListener("click", (e) => {
        e.preventDefault()
        todoWrapper.remove()
        newTodos.splice(newTodos.indexOf(todoItem), 1)

        const itemCount = document.getElementById('item-count')
        itemCount.innerHTML = `${newTodos.length} items left`

        if(priorityBtn.classList.contains('active') || completedBtn.classList.contains('active')) {
            itemCount.innerHTML = ''
        }
    })

    // Add an event listener to the to-do wrapper to toggle the checkbox status when clicked
    todoWrapper.addEventListener("click", () => {
        todoInputCheckbox.checked = !todoInputCheckbox.checked
        if(todoInputCheckbox.checked) {
            todoInputLabel.style.textDecoration = 'line-through'
            todoInputLabel.classList.add('completed')
        
        } else {
            todoInputLabel.style.textDecoration = null
            todoInputLabel.classList.remove('completed')
        }
        
    })

    counter ++
}

// Get the buttons for filtering the to-do items
const priorityBtn = document.getElementById('priority-items')
const allItemsBtn = document.getElementById('all-items')
const completedBtn = document.getElementById('completed-items')
const clearCompletedBtn = document.getElementById('clear-completed')


// Add event listener to the all items button
allItemsBtn.addEventListener("click", () => {

    // Get all the to-do items
    const todoItems = document.querySelectorAll('.todoItemWrapper')

    // Set the display property of all the items to null
    todoItems.forEach(item => {
        item.style.display = null
    })
    // Add active class to the all-items button
    allItemsBtn.classList.add('active')
    // Remove active class from the other buttons
    priorityBtn.classList.remove('active')
    completedBtn.classList.remove('active')

    itemCount.innerHTML = `${newTodos.length} items left`

})

// Add event listener to the priority-items button
priorityBtn.addEventListener("click", () => {
    const todoItems = document.querySelectorAll('.todoInputItem')
    todoItems.forEach(item => {
        if(!item.classList.contains('priority')) {
            item.parentNode.parentNode.style.display = 'none'
        }else{
            item.parentNode.parentNode.style.display = null
        }
    })
    priorityBtn.classList.add('active')
    allItemsBtn.classList.remove('active')
    completedBtn.classList.remove('active')

    itemCount.innerHTML = ''
})

// Add event listener to the completed-items button
completedBtn.addEventListener("click", () => {
    const todoItems = document.querySelectorAll('.todoInputItem')
    todoItems.forEach(item => {
        if(!item.classList.contains('completed')) {
            item.parentNode.parentNode.style.display = 'none'
        }else{
            item.parentNode.parentNode.style.display = null
        }
    })
    completedBtn.classList.add('active')
    allItemsBtn.classList.remove('active')
    priorityBtn.classList.remove('active')

    itemCount.innerHTML = ''

})


// Add event listener to the ClearCompleted items button
clearCompletedBtn.addEventListener("click", () => {
    const items = document.querySelectorAll('.todoInputItem')
    items.forEach(item => {
        if(item.classList.contains('completed')) {
            item.parentNode.parentNode.remove()
            newTodos.splice(newTodos.indexOf(items), 1)
        }
    })
        if (priorityBtn.classList.contains('active') || completedBtn.classList.contains('active')) {
            itemCount.innerHTML = ''
        } else {
            const itemCount = document.getElementById('item-count')
            itemCount.innerHTML = `${newTodos.length} items left`        
        }
}) 


// Function to filter all to-do items
function filterAll() {
    // Clear the current to-do items in the list
    todoListContainer.innerHTML = ''

     // Re-render all to-do items by calling the renderHtmlContent function for each item in the newTodos array
    newTodos.forEach(todoItem => {
        renderHtmlContent(todoItem)
    })

    allItemsBtn.classList.add('active')
    // Remove active class from the other buttons
    priorityBtn.classList.remove('active')
    completedBtn.classList.remove('active')

}

// Get the icon for switching to light mode
const iconSun = document.getElementById('sun-icon')

// Add event listener to the icon
iconSun.addEventListener("click", changeModeToLight)


// Get the icon for switching to dark mode
const iconMoon = document.getElementById('moon-icon')

// Add event listener to the icon
iconMoon.addEventListener("click", changeModeToDark)

// Function to switch to light mode
function changeModeToLight() {
    iconMoon.style.display = 'block'
    iconSun.style.display = 'none'

// Switch the class of the dark mode elements to light mode
    document.querySelector('.dark-mode').classList.toggle('light-mode', true)
    document.querySelector('.bg-image-dark').classList.toggle('bg-image-light', true)
    todoListContainer.classList.toggle('container-light-mode', true)

    document.querySelectorAll('.bg-color-dark-mode').forEach(item => {
        item.classList.toggle('bg-color-light-mode', true)
    })

    document.querySelectorAll('.color-dark-mode').forEach(item => {
        item.classList.toggle('color-light-mode', true)
    })

    document.querySelectorAll('.color-dark-mode').forEach(item => {
        item.classList.toggle('color-light-mode', true)
    })

    document.querySelectorAll('.border-bottom-dark').forEach(item => {
        item.classList.toggle('border-bottom-light', true)
    })
}

// Function to switch to dark mode
function changeModeToDark() {
    iconSun.style.display = 'block'
    iconMoon.style.display = 'none'

    // Switch the class of the dark mode elements to dark mode

    document.querySelector('.dark-mode').classList.toggle('light-mode', false)
    document.querySelector('.bg-image-dark').classList.toggle('bg-image-light', false)
    todoListContainer.classList.toggle('container-light-mode', false)


    document.querySelectorAll('.bg-color-dark-mode').forEach(item => {
        item.classList.toggle('bg-color-light-mode', false)
    })

    document.querySelectorAll('.color-dark-mode').forEach(item => {
        item.classList.toggle('color-light-mode', false)
    })

    document.querySelectorAll('.color-dark-mode').forEach(item => {
        item.classList.toggle('color-light-mode', false)
    })

    document.querySelectorAll('.border-bottom-dark').forEach(item => {
        item.classList.toggle('border-bottom-light', false)
    })
}