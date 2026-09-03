const body = document.body;
const root = document.documentElement;
const revealItems = document.querySelectorAll("[data-reveal]");
const magneticItems = document.querySelectorAll("[data-magnetic]");
const floatingItems = document.querySelectorAll(".floating-card");
const signupModal = document.querySelector("[data-signup-modal]");
const signupOpeners = document.querySelectorAll("[data-signup-open]");
const signupClosers = document.querySelectorAll("[data-signup-close]");
const qrModal = document.querySelector("[data-qr-modal]");
const qrModalOpeners = document.querySelectorAll("[data-qr-modal-open]");
const qrModalClosers = document.querySelectorAll("[data-qr-modal-close]");
const statusModal = document.querySelector("[data-status-modal]");
const statusModalClosers = document.querySelectorAll("[data-status-close]");
const toolbar = document.querySelector("[data-utility-toolbar]");
const toolbarToggleButtons = document.querySelectorAll("[data-toolbar-toggle]");
const themeToggleButtons = document.querySelectorAll("[data-theme-toggle]");
const phoneModeButtons = document.querySelectorAll("[data-phone-mode-toggle]");
const phonePage = document.querySelector(".gate-phone-page");

let phoneModeEnabled = false;
try {
  phoneModeEnabled = window.localStorage.getItem("urbpay-phone-mode") === "true";
} catch (error) {
  phoneModeEnabled = false;
}

body.classList.toggle("is-phone-mode", phoneModeEnabled);
phonePage?.classList.toggle("is-phone-mode", phoneModeEnabled);
phoneModeButtons.forEach((button) => {
  button.setAttribute("aria-pressed", String(phoneModeEnabled));
  button.setAttribute("aria-label", phoneModeEnabled ? "Desativar modo celular" : "Ativar modo celular");
  button.classList.toggle("is-open", phoneModeEnabled);
});

const phoneScrollViewport = document.querySelector(".device-mode-screen .urb-main");
let phoneDragState = null;

phoneScrollViewport?.addEventListener("pointerdown", (event) => {
  if (!body.classList.contains("is-phone-mode") || event.button !== 0) {
    return;
  }

  if (event.target.closest("button, a, input, select, textarea, label")) {
    return;
  }

  phoneDragState = {
    pointerId: event.pointerId,
    startY: event.clientY,
    startScrollTop: phoneScrollViewport.scrollTop,
    moved: false,
  };
  phoneScrollViewport.classList.add("is-dragging");
});

phoneScrollViewport?.addEventListener("pointermove", (event) => {
  if (!phoneDragState || event.pointerId !== phoneDragState.pointerId) {
    return;
  }

  const deltaY = event.clientY - phoneDragState.startY;
  if (!phoneDragState.moved && Math.abs(deltaY) <= 4) {
    return;
  }

  if (!phoneDragState.moved) {
    phoneDragState.moved = true;
    phoneScrollViewport.setPointerCapture(event.pointerId);
  }

  phoneScrollViewport.scrollTop = phoneDragState.startScrollTop - deltaY;
  event.preventDefault();
});

const stopPhoneDrag = (event) => {
  if (!phoneDragState || event.pointerId !== phoneDragState.pointerId) {
    return;
  }

  if (phoneScrollViewport.hasPointerCapture(event.pointerId)) {
    phoneScrollViewport.releasePointerCapture(event.pointerId);
  }
  phoneScrollViewport.classList.remove("is-dragging");
  phoneDragState = null;
};

phoneScrollViewport?.addEventListener("pointerup", stopPhoneDrag);
phoneScrollViewport?.addEventListener("pointercancel", stopPhoneDrag);
const feedbackForms = document.querySelectorAll("[data-feedback-form]");
const profileActionButtons = document.querySelectorAll("[data-profile-action]");
const serviceTriggers = document.querySelectorAll("[data-service-trigger]");
const serviceFlow = document.querySelector("[data-service-flow]");
const servicePanels = document.querySelectorAll("[data-service-panel]");
const creditCardButtons = document.querySelectorAll("[data-credit-card]");
const creditTypeButtons = document.querySelectorAll("[data-credit-type]");
const creditAmountButtons = document.querySelectorAll("[data-credit-amount]");
const creditCustomInput = document.querySelector("[data-credit-custom-input]");
const creditCustomConfirm = document.querySelector("[data-credit-custom-confirm]");
const creditGoPixButton = document.querySelector("[data-credit-go-pix]");
const creditConfirmButton = document.querySelector("[data-credit-confirm]");
const creditRechargeEndpoint = "/dashboard/credit/recharge";
const creditSelectedCardNames = document.querySelectorAll("[data-credit-selected-card-name]");
const creditSelectedCardNumbers = document.querySelectorAll("[data-credit-selected-card-number]");
const creditSelectedTypes = document.querySelectorAll("[data-credit-selected-credit-type]");
const creditSelectedAmounts = document.querySelectorAll("[data-credit-selected-amount]");
const currentBalanceDisplays = document.querySelectorAll("[data-current-balance-display]");
const cardBalanceDisplays = document.querySelectorAll("[data-card-balance-id]");
const recentTransactions = document.querySelector("[data-recent-transactions]");
const recentTransactionsFooter = document.querySelector("[data-recent-transactions-footer]");
const qrSimulatorRoot = document.querySelector("[data-qr-simulator-root]");
const requestBoard = document.querySelector("[data-request-board]");
const requestBoardSearchInput = requestBoard?.querySelector("[data-request-search]");
const requestBoardStatusSelect = requestBoard?.querySelector("[data-request-status]");
const requestBoardRefreshButton = requestBoard?.querySelector("[data-request-refresh]");
const requestBoardBody = requestBoard?.querySelector("[data-request-body]");
const requestBoardFeedback = requestBoard?.querySelector("[data-request-feedback]");
const requestBoardSeed = requestBoard?.querySelector("[data-request-items]");
const serviceMenuButtons = document.querySelectorAll("[data-service-button]");
const commonSupportRoot = document.querySelector("[data-common-support-root]");
const commonSupportCards = document.querySelectorAll("[data-common-support-card]");
const commonSupportDataNode = document.querySelector("[data-common-support-items]");
const commonSupportTitle = document.querySelector("[data-common-support-title]");
const commonSupportDescription = document.querySelector("[data-common-support-description]");
const commonSupportProtocol = document.querySelector("[data-common-support-protocol]");
const commonSupportStatus = document.querySelector("[data-common-support-status]");
const commonSupportQueue = document.querySelector("[data-common-support-queue]");
const commonSupportResponseTime = document.querySelector("[data-common-support-response-time]");
const commonSupportSteps = document.querySelector("[data-common-support-steps]");
const commonSupportAgentName = document.querySelector("[data-common-support-agent-name]");
const commonSupportAgentRole = document.querySelector("[data-common-support-agent-role]");
const commonSupportMessages = document.querySelector("[data-common-support-messages]");
const commonSupportForm = document.querySelector("[data-common-support-form]");
const commonSupportInput = document.querySelector("[data-common-support-input]");
const commonSupportSubmitButton = document.querySelector("[data-common-support-submit]");
const commonSupportToggleButton = document.querySelector("[data-common-support-toggle]");
const commonSupportPlaceholder = document.querySelector("[data-common-support-placeholder]");
const commonSupportPlaceholderText = document.querySelector("[data-common-support-placeholder-text]");
const dashboardShortcutButtons = document.querySelectorAll("[data-dashboard-shortcut]");
const dashboardViewButtons = document.querySelectorAll("[data-dashboard-view]");
const dashboardPanels = document.querySelectorAll("[data-dashboard-panel]");
const dashboardHomeSections = document.querySelectorAll("[data-dashboard-home-section]");
const dashboardPlaceholder = document.querySelector("[data-dashboard-placeholder]");
const dashboardWorkspace = document.querySelector(".urb-workspace");
const requestsPanel = document.querySelector('[data-dashboard-panel="requests"]');
if (dashboardWorkspace && requestsPanel && !dashboardWorkspace.contains(requestsPanel)) {
  dashboardWorkspace.appendChild(requestsPanel);
}
const locateMapElement = document.querySelector("[data-locate-map]");
const locateStatus = document.querySelector("[data-locate-status]");
const locateSearchInput = document.querySelector("[data-locate-search]");
const locateSearchButton = document.querySelector("[data-locate-search-button]");
const locateCenterUserButton = document.querySelector("[data-locate-center-user]");
const locateTitle = document.querySelector("[data-locate-title]");
const locateDescription = document.querySelector("[data-locate-description]");
const locateResults = document.querySelector("[data-locate-results]");
const settingsTabButtons = document.querySelectorAll("[data-settings-tab]");
const settingsSections = document.querySelectorAll("[data-settings-section]");
const settingsOpenTabButtons = document.querySelectorAll("[data-settings-open-tab]");
const settingsChoiceButtons = document.querySelectorAll("[data-setting-choice]");
const settingsToggleInputs = document.querySelectorAll("[data-setting-toggle]");
const settingsSelectInputs = document.querySelectorAll("[data-setting-select]");
const settingsFeedbackButtons = document.querySelectorAll("[data-settings-feedback]");
const languageOptionButtons = document.querySelectorAll("[data-language-option]");

const settingsStorage = {
  theme: "urbpay-theme",
  language: "urbpay-language",
  feedback: "urbpay-feedback-items",
  uiPreferences: "urbpay-ui-preferences",
  settingsTab: "urbpay-settings-tab",
};

const systemThemeQuery = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

const defaultUiSettings = {
  contactEmail: true,
  lowBalanceSms: false,
  prioritySupport: true,
  defaultCard: "active",
  lowBalanceLimit: "10",
  autoOpenQr: true,
  qrValidity: "60",
  quickRecharge: "20",
  autoReload: false,
  pushAlerts: true,
  emailAlerts: true,
  smsAlerts: false,
  rechargeAlerts: true,
  transportAlerts: true,
  quietHours: "off",
  twoFactorAuth: false,
  deviceBiometrics: true,
  sessionAlerts: true,
  maskCardDetails: true,
  sessionTimeout: "20",
  anonymousAnalytics: false,
  supportDiagnostics: true,
  publicScreenMode: true,
  personalizedTips: false,
  textSize: "default",
  density: "comfortable",
  highContrast: false,
  reducedMotion: false,
  focusHighlight: true,
  readableMode: false,
};

const i18n = {
  "pt-BR": {
    "toolbar.languageTitle": "Idioma",
    "toolbar.themeTitle": "Aparência",
    "toolbar.themeLight": "Modo claro",
    "toolbar.themeDark": "Modo escuro",
    "toolbar.notificationsTitle": "Notificações",
    "toolbar.notificationsHint": "Somente administradores podem enviar notificações para os usuários.",
    "toolbar.notificationsDemoTitle": "Comunicado UrbPay",
    "toolbar.notificationsDemoBody": "Novas atualizações do portal serão exibidas aqui para os usuários.",
    "toolbar.feedbackTitle": "Enviar sugestão",
    "toolbar.feedbackHint": "Qualquer usuário pode deixar uma sugestão para melhorar a plataforma.",
    "toolbar.feedbackPlaceholder": "Escreva sua ideia aqui",
    "toolbar.feedbackSubmit": "Enviar sugestão",
    "toolbar.profileAccount": "Minha conta",
    "toolbar.profilePassword": "Mudar senha",
    "toolbar.profileSecurity": "Segurança",
    "toolbar.profileLogout": "Sair",
    "toolbar.feedbackSuccess": "Sugestão enviada com sucesso.",
    "toolbar.profilePending": "Esta área ainda está em preparação.",
    "dashboard.headerTitle": "Painel do Cliente",
    "dashboard.headerSubtitle": "Passagem QR segura, cartão digital e leitura rápida do seu histórico.",
    "dashboard.historyLink": "Histórico e extrato",
    "history.headerTitle": "Histórico e Extrato",
    "history.headerSubtitle": "Painel configurável para acompanhar o comportamento do seu cartão.",
    "history.backLink": "Voltar ao painel",
    "landing.brandSubtitle": "Portal de mobilidade urbana",
    "landing.navHome": "Início",
    "landing.navLogin": "Login",
    "landing.navHowItWorks": "Como funciona",
    "landing.navServices": "Serviços",
    "landing.navProfile": "Meu perfil",
    "landing.signupButton": "Cadastrar",
  },
  "en-US": {
    "toolbar.languageTitle": "Language",
    "toolbar.themeTitle": "Appearance",
    "toolbar.themeLight": "Light mode",
    "toolbar.themeDark": "Dark mode",
    "toolbar.notificationsTitle": "Notifications",
    "toolbar.notificationsHint": "Only administrators can send notifications to users.",
    "toolbar.notificationsDemoTitle": "UrbPay notice",
    "toolbar.notificationsDemoBody": "New portal updates will appear here for users.",
    "toolbar.feedbackTitle": "Send suggestion",
    "toolbar.feedbackHint": "Any user can leave a suggestion to improve the platform.",
    "toolbar.feedbackPlaceholder": "Write your idea here",
    "toolbar.feedbackSubmit": "Send suggestion",
    "toolbar.profileAccount": "My account",
    "toolbar.profilePassword": "Change password",
    "toolbar.profileSecurity": "Security",
    "toolbar.profileLogout": "Sign out",
    "toolbar.feedbackSuccess": "Suggestion sent successfully.",
    "toolbar.profilePending": "This area is still being prepared.",
    "dashboard.headerTitle": "Customer Dashboard",
    "dashboard.headerSubtitle": "Secure QR ride, digital card and quick reading of your history.",
    "dashboard.historyLink": "History and statement",
    "history.headerTitle": "History and Statement",
    "history.headerSubtitle": "Configurable dashboard to track your card behavior.",
    "history.backLink": "Back to dashboard",
    "landing.brandSubtitle": "Urban mobility portal",
    "landing.navHome": "Home",
    "landing.navLogin": "Login",
    "landing.navHowItWorks": "How it works",
    "landing.navServices": "Services",
    "landing.navProfile": "My profile",
    "landing.signupButton": "Sign up",
  },
};

