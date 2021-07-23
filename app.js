const galleryItems = [
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
]

const galleryListEl = document.querySelector('.js-gallery')
const closeBtnEl = document.querySelector('.lightbox__button')
const modal = document.querySelector('.js-lightbox')
const modalImageEl = document.querySelector('.lightbox__image')
const overlayEL = document.querySelector('.lightbox__overlay')

const imagesMarkup = createGalleryMarkup(galleryItems)
galleryListEl.insertAdjacentHTML('beforeend', imagesMarkup)

galleryListEl.addEventListener('click', onOpenModal)
closeBtnEl.addEventListener('click', onCloseModal)
overlayEL.addEventListener('click', onOverlayClickCloseModal)
window.addEventListener('keydown', onCloseModalESC)
window.addEventListener('keydown', onChangeModalImage)

function createGalleryMarkup(images) {
  return images
    .map(({ preview, original, description }) => {
      return `
      <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`
    })
    .join('')
}

function onOverlayClickCloseModal(evt) {
  console.log('клик по оверлей')
  console.log('currentTarget', evt.currentTarget)
  console.log('target', evt.target)

  // и без єтого работает, но для практики:
  if (evt.target === evt.currentTarget) {
    console.log('кликнули именно в оверлей!!!')
    onCloseModal()
  }
}

function onCloseModalESC(evt) {
  if (evt.key !== 'Escape') {
    return
  }
  console.log('закрываю модалку по', evt.key)
  onCloseModal()
}

function onChangeModalImage(evt) {
  if (evt.key !== 'ArrowRight' && evt.key !== 'ArrowLeft') {
    return
  }
  let newIndex = 0
  let src = modalImageEl.src
  let findObj = {}

  if (evt.key === 'ArrowRight') {
    findObj = galleryItems.find(item => item.original === src)
    newIndex = galleryItems.indexOf(findObj) + 1

    if (newIndex === galleryItems.length) {
      newIndex = 0
    }
  }

  if (evt.key === 'ArrowLeft') {
    findObj = galleryItems.find(item => item.original === src)
    newIndex = galleryItems.indexOf(findObj) - 1

    if (newIndex < 0) {
      newIndex = galleryItems.length - 1
    }
  }

  modalImageEl.src = galleryItems[newIndex].original
}

function onOpenModal(evt) {
  if (!evt.target.classList.contains('gallery__image')) {
    return
  }

  modal.classList.add('is-open')
  evt.preventDefault()

  modalImageEl.src = evt.target.dataset.source
  modalImageEl.alt = evt.target.alt
  console.log('modalImageEl.src after opening:', modalImageEl.src)
  console.log('modalImageEl.alt after opening:', modalImageEl.alt)
}

function onCloseModal(evt) {
  modal.classList.remove('is-open')
  modalImageEl.src = ''
  modalImageEl.alt = ''
  console.log('modalImageEl.src after closing:', modalImageEl.src)
  console.log('modalImageEl.alt after closing:', modalImageEl.alt)
}
