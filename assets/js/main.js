/* Aurora Jewelry site scripts */
const products = [
  {
    id: "ring-aurora",
    name: "Кольцо Aurora Halo",
    type: "кольца",
    metal: "золото",
    price: 48000,
    tags: ["помолвочное", "бриллиант"],
    description:
      "Классическое кольцо с центральным камнем и ореолом россыпи, подчёркивает важные моменты.",
  },
  {
    id: "ring-eternity",
    name: "Кольцо Eternity",
    type: "кольца",
    metal: "белое золото",
    price: 36500,
    tags: ["обручальное", "минимализм"],
    description:
      "Обручальное кольцо с дорожкой из 24 камней, комфортная посадка и сатинированный профиль.",
  },
  {
    id: "ear-constella",
    name: "Серьги Constella",
    type: "серьги",
    metal: "серебро",
    price: 18500,
    tags: ["подвесные", "вечерние"],
    description:
      "Подвесные серьги с гранями, отражающими свет, создают акцент в вечернем образе.",
  },
  {
    id: "bracelet-tennis",
    name: "Браслет Aurora Tennis",
    type: "браслеты",
    metal: "золото",
    price: 52200,
    tags: ["теннисный", "бестселлер"],
    description:
      "Легендарный теннисный браслет с сияющей линией камней в наборной оправе.",
  },
  {
    id: "necklace-prima",
    name: "Колье Prima",
    type: "колье",
    metal: "розовое золото",
    price: 41200,
    tags: ["чокер", "микс металлов"],
    description:
      "Асимметричное колье с акцентом на центральную подвеску в форме огранённой капли.",
  },
  {
    id: "watch-luna",
    name: "Часы Luna",
    type: "часы",
    metal: "сталь",
    price: 29700,
    tags: ["кварцевые", "повседневные"],
    description:
      "Женственные часы с перламутровым циферблатом и браслетом milanese, подходят к любому образу.",
  },
  {
    id: "brooch-flora",
    name: "Брошь Flora",
    type: "броши",
    metal: "серебро",
    price: 16200,
    tags: ["эмаль", "подарок"],
    description:
      "Флорентийская брошь с филигранными лепестками и мягким перламутром.",
  },
  {
    id: "set-gala",
    name: "Набор Gala",
    type: "наборы",
    metal: "комбинированный",
    price: 68500,
    tags: ["подарочный", "топ продаж"],
    description:
      "Подарочный набор из колье и серёг в едином стиле, упакованный в фирменную шкатулку.",
  },
];

const services = [
  {
    title: "Гравировка и персонализация",
    description:
      "Добавим значимую дату или инициалы на кольцах и подвесках. Срок выполнения — до 2 рабочих дней.",
  },
  {
    title: "Профессиональная чистка",
    description:
      "Вернём блеск украшениям: ультразвук, полировка и проверка закрепок.",
  },
  {
    title: "Trade-in и оценка",
    description:
      "Обновите коллекцию: оценим текущее украшение и зачтём стоимость при покупке нового.",
  },
  {
    title: "Примерка на дому",
    description:
      "Выбор украшений в комфортной обстановке: привезём 5–7 изделий по вашему запросу.",
  },
];

const timeline = [
  {
    year: "2012",
    text: "Компания основана в Санкт-Петербурге как семейная мастерская эксклюзивных украшений.",
  },
  {
    year: "2015",
    text: "Запуск первой онлайн-витрины и расширение коллекции за счёт авторских колец.",
  },
  {
    year: "2018",
    text: "Подтверждение качества камней международными сертификатами GIA и HRD.",
  },
  {
    year: "2022",
    text: "Открытие виртуальной примерочной и программы trade-in для постоянных клиентов.",
  },
];

const cartKey = "auroraCart";

function getCart() {
  const raw = localStorage.getItem(cartKey);
  return raw ? JSON.parse(raw) : [];
}

function saveCart(cart) {
  localStorage.setItem(cartKey, JSON.stringify(cart));
}

function addToCart(productId) {
  const product = products.find((item) => item.id === productId);
  if (!product) {
    alert("Товар не найден");
    return;
  }
  const cart = getCart();
  const existing = cart.find((item) => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id: product.id, quantity: 1 });
  }
  saveCart(cart);
  alert(`Добавлено в корзину: ${product.name}`);
  updateCartBadge();
}