const getStoredLanguage = () => window.localStorage.getItem(settingsStorage.language) || "pt-BR";
const getStoredTheme = () => window.localStorage.getItem(settingsStorage.theme) || "light";
const resolveTheme = (theme) => theme === "system"
  ? (systemThemeQuery?.matches ? "dark" : "light")
  : theme;
const currencyFormatter = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const dateTimeFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

const getTranslation = (key) => {
  const language = getStoredLanguage();
  return i18n[language]?.[key] || i18n["pt-BR"][key] || key;
};

const applyLanguage = (language) => {
  window.localStorage.setItem(settingsStorage.language, language);
  root.lang = language;

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = i18n[language]?.[node.dataset.i18n] || i18n["pt-BR"][node.dataset.i18n] || node.textContent;
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    node.placeholder = i18n[language]?.[node.dataset.i18nPlaceholder] || i18n["pt-BR"][node.dataset.i18nPlaceholder] || node.placeholder;
  });
};

const applyTheme = (theme) => {
  window.localStorage.setItem(settingsStorage.theme, theme);
  root.dataset.theme = resolveTheme(theme);
  root.dataset.themePreference = theme;
};

const getStoredUiSettings = () => {
  try {
    const saved = JSON.parse(window.localStorage.getItem(settingsStorage.uiPreferences) || "{}");
    return {
      ...defaultUiSettings,
      ...saved,
    };
  } catch (error) {
    console.error(error);
    return { ...defaultUiSettings };
  }
};

const saveUiSettings = (settings) => {
  window.localStorage.setItem(settingsStorage.uiPreferences, JSON.stringify(settings));
};

const getStoredSettingsTab = () => window.localStorage.getItem(settingsStorage.settingsTab) || "account";

let uiSettingsState = getStoredUiSettings();

const setSettingsSummaryValue = (name, value) => {
  document.querySelectorAll(`[data-settings-summary="${name}"]`).forEach((node) => {
    node.textContent = value;
  });
};

const applyUiSettingsToDocument = (settings) => {
  root.dataset.uiScale = settings.textSize;
  root.dataset.uiDensity = settings.density;
  root.dataset.uiContrast = settings.highContrast ? "high" : "default";
  root.dataset.uiMotion = settings.reducedMotion ? "reduced" : "full";
  root.dataset.uiFocus = settings.focusHighlight ? "strong" : "default";
  root.dataset.uiReadable = settings.readableMode ? "true" : "false";
};

const updateSettingsSummary = (settings = uiSettingsState) => {
  const themeLabels = {
    light: "Claro",
    dark: "Escuro",
    system: "Sistema",
  };
  const languageLabels = {
    "pt-BR": "Português",
    "en-US": "English",
  };
  const textSizeLabels = {
    default: "Padrão",
    large: "Ampliado",
    xlarge: "Máximo",
  };
  const densityLabels = {
    comfortable: "Confortável",
    compact: "Compacta",
  };

  setSettingsSummaryValue("theme", themeLabels[getStoredTheme()] || "Claro");
  setSettingsSummaryValue("language", languageLabels[getStoredLanguage()] || "Português");
  setSettingsSummaryValue("textSize", textSizeLabels[settings.textSize] || "Padrão");
  setSettingsSummaryValue("density", densityLabels[settings.density] || "Confortável");
  setSettingsSummaryValue("motion", settings.reducedMotion ? "Reduzido" : "Completo");
  setSettingsSummaryValue("contrast", settings.highContrast ? "Elevado" : "Padrão");
  setSettingsSummaryValue("focus", settings.focusHighlight ? "Ativo" : "Suave");
};

