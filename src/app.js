const galleryItems = [
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg",
    description: "Hokkaido Flower",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg",
    description: "Container Haulage Freight",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg",
    description: "Aerial Beach View",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg",
    description: "Flower Blooms",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg",
    description: "Alpine Mountains",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg",
    description: "Mountain Lake Sailing",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg",
    description: "Alpine Spring Meadows",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg",
    description: "Nature Landscape",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg",
    description: "Lighthouse Coast Sea",
  },
];

// Ссылки

const refs = {
  galleryList: document.querySelector("ul.js-gallery"),
  lightbox: document.querySelector("div.lightbox"),
  btn: document.querySelector('[data-action="close-lightbox"]'),
  overlay: document.querySelector(".lightbox__overlay"),
  lightboxImage: document.querySelector(".lightbox__image")
};

// Слушатели

refs.galleryList.addEventListener("click", onClickHandler);
refs.btn.addEventListener("click", onCloseHandler);
refs.overlay.addEventListener("click", onCloseHandler);
window.addEventListener("keydown", slider);

// Создание изображения

const createImage = (item, parent) => {
  const { preview, original, description } = item;
  const img = document.createElement("img");

  img.classList.add("gallery__image");
  img.setAttribute("data-source", original);
  img.src = preview;
  img.alt = description;

  parent.appendChild(img);
};

// Создание ссылки 

const createLink = (item, parent) => {
  const { original } = item;
  const a = document.createElement("a");

  a.classList.add("gallery__link");
  a.href = original;

  createImage(item, a);

  parent.appendChild(a);
};

// Создание лишки

const createItem = (item) => {
  const li = document.createElement("li");
  li.classList.add("gallery__item");

  createLink(item, li);

  return li;
};

// Генерация 

const renderListItems = (arr) => {
  const items = arr.map((item) => createItem(item));

  refs.galleryList.append(...items);
};

renderListItems(galleryItems);

// Функция открытия

function onClickHandler(e) {
  e.preventDefault();

  refs.lightbox.classList.add("is-open");
  const { dataset, alt } = e.target;
  updateLightboxImage(dataset.source, alt);
}

// Функция закрытия

function onCloseHandler(e) {
  refs.lightbox.classList.remove("is-open");
  updateLightboxImage();
}

// Функция обновления img

function updateLightboxImage(src = "", alt = "") {
  refs.lightboxImage.src = src;
  refs.lightboxImage.alt = alt;
}

// Длина галереи

const galleryItemsLength = galleryItems.length - 1;

// Определение текущей img

function getActiveImg() {
  return galleryItems.findIndex(({ original }) => {
    console.log(refs.lightboxImage.src);
    return original === refs.lightboxImage.src;
  });
}

// Слайдер

function slider(e) {
let index = getActiveImg();

if (e.code === "Escape") {
  onCloseHandler();
  }
if (e.code === "ArrowRight") {
index += 1;
   if (index > galleryItemsLength) {
index = 0;
}
} else if (e.code === "ArrowLeft") {
index -= 1;
if (index <= 0) {
index = galleryItemsLength;
}
}
const { original, description } = galleryItems[index];
updateLightboxImage(original, description);
}