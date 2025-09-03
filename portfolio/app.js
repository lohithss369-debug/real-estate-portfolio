// Your published Google Sheet URL
const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSyaNuAxd6Dq3ngkk-aMiCmeCc4CG9Q5ugh7Mv2ppESsN7UOndn4hyYMcjpYaxHxqRVXeoGv2pHalr4/pubhtml';

window.addEventListener('DOMContentLoaded', () => {
  Tabletop.init({
    key: sheetURL,
    simpleSheet: true,
    callback: function(data, tabletop) {
      const container = document.getElementById('projects');

      data.forEach(project => {
        const card = document.createElement('div');
        card.classList.add('project-card');

        // Determine status class
        let statusClass = project.Status.toLowerCase().replace(' ', '-');

        card.innerHTML = `
          <h2>${project.Title}</h2>
          <p>${project.Location} - ${project.Price}</p>
          <img src="${project.ImageURL}" alt="${project.Title}">
          <p>${project.Description}</p>
          <p>Status: <span class="status ${statusClass}">${project.Status}</span></p>
        `;

        container.appendChild(card);
      });
    }
  });
});