const syncSettingsControls = () => {
  settingsChoiceButtons.forEach((button) => {
    const key = button.dataset.settingChoice;
    const value = button.dataset.settingValue;
    const currentValue = key === "theme" ? getStoredTheme() : uiSettingsState[key];
    const isActive = currentValue === value;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  languageOptionButtons.forEach((button) => {
    const isActive = button.dataset.languageOption === getStoredLanguage();
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  settingsToggleInputs.forEach((input) => {
    const key = input.dataset.settingToggle;
    input.checked = Boolean(uiSettingsState[key]);
  });

  settingsSelectInputs.forEach((input) => {
    const key = input.dataset.settingSelect;
    const value = uiSettingsState[key];
    if (typeof value !== "undefined") {
      input.value = String(value);
    }
  });

  updateSettingsSummary();
};

const applyUiSettings = (settings) => {
  uiSettingsState = {
    ...defaultUiSettings,
    ...settings,
  };
  saveUiSettings(uiSettingsState);
  applyUiSettingsToDocument(uiSettingsState);
  syncSettingsControls();
};

const setSettingsTab = (tabName) => {
  if (!settingsSections.length) {
    return;
  }

  const availableTabs = Array.from(settingsSections).map((section) => section.dataset.settingsSection);
  const nextTab = availableTabs.includes(tabName) ? tabName : "account";

  window.localStorage.setItem(settingsStorage.settingsTab, nextTab);

  settingsSections.forEach((section) => {
    const isActive = section.dataset.settingsSection === nextTab;
    section.hidden = !isActive;
    section.classList.toggle("is-active", isActive);
  });

  settingsTabButtons.forEach((button) => {
    const isActive = button.dataset.settingsTab === nextTab;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });
};

const closeToolbarPanels = () => {
  document.querySelectorAll("[data-toolbar-panel]").forEach((panel) => {
    panel.hidden = true;
  });

  toolbarToggleButtons.forEach((button) => {
    button.classList.remove("is-open");
    button.setAttribute("aria-expanded", "false");
  });
};

const showToolbarToast = (message) => {
  let toast = document.querySelector("[data-toolbar-toast]");

  if (!toast) {
    toast = document.createElement("div");
    toast.className = "utility-toast";
    toast.dataset.toolbarToast = "true";
    body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("is-visible");

  window.clearTimeout(showToolbarToast.timeoutId);
  showToolbarToast.timeoutId = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2400);
};

const requestBoardState = {
  items: [],
  lastSyncedAt: null,
  isLoading: false,
};

const commonSupportState = {
  items: [],
  threads: new Map(),
  activeId: "",
  responseTimeoutId: null,
  isOpen: false,
};

const dashboardState = {
  activeView: "home",
};

const escapeHtml = (value) => String(value ?? "")
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/\"/g, "&quot;")
  .replace(/'/g, "&#39;");

const normalizeSearchText = (value) => String(value ?? "")
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .toLowerCase()
  .trim();

const getRequestFilterLabel = (filterValue) => {
  if (filterValue === "completed") {
    return "concluídas";
  }

  if (filterValue === "all") {
    return "no total";
  }

  return "em andamento";
};

const setRequestBoardFeedback = (message, isError = false) => {
  if (!requestBoardFeedback) {
    return;
  }

  requestBoardFeedback.textContent = message;
  requestBoardFeedback.classList.toggle("is-error", isError);
};

const getFilteredRequestItems = () => {
  const searchTerm = normalizeSearchText(requestBoardSearchInput?.value || "");
  const selectedStatus = requestBoardStatusSelect?.value || "in_progress";

  return requestBoardState.items.filter((item) => {
    const matchesStatus = selectedStatus === "all" || item.status_group === selectedStatus;
    if (!matchesStatus) {
      return false;
    }

    if (!searchTerm) {
      return true;
    }

    const haystack = normalizeSearchText(`${item.protocol} ${item.service} ${item.status_text}`);
    return haystack.includes(searchTerm);
  });
};

const renderRequestRow = (item) => `
  <article class="request-row">
    <div class="request-row__protocol">
      <span>${escapeHtml(item.protocol)}</span>
    </div>
    <div class="request-row__service">
      <strong>${escapeHtml(item.service)}</strong>
      <p>Atualizado em ${escapeHtml(item.updated_at_display)}</p>
    </div>
    <div class="request-row__status">
      <span class="request-badge request-badge--${escapeHtml(item.appearance || "muted")}">${escapeHtml(item.status_text)}</span>
    </div>
  </article>
`;

const renderRequestBoard = () => {
  if (!requestBoardBody) {
    return;
  }

  const filteredItems = getFilteredRequestItems();
  if (!filteredItems.length) {
    requestBoardBody.innerHTML = '<div class="request-board__empty">Nenhuma solicitação encontrada com esse filtro.</div>';
  } else {
    requestBoardBody.innerHTML = filteredItems.map(renderRequestRow).join("");
  }

  const filterLabel = getRequestFilterLabel(requestBoardStatusSelect?.value || "in_progress");
  const countLabel = filteredItems.length === 1 ? "solicitação" : "solicitações";
  let message = filteredItems.length
    ? `Mostrando ${filteredItems.length} ${countLabel} ${filterLabel}.`
    : "Nenhuma solicitação encontrada com esse filtro.";

  if (requestBoardState.lastSyncedAt instanceof Date && !Number.isNaN(requestBoardState.lastSyncedAt.valueOf())) {
    message += ` Atualizado em ${dateTimeFormatter.format(requestBoardState.lastSyncedAt)}.`;
  }

  setRequestBoardFeedback(message);
};

const setRequestBoardLoading = (isLoading) => {
  requestBoardState.isLoading = isLoading;

  if (!requestBoardRefreshButton) {
    return;
  }

  requestBoardRefreshButton.disabled = isLoading;
  requestBoardRefreshButton.classList.toggle("is-loading", isLoading);
};

const refreshRequestBoard = async () => {
  const endpoint = requestBoard?.dataset.requestEndpoint;
  if (!endpoint || requestBoardState.isLoading) {
    return;
  }

  const clickedAt = new Date();
  setRequestBoardLoading(true);

  try {
    const response = await window.fetch(endpoint, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Não foi possível atualizar as solicitações (${response.status}).`);
    }

    const payload = await response.json();
    requestBoardState.items = Array.isArray(payload.items) ? payload.items : [];
    requestBoardState.lastSyncedAt = clickedAt;
    renderRequestBoard();
  } catch (error) {
    console.error(error);
    setRequestBoardFeedback("Não foi possível atualizar as solicitações agora.", true);
    showToolbarToast("Não foi possível atualizar as solicitações.");
  } finally {
    setRequestBoardLoading(false);
  }
};

const getServiceMenuTrigger = (panelName) => {
  if (!panelName) {
    return "";
  }

  if (panelName.startsWith("credit")) {
    return "credit-home";
  }

  return panelName;
};

const syncServiceMenuState = (panelName) => {
  const activeTrigger = getServiceMenuTrigger(panelName);

  serviceMenuButtons.forEach((button) => {
    const isActive = button.dataset.serviceTrigger === activeTrigger;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
};

const syncDashboardViewButtons = (activeView) => {
  dashboardViewButtons.forEach((button) => {
    const isActive = button.dataset.dashboardView === activeView;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
};

const setDashboardView = (viewName, { scrollIntoView = true } = {}) => {
  if (!dashboardPanels.length) {
    return;
  }

  const normalizedView = viewName || "home";
  dashboardState.activeView = normalizedView;

  dashboardPanels.forEach((panel) => {
    panel.hidden = panel.dataset.dashboardPanel !== normalizedView;
  });

  dashboardHomeSections.forEach((section) => {
    section.hidden = normalizedView !== "home";
  });

  if (dashboardPlaceholder) {
    dashboardPlaceholder.hidden = normalizedView !== "home";
  }

  syncDashboardViewButtons(normalizedView);

  if (scrollIntoView && normalizedView !== "home" && dashboardWorkspace) {
    const phoneViewport = body.classList.contains("is-phone-mode")
      ? dashboardWorkspace.closest(".urb-main")
      : null;

    if (phoneViewport) {
      phoneViewport.scrollTo({ top: dashboardWorkspace.offsetTop, behavior: "smooth" });
    } else {
      dashboardWorkspace.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  if (normalizedView === "locate") {
    window.setTimeout(() => {
      initializeLocateMap();
    }, 50);
  }
};

const locateState = {
  initialized: false,
  map: null,
  userMarker: null,
  userLatLng: null,
  locationRequested: false,
  trainLayer: null,
  followUser: true,
  watchId: null,
  moveTimeoutId: null,
  refreshIntervalId: null,
  requestId: 0,
  selectedStopId: "",
};

const setLocateStatus = (message, isError = false) => {
  if (!locateStatus) {
    return;
  }

  locateStatus.textContent = message;
  locateStatus.classList.toggle("is-error", isError);
};

const setLocateDetails = (title, description, rows = []) => {
  if (locateTitle) {
    locateTitle.textContent = title;
  }

  if (locateDescription) {
    locateDescription.textContent = description;
  }

  if (!locateResults) {
    return;
  }

  locateResults.innerHTML = rows.length
    ? rows.map((row) => `
        <article class="urb-locate-result ${row.featured ? "urb-locate-result--featured" : ""}">
          ${row.time ? `<div class="urb-locate-result__countdown"><span>${escapeHtml(row.timeLabel || "Chega em")}</span><strong>${escapeHtml(row.time)}</strong></div>` : ""}
          <div class="urb-locate-result__body">
            ${row.kicker ? `<span class="urb-locate-result__kicker">${escapeHtml(row.kicker)}</span>` : ""}
            <strong>${escapeHtml(row.title)}</strong>
            <p>${escapeHtml(row.description)}</p>
            ${row.departure || row.arrival ? `
              <dl class="urb-locate-result__times">
                ${row.departure ? `<div><dt>Sai desta estação</dt><dd>${escapeHtml(row.departure)}</dd></div>` : ""}
                ${row.arrival ? `<div><dt>Chega no destino</dt><dd>${escapeHtml(row.arrival)}</dd></div>` : ""}
              </dl>
            ` : ""}
          </div>
          ${row.meta ? `<small>${escapeHtml(row.meta)}</small>` : ""}
          ${row.actionId ? `<button type="button" data-locate-prediction="${escapeHtml(row.actionId)}" data-locate-stop-name="${escapeHtml(row.actionName || row.title)}">${escapeHtml(row.actionLabel || "Ver horários")}</button>` : ""}
        </article>
      `).join("")
    : '<article class="urb-locate-result"><strong>Sem dados</strong><p>Nenhuma estação encontrada nesta área.</p></article>';
};

const renderLocateStationPreview = (stations) => {
  setLocateDetails(
    "Próximas chegadas",
    stations.length
      ? "Selecione uma estação ou aguarde o carregamento automático dos horários mais próximos."
      : "Nenhuma estação de trem ou metrô foi encontrada para esta busca.",
    stations.slice(0, 5).map((station, index) => ({
      title: station.name,
      description: station.mode_label || "Trem / Metrô",
      meta: index === 0 ? "Consultando próximos horários..." : "Toque para consultar os horários",
      actionId: station.id,
      actionName: station.name,
      actionLabel: "Ver chegadas",
      featured: index === 0,
    }))
  );
};

const createLocateIcon = (type) => {
  if (type === "user") {
    return L.divIcon({
      className: "",
      html: '<span class="urb-map-marker urb-map-marker--user"></span>',
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -14],
    });
  }

  const path = type === "train"
    ? '<path d="M6 4.5h12a2 2 0 0 1 2 2v8.5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V6.5a2 2 0 0 1 2-2Z"></path><path d="M8 18l-2 2.5"></path><path d="M16 18l2 2.5"></path><path d="M8 8h8"></path><path d="M8 13h.01"></path><path d="M16 13h.01"></path>'
    : '<path d="M6 4.5h12a2 2 0 0 1 2 2V16a2 2 0 0 1-2 2h-1l1.5 2"></path><path d="M6 18H5a2 2 0 0 1-2-2V6.5a2 2 0 0 1 2-2h1"></path><path d="M7 4.5h10"></path><path d="M7 9h10"></path><path d="M7.5 14h.01"></path><path d="M16.5 14h.01"></path><path d="M5.5 20 7 18"></path>';

  return L.divIcon({
    className: "",
    html: `<span class="urb-map-marker urb-map-marker--${type}"><svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${path}</svg></span>`,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    popupAnchor: [0, -18],
  });
};

const locateFetchJson = async (url) => {
  const response = await window.fetch(url, {
    headers: {
      Accept: "application/json",
    },
  });
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.detail || "Não foi possível consultar a localização agora.");
  }

  return payload;
};

const getLocateCenter = () => {
  if (locateState.map) {
    const center = locateState.map.getCenter();
    return [center.lat, center.lng];
  }

  return locateState.userLatLng || [-23.5505, -46.6333];
};

const renderLocateStations = async (searchTerm = "") => {
  if (!locateState.trainLayer) {
    return;
  }

  const requestId = ++locateState.requestId;
  const [lat, lng] = getLocateCenter();
  setLocateStatus("Buscando estações");
  const params = new URLSearchParams({
    lat: String(lat),
    lng: String(lng),
    q: searchTerm || "",
    type: "train",
    limit: searchTerm ? "90" : "72",
  });
  const payload = await locateFetchJson(`/dashboard/localizar/gtfs/pontos?${params.toString()}`);
  if (requestId !== locateState.requestId) {
    return;
  }

  const stations = Array.isArray(payload.items) ? payload.items : [];
  locateState.trainLayer.clearLayers();

  stations.forEach((station) => {
    const lat = Number(station.lat);
    const lng = Number(station.lng);
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      return;
    }

    L.marker([lat, lng], { icon: createLocateIcon("train") })
      .bindPopup(`
        <div class="urb-locate-popup">
          <strong>${escapeHtml(station.name)}</strong>
          <span>${escapeHtml(station.mode_label || "Trem / Metrô")}</span>
          <button type="button" data-locate-prediction="${escapeHtml(station.id)}" data-locate-stop-name="${escapeHtml(station.name)}">Ver chegadas</button>
        </div>
      `)
      .addTo(locateState.trainLayer);
  });

  renderLocateStationPreview(stations);
  setLocateStatus(`${stations.length} estações carregadas`);

  if (stations[0]) {
    loadLocatePrediction(stations[0].id, stations[0].name, { auto: true, requestId }).catch((error) => {
      console.error(error);
      setLocateStatus(error.message, true);
    });
  }
};

const loadLocatePrediction = async (stopCode, stopName, options = {}) => {
  const requestId = options.requestId || ++locateState.requestId;
  locateState.selectedStopId = String(stopCode || "");
  setLocateStatus("Consultando horários");
  const payload = await locateFetchJson(`/dashboard/localizar/gtfs/previsao/${encodeURIComponent(stopCode)}`);
  if (requestId !== locateState.requestId && options.auto) {
    return;
  }

  const predictions = Array.isArray(payload.predictions) ? payload.predictions : [];
  const serviceNotice = payload.service_notice;
  const rows = predictions.length
    ? predictions.slice(0, 5).map((item, index) => ({
      time: item.wait_label || item.next_arrival || "--",
      timeLabel: "Trem chega",
      kicker: item.estimated ? "Previsão estimada" : "Grade oficial",
      title: item.line ? `Linha ${item.line}` : "Próximo trem",
      description: item.destination ? `Sentido ${item.destination}` : "Destino não informado",
      departure: item.departure_time || item.scheduled_time || "",
      arrival: item.arrival_time || "",
      meta: item.estimated
        ? ""
        : "Horário oficial da operação.",
      featured: index === 0,
    }))
    : serviceNotice
      ? [{
        kicker: "Horário de operação",
        title: serviceNotice.title || "Operação encerrada",
        description: serviceNotice.description || "Esta estação está fora do horário operacional.",
        meta: serviceNotice.meta || "Consulte novamente durante a operação.",
        featured: true,
      }]
    : [{
      title: "Sem horários próximos",
      description: "Não há previsões disponíveis para esta estação no momento.",
      meta: "Tente outra estação próxima.",
      featured: true,
    }];

  setLocateDetails(
    stopName || payload.stop?.name || "Estação selecionada",
    serviceNotice
      ? "Horários respeitando a janela de operação da estação."
      : "Próximos trens com saída e chegada estimadas.",
    rows
  );
  setLocateStatus("Horários atualizados");
};

const upsertLocateUserMarker = (latLng, shouldCenter = false) => {
  if (!locateState.map || typeof L === "undefined") {
    return;
  }

  if (locateState.userMarker) {
    locateState.userMarker.setLatLng(latLng);
  } else {
    locateState.userMarker = L.marker(latLng, { icon: createLocateIcon("user") })
      .bindPopup("Sua localização")
      .addTo(locateState.map);
  }

  if (shouldCenter) {
    locateState.map.setView(latLng, 15);
  }
};

const requestLocateUserPosition = ({ recenter = false, refreshStops = false } = {}) => {
  const isLocalhost = ["localhost", "127.0.0.1", "::1"].includes(window.location.hostname);
  if (!window.isSecureContext && !isLocalhost) {
    setLocateStatus("Use HTTPS para liberar GPS", true);
    return;
  }

  if (!navigator.geolocation) {
    setLocateStatus("GPS indisponível", true);
    return;
  }

  locateState.locationRequested = true;
  setLocateStatus("Localizando você");
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const latLng = [position.coords.latitude, position.coords.longitude];
      locateState.userLatLng = latLng;
      upsertLocateUserMarker(latLng, recenter);

      setLocateStatus("GPS ativo");
      if (!refreshStops) {
        return;
      }

      renderLocateStations(locateSearchInput?.value || "").catch((error) => {
        console.error(error);
        setLocateStatus(error.message, true);
      });
    },
    () => {
      setLocateStatus("Permita a localização", true);
    },
    {
      enableHighAccuracy: true,
      timeout: 8000,
      maximumAge: 30000,
    }
  );
};

const centerLocateOnUser = () => {
  locateState.followUser = true;

  if (locateState.userLatLng) {
    upsertLocateUserMarker(locateState.userLatLng, true);
    renderLocateStations(locateSearchInput?.value || "").catch((error) => {
      console.error(error);
      setLocateStatus(error.message, true);
    });
    return;
  }

  requestLocateUserPosition({ recenter: true, refreshStops: true });
};

const refreshLocateStationsSoon = () => {
  window.clearTimeout(locateState.moveTimeoutId);
  locateState.moveTimeoutId = window.setTimeout(() => {
    renderLocateStations(locateSearchInput?.value || "").catch((error) => {
      console.error(error);
      setLocateStatus(error.message, true);
    });
  }, 700);
};

const startLocateWatch = () => {
  const isLocalhost = ["localhost", "127.0.0.1", "::1"].includes(window.location.hostname);
  if (!navigator.geolocation || (!window.isSecureContext && !isLocalhost) || locateState.watchId !== null) {
    return;
  }

  locateState.watchId = navigator.geolocation.watchPosition(
    (position) => {
      const latLng = [position.coords.latitude, position.coords.longitude];
      locateState.userLatLng = latLng;
      upsertLocateUserMarker(latLng, locateState.followUser);

      if (locateState.followUser) {
        refreshLocateStationsSoon();
      }
    },
    () => {
      setLocateStatus("Permita a localização", true);
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 5000,
    }
  );
};

const initializeLocateMap = () => {
  if (!locateMapElement || locateState.initialized || typeof L === "undefined") {
    if (locateState.map) {
      window.setTimeout(() => locateState.map?.invalidateSize(), 80);
      startLocateWatch();
      refreshLocateStationsSoon();
    }
    return;
  }

  locateState.initialized = true;
  locateState.map = L.map(locateMapElement, {
    zoomControl: true,
    scrollWheelZoom: true,
  }).setView([-23.5505, -46.6333], 12);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(locateState.map);

  locateState.trainLayer = L.layerGroup().addTo(locateState.map);

  if (locateState.userLatLng) {
    upsertLocateUserMarker(locateState.userLatLng, true);
  } else {
    requestLocateUserPosition({ recenter: true, refreshStops: true });
  }

  locateState.map.on("dragstart zoomstart", () => {
    locateState.followUser = false;
  });

  locateState.map.on("moveend", () => {
    refreshLocateStationsSoon();
  });

  startLocateWatch();
  if (locateState.userLatLng) {
    refreshLocateStationsSoon();
  } else {
    window.setTimeout(() => {
      if (!locateState.userLatLng) {
        refreshLocateStationsSoon();
      }
    }, 900);
  }
  locateState.refreshIntervalId = window.setInterval(refreshLocateStationsSoon, 30000);

  window.setTimeout(() => locateState.map?.invalidateSize(), 150);
};

const cloneCommonSupportMessages = (messages) => Array.isArray(messages)
  ? messages.map((message) => ({
    role: message?.role === "user" ? "user" : "agent",
    text: String(message?.text ?? ""),
  }))
  : [];

const getCommonSupportItem = (itemId) => commonSupportState.items.find((item) => item.id === itemId) || null;

const renderCommonSupportSteps = (item) => {
  if (!commonSupportSteps || !item) {
    return;
  }

  const steps = Array.isArray(item.steps) ? item.steps : [];
  commonSupportSteps.innerHTML = steps.map((step, index) => `
    <article class="common-support-step">
      <span>${String(index + 1).padStart(2, "0")}</span>
      <p>${escapeHtml(step)}</p>
    </article>
  `).join("");
};

const renderCommonSupportMessages = (item) => {
  if (!commonSupportMessages || !item) {
    return;
  }

  const thread = commonSupportState.threads.get(item.id) || [];
  commonSupportMessages.innerHTML = thread.map((message) => {
    const role = message.role === "user" ? "user" : "agent";
    const author = role === "agent" ? item.agent_name || "Suporte UrbPay" : "Você";

    return `
      <article class="common-support-message common-support-message--${role}">
        <span>${escapeHtml(author)}</span>
        <p>${escapeHtml(message.text)}</p>
      </article>
    `;
  }).join("");

  commonSupportMessages.scrollTop = commonSupportMessages.scrollHeight;
};

const setCommonSupportPlaceholderMessage = (message) => {
  if (!commonSupportPlaceholderText || !message) {
    return;
  }

  commonSupportPlaceholderText.textContent = message;
};

const setCommonSupportVisibility = (isOpen, placeholderMessage = "") => {
  commonSupportState.isOpen = isOpen;

  if (commonSupportRoot) {
    commonSupportRoot.hidden = !isOpen;
  }

  if (commonSupportPlaceholder) {
    commonSupportPlaceholder.hidden = isOpen;
  }

  if (!isOpen && placeholderMessage) {
    setCommonSupportPlaceholderMessage(placeholderMessage);
  }
};

const renderCommonSupportPanel = (itemId) => {
  const item = getCommonSupportItem(itemId);
  if (!item) {
    return;
  }

  commonSupportState.activeId = item.id;

  commonSupportCards.forEach((card) => {
    const isSelected = card.dataset.commonSupportId === item.id;
    card.classList.toggle("is-selected", isSelected);
    card.setAttribute("aria-pressed", String(isSelected));
  });

  if (!commonSupportState.threads.has(item.id)) {
    commonSupportState.threads.set(item.id, cloneCommonSupportMessages(item.messages));
  }

  if (commonSupportTitle) {
    commonSupportTitle.textContent = item.title || "Atendimento do bilhete comum";
  }

  if (commonSupportDescription) {
    commonSupportDescription.textContent = item.description || "";
  }

  if (commonSupportProtocol) {
    commonSupportProtocol.textContent = item.protocol || "--";
  }

  if (commonSupportStatus) {
    commonSupportStatus.textContent = item.status || "--";
  }

  if (commonSupportQueue) {
    commonSupportQueue.textContent = item.queue || "--";
  }

  if (commonSupportResponseTime) {
    commonSupportResponseTime.textContent = item.response_time || "--";
  }

  if (commonSupportAgentName) {
    commonSupportAgentName.textContent = item.agent_name || "Suporte UrbPay";
  }

  if (commonSupportAgentRole) {
    commonSupportAgentRole.textContent = item.agent_role || "Atendimento digital";
  }

  if (commonSupportInput) {
    commonSupportInput.placeholder = `Descreva o que aconteceu em ${String(item.title || "seu atendimento").toLowerCase()}`;
  }

  renderCommonSupportSteps(item);
  renderCommonSupportMessages(item);
  setCommonSupportVisibility(true);
};

const setCommonSupportSendingState = (isSending) => {
  if (!commonSupportSubmitButton) {
    return;
  }

  commonSupportSubmitButton.disabled = isSending;
  commonSupportSubmitButton.textContent = isSending ? "Enviando..." : "Enviar";
};

const sendCommonSupportEmail = async (item) => {
  const endpoint = commonSupportRoot?.dataset.commonSupportEndpoint;
  if (!endpoint) {
    throw new Error("Endpoint do suporte não configurado.");
  }

  const transcript = (commonSupportState.threads.get(item.id) || []).map((message) => ({
    role: message.role === "user" ? "user" : "agent",
    text: String(message.text || ""),
  }));

  const response = await window.fetch(endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      case_id: item.id,
      messages: transcript,
    }),
  });

  if (response.ok) {
    return response.json();
  }

  let errorMessage = "Não foi possível enviar o e-mail do suporte.";

  try {
    const payload = await response.json();
    if (payload?.detail) {
      errorMessage = payload.detail;
    }
  } catch (error) {
    console.error(error);
  }

  throw new Error(errorMessage);
};

applyTheme(getStoredTheme());
applyLanguage(getStoredLanguage());
applyUiSettings(getStoredUiSettings());
setSettingsTab(getStoredSettingsTab());

const syncBodyModalState = () => {
  const hasOpenModal = signupModal?.classList.contains("is-open") || qrModal?.classList.contains("is-open");
  body.classList.toggle("modal-open", Boolean(hasOpenModal));
};

const setSignupState = (open) => {
  if (!signupModal) {
    return;
  }

  signupModal.classList.toggle("is-open", open);
  signupModal.setAttribute("aria-hidden", String(!open));
  syncBodyModalState();
};

const setQrModalState = (open) => {
  if (!qrModal) {
    return;
  }

  qrModal.classList.toggle("is-open", open);
  qrModal.hidden = !open;
  qrModal.setAttribute("aria-hidden", String(!open));
  syncBodyModalState();
};

const setStatusModalState = (open) => {
  if (!statusModal) {
    return;
  }

  statusModal.classList.toggle("is-open", open);
  statusModal.setAttribute("aria-hidden", String(!open));
};

if (signupModal?.classList.contains("is-open")) {
  syncBodyModalState();
}

if (qrModal?.classList.contains("is-open")) {
  syncBodyModalState();
}

if (statusModal?.classList.contains("is-open")) {
  window.clearTimeout(setStatusModalState.timeoutId);
  setStatusModalState.timeoutId = window.setTimeout(() => {
    setStatusModalState(false);
  }, 4200);
}

signupOpeners.forEach((button) => {
  button.addEventListener("click", () => setSignupState(true));
});

signupClosers.forEach((button) => {
  button.addEventListener("click", () => setSignupState(false));
});

qrModalOpeners.forEach((button) => {
  button.addEventListener("click", () => setQrModalState(true));
});

qrModalClosers.forEach((button) => {
  button.addEventListener("click", () => setQrModalState(false));
});

statusModalClosers.forEach((button) => {
  button.addEventListener("click", () => setStatusModalState(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setSignupState(false);
    setQrModalState(false);
    setStatusModalState(false);
    closeToolbarPanels();
  }
});

toolbarToggleButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const panelName = button.dataset.toolbarToggle;
    const panel = document.querySelector(`[data-toolbar-panel="${panelName}"]`);

    if (!panel) {
      return;
    }

    const willOpen = panel.hidden;
    closeToolbarPanels();

    panel.hidden = !willOpen;
    button.classList.toggle("is-open", willOpen);
    button.setAttribute("aria-expanded", String(willOpen));
    event.stopPropagation();
  });
});

document.addEventListener("click", (event) => {
  if (!toolbar?.contains(event.target)) {
    closeToolbarPanels();
  }
});

document.querySelectorAll("[data-toolbar-panel]").forEach((panel) => {
  panel.addEventListener("click", (event) => {
    event.stopPropagation();
  });
});

themeToggleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const nextTheme = resolveTheme(getStoredTheme()) === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    syncSettingsControls();
    closeToolbarPanels();
  });
});

phoneModeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const isPhoneMode = document.body.classList.toggle("is-phone-mode");
    phonePage?.classList.toggle("is-phone-mode", isPhoneMode);
    try {
      window.localStorage.setItem("urbpay-phone-mode", String(isPhoneMode));
    } catch (error) {
    }
    phoneModeButtons.forEach((modeButton) => {
      modeButton.setAttribute("aria-pressed", String(isPhoneMode));
      modeButton.setAttribute("aria-label", isPhoneMode ? "Desativar modo celular" : "Ativar modo celular");
      modeButton.classList.toggle("is-open", isPhoneMode);
    });
    document.querySelectorAll(".urb-sidebar.is-open, .urb-sidebar-overlay.is-open").forEach((element) => {
      element.classList.remove("is-open");
    });
    closeToolbarPanels();
  });
});

feedbackForms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const textarea = form.querySelector("textarea");
    const status = form.parentElement?.querySelector("[data-feedback-status]");
    const message = textarea?.value.trim();

    if (!message) {
      return;
    }

    const existing = JSON.parse(window.localStorage.getItem(settingsStorage.feedback) || "[]");
    existing.push({
      message,
      createdAt: new Date().toISOString(),
    });

    window.localStorage.setItem(settingsStorage.feedback, JSON.stringify(existing));
    textarea.value = "";

    if (status) {
      status.hidden = false;
      status.textContent = getTranslation("toolbar.feedbackSuccess");
    }

    closeToolbarPanels();
    showToolbarToast(getTranslation("toolbar.feedbackSuccess"));
  });
});

profileActionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.dataset.profileAction;

    if (action === "account" || action === "password" || action === "security") {
      setDashboardView("profile");
      setSettingsTab(action === "account" ? "account" : "security");
      syncSettingsControls();
      closeToolbarPanels();
      return;
    }

    closeToolbarPanels();
    showToolbarToast(getTranslation("toolbar.profilePending"));
  });
});

if (requestBoard) {
  try {
    requestBoardState.items = JSON.parse(requestBoardSeed?.textContent || "[]");
  } catch (error) {
    console.error(error);
    requestBoardState.items = [];
  }

  renderRequestBoard();

  requestBoardSearchInput?.addEventListener("input", renderRequestBoard);
  requestBoardStatusSelect?.addEventListener("change", renderRequestBoard);
  requestBoardRefreshButton?.addEventListener("click", refreshRequestBoard);
}

if (commonSupportRoot) {
  setCommonSupportVisibility(false);

  try {
    commonSupportState.items = JSON.parse(commonSupportDataNode?.textContent || "[]");
  } catch (error) {
    console.error(error);
    commonSupportState.items = [];
  }

  commonSupportState.items.forEach((item) => {
    commonSupportState.threads.set(item.id, cloneCommonSupportMessages(item.messages));
  });

  commonSupportCards.forEach((card) => {
    card.addEventListener("click", () => {
      const itemId = card.dataset.commonSupportId || "";
      renderCommonSupportPanel(itemId);
    });
  });

  commonSupportToggleButton?.addEventListener("click", () => {
    setCommonSupportVisibility(
      false,
      "Atendimento minimizado. Clique no card selecionado ou em outro assunto para abrir novamente.",
    );
  });

  commonSupportForm?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const activeItem = getCommonSupportItem(commonSupportState.activeId);
    const message = commonSupportInput?.value.trim();

    if (!activeItem || !message) {
      return;
    }

    const activeThread = commonSupportState.threads.get(activeItem.id) || [];
    activeThread.push({
      role: "user",
      text: message,
    });
    commonSupportState.threads.set(activeItem.id, activeThread);

    if (commonSupportInput) {
      commonSupportInput.value = "";
    }

    renderCommonSupportMessages(activeItem);

    setCommonSupportSendingState(true);

    try {
      await sendCommonSupportEmail(activeItem);
      showToolbarToast(`Suporte enviado por e-mail para mathiasdeoliveira2009@gmail.com.`);
    } catch (error) {
      console.error(error);
      showToolbarToast(error instanceof Error ? error.message : "Não foi possível enviar o e-mail do suporte.");
    } finally {
      setCommonSupportSendingState(false);
    }

    window.clearTimeout(commonSupportState.responseTimeoutId);
    commonSupportState.responseTimeoutId = window.setTimeout(() => {
      const followUpThread = commonSupportState.threads.get(activeItem.id) || [];
      followUpThread.push({
        role: "agent",
        text: activeItem.auto_reply || "Recebi sua mensagem e ja estou dando seguimento no atendimento.",
      });
      commonSupportState.threads.set(activeItem.id, followUpThread);

      if (commonSupportState.activeId === activeItem.id) {
        renderCommonSupportMessages(activeItem);
      }
    }, 850);
  });
}

const setServicePanel = (panelName) => {
  if (!serviceFlow) {
    return;
  }

  servicePanels.forEach((panel) => {
    panel.hidden = panel.dataset.servicePanel !== panelName;
  });

  serviceFlow.hidden = !panelName;
  syncServiceMenuState(panelName);
};

const scrollServiceFlowIntoView = () => {
  serviceFlow?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const creditState = {
  cardId: "",
  cardName: "--",
  cardNumber: "--",
  currentBalance: null,
  creditType: "--",
  amount: null,
  amountLabel: currencyFormatter.format(0),
};

const formatCardBalanceValue = (amount) => `${currencyFormatter.format(amount).replace("R$", "").trim()} R$`;

const setSelectedGroupItem = (items, activeItem) => {
  items.forEach((item) => {
    const isActive = item === activeItem;
    item.classList.toggle("is-selected", isActive);
    item.setAttribute("aria-pressed", String(isActive));
  });
};

const updateCreditSummary = () => {
  creditSelectedCardNames.forEach((node) => {
    node.textContent = creditState.cardName;
  });

  creditSelectedCardNumbers.forEach((node) => {
    node.textContent = creditState.cardNumber;
  });

  creditSelectedTypes.forEach((node) => {
    node.textContent = creditState.creditType;
  });

  creditSelectedAmounts.forEach((node) => {
    node.textContent = creditState.amountLabel;
  });

  if (creditGoPixButton) {
    creditGoPixButton.disabled = !creditState.amount;
  }
};

const clearCreditAmountSelection = () => {
  creditState.amount = null;
  creditState.amountLabel = currencyFormatter.format(0);
  setSelectedGroupItem(creditAmountButtons, null);

  if (creditCustomInput) {
    creditCustomInput.value = "";
  }
};

const resetCreditFlow = () => {
  creditState.cardId = "";
  creditState.cardName = "--";
  creditState.cardNumber = "--";
  creditState.currentBalance = null;
  creditState.creditType = "--";
  clearCreditAmountSelection();
  setSelectedGroupItem(creditCardButtons, null);
  setSelectedGroupItem(creditTypeButtons, null);
  updateCreditSummary();
};

const parseCreditAmount = (value) => {
  if (!value) {
    return null;
  }

  const cleaned = value
    .trim()
    .replace(/\s+/g, "")
    .replace(/[^0-9.,]/g, "");

  const lastComma = cleaned.lastIndexOf(",");
  const lastDot = cleaned.lastIndexOf(".");
  const separatorIndex = Math.max(lastComma, lastDot);
  let integerPart = cleaned;
  let decimalPart = "";

  if (separatorIndex >= 0) {
    integerPart = cleaned.slice(0, separatorIndex);
    decimalPart = cleaned.slice(separatorIndex + 1);
  }

  const normalized = decimalPart
    ? `${integerPart.replace(/[.,]/g, "")}.${decimalPart.replace(/[.,]/g, "")}`
    : integerPart.replace(/[.,]/g, "");

  const parsed = Number.parseFloat(normalized);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
};

const applyCreditAmount = (amount, activeButton = null, preserveCustomValue = false) => {
  creditState.amount = amount;
  creditState.amountLabel = currencyFormatter.format(amount);
  setSelectedGroupItem(creditAmountButtons, activeButton);

  if (creditCustomInput && !preserveCustomValue) {
    creditCustomInput.value = "";
  }

  updateCreditSummary();
};

const prependRecentRechargeTransaction = (payload) => {
  if (!recentTransactions) {
    return;
  }

  const title = escapeHtml(payload.movement_title || "Recarga via Pix");
  const location = escapeHtml(payload.movement_location || "Rede UrbPay");
  const time = escapeHtml(payload.movement_time || dateTimeFormatter.format(new Date()));
  const amount = escapeHtml(payload.movement_amount || `+ ${currencyFormatter.format(creditState.amount || 0)}`);
  const emptyState = recentTransactions.querySelector(".urb-empty-state");

  emptyState?.remove();
  recentTransactions.insertAdjacentHTML(
    "afterbegin",
    `
      <article class="urb-transaction-row">
        <span class="urb-transaction-row__icon urb-transaction-row__icon--topup">
          <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8"
            stroke-linecap="round" stroke-linejoin="round">
            <path d="m7 12 5-5 5 5"></path>
            <path d="m7 17 5-5 5 5"></path>
          </svg>
        </span>
        <div class="urb-transaction-row__content">
          <strong>${title}</strong>
          <p>${location}</p>
        </div>
        <span class="urb-transaction-row__time">${time}</span>
        <strong class="urb-transaction-row__amount urb-transaction-row__amount--positive">${amount}</strong>
      </article>
    `
  );

  const rows = recentTransactions.querySelectorAll(".urb-transaction-row");
  rows.forEach((row, index) => {
    if (index >= 4) {
      row.remove();
    }
  });

  if (recentTransactionsFooter) {
    const visibleCount = recentTransactions.querySelectorAll(".urb-transaction-row").length;
    const currentTotal = Number.parseInt(recentTransactionsFooter.dataset.movementCount || "0", 10) || 0;
    const nextTotal = currentTotal + 1;
    recentTransactionsFooter.dataset.movementCount = String(nextTotal);
    recentTransactionsFooter.textContent = `Mostrando ${visibleCount} de ${nextTotal} transações.`;
  }
};

const updateCardBalanceDisplays = (cardId, nextBalance) => {
  const normalizedBalance = Number(nextBalance.toFixed(2));
  const formattedBalance = currencyFormatter.format(normalizedBalance);

  cardBalanceDisplays.forEach((node) => {
    if (node.dataset.cardBalanceId === cardId) {
      node.textContent = formatCardBalanceValue(normalizedBalance);
      node.dataset.balanceAmount = normalizedBalance.toFixed(2);
    }
  });

  creditCardButtons.forEach((button) => {
    if (button.dataset.creditCardId === cardId) {
      button.dataset.creditCardBalance = normalizedBalance.toFixed(2);
    }
  });

  currentBalanceDisplays.forEach((node) => {
    if (!node.dataset.currentCardId || node.dataset.currentCardId === cardId) {
      node.dataset.full = formattedBalance;

      const sensitiveContainer = node.closest("[data-sensitive]");
      const isMasked = sensitiveContainer && !sensitiveContainer.classList.contains("is-revealed");
      node.textContent = isMasked && node.dataset.masked ? node.dataset.masked : formattedBalance;
    }
  });
};

setSelectedGroupItem(creditCardButtons, null);
setSelectedGroupItem(creditTypeButtons, null);
setSelectedGroupItem(creditAmountButtons, null);
updateCreditSummary();

creditCardButtons.forEach((button) => {
  button.addEventListener("click", () => {
    creditState.cardId = button.dataset.creditCardId || "";
    creditState.cardName = button.dataset.creditCardName || "--";
    creditState.cardNumber = button.dataset.creditCardNumber || "--";
    creditState.currentBalance = Number.parseFloat(button.dataset.creditCardBalance || "0") || 0;
    creditState.creditType = "--";
    clearCreditAmountSelection();
    setSelectedGroupItem(creditCardButtons, button);
    setSelectedGroupItem(creditTypeButtons, null);
    updateCreditSummary();
    setServicePanel("credit-type");
    scrollServiceFlowIntoView();
  });
});

creditTypeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    creditState.creditType = button.dataset.creditType || "--";
    clearCreditAmountSelection();
    setSelectedGroupItem(creditTypeButtons, button);
    updateCreditSummary();
    setServicePanel("credit-amount");
    scrollServiceFlowIntoView();
  });
});

creditAmountButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const amount = Number.parseFloat(button.dataset.creditAmount || "");
    if (!Number.isFinite(amount)) {
      return;
    }

    applyCreditAmount(amount, button);
  });
});

const confirmCustomCreditAmount = () => {
  const amount = parseCreditAmount(creditCustomInput?.value || "");
  if (!amount) {
    showToolbarToast("Digite um valor valido para continuar.");
    return;
  }

  applyCreditAmount(amount, null, true);
};

creditCustomConfirm?.addEventListener("click", confirmCustomCreditAmount);

creditCustomInput?.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    confirmCustomCreditAmount();
  }
});

creditGoPixButton?.addEventListener("click", () => {
  if (!creditState.amount) {
    showToolbarToast("Escolha um valor de recarga antes de seguir.");
    return;
  }

  setServicePanel("credit-pix");
  scrollServiceFlowIntoView();
});

creditConfirmButton?.addEventListener("click", async () => {
  if (!creditState.cardId || !creditState.amount) {
    showToolbarToast("Escolha um cartão e um valor antes de confirmar.");
    return;
  }

  creditConfirmButton.disabled = true;
  creditConfirmButton.textContent = "Confirmando...";

  try {
    const response = await window.fetch(creditRechargeEndpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        card_id: creditState.cardId,
        amount: creditState.amount.toFixed(2),
        credit_type: creditState.creditType,
      }),
    });

    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(payload.detail || "Não foi possível salvar a recarga.");
    }

    const nextBalance = Number.parseFloat(payload.balance_value || "");
    if (!Number.isFinite(nextBalance)) {
      throw new Error("A recarga foi salva, mas o saldo retornado está inválido.");
    }

    creditState.currentBalance = nextBalance;
    updateCardBalanceDisplays(creditState.cardId, nextBalance);
    prependRecentRechargeTransaction(payload);
    showToolbarToast(`Recarga salva no banco. Saldo atual: ${currencyFormatter.format(nextBalance)}.`);
    clearCreditAmountSelection();
    updateCreditSummary();
    setServicePanel("credit-home");
    scrollServiceFlowIntoView();
    refreshRequestBoard();
  } catch (error) {
    showToolbarToast(error instanceof Error ? error.message : "Não foi possível salvar a recarga.");
  } finally {
    creditConfirmButton.disabled = false;
    creditConfirmButton.textContent = "Confirmar";
  }
});

syncDashboardViewButtons(dashboardState.activeView);
requestLocateUserPosition();
startLocateWatch();

dashboardViewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetView = button.dataset.dashboardView || "home";
    const hasServiceTrigger = Boolean(button.dataset.serviceTrigger);
    const shouldCollapse = !hasServiceTrigger && dashboardState.activeView === targetView && targetView !== "home";
    setDashboardView(shouldCollapse ? "home" : targetView);
  });
});

serviceTriggers.forEach((button) => {
  button.addEventListener("click", () => {
    const panelName = button.dataset.serviceTrigger;

    if ((panelName === "credit-home" || panelName === "common") && !serviceFlow.hidden) {
      const currentPanel = document.querySelector(`[data-service-panel="${panelName}"]`);
      if (currentPanel && !currentPanel.hidden) {
        setServicePanel(null);
        return;
      }
    }

    if (panelName === "credit-home" && button.classList.contains("service-item--action")) {
      resetCreditFlow();
    }

    if (panelName === "common" && commonSupportState.items.length && !commonSupportState.activeId) {
      renderCommonSupportPanel(commonSupportState.items[0].id);
    }

    setServicePanel(panelName);
    scrollServiceFlowIntoView();
  });
});

dashboardShortcutButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const shortcut = button.dataset.dashboardShortcut;

    if (shortcut === "billing") {
      showToolbarToast("A cobranca compartilhada entrou no novo layout e segue para a próxima etapa de backend.");
      return;
    }

    showToolbarToast("Este atalho entra na próxima etapa.");
  });
});

locateSearchButton?.addEventListener("click", () => {
  initializeLocateMap();
  locateState.followUser = false;
  renderLocateStations(locateSearchInput?.value || "").catch((error) => {
    console.error(error);
    setLocateStatus(error.message, true);
  });
});

locateSearchInput?.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    locateSearchButton?.click();
  }
});

locateCenterUserButton?.addEventListener("click", () => {
  initializeLocateMap();
  centerLocateOnUser();
});

document.addEventListener("click", (event) => {
  const predictionButton = event.target.closest("[data-locate-prediction]");
  if (!predictionButton) {
    return;
  }

  loadLocatePrediction(
    predictionButton.dataset.locatePrediction,
    predictionButton.dataset.locateStopName
  ).catch((error) => {
    console.error(error);
    setLocateStatus(error.message, true);
  });
});

settingsTabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setSettingsTab(button.dataset.settingsTab || "account");
  });
});

settingsOpenTabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setDashboardView("profile");
    setSettingsTab(button.dataset.settingsOpenTab || "account");
    syncSettingsControls();
  });
});

settingsChoiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const key = button.dataset.settingChoice;
    const value = button.dataset.settingValue;

    if (!key || !value) {
      return;
    }

    if (key === "theme") {
      applyTheme(value);
      syncSettingsControls();
      return;
    }

    applyUiSettings({
      ...uiSettingsState,
      [key]: value,
    });
  });
});

languageOptionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const language = button.dataset.languageOption;
    if (!language) {
      return;
    }

    applyLanguage(language);
    syncSettingsControls();
  });
});

settingsToggleInputs.forEach((input) => {
  input.addEventListener("change", () => {
    const key = input.dataset.settingToggle;
    if (!key) {
      return;
    }

    applyUiSettings({
      ...uiSettingsState,
      [key]: input.checked,
    });
  });
});

settingsSelectInputs.forEach((input) => {
  input.addEventListener("change", () => {
    const key = input.dataset.settingSelect;
    if (!key) {
      return;
    }

    applyUiSettings({
      ...uiSettingsState,
      [key]: input.value,
    });
  });
});

settingsFeedbackButtons.forEach((button) => {
  button.addEventListener("click", () => {
    showToolbarToast(button.dataset.settingsFeedback || "Este ajuste entra na próxima etapa.");
  });
});

systemThemeQuery?.addEventListener("change", () => {
  if (getStoredTheme() === "system") {
    applyTheme("system");
    syncSettingsControls();
  }
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

magneticItems.forEach((item) => {
  item.addEventListener("pointermove", (event) => {
    const rect = item.getBoundingClientRect();
    const offsetX = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
    const offsetY = ((event.clientY - rect.top) / rect.height - 0.5) * 10;
    item.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
  });

  item.addEventListener("pointerleave", () => {
    item.style.transform = "";
  });
});

const animateFloatingCards = () => {
  const time = performance.now() / 1000;

  floatingItems.forEach((item, index) => {
    const translateY = Math.sin(time + index) * 6;
    const translateX = Math.cos(time * 0.8 + index) * 4;
    item.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
  });

  requestAnimationFrame(animateFloatingCards);
};

if (floatingItems.length) {
  requestAnimationFrame(animateFloatingCards);
}

const sensitiveFields = document.querySelectorAll("[data-sensitive]");

sensitiveFields.forEach((field) => {
  const button = field.querySelector("[data-sensitive-toggle]");
  const value = field.querySelector("[data-sensitive-value]");

  if (!button || !value) {
    return;
  }

  button.addEventListener("click", () => {
    const revealed = field.classList.toggle("is-revealed");
    value.textContent = revealed ? value.dataset.full : value.dataset.masked;
  });
});

const countdownItems = document.querySelectorAll("[data-countdown]");

const formatCountdown = (remainingSeconds) => {
  if (remainingSeconds <= 0) {
    return "Expirado";
  }

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

const tickCountdowns = () => {
  const now = Date.now();

  countdownItems.forEach((item) => {
    const expiresAt = item.dataset.expiresAt;
    if (!expiresAt) {
      return;
    }

    const remainingSeconds = Math.max(0, Math.floor((Date.parse(expiresAt) - now) / 1000));
    item.textContent = formatCountdown(remainingSeconds);
    item.classList.toggle("is-expired", remainingSeconds <= 0);

    const passageStatus = item.closest(".urb-summary-card--passage")?.querySelector("[data-passage-status]");
    if (passageStatus) {
      passageStatus.textContent = remainingSeconds <= 0 ? "Expirada" : "Ativa";
      passageStatus.classList.toggle("is-expired", remainingSeconds <= 0);
    }
  });
};

if (countdownItems.length) {
  tickCountdowns();
  window.setInterval(tickCountdowns, 1000);
}

const setQrStageState = (node, state) => {
  if (!node) {
    return;
  }

  node.classList.remove("is-active", "is-complete", "is-success", "is-error");

  if (state) {
    node.classList.add(state);
  }
};

const qrSimulatorState = {
  isBusy: false,
  validationTimerId: null,
  cameraStream: null,
  cameraFrameId: null,
};

const getQrSimulatorCopy = (snapshot) => {
  if (snapshot.code === "created") {
    return {
      heroTitle: "Aproxime o QR Code do leitor",
      heroMessage: "Posicione o QR digital no leitor da catraca para iniciar a validação da passagem.",
      statusLabel: "QR pronto para leitura",
      summaryTitle: "Leitor aguardando aproximação",
      summaryCopy: "Simule a leitura do QR para iniciar o fluxo operacional da catraca.",
      consoleTitle: "Leitor pronto",
      consoleCopy: "Clique em simular leitura para reproduzir a aproximação do QR na catraca, como no uso em estações da CPTM e do Metrô.",
    };
  }

  if (snapshot.code === "opened") {
    return {
      heroTitle: "Leitura identificada",
      heroMessage: "O leitor reconheceu o QR Code e o backend está conferindo autorização e saldo.",
      statusLabel: "Validando bilhete",
      summaryTitle: "Validação em andamento",
      summaryCopy: "A leitura foi detectada e o sistema está processando a autorização da passagem.",
      consoleTitle: "Validando bilhete",
      consoleCopy: "O QR foi lido. A simulação agora executa a mesma etapa de conferência que antecede a liberação do bloqueio.",
    };
  }

  if (snapshot.code === "approved") {
    return {
      heroTitle: "Catraca liberada",
      heroMessage: snapshot.message,
      statusLabel: snapshot.label,
      summaryTitle: snapshot.title,
      summaryCopy: snapshot.message,
      consoleTitle: "Bloqueio liberado",
      consoleCopy: "A autorização foi aprovada. Na operação real, o passageiro tem uma janela curta para ultrapassar a catraca.",
    };
  }

  if (snapshot.code === "completed") {
    return {
      heroTitle: "Passagem concluída",
      heroMessage: snapshot.message,
      statusLabel: snapshot.label,
      summaryTitle: snapshot.title,
      summaryCopy: snapshot.message,
      consoleTitle: "Leitura encerrada",
      consoleCopy: "A travessia foi concluída e esta simulação foi encerrada. Gere um novo QR para reiniciar o fluxo.",
    };
  }

  if (snapshot.code === "failed") {
    return {
      heroTitle: "Validação não autorizada",
      heroMessage: snapshot.message,
      statusLabel: snapshot.label,
      summaryTitle: snapshot.title,
      summaryCopy: snapshot.message,
      consoleTitle: "Acesso negado",
      consoleCopy: "O bloqueio não foi liberado. Com este token, a simulação foi encerrada e um novo QR deve ser gerado após ajuste de saldo.",
    };
  }

  if (snapshot.code === "expired") {
    return {
      heroTitle: "Janela encerrada",
      heroMessage: snapshot.message,
      statusLabel: snapshot.label,
      summaryTitle: snapshot.title,
      summaryCopy: snapshot.message,
      consoleTitle: "QR expirado",
      consoleCopy: "A validade do QR terminou antes da leitura. Gere uma nova passagem para simular novamente.",
    };
  }

  if (snapshot.code === "replaced") {
    return {
      heroTitle: "QR substituído",
      heroMessage: snapshot.message,
      statusLabel: snapshot.label,
      summaryTitle: snapshot.title,
      summaryCopy: snapshot.message,
      consoleTitle: "QR substituído",
      consoleCopy: "Outro QR ja assumiu o lugar deste token. Reabra o simulador usando a passagem mais recente.",
    };
  }

  if (snapshot.code === "inactive") {
    return {
      heroTitle: "Acompanhamento indisponível",
      heroMessage: snapshot.message,
      statusLabel: snapshot.label,
      summaryTitle: snapshot.title,
      summaryCopy: snapshot.message,
      consoleTitle: "Sem solicitação ativa",
      consoleCopy: "Não existe mais uma passagem ativa associada a este token.",
    };
  }

  if (snapshot.code === "invalid") {
    return {
      heroTitle: "Token não reconhecido",
      heroMessage: snapshot.message,
      statusLabel: snapshot.label,
      summaryTitle: snapshot.title,
      summaryCopy: snapshot.message,
      consoleTitle: "QR não reconhecido",
      consoleCopy: "Este token não corresponde a uma passagem válida da simulação atual.",
    };
  }

  return {
    heroTitle: snapshot.title,
    heroMessage: snapshot.message,
    statusLabel: snapshot.label,
    summaryTitle: snapshot.title,
    summaryCopy: snapshot.message,
    consoleTitle: "Fluxo operacional",
    consoleCopy: snapshot.message,
  };
};

const clearQrValidationTimer = () => {
  if (qrSimulatorState.validationTimerId) {
    window.clearTimeout(qrSimulatorState.validationTimerId);
    qrSimulatorState.validationTimerId = null;
  }
};

const updateQrSimulatorConsole = (snapshot, copy) => {
  if (!qrSimulatorRoot) {
    return;
  }

  const consoleTitle = qrSimulatorRoot.querySelector("[data-qr-console-title]");
  const consoleCopy = qrSimulatorRoot.querySelector("[data-qr-console-copy]");

  if (consoleTitle) {
    consoleTitle.textContent = copy.consoleTitle;
  }

  if (consoleCopy) {
    consoleCopy.textContent = copy.consoleCopy;
  }

  const apiResponse = qrSimulatorRoot.querySelector("[data-qr-api-response]");
  const apiStatus = qrSimulatorRoot.querySelector("[data-qr-api-status]");
  if (apiResponse) {
    const isApproved = snapshot.code === "approved" || snapshot.code === "completed";
    apiResponse.textContent = JSON.stringify({
      success: isApproved,
      message: copy.heroTitle,
      status: snapshot.code,
      balance: snapshot.current_balance || snapshot.balance || "0,00",
    }, null, 2);
  }
  if (apiStatus) {
    apiStatus.textContent = snapshot.code === "failed" ? "402 NEGADO" : snapshot.code === "expired" ? "410 EXPIRADO" : "200 OK";
  }
};

const updateQrSimulatorControls = (snapshot) => {
  if (!qrSimulatorRoot) {
    return;
  }

  const scanButton = qrSimulatorRoot.querySelector("[data-qr-scan-action]");
  const completeButton = qrSimulatorRoot.querySelector("[data-qr-complete-action]");
  const passengerLink = qrSimulatorRoot.querySelector("[data-qr-passenger-link]");
  const dashboardLink = qrSimulatorRoot.querySelector("[data-qr-dashboard-link]");

  const isWaitingScan = snapshot.code === "created";
  const isValidating = snapshot.code === "opened";
  const isReleased = snapshot.code === "approved";
  const isTerminal = ["completed", "failed", "expired", "replaced", "inactive", "invalid"].includes(snapshot.code);

  if (scanButton) {
    scanButton.hidden = !isWaitingScan && !isValidating;
    scanButton.disabled = !isWaitingScan || qrSimulatorState.isBusy;
    scanButton.textContent = isValidating ? "Validando bilhete..." : "Ler QR Code";
  }

  if (completeButton) {
    completeButton.hidden = !isReleased;
    completeButton.disabled = !isReleased || qrSimulatorState.isBusy;
    completeButton.textContent = "Simular passagem na catraca";
  }

  if (passengerLink) {
    passengerLink.hidden = isReleased || isTerminal;
  }
  if (dashboardLink) {
    dashboardLink.textContent = isTerminal ? "Gerar novo QR no painel" : "Voltar ao painel";
    dashboardLink.setAttribute("href", "/dashboard");
  }
};

const updateQrSimulatorUrls = (payload) => {
  if (!qrSimulatorRoot || !payload) {
    return;
  }

  const urlMap = {
    token: "qrToken",
    status_url: "statusUrl",
    scan_url: "scanUrl",
    validate_url: "validateUrl",
    complete_url: "completeUrl",
    retry_url: "retryUrl",
  };
  Object.entries(urlMap).forEach(([key, datasetKey]) => {
    if (payload[key]) {
      qrSimulatorRoot.dataset[datasetKey] = payload[key];
    }
  });
};

const postQrSimulatorAction = async (url) => {
  const response = await window.fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.detail || `Não foi possível concluir a operação (${response.status}).`);
  }

  return payload;
};

const runQrSimulatorValidation = async () => {
  if (!qrSimulatorRoot || qrSimulatorState.isBusy) {
    return;
  }

  const validateUrl = qrSimulatorRoot.dataset.validateUrl;
  if (!validateUrl) {
    return;
  }

  clearQrValidationTimer();
  qrSimulatorState.isBusy = true;

  try {
    const snapshot = await postQrSimulatorAction(validateUrl);
    renderQrSimulatorStatus(snapshot);
  } catch (error) {
    console.error(error);
    showToolbarToast(error instanceof Error ? error.message : "Não foi possível validar o bilhete.");
  } finally {
    qrSimulatorState.isBusy = false;
    updateQrSimulatorControls({ code: qrSimulatorRoot.dataset.qrCode || "inactive" });
  }
};

const scheduleQrSimulatorValidation = (delayMs = 1000) => {
  if (!qrSimulatorRoot || !qrSimulatorRoot.dataset.validateUrl) {
    return;
  }

  clearQrValidationTimer();
  qrSimulatorState.validationTimerId = window.setTimeout(() => {
    runQrSimulatorValidation();
  }, delayMs);
};

const applyQrTimelineState = (snapshot) => {
  if (!qrSimulatorRoot) {
    return;
  }

  const createdCard = qrSimulatorRoot.querySelector('[data-qr-stage-card="created"]');
  const openedCard = qrSimulatorRoot.querySelector('[data-qr-stage-card="opened"]');
  const resultCard = qrSimulatorRoot.querySelector('[data-qr-stage-card="result"]');
  const resultHeading = qrSimulatorRoot.querySelector("[data-qr-result-heading]");
  const resultCopy = qrSimulatorRoot.querySelector("[data-qr-result-copy]");
  const copy = getQrSimulatorCopy(snapshot);

  setQrStageState(createdCard, null);
  setQrStageState(openedCard, null);
  setQrStageState(resultCard, null);

  if (resultHeading) {
    resultHeading.textContent = copy.summaryTitle;
  }

  if (resultCopy) {
    resultCopy.textContent = copy.summaryCopy;
  }

  if (snapshot.code === "created") {
    setQrStageState(createdCard, "is-active");
    return;
  }

  if (snapshot.code === "opened") {
    setQrStageState(createdCard, "is-complete");
    setQrStageState(openedCard, "is-active");
    return;
  }

  if (snapshot.code === "approved") {
    setQrStageState(createdCard, "is-complete");
    setQrStageState(openedCard, "is-complete");
    setQrStageState(resultCard, "is-active");
    return;
  }

  if (snapshot.code === "invalid") {
    setQrStageState(resultCard, "is-error");
    return;
  }

  if (createdCard) {
    setQrStageState(createdCard, "is-complete");
  }

  if (snapshot.opened_at && openedCard) {
    setQrStageState(openedCard, "is-complete");
  }

  if (!resultHeading || !resultCopy) {
    return;
  }

  if (snapshot.code === "completed") {
    setQrStageState(openedCard, "is-complete");
    setQrStageState(resultCard, "is-success");
    return;
  }

  setQrStageState(resultCard, "is-error");
};

const renderQrSimulatorStatus = (snapshot) => {
  if (!qrSimulatorRoot) {
    return;
  }

  const labelNode = qrSimulatorRoot.querySelector("[data-qr-status-label]");
  const titleNode = qrSimulatorRoot.querySelector("[data-qr-status-title]");
  const messageNode = qrSimulatorRoot.querySelector("[data-qr-status-message]");
  const balanceNode = qrSimulatorRoot.querySelector("[data-qr-status-balance]");
  const expiryNode = qrSimulatorRoot.querySelector("[data-qr-status-expiry]");
  const topExpiryNode = qrSimulatorRoot.querySelector("[data-qr-top-expiry]");
  const expiryLabelNode = qrSimulatorRoot.querySelector("[data-qr-expiry-label]");
  const turnstileNode = qrSimulatorRoot.querySelector("[data-qr-turnstile]");
  const turnstileImage = qrSimulatorRoot.querySelector("[data-qr-turnstile-image]");
  const turnstileForeground = qrSimulatorRoot.querySelector("[data-qr-turnstile-foreground]");
  const qrDisplay = qrSimulatorRoot.querySelector("[data-qr-display]");
  const appearances = ["pending", "active", "success", "error", "warning", "muted"];
  const copy = getQrSimulatorCopy(snapshot);

  if (labelNode) {
    labelNode.textContent = copy.statusLabel;
    appearances.forEach((appearance) => {
      labelNode.classList.remove(`gate-status-badge--${appearance}`);
    });
    labelNode.classList.add(`gate-status-badge--${snapshot.appearance || "muted"}`);
  }

  if (titleNode) {
    titleNode.textContent = copy.heroTitle;
  }

  if (messageNode) {
    messageNode.textContent = copy.heroMessage;
  }

  if (balanceNode) {
    const nextBalance = snapshot.current_balance || snapshot.balance || "0,00";
    balanceNode.textContent = nextBalance.startsWith("R$") ? nextBalance : `R$ ${nextBalance}`;
  }

  if (expiryNode) {
    if (snapshot.code === "approved") {
      expiryNode.textContent = formatCountdown(Number(snapshot.gate_remaining_seconds || 0));
    } else if (snapshot.code === "created" || snapshot.code === "opened") {
      expiryNode.textContent = formatCountdown(Number(snapshot.remaining_seconds || 0));
    } else {
      expiryNode.textContent = snapshot.label;
    }
  }

  if (topExpiryNode) {
    if (snapshot.code === "approved") {
      topExpiryNode.textContent = formatCountdown(Number(snapshot.gate_remaining_seconds || 0));
    } else if (snapshot.code === "created" || snapshot.code === "opened") {
      topExpiryNode.textContent = formatCountdown(Number(snapshot.remaining_seconds || 0));
    } else {
      topExpiryNode.textContent = snapshot.label;
    }
  }

  if (expiryLabelNode) {
    if (snapshot.code === "approved") {
      expiryLabelNode.textContent = "Janela da catraca";
    } else if (snapshot.code === "created" || snapshot.code === "opened") {
      expiryLabelNode.textContent = "Validade do QR";
    } else {
      expiryLabelNode.textContent = "Status da janela";
    }
  }

  if (turnstileNode) {
    appearances.forEach((appearance) => {
      turnstileNode.classList.remove(`gate-turnstile--${appearance}`);
    });
    turnstileNode.classList.add(`gate-turnstile--${snapshot.appearance || "muted"}`);
  }

  if (qrDisplay) {
    qrDisplay.hidden = !qrSimulatorRoot.classList.contains("is-qr-focus")
      || snapshot.code !== "created";
  }

  if (turnstileImage) {
    const waitingTurnstileImage = qrSimulatorRoot.dataset.simulatorMode === "qr"
      ? "UrbPay_Customizada_leia_QR_Code.png"
      : "UrbPay_Customizada_Aproxime_QR_Code.png";
    const imageState = {
      created: [waitingTurnstileImage, "Catraca aguardando leitura"],
      opened: [waitingTurnstileImage, "Catraca lendo o QR Code"],
      approved: ["UrbPay_Customizada_Passagem_Liberada.png", "Catraca liberada para passagem"],
      completed: ["UrbPay_Customizada_Passagem_Liberada.png", "Passagem liberada e concluída"],
      failed: ["UrbPay_Customizada_Passagem_Bloqueada.png", "Passagem bloqueada"],
      expired: ["UrbPay_Customizada_Passagem_Bloqueada.png", "Passagem bloqueada por expiração"],
      replaced: ["UrbPay_Customizada_Passagem_Bloqueada.png", "Passagem bloqueada por QR substituído"],
      inactive: ["UrbPay_Customizada_Passagem_Bloqueada.png", "Passagem bloqueada"],
      invalid: ["UrbPay_Customizada_Passagem_Bloqueada.png", "Passagem bloqueada por QR inválido"],
    }[snapshot.code] || [waitingTurnstileImage, "Catraca aguardando leitura"];

    const nextImageUrl = `/static/imgs/${imageState[0]}`;
    if (turnstileImage.getAttribute("src") !== nextImageUrl) {
      turnstileImage.classList.remove("is-changing");
      void turnstileImage.offsetWidth;
      turnstileImage.src = nextImageUrl;
      turnstileImage.classList.add("is-changing");
    }
    if (turnstileForeground && turnstileForeground.getAttribute("src") !== nextImageUrl) {
      turnstileForeground.src = nextImageUrl;
    }
    turnstileImage.alt = imageState[1];
    turnstileNode?.setAttribute("data-turnstile-state", snapshot.code || "created");
  }

  qrSimulatorRoot.dataset.qrAppearance = snapshot.appearance || "muted";
  qrSimulatorRoot.dataset.qrCode = snapshot.code || "inactive";
  updateQrSimulatorConsole(snapshot, copy);
  applyQrTimelineState(snapshot);
  updateQrSimulatorControls(snapshot);

  if (snapshot.code === "opened" && snapshot.opened_source === "simulator") {
    scheduleQrSimulatorValidation(150);
  } else {
    clearQrValidationTimer();
  }
};

const stopQrCamera = () => {
  if (qrSimulatorState.cameraFrameId) {
    window.cancelAnimationFrame(qrSimulatorState.cameraFrameId);
    qrSimulatorState.cameraFrameId = null;
  }

  if (qrSimulatorState.cameraStream) {
    qrSimulatorState.cameraStream.getTracks().forEach((track) => track.stop());
    qrSimulatorState.cameraStream = null;
  }
};

const startQrCamera = async () => {
  if (!qrSimulatorRoot || !window.BarcodeDetector || !navigator.mediaDevices?.getUserMedia) {
    showToolbarToast("A leitura pela câmera não é suportada neste navegador. Use a simulação.");
    return;
  }

  const camera = qrSimulatorRoot.querySelector("[data-qr-camera]");
  const cameraButton = qrSimulatorRoot.querySelector("[data-qr-camera-action]");
  if (!camera || !cameraButton) {
    return;
  }

  try {
    const detector = new BarcodeDetector({ formats: ["qr_code"] });
    qrSimulatorState.cameraStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: "environment" } },
      audio: false,
    });
    camera.srcObject = qrSimulatorState.cameraStream;
    camera.classList.add("is-visible");
    cameraButton.textContent = "Câmera ativa";

    const scanFrame = async () => {
      if (!qrSimulatorState.cameraStream || camera.readyState < 2) {
        qrSimulatorState.cameraFrameId = window.requestAnimationFrame(scanFrame);
        return;
      }

      try {
        const detected = await detector.detect(camera);
        const token = qrSimulatorRoot.dataset.qrToken || "";
        if (detected.some((item) => item.rawValue && (!token || item.rawValue.includes(token)))) {
          stopQrCamera();
          camera.classList.remove("is-visible");
          cameraButton.textContent = "QR identificado";
          qrSimulatorRoot.querySelector("[data-qr-scan-action]")?.click();
          return;
        }
      } catch (error) {
        console.debug("Não foi possível ler o QR pela câmera.", error);
      }

      qrSimulatorState.cameraFrameId = window.requestAnimationFrame(scanFrame);
    };

    scanFrame();
  } catch (error) {
    stopQrCamera();
    showToolbarToast("Não foi possível acessar a câmera. Verifique a permissão do navegador.");
  }
};

const setupQrDragInteraction = () => {
  if (!qrSimulatorRoot) {
    return;
  }

  const hand = qrSimulatorRoot.querySelector("[data-qr-drag-hand]");
  const visual = qrSimulatorRoot.querySelector(".gate-ops-hero__visual");
  const scanTarget = qrSimulatorRoot.querySelector(".gate-ops-hero__scan");
  const scanButton = qrSimulatorRoot.querySelector("[data-qr-scan-action]");
  if (!hand || !visual || !scanTarget || !scanButton) {
    return;
  }

  let offsetX = 0;
  let offsetY = 0;

  hand.addEventListener("pointerdown", (event) => {
    if (scanButton.disabled || qrSimulatorRoot.dataset.qrCode !== "created") {
      return;
    }

    const handRect = hand.getBoundingClientRect();
    hand.setPointerCapture(event.pointerId);
    hand.classList.add("is-dragging");
    hand.style.right = "auto";
    hand.style.bottom = "auto";
    offsetX = event.clientX - handRect.left;
    offsetY = event.clientY - handRect.top;
  });

  hand.addEventListener("pointermove", (event) => {
    if (!hand.hasPointerCapture(event.pointerId)) {
      return;
    }

    const visualRect = visual.getBoundingClientRect();
    const handWidth = hand.offsetWidth;
    const handHeight = hand.offsetHeight;
    const left = Math.max(0, Math.min(event.clientX - visualRect.left - offsetX, visualRect.width - handWidth));
    const top = Math.max(0, Math.min(event.clientY - visualRect.top - offsetY, visualRect.height - handHeight));
    hand.style.left = `${left}px`;
    hand.style.top = `${top}px`;
  });

  hand.addEventListener("pointerup", (event) => {
    if (!hand.hasPointerCapture(event.pointerId)) {
      return;
    }

    const handRect = hand.getBoundingClientRect();
    const targetRect = scanTarget.getBoundingClientRect();
    const handCenterX = handRect.left + handRect.width / 2;
    const handCenterY = handRect.top + handRect.height / 2;
    const reachedReader = handCenterX >= targetRect.left
      && handCenterX <= targetRect.right
      && handCenterY >= targetRect.top
      && handCenterY <= targetRect.bottom;

    hand.releasePointerCapture(event.pointerId);
    hand.classList.remove("is-dragging");
    if (reachedReader) {
      scanButton.click();
    }
  });
};

const setupArmDragInteraction = () => {
  if (!qrSimulatorRoot) {
    return;
  }

  const arm = qrSimulatorRoot.querySelector("[data-qr-drag-arm]");
  const readerTarget = qrSimulatorRoot.querySelector("[data-qr-reader-target]");
  if (!arm || !readerTarget) {
    return;
  }

  let offsetX = 0;
  let offsetY = 0;
  let isScanning = false;
  let readerReached = false;

  const getPhoneRect = () => {
    const armRect = arm.getBoundingClientRect();
    return {
      left: armRect.left + armRect.width * 0.34,
      right: armRect.left + armRect.width * 0.69,
      top: armRect.top,
      bottom: armRect.top + armRect.height * 0.42,
    };
  };

  const scanQrFromDrag = async () => {
    const scanUrl = qrSimulatorRoot.dataset.scanUrl;
    if (!scanUrl || isScanning || qrSimulatorState.isBusy || qrSimulatorRoot.dataset.qrCode !== "created") {
      return;
    }

    isScanning = true;
    qrSimulatorState.isBusy = true;
    try {
      const snapshot = await postQrSimulatorAction(scanUrl);
      renderQrSimulatorStatus(snapshot);
    } catch (error) {
      console.error(error);
    } finally {
      isScanning = false;
      qrSimulatorState.isBusy = false;
    }
  };

  arm.addEventListener("pointerdown", (event) => {
    const armRect = arm.getBoundingClientRect();
    arm.setPointerCapture(event.pointerId);
    arm.classList.add("is-dragging");
    readerReached = false;
    arm.style.right = "auto";
    arm.style.bottom = "auto";
    offsetX = event.clientX - armRect.left;
    offsetY = event.clientY - armRect.top;
  });

  arm.addEventListener("pointermove", (event) => {
    if (!arm.hasPointerCapture(event.pointerId)) {
      return;
    }

    arm.style.left = `${event.clientX - offsetX}px`;
    arm.style.top = `${event.clientY - offsetY}px`;

    if (!readerReached) {
      const targetRect = readerTarget.getBoundingClientRect();
      const phoneRect = getPhoneRect();
      readerReached = phoneRect.left < targetRect.right
        && phoneRect.right > targetRect.left
        && phoneRect.top < targetRect.bottom
        && phoneRect.bottom > targetRect.top;
      if (readerReached) {
        scanQrFromDrag();
      }
    }
  });

  arm.addEventListener("pointerup", (event) => {
    if (!arm.hasPointerCapture(event.pointerId)) {
      return;
    }

    const targetRect = readerTarget.getBoundingClientRect();
    const phoneRect = getPhoneRect();
    const reachedReader = phoneRect.left < targetRect.right
      && phoneRect.right > targetRect.left
      && phoneRect.top < targetRect.bottom
      && phoneRect.bottom > targetRect.top;

    arm.releasePointerCapture(event.pointerId);
    arm.classList.remove("is-dragging");
    if (reachedReader && !readerReached) {
      scanQrFromDrag();
    }
  });
};

if (qrSimulatorRoot) {
  let simulatorStatusUrl = qrSimulatorRoot.dataset.statusUrl;
  const scanButton = qrSimulatorRoot.querySelector("[data-qr-scan-action]");
  const completeButton = qrSimulatorRoot.querySelector("[data-qr-complete-action]");
  const cameraButton = qrSimulatorRoot.querySelector("[data-qr-camera-action]");
  let scanUrl = qrSimulatorRoot.dataset.scanUrl;
  let validateUrl = qrSimulatorRoot.dataset.validateUrl;
  let completeUrl = qrSimulatorRoot.dataset.completeUrl;
  let retryUrl = qrSimulatorRoot.dataset.retryUrl;
  const retryButton = qrSimulatorRoot.querySelector("[data-qr-retry-action]");
  const layoutToggle = qrSimulatorRoot.querySelector("[data-layout-toggle]");
  const qrFocusToggle = qrSimulatorRoot.querySelector("[data-qr-focus-toggle]");
  const qrDisplay = qrSimulatorRoot.querySelector("[data-qr-display]");

  layoutToggle?.addEventListener("click", () => {
    const isSplit = qrSimulatorRoot.classList.toggle("is-split");
    layoutToggle.textContent = isSplit ? "Tela cheia" : "70/30";
    layoutToggle.setAttribute("aria-label", isSplit ? "Voltar para tela cheia" : "Alternar para o layout 70/30");
  });

  qrFocusToggle?.addEventListener("click", () => {
    const isFocused = qrSimulatorRoot.classList.toggle("is-qr-focus");
    qrFocusToggle.textContent = isFocused ? "Leitura normal" : "Modo leitura";
    qrFocusToggle.setAttribute("aria-pressed", String(isFocused));
    if (qrDisplay) {
      qrDisplay.hidden = !isFocused || qrSimulatorRoot.dataset.qrCode !== "created";
    }
  });

  retryButton?.addEventListener("click", async () => {
    if (!retryUrl || qrSimulatorState.isBusy) {
      return;
    }

    qrSimulatorState.isBusy = true;
    retryButton.disabled = true;
    try {
      const payload = await postQrSimulatorAction(retryUrl);
      updateQrSimulatorUrls(payload);
      simulatorStatusUrl = payload.status_url;
      scanUrl = payload.scan_url;
      validateUrl = payload.validate_url;
      completeUrl = payload.complete_url;
      retryUrl = payload.retry_url;
      const qrDisplay = qrSimulatorRoot.querySelector("[data-qr-display]");
      if (qrDisplay && payload.image_url) {
        qrDisplay.src = payload.image_url;
      }
      renderQrSimulatorStatus(payload.status);
    } catch (error) {
      console.error(error);
      showToolbarToast(error instanceof Error ? error.message : "Não foi possível gerar uma nova tentativa.");
    } finally {
      qrSimulatorState.isBusy = false;
      retryButton.disabled = false;
    }
  });

  setupQrDragInteraction();
  setupArmDragInteraction();

  const triggerQrScan = async () => {
    if (!scanUrl || qrSimulatorState.isBusy) {
      return;
    }

    if (qrDisplay) {
      qrDisplay.hidden = true;
    }
    qrSimulatorState.isBusy = true;
    updateQrSimulatorControls({ code: "created" });

    try {
      const snapshot = await postQrSimulatorAction(scanUrl);
      renderQrSimulatorStatus(snapshot);
    } catch (error) {
      console.error(error);
      showToolbarToast(error instanceof Error ? error.message : "Não foi possível simular a leitura do QR.");
    } finally {
      qrSimulatorState.isBusy = false;
      updateQrSimulatorControls({ code: qrSimulatorRoot.dataset.qrCode || "inactive" });
    }
  };

  scanButton?.addEventListener("click", triggerQrScan);
  qrDisplay?.addEventListener("click", triggerQrScan);

  completeButton?.addEventListener("click", async () => {
    if (!completeUrl || qrSimulatorState.isBusy) {
      return;
    }

    qrSimulatorState.isBusy = true;
    updateQrSimulatorControls({ code: "approved" });

    try {
      const snapshot = await postQrSimulatorAction(completeUrl);
      renderQrSimulatorStatus(snapshot);
    } catch (error) {
      console.error(error);
      showToolbarToast(error instanceof Error ? error.message : "Não foi possível concluir a passagem.");
    } finally {
      qrSimulatorState.isBusy = false;
      updateQrSimulatorControls({ code: qrSimulatorRoot.dataset.qrCode || "inactive" });
    }
  });

  cameraButton?.addEventListener("click", startQrCamera);

  if (simulatorStatusUrl) {
    let qrSimulatorPollId = null;

    const refreshQrSimulatorStatus = async () => {
      try {
        const response = await window.fetch(simulatorStatusUrl, {
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Não foi possível consultar o status (${response.status}).`);
        }

        const snapshot = await response.json();
        renderQrSimulatorStatus(snapshot);

        if (snapshot.is_final && qrSimulatorPollId) {
          clearQrValidationTimer();
          window.clearInterval(qrSimulatorPollId);
          qrSimulatorPollId = null;
        }
      } catch (error) {
        console.error(error);
      }
    };

    refreshQrSimulatorStatus();
    qrSimulatorPollId = window.setInterval(refreshQrSimulatorStatus, 1500);
  }
}

const historyChartsScript = document.querySelector("[data-history-charts]");
const widgetToggles = document.querySelectorAll("[data-widget-toggle]");
const widgetCards = document.querySelectorAll("[data-widget]");
const widgetStorageKey = "urbpay-history-widgets";

const renderEmptyState = (container, message) => {
  if (!container) {
    return;
  }

  container.innerHTML = `<div class="chart-empty">${message}</div>`;
};

const renderMonthlyChart = (container, items) => {
  if (!container) {
    return;
  }

  if (!items?.length) {
    renderEmptyState(container, "Ainda não há dados suficientes para o fluxo mensal.");
    return;
  }

  const maxValue = Math.max(...items.flatMap((item) => [item.debit, item.topup]), 1);
  container.innerHTML = items.map((item) => `
    <div class="mini-bar-group">
      <div class="mini-bar-group__bars">
        <div class="mini-bar mini-bar--debit" style="height:${Math.max((item.debit / maxValue) * 100, 8)}%">
          <span>R$ ${item.debit.toFixed(2).replace(".", ",")}</span>
        </div>
        <div class="mini-bar mini-bar--topup" style="height:${Math.max((item.topup / maxValue) * 100, 8)}%">
          <span>R$ ${item.topup.toFixed(2).replace(".", ",")}</span>
        </div>
      </div>
      <strong>${item.label}</strong>
    </div>
  `).join("");
};

const renderProgressChart = (container, items) => {
  if (!container) {
    return;
  }

  if (!items?.length || items.every((item) => !item.value)) {
    renderEmptyState(container, "Sem informações suficientes para este painel no momento.");
    return;
  }

  const maxValue = Math.max(...items.map((item) => item.value), 1);
  container.innerHTML = items.map((item) => `
    <div class="progress-row">
      <div class="progress-row__copy">
        <strong>${item.label}</strong>
        <span>${item.value}</span>
      </div>
      <div class="progress-row__track">
        <div class="progress-row__fill" style="width:${Math.max((item.value / maxValue) * 100, 12)}%"></div>
      </div>
    </div>
  `).join("");
};

const renderTimelineChart = (container, items) => {
  if (!container) {
    return;
  }

  if (!items?.length) {
    renderEmptyState(container, "Nenhuma movimentacao recente para compor a linha visual.");
    return;
  }

  container.innerHTML = items.slice().reverse().map((item) => `
    <div class="timeline-row">
      <span class="timeline-row__dot timeline-row__dot--${item.type.toLowerCase()}"></span>
      <div class="timeline-row__copy">
        <strong>${item.location}</strong>
        <p>${item.type} - ${item.status}</p>
      </div>
      <div class="timeline-row__meta">
        <strong>R$ ${item.amount.toFixed(2).replace(".", ",")}</strong>
        <span>${item.label}</span>
      </div>
    </div>
  `).join("");
};

const applyWidgetVisibility = (state) => {
  widgetCards.forEach((card) => {
    const widgetName = card.dataset.widget;
    const visible = state[widgetName] !== false;
    card.hidden = !visible;
  });

  widgetToggles.forEach((button) => {
    const widget = button.dataset.widgetToggle;
    const visible = state[widget] === true;

    button.classList.toggle("active", visible);
  });
};

if (historyChartsScript) {
  const chartData = JSON.parse(historyChartsScript.textContent);
  const monthlyChart = document.querySelector("[data-chart-monthly]");
  const yearlyChart = document.querySelector("[data-chart-yearly]");
  const statusChart = document.querySelector("[data-chart-status]");
  const locationChart = document.querySelector("[data-chart-locations]");
  const timelineChart = document.querySelector("[data-chart-timeline]");

  renderMonthlyChart(monthlyChart, chartData.monthly);
  renderProgressChart(yearlyChart, chartData.yearly);
  renderProgressChart(statusChart, chartData.status);
  renderProgressChart(locationChart, chartData.locations);
  renderTimelineChart(timelineChart, chartData.timeline);

  let widgetState = {};

  try {
    widgetState = JSON.parse(window.localStorage.getItem(widgetStorageKey) || "{}");
  } catch {
    widgetState = {};
  }

  applyWidgetVisibility(widgetState);
}

widgetToggles.forEach((button) => {
  button.addEventListener("click", () => {
    const widget = button.dataset.widgetToggle;

    const card = document.querySelector(
      `[data-widget="${widget}"]`
    );

    if (!card) return;

    card.hidden = !card.hidden;

    button.classList.toggle("active", !card.hidden);
  });
});

const monthlyModal =
  document.getElementById("monthlyModal");

const closeMonthlyModal =
  document.getElementById("closeMonthlyModal");

if (monthlyModal && closeMonthlyModal) {
  closeMonthlyModal.addEventListener("click", () => {
    monthlyModal.hidden = true;
  });
}

function setupModal(openId, modalId, closeId) {

  const modal = document.getElementById(modalId);
  const openBtn = document.getElementById(openId);
  const closeBtn = document.getElementById(closeId);

  if (!modal || !openBtn || !closeBtn) {
    return;
  }

  openBtn.addEventListener("click", () => {
    modal.hidden = false;
  });

  closeBtn.addEventListener("click", () => {
    modal.hidden = true;
  });

  const backdrop = modal.querySelector(".monthly-modal__backdrop");

  if (backdrop) {
    backdrop.addEventListener("click", () => {
      modal.hidden = true;
    });
  }
}

setupModal(
  "openMonthlyModal",
  "monthlyModal",
  "closeMonthlyModal"
);

setupModal(
  "openStatusModal",
  "statusModal",
  "closeStatusModal"
);

setupModal(
  "openLocationsModal",
  "locationsModal",
  "closeLocationsModal"
);

setupModal(
  "openTimelineModal",
  "timelineModal",
  "closeTimelineModal"
);

setupModal(
  "openTableModal",
  "tableModal",
  "closeTableModal"
);


// Função para abrir o modal
// ==========================================
// 1. GERENCIAMENTO DE MODAL (Configurações)
// ==========================================
function openUrbModal() {
  const modal = document.getElementById('settings-modal');
  if (modal) {
    modal.removeAttribute('hidden');
    modal.style.setProperty('display', 'flex', 'important');
    document.body.style.overflow = 'hidden';
  }
}

function closeUrbModal() {
  const modal = document.getElementById('settings-modal');
  if (modal) {
    modal.setAttribute('hidden', 'true');
    modal.style.setProperty('display', 'none', 'important');
    document.body.style.overflow = '';
  }
}


// ==========================================
// 3. EVENTOS AO CARREGAR O DOM
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // Modal: Fechamento por clique fora ou ESC
  const modal = document.getElementById('settings-modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeUrbModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && !modal.hasAttribute('hidden')) {
      closeUrbModal();
    }
  });
});

