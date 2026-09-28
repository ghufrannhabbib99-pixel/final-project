const API_URL = import.meta.env.VITE_API_URL;

const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || "Something went wrong");
  }

  return data;
};

const api = {
  // =========================
  // AUTH
  // =========================
  auth: {
    register: (data) =>
      request("/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    login: (data) =>
      request("/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    me: () =>
      request("/auth/me"),
  },

  // =========================
  // PRODUCTS
  // =========================
  products: {
    getAll: () =>
      request("/products"),

    getById: (id) =>
      request(`/products/${id}`),

    getByArtisan: (artisanId) =>
      request(`/products/artisan/${artisanId}`),

    getMyProducts: () =>
      request("/products/my"),

    create: (data) =>
      request("/products", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    update: (id, data) =>
      request(`/products/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),

    remove: (id) =>
      request(`/products/${id}`, {
        method: "DELETE",
      }),
  },

  // =========================
  // ARTISANS
  // =========================
  artisans: {
    getAll: () =>
      request("/artisans"),

    getById: (id) =>
      request(`/artisans/${id}`),

    create: (data) =>
      request("/artisans", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    update: (id, data) =>
      request(`/artisans/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),

    remove: (id) =>
      request(`/artisans/${id}`, {
        method: "DELETE",
      }),
  },

  // =========================
  // CATEGORIES
  // =========================
  categories: {
    getAll: () =>
      request("/categories"),

    getById: (id) =>
      request(`/categories/${id}`),

    create: (data) =>
      request("/categories", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    update: (id, data) =>
      request(`/categories/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),

    remove: (id) =>
      request(`/categories/${id}`, {
        method: "DELETE",
      }),
  },

  // =========================
  // FAVORITES
  // =========================
  favorites: {
    getAll: () =>
      request("/favorites"),

    add: (data) =>
      request("/favorites", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    remove: (productId) =>
      request(`/favorites/${productId}`, {
        method: "DELETE",
      }),
  },

  // =========================
  // ORDERS
  // =========================
  orders: {
    getByArtisan: (artisanId) =>
  request(`/orders/artisan/${artisanId}`),
    
    getAll: () =>
      request("/orders"),

    getByUser: (userId) =>
      request(`/orders/user/${userId}`),

    getById: (id) =>
      request(`/orders/${id}`),

    create: (data) =>
      request("/orders", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    update: (id, data) =>
      request(`/orders/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),

    remove: (id) =>
      request(`/orders/${id}`, {
        method: "DELETE",
      }),
  },

  // =========================
  // ORDER ITEMS
  // =========================
  orderItems: {
    getAll: () =>
      request("/order-items"),

    getById: (id) =>
      request(`/order-items/${id}`),

    create: (data) =>
      request("/order-items", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    update: (id, data) =>
      request(`/order-items/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),

    remove: (id) =>
      request(`/order-items/${id}`, {
        method: "DELETE",
      }),
  },

  // =========================
  // REVIEWS
  // =========================
  reviews: {
    getAll: () =>
      request("/reviews"),

    getById: (id) =>
      request(`/reviews/${id}`),

    getByProduct: (productId) =>
      request(`/reviews/product/${productId}`),

    getProductSummary: (productId) =>
      request(`/reviews/product/${productId}/summary`),

    create: (data) =>
      request("/reviews", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    update: (id, data) =>
      request(`/reviews/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),

    remove: (id) =>
      request(`/reviews/${id}`, {
        method: "DELETE",
      }),
  },

  // =========================
  // USERS
  // =========================
  users: {
    getAll: () =>
      request("/users"),

    getById: (id) =>
      request(`/users/${id}`),

    create: (data) =>
      request("/users", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    update: (id, data) =>
      request(`/users/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),

    remove: (id) =>
      request(`/users/${id}`, {
        method: "DELETE",
      }),
  },

  // =========================
  // ADMIN
  // =========================
  admin: {
    getDashboard: () =>
      request("/admin/dashboard"),
  },

  // =========================
  // AI
  // =========================
  ai: {
    chat: (data) =>
      request("/ai/chat", {
        method: "POST",
        body: JSON.stringify(data),
      }),
  },
};

export default api;