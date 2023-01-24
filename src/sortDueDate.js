import { getAllProjectTasks } from "./util.js";
import { projects, addProject, contentHolder } from "./projects.js";
import { isPast, isToday, isYesterday, isTomorrow, isFuture } from 'date-fns'

const mainMenu = document.querySelector('.main-menu');
const overdueMenuItem = mainMenu.querySelector('.overdue');
const yesterdayMenuItem = mainMenu.querySelector('.yesterday');
const todayMenuItem = mainMenu.querySelector('.today');
const tomorrowMenuItem = mainMenu.querySelector('.tomorrow');
const upcomingMenuItem = mainMenu.querySelector('.upcoming');
const anytimeMenuItem = mainMenu.querySelector('.anytime');
const menuItems = [overdueMenuItem, yesterdayMenuItem, todayMenuItem, tomorrowMenuItem, upcomingMenuItem, anytimeMenuItem];
export const menuNames = ['Overdue', 'Yesterday', 'Today', 'Tomorrow', 'Upcoming', 'Anytime']

function sortTasksOnDueDate(e) {
    const allTasks = getAllProjectTasks(projects);
    const selectedMenuItem = e.currentTarget.textContent;

    switch (selectedMenuItem) {
        case 'Overdue':
            const overdueTasks = allTasks.filter(task => {
                const taskDueDate = new Date(task.dueDate);
                if (!isToday(taskDueDate) && isPast(taskDueDate)) return task;
            });
            addProject('Overdue', overdueTasks);
            break;
        case 'Yesterday': 
            const yesterdayTasks = allTasks.filter(task => {
                const taskDueDate = new Date(task.dueDate);
                if (isYesterday(taskDueDate)) return task;
            });
            addProject('Yesterday', yesterdayTasks);
            break;
        case 'Today': 
            const todayTasks = allTasks.filter(task => {
                const taskDueDate = new Date(task.dueDate);
                if (isToday(taskDueDate)) return task;
            });
            addProject('Today', todayTasks);
            break;
        case 'Tomorrow': 
            const tomorrowTasks = allTasks.filter(task => {
                const taskDueDate = new Date(task.dueDate);
                if (isTomorrow(taskDueDate)) return task;
            });
            addProject('Today', tomorrowTasks);
            break;
        case 'Upcoming': 
            const upcomingTasks = allTasks.filter(task => {
                const taskDueDate = new Date(task.dueDate);
                if (isFuture(taskDueDate)) return task;
            });
            addProject('Upcoming', upcomingTasks);
            break;
        case 'Anytime':
            const anytimeTasks = allTasks.filter(task => {
                const taskDueDate = new Date(task.dueDate);
                if (isNaN(taskDueDate.getTime())) return task;
            });
            addProject('Anytime', anytimeTasks);
            break;
        default:
            console.log('something is not right');
    }
}

menuItems.forEach(menuItem => {
    menuItem.addEventListener('click', sortTasksOnDueDate);
})

export function updateDomWithSortedTasks(name, taskList) {
    contentHolder.innerHTML = '';
    const projectDiv = document.createElement('div');
    projectDiv.classList.add(`sorted`, `sorted-${name}`);
    const template = `
        <h3>${name}</h3>
        <ul class="sorted-tasks"></ul>    
    `;
    projectDiv.insertAdjacentHTML('afterbegin', template);
    const taskUL = projectDiv.querySelector('.sorted-tasks');
    taskList.forEach(taskElem => {
        taskUL.insertAdjacentHTML('beforeend', taskElem.getTaskCardElem);
        setTimeout(() => {
            taskElem.attachEventListener();
            taskElem.checkCompletion();
        }, 5)
    })
    contentHolder.insertAdjacentElement('afterbegin', projectDiv);
}