function mostrarAba(id, botao) {

  document.querySelectorAll('.aba').forEach(function (aba) {
    aba.classList.remove('ativa');
  });

  document.querySelectorAll('.menu-item').forEach(function (item) {
    item.classList.remove('active');
  });

  document.getElementById(id).classList.add('ativa');
  botao.classList.add('active');
}


document.addEventListener("DOMContentLoaded", () => {

  const form = document.querySelector(".signup-form");
  const termsModal = document.getElementById("termsModal");

  const openTerms = document.getElementById("openTerms");
  const cancelTerms = document.getElementById("cancelTerms");
  const confirmTerms = document.getElementById("confirmTerms");
  const acceptTerms = document.getElementById("acceptTerms");

  if (openTerms) {
    openTerms.addEventListener("click", () => {
      termsModal.classList.add("show");
    });
  }

  if (cancelTerms) {
    cancelTerms.addEventListener("click", () => {
      termsModal.classList.remove("show");
    });
  }

  if (confirmTerms) {
    confirmTerms.addEventListener("click", () => {

      if (!acceptTerms.checked) {
        alert("Você precisa aceitar os Termos de Uso.");
        return;
      }

      termsModal.classList.remove("show");

      if (form) {
        form.submit();
      }
    });
  }

});


document.addEventListener("DOMContentLoaded", () => {

  const hamburger = document.getElementById("urbHamburger");
  const sidebar = document.querySelector(".urb-sidebar");
  const overlay = document.getElementById("urbSidebarOverlay");

  if (!hamburger || !sidebar || !overlay) return;

  hamburger.addEventListener("click", () => {
    const isOpen = sidebar.classList.toggle("is-open");
    overlay.classList.toggle("is-open", isOpen);
    hamburger.setAttribute("aria-expanded", String(isOpen));
  });

  overlay.addEventListener("click", () => {
    sidebar.classList.remove("is-open");
    overlay.classList.remove("is-open");
    hamburger.setAttribute("aria-expanded", "false");
  });

  sidebar.addEventListener("click", (event) => {
    if (event.target.closest(".urb-nav-link")) {
      sidebar.classList.remove("is-open");
      overlay.classList.remove("is-open");
      hamburger.setAttribute("aria-expanded", "false");
    }
  });

});






