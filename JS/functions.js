function makeTodo() {
    return stringToHTML(
        `<div class="todo" draggable="true">
            <input class="todo-title">
            <i class="material-icons menu-todo">menu</i>
            <div class="menu">
                <div class="menu-edit">
                    <span>Edit</span>
                    <i class="material-icons edit-todo">edit</i>
                </div>
                <div class="menu-move">
                    <span>Move to ...</span>
                    <i class="material-icons move-todo">arrow_forward_ios</i>
                    <div class="move">
                        <span class="waiting-move">Waiting</span>
                        <span class="on-progress-move">On Progress</span>
                        <span class="finished-move">Finished</span>
                    </div>
                </div>
                <div class="menu-delete">
                    <span>Delete</span>
                    <i class="material-icons delete-todo">delete</i>
                </div>
            </div>
        </div>`
    );
}

function editMenu(el) {
    el.removeAttribute('draggable');
    el.style.cursor = 'text';
    el.firstElementChild.removeAttribute('disabled');
    el.firstElementChild.focus();
    el.firstElementChild.addEventListener('focusout', e => {
        e.target.setAttribute('disabled', 'disabled');
        el.style.cursor = 'grab';
        el.setAttribute('draggable', 'true');
        if (e.target.value == '') {
            el.remove();
        };
    });
    el.firstElementChild.addEventListener('keyup', e => {
        if (e.key === 'Enter') {
            e.target.setAttribute('disabled', 'disabled');
            el.style.cursor = 'grab';
            el.setAttribute('draggable', 'true');
            if (e.target.value == '') {
                el.remove();
            };
        }
    });
}

function stringToHTML(str) {
    const div = document.createElement('div');
    div.innerHTML = str;
    return div.firstElementChild;
}

function moveMenu(el, place) {
    place.insertBefore(el, place.lastElementChild);
}