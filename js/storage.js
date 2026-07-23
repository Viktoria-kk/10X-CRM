const STORAGE_KEYS = {
  USERS: "crm_users",
  SESSION: "crm_session",
  CLIENTS: "crm_clients",
  THEME: "crm_theme",
};

function getStorageItem(key, fallbackValue) {
  try {
    const storedValue = localStorage.getItem(key);

    if (storedValue === null) {
      return fallbackValue;
    }

    return JSON.parse(storedValue);
  } catch (error) {
    return fallbackValue;
  }
}

function setStorageItem(key, value) {
  const storedValue = JSON.stringify(value);
  localStorage.setItem(key, storedValue);
}

function removeStorageItem(key) {
  localStorage.removeItem(key);
}

function getUsers() {
  return getStorageItem(STORAGE_KEYS.USERS, []);
}

function saveUsers(users) {
  setStorageItem(STORAGE_KEYS.USERS, users);
}

function getSession() {
  return getStorageItem(STORAGE_KEYS.SESSION, null);
}

function saveSession(session) {
  setStorageItem(STORAGE_KEYS.SESSION, session);
}

function clearSession() {
  removeStorageItem(STORAGE_KEYS.SESSION);
}

function getClients() {
  return getStorageItem(STORAGE_KEYS.CLIENTS, []);
}

function saveClients(clients) {
  setStorageItem(STORAGE_KEYS.CLIENTS, clients);
}

function getTheme() {
  return getStorageItem(STORAGE_KEYS.THEME, "dark");
}

function saveTheme(theme) {
  setStorageItem(STORAGE_KEYS.THEME, theme);
}
