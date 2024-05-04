import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore, collection, query, getDocs } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDivj8XPpccujc47DfRdPfzy76too_2c38",
  authDomain: "ehab-arandas.firebaseapp.com",
  databaseURL: "https://ehab-arandas-default-rtdb.firebaseio.com",
  projectId: "ehab-arandas",
  storageBucket: "ehab-arandas.appspot.com",
  messagingSenderId: "48185077609",
  appId: "1:48185077609:web:14a964642f14b1620517f8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const projects = collection(db, "projects");

const q = query(collection(db, "projects"));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  createProjectRow(doc);
});

function createProjectRow(data) {
  let project = data.data();


  // - Main Div
  let col = document.createElement('div');
  col.setAttribute('class', 'col-lg-4 col-md-6 col-sm-6');

  let singleWork = document.createElement('div');
  singleWork.setAttribute('class', 'single-work text-center mt-30');

  // Logo Cell
  let workImage = document.createElement('div');
  workImage.setAttribute('class', 'work-image');
  let logo = document.createElement('img');
  logo.setAttribute('src', project.logo);
  logo.setAttribute('alt', 'work');
  workImage.appendChild(logo);
  singleWork.appendChild(workImage);

  // - Overlay Div
  let overlay = document.createElement('div');
  overlay.setAttribute('class', 'work-overlay');

  let workContent = document.createElement('div');
  workContent.setAttribute('class', 'work-content');
  overlay.appendChild(workContent);

  // Title Cell
  let title = document.createElement('h3');
  title.setAttribute('class', 'work-title');
  title.appendChild(document.createTextNode(project.title));
  workContent.appendChild(title);

  // Description Cell
  let description = document.createElement('p');
  description.setAttribute('class', 'work-description');
  description.appendChild(document.createTextNode(project.description));
  workContent.appendChild(description);

  // Packages Cell
  let packagesUl = document.createElement('ul');
  project.packages.forEach((element, index) => {
    if (index <= 5) {
      let packageLi = document.createElement('li');
      packageLi.appendChild(document.createTextNode(element));
      packagesUl.appendChild(packageLi);
    }
  });
  workContent.appendChild(packagesUl);

  singleWork.appendChild(overlay);

  // Modal
  let modal = document.createElement('a');
  modal.setAttribute('data-toggle', 'modal');
  modal.setAttribute('data-target', '#' + data.id);
  modal.appendChild(singleWork);

  let mainModal = document.createElement('div');
  mainModal.setAttribute('class', 'modal fade');
  mainModal.setAttribute('id', data.id);
  mainModal.setAttribute('role', 'dialog');
  mainModal.setAttribute('aria-labelledby', data.id + 'Label');

  let dialogModal = document.createElement('div');
  dialogModal.setAttribute('class', 'modal-dialog');
  dialogModal.setAttribute('role', 'document');

  let contentModal = document.createElement('div');
  contentModal.setAttribute('class', 'modal-content');
  dialogModal.appendChild(contentModal);

  // Header
  let headerModal = document.createElement('div');
  headerModal.setAttribute('class', 'modal-header');

  let logoModal = document.createElement('img');
  logoModal.setAttribute('src', project.logo);
  logoModal.setAttribute('alt', 'work');
  logoModal.setAttribute('width', '50px');
  logoModal.setAttribute('height', '50px');
  headerModal.appendChild(logoModal);

  let titleModal = document.createElement('h5');
  titleModal.setAttribute('class', 'modal-title');
  titleModal.appendChild(document.createTextNode(project.title));
  headerModal.appendChild(titleModal);

  let closeModal = document.createElement('button');
  closeModal.setAttribute('type', 'button');
  closeModal.setAttribute('class', 'close');
  closeModal.setAttribute('data-dismiss', 'modal');
  closeModal.setAttribute('aria-label', 'Close');

  let spanModal = document.createElement('span');
  spanModal.setAttribute('aria-hidden', 'true');
  spanModal.appendChild(document.createTextNode("x"));
  closeModal.appendChild(spanModal);

  headerModal.appendChild(closeModal);
  contentModal.appendChild(headerModal);

  // Body
  let bodyModal = document.createElement('div');
  bodyModal.setAttribute('class', 'modal-body');

  let topModal = document.createElement('div');
  topModal.setAttribute('class', 'row px-3');
  topModal.setAttribute('style', 'justify-content: space-between; align-items: center;');

  let descriptionDivModal = document.createElement('div');
  descriptionDivModal.setAttribute('class', 'col-9');
  let descriptionModal = document.createElement('p');
  descriptionModal.setAttribute('style', 'font-size: 18px; color:black');
  descriptionModal.appendChild(document.createTextNode(project.description));
  descriptionDivModal.appendChild(descriptionModal);
  topModal.appendChild(descriptionDivModal);

  let linksDivModal = document.createElement('div');
  linksDivModal.setAttribute('class', 'col-3');
  let linksModal = document.createElement('div');
  linksModal.setAttribute('class', 'row p-3');
  linksModal.setAttribute('style', 'justify-content: end');
  project.links.forEach(element => {
    let link = document.createElement('a');
    link.setAttribute('href', element.url);
    link.setAttribute('target', '_blank');
    let icon = document.createElement('i');
    icon.setAttribute('class', 'lni-' + element.link);
    link.appendChild(icon);

    linksModal.appendChild(link);
  });
  linksDivModal.appendChild(linksModal);
  topModal.appendChild(linksDivModal);

  bodyModal.appendChild(topModal);

  let packagesModal = document.createElement('div');
  packagesModal.setAttribute('class', 'row p-3');
  project.packages.forEach(element => {
    let packageModal = document.createElement('div');
    packageModal.setAttribute('class', 'col-6 p-1');
    packageModal.appendChild(document.createTextNode(element));
    packagesModal.appendChild(packageModal);
  });
  bodyModal.appendChild(packagesModal);


  let previewsModal = document.createElement('div');
  previewsModal.setAttribute('class', 'row');
  project.previews.forEach(element => {
    let previewModal = document.createElement('div');
    previewModal.setAttribute('class', 'col-lg-4 col-md-6 col-sm-12');

    let img = document.createElement('img');
    img.setAttribute('src', element);

    previewModal.appendChild(img);
    previewsModal.appendChild(previewModal);
  });
  bodyModal.appendChild(previewsModal);

  contentModal.appendChild(bodyModal);

  mainModal.appendChild(dialogModal);

  col.appendChild(mainModal);
  col.appendChild(modal);

  document.getElementById('projects').appendChild(col);
}