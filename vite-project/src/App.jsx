import React, { useState, useEffect, useMemo, useRef } from 'react';
import './App.css';

// --- ИНТЕРНАЦИОНАЛИЗАЦИЯ (i18n) ---
const TRANSLATIONS = {
  RU: {
    brand: "SaaS Market",
    catalog: "Каталог",
    favorites: "Избранное",
    cart: "Корзина",
    admin: "Админ-панель",
    login: "Войти",
    logout: "Выйти",
    searchPlaceholder: "Поиск товаров...",
    allCategories: "Все категории",
    addToCart: "В корзину",
    inCart: "В корзине",
    price: "Цена",
    rating: "Рейтинг",
    reviews: "Отзывы",
    leaveReview: "Оставить отзыв",
    writeReviewPlaceholder: "Напишите ваш отзыв...",
    send: "Отправить",
    checkout: "Оформить заказ",
    total: "Итого",
    emptyCart: "Корзина пуста",
    emptyFav: "Список избранного пуст",
    bookingDate: "Дата бронирования",
    bookingTime: "Время бронирования",
    paymentMethod: "Способ оплаты",
    payWithCard: "Банковская карта",
    payWithDemo: "Демо-счет",
    confirmOrder: "Подтвердить заказ",
    orderSuccess: "Заказ успешно оформлен и отправлен!",
    accessDeniedTitle: "Доступ ограничен",
    accessDeniedMsg: "Для доступа к админ-панели нужно войти с учетными данными администратора.",
    adminDashboard: "Панель управления",
    addProduct: "Добавить товар",
    editProduct: "Редактировать",
    deleteProduct: "Удалить",
    title: "Название",
    category: "Категория",
    save: "Сохранить",
    cancel: "Отмена",
    supportChat: "Чат поддержки",
    typeMessage: "Введите сообщение...",
    botGreeting: "Здравствуйте! Как я могу помочь вам сегодня?",
    loginTitle: "Авторизация в системе",
    role: "Роль",
    itemsPerPage: "На странице",
    loginErr: "Неверный логин или пароль для входа Администратора"
  },
  KG: {
    brand: "SaaS Market",
    catalog: "Каталог",
    favorites: "Тандалгандар",
    cart: "Себет",
    admin: "Админ-панель",
    login: "Кирүү",
    logout: "Чыгуу",
    searchPlaceholder: "Товарларды издөө...",
    allCategories: "Бардык категориялар",
    addToCart: "Себетке салуу",
    inCart: "Себетте",
    price: "Баасы",
    rating: "Рейтинг",
    reviews: "Пикирлер",
    leaveReview: "Пикир калтыруу",
    writeReviewPlaceholder: "Пикириңизди жазыңыз...",
    send: "Жөнөтүү",
    checkout: "Заказды тариздөө",
    total: "Жалпы",
    emptyCart: "Себет бош",
    emptyFav: "Тандалгандар тизмеси бош",
    bookingDate: "Брондоо күнү",
    bookingTime: "Брондоо убактысы",
    paymentMethod: "Төлөм ыкмасы",
    payWithCard: "Банк картасы",
    payWithDemo: "Демо-эсеп",
    confirmOrder: "Заказды ырастоо",
    orderSuccess: "Заказ ийгиликтүү таризделди жана жөнөтүлдү!",
    accessDeniedTitle: "Мүмкүнчүлүк чектелген",
    accessDeniedMsg: "Админ-панелге кирүү үчүн админдин логинин жана паролун киргизиңиз.",
    adminDashboard: "Башкаруу панели",
    addProduct: "Товар кошуу",
    editProduct: "Оңдоо",
    deleteProduct: "Өчүрүү",
    title: "Аталышы",
    category: "Категория",
    save: "Сактоо",
    cancel: "Жокко чыгаруу",
    supportChat: "Колдоо чаты",
    typeMessage: "Билдирүү жазыңыз...",
    botGreeting: "Саламатсызбы! Бүгүн сизге кантип жардам бере алам?",
    loginTitle: "Системага кирүү",
    role: "Роль",
    itemsPerPage: "Баракта",
    loginErr: "Администратор үчүн туура эмес логин же пароль"
  },
  EN: {
    brand: "SaaS Market",
    catalog: "Catalog",
    favorites: "Favorites",
    cart: "Cart",
    admin: "Admin Panel",
    login: "Log In",
    logout: "Log Out",
    searchPlaceholder: "Search products...",
    allCategories: "All Categories",
    addToCart: "Add to Cart",
    inCart: "In Cart",
    price: "Price",
    rating: "Rating",
    reviews: "Reviews",
    leaveReview: "Leave a review",
    writeReviewPlaceholder: "Write your review...",
    send: "Send",
    checkout: "Checkout",
    total: "Total",
    emptyCart: "Cart is empty",
    emptyFav: "Favorites list is empty",
    bookingDate: "Booking Date",
    bookingTime: "Booking Time",
    paymentMethod: "Payment Method",
    payWithCard: "Credit Card",
    payWithDemo: "Demo Account",
    confirmOrder: "Confirm Order",
    orderSuccess: "Order successfully placed and dispatched!",
    accessDeniedTitle: "Access Denied",
    accessDeniedMsg: "You need administrator credentials to access the admin panel.",
    adminDashboard: "Admin Dashboard",
    addProduct: "Add Product",
    editProduct: "Edit",
    deleteProduct: "Delete",
    title: "Title",
    category: "Category",
    save: "Save",
    cancel: "Cancel",
    supportChat: "Support Chat",
    typeMessage: "Type a message...",
    botGreeting: "Hello! How can I assist you today?",
    loginTitle: "System Login",
    role: "Role",
    itemsPerPage: "Items per page",
    loginErr: "Invalid Admin login or password"
  }
};

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const [theme, setTheme] = useState('dark');
  const [lang, setLang] = useState('RU');
  const [activeTab, setActiveTab] = useState('catalog');

  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [productReviews, setProductReviews] = useState({});
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);

  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const chatBottomRef = useRef(null);

  const [toasts, setToasts] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetch('https://fakestoreapi.com/products')
      .then((res) => {
        if (!res.ok) throw new Error('Ошибка сети при загрузке каталога');
        return res.json();
      })
      .then((data) => {
        if (isMounted) {
          const formatted = data.map((item) => ({
            id: item.id,
            title: item.title,
            price: item.price,
            category: item.category,
            description: item.description,
            image: item.image,
            rating: item.rating ? item.rating.rate : 4.5
          }));
          setProducts(formatted);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setFetchError(err.message);
          setLoading(false);
        }
      });

    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    setChatMessages([{ id: 1, text: t.botGreeting, sender: 'bot', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
  }, [lang]);

  useEffect(() => {
    if (isChatOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isChatOpen]);

  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((item) => item.id !== id));
    }, 4000);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleLogin = (e) => {
    if (e) e.preventDefault();
    
    const cleanEmail = authEmail.trim().toLowerCase();
    const cleanPassword = authPassword.trim();

    if (cleanEmail === 'admin@shop.com') {
      if (cleanPassword === 'admin123') {
        setUser({ email: 'admin@shop.com', role: 'admin' });
        setShowAuthModal(false);
        setAuthEmail('');
        setAuthPassword('');
        addToast('Успешный вход: Администратор', 'success');
      } else {
        addToast(t.loginErr, 'danger');
      }
    } else {
      setUser({ email: cleanEmail || 'user@shop.com', role: 'user' });
      setShowAuthModal(false);
      setAuthEmail('');
      setAuthPassword('');
      addToast(`Успешный вход: ${cleanEmail || 'user@shop.com'} (User)`, 'success');
    }
  };

  const handleLogout = () => {
    setUser(null);
    if (activeTab === 'admin') setActiveTab('catalog');
    addToast('Вы успешно вышли из системы', 'info');
  };

  const toggleFavorite = (product) => {
    setFavorites((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        addToast(`Удалено из избранного: ${product.title.slice(0, 20)}...`, 'info');
        return prev.filter((item) => item.id !== product.id);
      } else {
        addToast(`Добавлено в избранное: ${product.title.slice(0, 20)}...`, 'success');
        return [...prev, product];
      }
    });
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    addToast(`Товар добавлен в корзину!`, 'success');
  };

  const updateCartQuantity = (id, delta) => {
    setCart((prev) => prev.map((item) => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    addToast('Товар удален из корзины', 'info');
  };

  const handleAddReview = (productId) => {
    if (!newReviewText.trim()) return;
    const review = {
      id: Date.now(),
      text: newReviewText,
      rating: newReviewRating,
      author: user ? user.email : 'Аноним',
      date: new Date().toLocaleDateString()
    };
    setProductReviews((prev) => ({
      ...prev,
      [productId]: [...(prev[productId] || []), review]
    }));
    setNewReviewText('');
    addToast('Спасибо за ваш отзыв!', 'success');
  };

  const handleConfirmOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const orderPayload = {
      items: cart,
      total: cartTotal,
      bookingDate,
      bookingTime,
      paymentMethod,
      user: user ? user.email : 'Гость'
    };

    console.log("=== SIMULATING TELEGRAM BOT & EMAIL DISPATCH ===");
    console.log("Payload:", JSON.stringify(orderPayload, null, 2));

    addToast(`Заказ отправлен в Telegram-бот и на Email!`, 'success');
    setCart([]);
    setShowCheckoutModal(false);
  };

  const handleSendChatMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = {
      id: Date.now(),
      text: chatInput,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, userMsg]);
    const currentInput = chatInput.toLowerCase();
    setChatInput('');

    setTimeout(() => {
      let replyText = "Спасибо за обращение! Наш оператор ответит вам в ближайшее время.";
      if (currentInput.includes('доставк') || currentInput.includes('доставка')) {
        replyText = "Доставка осуществляется по всей стране в течение 1-3 рабочих дней.";
      } else if (currentInput.includes('оплат') || currentInput.includes('оплата')) {
        replyText = "Мы принимаем банковские карты и онлайн-переводы через демо-счет.";
      } else if (currentInput.includes('скидк') || currentInput.includes('промо')) {
        replyText = "Используйте демо-режим для тестирования всех функций платформы со скидкой 100%!";
      }

      const botMsg = {
        id: Date.now() + 1,
        text: replyText,
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages((prev) => [...prev, botMsg]);
    }, 800);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (editingProduct.id) {
      setProducts((prev) => prev.map((p) => p.id === editingProduct.id ? editingProduct : p));
      addToast('Товар обновлен', 'success');
    } else {
      const newProd = { ...editingProduct, id: Date.now(), rating: 5.0 };
      setProducts((prev) => [newProd, ...prev]);
      addToast('Новый товар добавлен', 'success');
    }
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    addToast('Товар удален из базы', 'info');
  };

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ['all', ...Array.from(set)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  }, [cart]);

  const cartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  return (
    <div className="app-container">
      {/* --- ШАПКА И НАВИГАЦИЯ --- */}
      <header className="navbar">
        <div className="nav-brand" onClick={() => setActiveTab('catalog')}>
          <div className="logo-icon">⚡</div>
          <span>{t.brand}</span>
        </div>

        <nav className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
          <button
            className={`nav-btn ${activeTab === 'catalog' ? 'active' : ''}`}
            onClick={() => { setActiveTab('catalog'); setIsMobileMenuOpen(false); }}
          >
            {t.catalog}
          </button>

          <button
            className={`nav-btn ${activeTab === 'favorites' ? 'active' : ''}`}
            onClick={() => { setActiveTab('favorites'); setIsMobileMenuOpen(false); }}
          >
            {t.favorites} {favorites.length > 0 && <span className="badge">{favorites.length}</span>}
          </button>

          <button
            className={`nav-btn ${activeTab === 'cart' ? 'active' : ''}`}
            onClick={() => { setActiveTab('cart'); setIsMobileMenuOpen(false); }}
          >
            {t.cart} {cartCount > 0 && <span className="badge badge-accent">{cartCount}</span>}
          </button>

          <button
            className={`nav-btn ${activeTab === 'admin' ? 'active' : ''}`}
            onClick={() => { setActiveTab('admin'); setIsMobileMenuOpen(false); }}
          >
            {t.admin} {user?.role === 'admin' && <span className="role-tag">Admin</span>}
          </button>
        </nav>

        <div className="nav-controls">
          <select className="select-control" value={lang} onChange={(e) => setLang(e.target.value)}>
            <option value="RU">RU</option>
            <option value="KG">KG</option>
            <option value="EN">EN</option>
          </select>

          <button className="icon-btn" onClick={toggleTheme} title="Сменить тему">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {user ? (
            <div className="user-profile">
              <span className="user-email">{user.email}</span>
              <button className="btn-secondary" onClick={handleLogout}>{t.logout}</button>
            </div>
          ) : (
            <button className="btn-primary" onClick={() => setShowAuthModal(true)}>{t.login}</button>
          )}

          <button className="burger-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            ☰
          </button>
        </div>
      </header>

      {/* --- ОСНОВНОЙ КОНТЕНТ --- */}
      <main className="main-content">
        {/* ВКЛАДКА 1: КАТАЛОГ */}
        {activeTab === 'catalog' && (
          <section className="catalog-section">
            <div className="filter-bar">
              <input
                type="text"
                className="input-control search-input"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              />

              <select
                className="select-control category-select"
                value={selectedCategory}
                onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
              >
                <option value="all">{t.allCategories}</option>
                {categories.filter((c) => c !== 'all').map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {loading ? (
              <div className="skeleton-grid">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="skeleton-card">
                    <div className="skeleton-img"></div>
                    <div className="skeleton-line"></div>
                    <div className="skeleton-line short"></div>
                  </div>
                ))}
              </div>
            ) : fetchError ? (
              <div className="error-box">
                <h3>Ошибка загрузки данных</h3>
                <p>{fetchError}</p>
              </div>
            ) : (
              <>
                <div className="product-grid">
                  {paginatedProducts.map((product) => {
                    const isFav = favorites.some((f) => f.id === product.id);
                    const isInCart = cart.some((c) => c.id === product.id);

                    return (
                      <div key={product.id} className="product-card">
                        <div className="card-image-wrapper" onClick={() => setSelectedProduct(product)}>
                          <img src={product.image} alt={product.title} />
                          <button
                            className={`fav-btn ${isFav ? 'active' : ''}`}
                            onClick={(e) => { e.stopPropagation(); toggleFavorite(product); }}
                          >
                            ♥
                          </button>
                        </div>

                        <div className="card-body">
                          <span className="card-category">{product.category}</span>
                          <h4 className="card-title" onClick={() => setSelectedProduct(product)}>{product.title}</h4>
                          <div className="card-rating">⭐ {product.rating}</div>

                          <div className="card-footer">
                            <span className="card-price">${product.price.toFixed(2)}</span>
                            <button
                              className={`btn-primary ${isInCart ? 'btn-success' : ''}`}
                              onClick={() => addToCart(product)}
                            >
                              {isInCart ? t.inCart : t.addToCart}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {totalPages > 1 && (
                  <div className="pagination">
                    <button
                      className="pagination-btn"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((p) => p - 1)}
                    >
                      ←
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      className="pagination-btn"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((p) => p + 1)}
                    >
                      →
                    </button>
                  </div>
                )}
              </>
            )}
          </section>
        )}

        {/* ВКЛАДКА 2: ИЗБРАННОЕ */}
        {activeTab === 'favorites' && (
          <section className="favorites-section">
            <h2>{t.favorites}</h2>
            {favorites.length === 0 ? (
              <p className="empty-msg">{t.emptyFav}</p>
            ) : (
              <div className="product-grid">
                {favorites.map((product) => (
                  <div key={product.id} className="product-card">
                    <div className="card-image-wrapper">
                      <img src={product.image} alt={product.title} />
                      <button className="fav-btn active" onClick={() => toggleFavorite(product)}>♥</button>
                    </div>
                    <div className="card-body">
                      <h4 className="card-title">{product.title}</h4>
                      <div className="card-footer">
                        <span className="card-price">${product.price.toFixed(2)}</span>
                        <button className="btn-primary" onClick={() => addToCart(product)}>{t.addToCart}</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* ВКЛАДКА 3: КОРЗИНА И ОФОРМЛЕНИЕ */}
        {activeTab === 'cart' && (
          <section className="cart-section">
            <h2>{t.cart}</h2>
            {cart.length === 0 ? (
              <p className="empty-msg">{t.emptyCart}</p>
            ) : (
              <div className="cart-container">
                <div className="cart-list">
                  {cart.map((item) => (
                    <div key={item.id} className="cart-item">
                      <img src={item.image} alt={item.title} />
                      <div className="cart-item-info">
                        <h4>{item.title}</h4>
                        <span className="cart-item-price">${item.price.toFixed(2)}</span>
                      </div>
                      <div className="cart-quantity-controls">
                        <button className="qty-btn" onClick={() => updateCartQuantity(item.id, -1)}>-</button>
                        <span>{item.quantity}</span>
                        <button className="qty-btn" onClick={() => updateCartQuantity(item.id, 1)}>+</button>
                      </div>
                      <button className="remove-btn" onClick={() => removeFromCart(item.id)}>✕</button>
                    </div>
                  ))}
                </div>

                <div className="cart-summary">
                  <h3>{t.total}: ${cartTotal}</h3>
                  <button className="btn-primary btn-large" onClick={() => setShowCheckoutModal(true)}>
                    {t.checkout}
                  </button>
                </div>
              </div>
            )}
          </section>
        )}

        {/* ВКЛАДКА 4: АДМИН-ПАНЕЛЬ (БЕЗ ПОДСКАЗОК) */}
        {activeTab === 'admin' && (
          <section className="admin-section">
            {user?.role !== 'admin' ? (
              <div className="access-denied-card">
                <div className="access-icon">🔒</div>
                <h2>{t.accessDeniedTitle}</h2>
                <p>{t.accessDeniedMsg}</p>

                <div className="access-actions">
                  <button className="btn-primary" onClick={() => setShowAuthModal(true)}>
                    {t.login}
                  </button>
                </div>
              </div>
            ) : (
              <div className="admin-dashboard">
                <div className="admin-header">
                  <h2>{t.adminDashboard}</h2>
                  <button
                    className="btn-primary"
                    onClick={() => setEditingProduct({ title: '', price: 0, category: 'electronics', image: 'https://via.placeholder.com/150', description: '' })}
                  >
                    + {t.addProduct}
                  </button>
                </div>

                <div className="stats-grid">
                  <div className="stat-card">
                    <h4>Всего товаров</h4>
                    <span className="stat-value">{products.length}</span>
                    <div className="bar-chart"><div className="bar-fill" style={{ width: '80%' }}></div></div>
                  </div>
                  <div className="stat-card">
                    <h4>Категорий</h4>
                    <span className="stat-value">{categories.length - 1}</span>
                    <div className="bar-chart"><div className="bar-fill" style={{ width: '60%' }}></div></div>
                  </div>
                  <div className="stat-card">
                    <h4>Активные заказы</h4>
                    <span className="stat-value">12</span>
                    <div className="bar-chart"><div className="bar-fill" style={{ width: '40%' }}></div></div>
                  </div>
                </div>

                <div className="admin-table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>{t.title}</th>
                        <th>{t.category}</th>
                        <th>{t.price}</th>
                        <th>Действия</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id}>
                          <td>{product.id}</td>
                          <td>{product.title}</td>
                          <td><span className="tag">{product.category}</span></td>
                          <td>${product.price}</td>
                          <td>
                            <div className="table-actions">
                              <button className="btn-secondary btn-sm" onClick={() => setEditingProduct(product)}>
                                {t.editProduct}
                              </button>
                              <button className="btn-danger btn-sm" onClick={() => handleDeleteProduct(product.id)}>
                                {t.deleteProduct}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </section>
        )}
      </main>

      {/* --- МОДАЛЬНОЕ ОКНО ДЕТАЛЕЙ ТОВАРА И ОТЗЫВОВ --- */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content large-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProduct(null)}>✕</button>

            <div className="product-detail-layout">
              <img src={selectedProduct.image} alt={selectedProduct.title} className="detail-img" />
              <div className="detail-info">
                <h3>{selectedProduct.title}</h3>
                <span className="card-category">{selectedProduct.category}</span>
                <p className="detail-desc">{selectedProduct.description}</p>
                <div className="detail-price-row">
                  <span className="card-price">${selectedProduct.price.toFixed(2)}</span>
                  <button className="btn-primary" onClick={() => addToCart(selectedProduct)}>
                    {t.addToCart}
                  </button>
                </div>

                <div className="reviews-section">
                  <h4>{t.reviews}</h4>
                  <div className="reviews-list">
                    {(productReviews[selectedProduct.id] || []).length === 0 ? (
                      <p className="no-reviews">Пока нет отзывов. Будьте первым!</p>
                    ) : (
                      (productReviews[selectedProduct.id] || []).map((rev) => (
                        <div key={rev.id} className="review-item">
                          <div className="review-header">
                            <strong>{rev.author}</strong>
                            <span>{'⭐'.repeat(rev.rating)}</span>
                          </div>
                          <p>{rev.text}</p>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="add-review-form">
                    <h5>{t.leaveReview}</h5>
                    <select
                      className="select-control"
                      value={newReviewRating}
                      onChange={(e) => setNewReviewRating(Number(e.target.value))}
                    >
                      <option value="5">5 ⭐⭐⭐⭐⭐</option>
                      <option value="4">4 ⭐⭐⭐⭐</option>
                      <option value="3">3 ⭐⭐⭐</option>
                      <option value="2">2 ⭐⭐</option>
                      <option value="1">1 ⭐</option>
                    </select>
                    <textarea
                      className="textarea-control"
                      placeholder={t.writeReviewPlaceholder}
                      value={newReviewText}
                      onChange={(e) => setNewReviewText(e.target.value)}
                    />
                    <button className="btn-secondary" onClick={() => handleAddReview(selectedProduct.id)}>
                      {t.send}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- МОДАЛЬНОЕ ОКНО АВТОРИЗАЦИИ (ЧИСТОЕ, БЕЗ ПОДСКАЗОК) --- */}
      {showAuthModal && (
        <div className="modal-overlay" onClick={() => setShowAuthModal(false)}>
          <div className="modal-content auth-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowAuthModal(false)}>✕</button>
            <h3>{t.loginTitle}</h3>

            <form onSubmit={handleLogin} className="auth-form">
              <label>Email / Логин</label>
              <input
                type="email"
                required
                className="input-control"
                placeholder="Ваш email"
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
              />

              <label>Пароль</label>
              <input
                type="password"
                required
                className="input-control"
                placeholder="••••••••"
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
              />

              <button type="submit" className="btn-primary btn-large">{t.login}</button>
            </form>
          </div>
        </div>
      )}

      {/* --- МОДАЛЬНОЕ ОКНО ОФОРМЛЕНИЯ И БРОНИРОВАНИЯ --- */}
      {showCheckoutModal && (
        <div className="modal-overlay" onClick={() => setShowCheckoutModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowCheckoutModal(false)}>✕</button>
            <h3>{t.checkout}</h3>

            <form onSubmit={handleConfirmOrder} className="checkout-form">
              <label>{t.bookingDate}</label>
              <input
                type="date"
                required
                className="input-control"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
              />

              <label>{t.bookingTime}</label>
              <input
                type="time"
                required
                className="input-control"
                value={bookingTime}
                onChange={(e) => setBookingTime(e.target.value)}
              />

              <label>{t.paymentMethod}</label>
              <select
                className="select-control"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="card">{t.payWithCard}</option>
                <option value="demo">{t.payWithDemo}</option>
              </select>

              <div className="checkout-summary">
                <span>Сумма к оплате:</span>
                <strong>${cartTotal}</strong>
              </div>

              <button type="submit" className="btn-primary btn-large">
                {t.confirmOrder}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- МОДАЛЬНОЕ ОКНО РЕДАКТИРОВАНИЯ/СОЗДАНИЯ ТОВАРА --- */}
      {editingProduct && (
        <div className="modal-overlay" onClick={() => setEditingProduct(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setEditingProduct(null)}>✕</button>
            <h3>{editingProduct.id ? t.editProduct : t.addProduct}</h3>

            <form onSubmit={handleSaveProduct} className="admin-form">
              <label>{t.title}</label>
              <input
                type="text"
                required
                className="input-control"
                value={editingProduct.title}
                onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
              />

              <label>{t.price}</label>
              <input
                type="number"
                step="0.01"
                required
                className="input-control"
                value={editingProduct.price}
                onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) || 0 })}
              />

              <label>{t.category}</label>
              <input
                type="text"
                required
                className="input-control"
                value={editingProduct.category}
                onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
              />

              <label>URL картинки</label>
              <input
                type="text"
                className="input-control"
                value={editingProduct.image}
                onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
              />

              <div className="form-actions">
                <button type="submit" className="btn-primary">{t.save}</button>
                <button type="button" className="btn-secondary" onClick={() => setEditingProduct(null)}>{t.cancel}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- ЧАТ ПОДДЕРЖКИ --- */}
      <div className="chat-widget">
        {!isChatOpen ? (
          <button className="chat-toggle-btn" onClick={() => setIsChatOpen(true)}>
            💬 {t.supportChat}
          </button>
        ) : (
          <div className="chat-window">
            <div className="chat-header">
              <span>{t.supportChat}</span>
              <button className="chat-close" onClick={() => setIsChatOpen(false)}>✕</button>
            </div>

            <div className="chat-messages">
              {chatMessages.map((msg) => (
                <div key={msg.id} className={`chat-bubble ${msg.sender}`}>
                  <p>{msg.text}</p>
                  <span className="chat-time">{msg.time}</span>
                </div>
              ))}
              <div ref={chatBottomRef} />
            </div>

            <form onSubmit={handleSendChatMessage} className="chat-input-form">
              <input
                type="text"
                placeholder={t.typeMessage}
                className="input-control"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
              />
              <button type="submit" className="btn-primary">{t.send}</button>
            </form>
          </div>
        )}
      </div>

      {/* --- ТОСТЫ --- */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast toast-${toast.type}`}>
            {toast.message}
          </div>
        ))}
      </div>
    </div>
  );
}