import {projects, Project, setGlobalActiveProject} from "./projects.js";
import { Task } from "./tasks.js";

export function populateStorage() {
    localStorage.clear();
    localStorage.setItem('projects', JSON.stringify(projects));
}

function loadProjectsInLclStorage() {
    if(localStorage.getItem('projects') && projects !== {}) {
        const projectsInLocalStorage = JSON.parse(localStorage.getItem('projects'));
        for (const project in projectsInLocalStorage) {
            const loadedProject = new Project(projectsInLocalStorage[project].name);
            projects[loadedProject.name] = loadedProject;
            setGlobalActiveProject(loadedProject.name)
            Project.addNewProjectToMenu(loadedProject);
            Project.updateDomWithProject();
            
            const loadedProjectTasks = projectsInLocalStorage[project].tasks;
            loadedProjectTasks.forEach(task => {
                const newTask = new Task(task.name, task.description, task.priority, task.dueDate);
                loadedProject.tasks.push(newTask);
                newTask.isCompleted = task.isCompleted;
                newTask.project = loadedProject.name;
            })
        }
        Project.updateDomWithProject();
    }
}
document.addEventListener('DOMContentLoaded', loadProjectsInLclStorage);