function removeFromCart(productId) {
  const cart = getCart().filter((item) => item.id !== productId);
  saveCart(cart);
  renderCart();
  updateCartBadge();
}

function updateQuantity(productId, quantity) {
  const cart = getCart();
  const item = cart.find((entry) => entry.id === productId);
  if (item) {
    item.quantity = Math.max(1, quantity);
    saveCart(cart);
    renderCart();
    updateCartBadge();
  }
}

function updateCartBadge() {
  const badge = document.querySelector("[data-cart-badge]");
  if (!badge) return;
  const total = getCart().reduce((acc, item) => acc + item.quantity, 0);
  badge.textContent = total > 0 ? total : "0";
}

function renderProducts(container) {
  if (!container) return;
  container.innerHTML = "";
  const filtered = getFilteredProducts();
  const limit = container.dataset.limit ? Number(container.dataset.limit) : null;
  const list = limit && Number.isFinite(limit) ? filtered.slice(0, limit) : filtered;
  if (list.length === 0) {
    container.innerHTML = "<p class='alert'>По заданным параметрам ничего не найдено. Попробуйте изменить фильтры.</p>";
    return;
  }
  list.forEach((product) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <div class="product-image" data-product-type="${product.type}">${product.type.substring(0, 2).toUpperCase()}</div>
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <div class="tag-list">
        ${product.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
      </div>
      <div class="price">${product.price.toLocaleString("ru-RU")} ₽</div>
      <div class="card-actions">
        <button class="btn btn-primary" data-add-to-cart="${product.id}">В корзину</button>
        <button class="btn btn-ghost" data-view-product="${product.id}">Подробнее</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function getFilteredProducts() {
  const typeSelect = document.querySelector("[data-filter-type]");
  const metalSelect = document.querySelector("[data-filter-metal]");
  const priceSelect = document.querySelector("[data-filter-price]");
  const queryInput = document.querySelector("[data-filter-query]");

  let list = [...products];

  if (typeSelect && typeSelect.value !== "all") {
    list = list.filter((item) => item.type === typeSelect.value);
  }
  if (metalSelect && metalSelect.value !== "all") {
    list = list.filter((item) => item.metal === metalSelect.value);
  }
  if (priceSelect && priceSelect.value !== "all") {
    const [min, max] = priceSelect.value.split("-").map(Number);
    list = list.filter((item) => item.price >= min && item.price <= max);
  }
  if (queryInput && queryInput.value.trim().length > 0) {
    const q = queryInput.value.trim().toLowerCase();
    list = list.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }

  return list;
}

function setupFilters() {
  const filterInputs = document.querySelectorAll("[data-filter]");
  if (!filterInputs.length) return;
  filterInputs.forEach((input) => {
    input.addEventListener("input", () => {
      renderProducts(document.querySelector("[data-products]"));
    });
  });
  applyFiltersFromParams();
  renderProducts(document.querySelector("[data-products]"));
}

function applyFiltersFromParams() {
  const params = new URLSearchParams(window.location.search);
  const type = params.get("type");
  if (type) {
    const select = document.querySelector("[data-filter-type]");
    if (select) {
      select.value = type;
    }
  }
}

function renderProductDetail(productId) {
  const detailContainer = document.querySelector("[data-product-detail]");
  if (!detailContainer) return;
  const product = products.find((item) => item.id === productId) || products[0];
  detailContainer.innerHTML = `
    <div class="card">
      <div class="product-image" style="height:260px">${product.type.substring(0, 2).toUpperCase()}</div>
      <div class="tag-list">
        ${product.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
      </div>
      <h2>${product.name}</h2>
      <p>${product.description}</p>
      <p class="price">${product.price.toLocaleString("ru-RU")} ₽</p>
      <button class="btn btn-primary" data-add-to-cart="${product.id}">Добавить в корзину</button>
    </div>
  `;
}

function renderServices() {
  const container = document.querySelector("[data-services]");
  if (!container) return;
  container.innerHTML = "";
  services.forEach((service) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <h3>${service.title}</h3>
      <p>${service.description}</p>
      <button class="btn btn-ghost" data-service-request="${service.title}">Заказать</button>
    `;
    container.appendChild(card);
  });
}

function renderTimeline() {
  const container = document.querySelector("[data-timeline]");
  if (!container) return;
  container.innerHTML = "";
  timeline.forEach((item) => {
    const block = document.createElement("div");
    block.className = "timeline-item";
    block.innerHTML = `
      <div class="badge">${item.year}</div>
      <p>${item.text}</p>
    `;
    container.appendChild(block);
  });
}

function renderCart() {
  const tableBody = document.querySelector("[data-cart-body]");
  if (!tableBody) return;
  tableBody.innerHTML = "";
  const cart = getCart();
  let total = 0;
  cart.forEach((entry) => {
    const product = products.find((item) => item.id === entry.id);
    if (!product) return;
    const row = document.createElement("tr");
    const lineTotal = product.price * entry.quantity;
    total += lineTotal;
    row.innerHTML = `
      <td>${product.name}</td>
      <td>${product.price.toLocaleString("ru-RU")} ₽</td>
      <td>
        <input type="number" min="1" value="${entry.quantity}" data-cart-qty="${product.id}" />
      </td>
      <td>${lineTotal.toLocaleString("ru-RU")} ₽</td>
      <td><button class="btn btn-ghost" data-remove-item="${product.id}">Удалить</button></td>
    `;
    tableBody.appendChild(row);
  });
  const totalElement = document.querySelector("[data-cart-total]");
  if (totalElement) {
    totalElement.textContent = `${total.toLocaleString("ru-RU")} ₽`;
  }
  const emptyState = document.querySelector("[data-cart-empty]");
  if (emptyState) {
    emptyState.style.display = cart.length === 0 ? "block" : "none";
  }
}

function handleCartActions(event) {
  const addButton = event.target.closest("[data-add-to-cart]");
  if (addButton) {
    addToCart(addButton.getAttribute("data-add-to-cart"));
    return;
  }
  const viewButton = event.target.closest("[data-view-product]");
  if (viewButton) {
    const id = viewButton.getAttribute("data-view-product");
    window.location.href = `product.html?id=${id}`;
    return;
  }
  const removeButton = event.target.closest("[data-remove-item]");
  if (removeButton) {
    removeFromCart(removeButton.getAttribute("data-remove-item"));
    return;
  }
}

function handleCartQuantity(event) {
  const input = event.target.closest("[data-cart-qty]");
  if (!input) return;
  const value = Number(input.value);
  const id = input.getAttribute("data-cart-qty");
  if (Number.isFinite(value) && value > 0) {
    updateQuantity(id, value);
  }
}

function initNav() {
  const toggle = document.querySelector("[data-nav-toggle]");
  const links = document.querySelector("[data-nav-links]");
  if (!toggle || !links) return;
  toggle.addEventListener("click", () => {
    links.classList.toggle("open");
  });
}

function initContactForm() {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    console.table(data);
    alert("Спасибо! Мы свяжемся с вами в течение дня.");
    form.reset();
  });
}

function initServiceButtons() {
  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-service-request]");
    if (!button) return;
    const serviceName = button.getAttribute("data-service-request");
    const serviceField = document.querySelector("[data-service-input]");
    if (serviceField) {
      serviceField.value = serviceName;
      serviceField.focus();
      window.scrollTo({ top: serviceField.getBoundingClientRect().top + window.scrollY - 120, behavior: "smooth" });
    }
  });
}

function initProductPage() {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");
  if (productId) {
    renderProductDetail(productId);
  } else {
    renderProductDetail(products[0].id);
  }
}

function initPage() {
  const body = document.body;
  const page = body.dataset.page;
  initNav();
  initServiceButtons();
  updateCartBadge();
  document.addEventListener("click", handleCartActions);
  document.addEventListener("input", handleCartQuantity);

  switch (page) {
    case "home":
      renderProducts(document.querySelector("[data-products-home]"));
      renderServices();
      break;
    case "catalog":
      setupFilters();
      break;
    case "product":
      initProductPage();
      break;
    case "services":
      renderServices();
      initContactForm();
      break;
    case "about":
      renderTimeline();
      break;
    case "contact":
      initContactForm();
      break;
    case "cart":
      renderCart();
      break;
    default:
      break;
  }
}

document.addEventListener("DOMContentLoaded", initPage);
