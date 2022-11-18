export default function progressiveMobileMenu(
  menu,
  { menuItemWidth = 70 } = {}
) {
  menu.classList.add('progressive-menu');
  const menuItems = [...menu.children];

  const moreButton = document.createElement('button');
  moreButton.classList.add('progressive-menu-more-button');
  moreButton.innerHTML = `More <span class="icon">▼</span>`;
  menu.append(moreButton);

  const moreContainer = document.createElement('div');
  moreContainer.classList.add('progressive-menu-more-container', 'hidden');
  moreContainer.setAttribute('style', `min-width: ${menuItemWidth * 1.5}px;`);
  menu.append(moreContainer);

  menuItems.forEach((menuItem) =>
    menuItem.classList.add('progressive-menu-item')
  );

  function setProgressiveMoreItems() {
    moreButton.classList.remove('hidden');
    menuItems.forEach((menuItem) => {
      menuItem.classList.remove('more');
      moreButton.insertAdjacentElement('beforebegin', menuItem);
    });

    const numItems = Math.floor(menu.offsetWidth / menuItemWidth);
    menu.setAttribute(
      'style',
      `grid-template-columns: repeat(${
        menuItems.length <= numItems ? menuItems.length : numItems
      }, 1fr);`
    );
    if (menuItems.length <= numItems) {
      moreButton.classList.add('hidden');
      return;
    }

    menuItems.slice(numItems - 1).forEach((menuItem) => {
      menuItem.classList.add('more');
      moreContainer.append(menuItem);
    });
  }
  setProgressiveMoreItems();
  window.addEventListener('resize', setProgressiveMoreItems);

  function toggleProgressiveMoreItems() {
    moreContainer.classList.toggle('hidden');
  }
  moreButton.addEventListener('click', toggleProgressiveMoreItems);
}
