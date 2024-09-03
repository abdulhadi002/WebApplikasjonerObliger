import { error } from 'console';
import projectData from './ProjectInfo.json';

const projects_list: Project[] = [];

interface Project {
  id: number;
  'project-name': string;
  description: string;
  'Image-scr': string;
}

function getAllProjects(): Project[] {
  return projectData.project;
}

function displayProjects(projects: Project[]): void {
  const projectSection = document.querySelector('.all-projects');

  if (projectSection) {
    projects.forEach((project) => {
      const article = document.createElement('article');
      article.innerHTML = `
        <img src="${project['Image-scr']}" alt="${project['project-name']} image">
        <p>${project.description}</p>
        <a href="#">${project['project-name']}</a>
      `;
      projectSection.appendChild(article);
    });
  }
}

function handleFormSubmit(): void {
    const form = document.getElementById('create-project-form') as HTMLFormElement;

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const projectDescription = (document.getElementById('description') as HTMLTextAreaElement).value;

        const newProject: Project = {
            id: Date.now(),
            'project-name': (form.elements.namedItem("project-name") as HTMLInputElement)?.value,
            description: projectDescription,
            'Image-scr': 'Image'
        };

        projects_list.push(newProject);
        displayProjects([newProject]);
        form.reset();
    });
}

function loadFromJSON() {
    fetch("static/data.json")
    .then((response) => response.json())
    .then((data: Project[]) => {
        const JSONID = document.getElementById("json");
        console.log(data);

        if (JSONID) {
            data.forEach((project) => {
                const projecter = document.createElement("p");
                projecter.textContent = project['project-name'];
                JSONID.appendChild(projecter);
            });
        }
    })
    .catch((error) => {
        console.error("Can't load data from JSON: ", error);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const projects = getAllProjects();
    displayProjects(projects);
    handleFormSubmit();
});