document.addEventListener("click", function (e) {
  // Procura se o elemento clicado é o botão ou está dentro dele
  const toggleBtn = e.target.closest("#toggle-card-data");
  
  if (toggleBtn) {
    e.preventDefault();
    console.log("Olhinho clicado com sucesso!");

    const numElem = document.getElementById("card-number");
    const cvvElem = document.getElementById("card-cvv");
    const valElem = document.getElementById("card-validity");

    if (!numElem || !cvvElem || !valElem) {
      console.error("Elementos com ID card-number, card-cvv ou card-validity não foram encontrados.");
      return;
    }

    const isHidden = numElem.textContent.includes("••••");

    numElem.textContent = isHidden ? numElem.dataset.full : numElem.dataset.masked;
    cvvElem.textContent = isHidden ? cvvElem.dataset.full : cvvElem.dataset.masked;
    valElem.textContent = isHidden ? valElem.dataset.full : valElem.dataset.masked;
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('menuToggle');
  const menu = document.getElementById('siteMenu');

  if (toggleBtn && menu) {
    toggleBtn.addEventListener('click', () => {
      menu.classList.toggle('is-active');
    });

    document.querySelectorAll('.site-menu__link').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('is-active');
      });
    });
  }
});

document.addEventListener("click", function (e) {
  const eyeBtn = e.target.closest("#toggle-card-data");
  if (!eyeBtn) return;

document.addEventListener('DOMContentLoaded', () => {
    const lockBtn = document.getElementById('btn-toggle-lock-card');
    const lockLabel = document.getElementById('label-lock-card');
    const cardStatus = document.querySelector('.card-display-box__status');
    const cardImg = document.querySelector('.virtual-card-wrapper__img');

    if (lockBtn) {
        let isLocked = false;

        lockBtn.addEventListener('click', () => {
            isLocked = !isLocked;

            if (isLocked) {
                // Estado: Bloqueado
                lockLabel.innerText = "Desbloquear";
                if (cardStatus) {
                    cardStatus.innerText = "● Bloqueado";
                    cardStatus.style.color = "#e53e3e"; // Cor vermelha
                }
                if (cardImg) {
                    cardImg.style.filter = "grayscale(100%) opacity(0.6)"; // Efeito visual de bloqueado
                }
                alert("Cartão UrbPay bloqueado temporariamente com sucesso!");
            } else {
                // Estado: Ativo
                lockLabel.innerText = "Bloquear";
                if (cardStatus) {
                    cardStatus.innerText = "● Ativo";
                    cardStatus.style.color = "#38a169"; // Cor verde
                }
                if (cardImg) {
                    cardImg.style.filter = "none";
                }
                alert("Cartão UrbPay reativado com sucesso!");
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {

  // 1. NAVEGAÇÃO ENTRE PAINÉIS / TELAS (SIDEBAR E NAVEGAÇÃO)
  const navLinks = document.querySelectorAll('[data-dashboard-view]');
  const panels = document.querySelectorAll('[data-dashboard-panel]');

  if (navLinks.length > 0 && panels.length > 0) {
    navLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        const viewTarget = link.getAttribute('data-dashboard-view');

        // Se não for o botão de abrir a modal de cartão
        if (viewTarget && viewTarget !== 'new-card') {
          e.preventDefault();

          // Atualiza estado ativo nos botões do menu
          navLinks.forEach(function (l) {
            l.classList.remove('is-active');
          });
          link.classList.add('is-active');

          // Alterna exibição dos painéis
          panels.forEach(function (panel) {
            if (panel.getAttribute('data-dashboard-panel') === viewTarget) {
              panel.removeAttribute('hidden');
            } else {
              panel.setAttribute('hidden', '');
            }
          });
        }
      });
    });
  }

  // 2. MODAL DE SOLICITAR NOVO CARTÃO
  const cardModal = document.getElementById('modalNewCard');
  const triggerBtns = document.querySelectorAll('[data-open-card-modal], [data-dashboard-view="new-card"]');
  const closeBtns = cardModal ? cardModal.querySelectorAll('[data-modal-close]') : [];
  const formNewCard = document.getElementById('formNewCard');

  // Abrir Modal
  triggerBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      if (cardModal) {
        cardModal.classList.add('is-open');
        cardModal.setAttribute('aria-hidden', 'false');
      }
    });
  });

  // Fechar Modal
  closeBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (cardModal) {
        cardModal.classList.remove('is-open');
        cardModal.setAttribute('aria-hidden', 'true');
      }
    });
  });

  // Envio do Formulário (Permite o submit real para o Python/FastAPI)
  if (formNewCard) {
    formNewCard.addEventListener('submit', function () {
      // Removemos o preventDefault() e o alert() fictício.
      // O formulário agora envia a requisição normalmente para o banco de dados.
    });
  }

  // 3. NAVEGAÇÃO DO CARROSSEL DE CARTÕES
  const track = document.getElementById('cardsCarouselTrack');
  const prevBtn = document.getElementById('cardsCarouselPrev');
  const nextBtn = document.getElementById('cardsCarouselNext');

  if (track) {
    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        const firstCard = track.querySelector('.urb-card-slide');
        const scrollAmount = firstCard ? firstCard.offsetWidth + 16 : track.offsetWidth;
        track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        const firstCard = track.querySelector('.urb-card-slide');
        const scrollAmount = firstCard ? firstCard.offsetWidth + 16 : track.offsetWidth;
        track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      });
    }
  }

});



  e.preventDefault();

  const num = document.getElementById("card-number");
  const cvv = document.getElementById("card-cvv");
  const val = document.getElementById("card-validity");

  if (!num || !cvv || !val) return;

  const isMasked = num.textContent.trim().includes("•");

  num.textContent = isMasked ? num.dataset.full : num.dataset.masked;
  cvv.textContent = isMasked ? cvv.dataset.full : cvv.dataset.masked;
  val.textContent = isMasked ? val.dataset.full : val.dataset.masked;
});
                        

