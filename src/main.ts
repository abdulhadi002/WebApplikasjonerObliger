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

        const projectSection = document.querySelector('.all-projects');
        if (projectSection) {
            const article = document.createElement('article');
            article.innerHTML = `
                <img src="${newProject['Image-scr']}" alt="${newProject['project-name']} image">
                <p>${newProject.description}</p>
                <a href="#">${newProject['project-name']}</a>
            `;

            projectSection.appendChild(article);

            form.reset();
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const projects = getAllProjects();
    displayProjects(projects);
    handleFormSubmit();
});


function loadFromJSON() {
    fetch("static/data.json")
    .then((Response) => {
        return Response.json();
    })

    .then((data) => {
        const thisID = document.getElementById("json");
        console.log(data);

        for (const projecter of data) {
            const element = document.createElement("p");
            element.textContent = `${thisID}`;
        }
    })
}