import { getAllProjectTasks } from "./util.js";
import { projects, addProject } from "./projects.js";
import { format, formatDistance, formatRelative, subDays, formatDistanceToNowStrict, isPast, isToday, isYesterday, isTomorrow, isFuture } from 'date-fns'

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
            return yesterdayTasks;
        case 'Today': 
            const todayTasks = allTasks.filter(task => {
                const taskDueDate = new Date(task.dueDate);
                if (isToday(taskDueDate)) return task;
            });
            return todayTasks;
        case 'Tomorrow': 
            const tomorrowTasks = allTasks.filter(task => {
                const taskDueDate = new Date(task.dueDate);
                if (isTomorrow(taskDueDate)) return task;
            });
            return tomorrowTasks;
        case 'Upcoming': 
            const upcomingTasks = allTasks.filter(task => {
                const taskDueDate = new Date(task.dueDate);
                if (isFuture(taskDueDate)) return task;
            });
            return upcomingTasks;
        case 'Anytime':
            const anytimeTasks = allTasks.filter(task => {
                const taskDueDate = new Date(task.dueDate);
                if (isNaN(taskDueDate.getTime())) return task;
            });
            return anytimeTasks;

        default:
            console.log('something is not right');
    }
}

menuItems.forEach(menuItem => {
    menuItem.addEventListener('click', sortTasksOnDueDate);
})