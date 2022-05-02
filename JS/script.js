const todoCard = document.querySelectorAll('.todo');
const addTodo = document.querySelectorAll('.add-todo');
const todoList = document.querySelectorAll('.todo-list');
const trash = document.querySelector('.trash');

document.addEventListener('DOMContentLoaded', () => document.dispatchEvent(new Event('refreshselector')));
document.addEventListener('refreshselector', () => {
    
    /* ===== ===== Menu Section ===== ===== */

    const menuTodo = document.querySelectorAll('.menu-todo'); 
    menuTodo.forEach(menu => {
        
        // Stop Propogation Menu
        menu.addEventListener('click', e => {
            e.stopPropagation();
            menu.nextElementSibling.addEventListener('click', el => el.stopPropagation());
    
            // On Focus Menu
            menu.nextElementSibling.style.display = 'flex';
        });
    
        // On Lost Focus Menu
        menu.nextElementSibling.addEventListener('mouseleave', () => {
            menu.parentElement.addEventListener('mouseleave', () => {
                menu.nextElementSibling.style.display = 'none';
            });
        });
        menu.nextElementSibling.addEventListener('click', () => {
            menu.nextElementSibling.style.display = 'none';
        });
    
        // Edit Menu
        document.querySelectorAll('.menu-edit').forEach(edt => {
            edt.addEventListener('click', e => {
                editMenu(e.target.parentElement.parentElement);
            });
        });

        // Move Menu
        document.querySelectorAll('.waiting-move').forEach(waitMove => {
            waitMove.addEventListener('click', e => {
                moveMenu(
                    e.target.parentElement.parentElement.parentElement.parentElement, 
                    document.querySelector('.waiting')
                );
            })
        });
        document.querySelectorAll('.on-progress-move').forEach(progMove => {
            progMove.addEventListener('click', e => {
                moveMenu(
                    e.target.parentElement.parentElement.parentElement.parentElement, 
                    document.querySelector('.on-progress')
                );
            })
        });
        document.querySelectorAll('.finished-move').forEach(finMove => {
            finMove.addEventListener('click', e => {
                moveMenu(
                    e.target.parentElement.parentElement.parentElement.parentElement, 
                    document.querySelector('.finished')
                );
            })
        });

        // Delete Menu
        document.querySelectorAll('.menu-delete').forEach(del => {
            del.addEventListener('click', e => {
                e.target.parentElement.parentElement.remove();
            });
        });

        // Drag Adressing
        todoCard.forEach(todo => {
            todo.addEventListener('mouseenter', () => {
                dragAbility(todo);
            });
        });
        
    });
    
});

/* ===== ===== Add Section ===== ===== */

// Add Todo
addTodo.forEach(add => {
    add.addEventListener('click', e => {
        const todo = makeTodo()
        e.target.parentElement.insertBefore(todo, e.target.parentElement.lastElementChild);
        document.dispatchEvent(new Event('refreshselector'));
        editMenu(todo);
        dragAbility(todo);
    });
});

/* ===== ===== On Drag Section ===== ===== */

function dragAbility(todo) {
    todo.addEventListener('dragstart', () => {
        todo.classList.add('dragging');
        todo.style.cursor = 'grabbing';
    });
    todo.addEventListener('dragend', () => {
        todo.classList.remove('dragging');
        todo.style.cursor = 'grab';
    });

    todoList.forEach(container => {
        
        container.addEventListener('dragover', e => {
            container.classList.add('dragover');
            e.preventDefault();
            const draggable = document.querySelector('.dragging');
            container.insertBefore(draggable, container.lastElementChild);
        });
        container.addEventListener('dragleave', () => {
            container.classList.remove('dragover');
        });
        container.addEventListener('drop', () => {
            container.classList.remove('dragover');
        });

    });

    trash.addEventListener('dragover', e => {
        trash.classList.add('dragover');
        e.preventDefault();
        const draggable = document.querySelector('.dragging');
        draggable.style.display = 'none';
        trash.addEventListener('drop', () => {
            draggable.remove();
        });
    });
    trash.addEventListener('drop', () => {
        trash.classList.remove('dragover');
    });
    trash.addEventListener('dragleave', () => {
        trash.classList.remove('dragover');
        document.querySelector('.dragging').style.display = 'flex';
    });
}