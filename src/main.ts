import projectData from './ProjectInfo.json';

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

document.addEventListener('DOMContentLoaded', () => {
  const projects = getAllProjects();
  displayProjects(projects);
});
