const body = document.body;
const root = document.documentElement;
const revealItems = document.querySelectorAll("[data-reveal]");
const magneticItems = document.querySelectorAll("[data-magnetic]");
const floatingItems = document.querySelectorAll(".floating-card");
const signupModal = document.querySelector("[data-signup-modal]");
const signupOpeners = document.querySelectorAll("[data-signup-open]");
const signupClosers = document.querySelectorAll("[data-signup-close]");
const statusModal = document.querySelector("[data-status-modal]");
const statusModalClosers = document.querySelectorAll("[data-status-close]");
const toolbar = document.querySelector("[data-utility-toolbar]");
const toolbarToggleButtons = document.querySelectorAll("[data-toolbar-toggle]");
const themeToggleButtons = document.querySelectorAll("[data-theme-toggle]");
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
const creditSelectedCardNames = document.querySelectorAll("[data-credit-selected-card-name]");
const creditSelectedCardNumbers = document.querySelectorAll("[data-credit-selected-card-number]");
const creditSelectedTypes = document.querySelectorAll("[data-credit-selected-credit-type]");
const creditSelectedAmounts = document.querySelectorAll("[data-credit-selected-amount]");
const currentBalanceDisplays = document.querySelectorAll("[data-current-balance-display]");
const cardBalanceDisplays = document.querySelectorAll("[data-card-balance-id]");
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

const settingsStorage = {
  theme: "urbpay-theme",
  language: "urbpay-language",
  feedback: "urbpay-feedback-items",
};

const i18n = {
  "pt-BR": {
    "toolbar.languageTitle": "Idioma",
    "toolbar.themeTitle": "Aparencia",
    "toolbar.themeLight": "Modo claro",
    "toolbar.themeDark": "Modo escuro",
    "toolbar.notificationsTitle": "Notificacoes",
    "toolbar.notificationsHint": "Somente administradores podem enviar notificacoes para os usuarios.",
    "toolbar.notificationsDemoTitle": "Comunicado UrbPay",
    "toolbar.notificationsDemoBody": "Novas atualizacoes do portal serao exibidas aqui para os usuarios.",
    "toolbar.feedbackTitle": "Enviar sugestao",
    "toolbar.feedbackHint": "Qualquer usuario pode deixar uma sugestao para melhorar a plataforma.",
    "toolbar.feedbackPlaceholder": "Escreva sua ideia aqui",
    "toolbar.feedbackSubmit": "Enviar sugestao",
    "toolbar.profileAccount": "Minha conta",
    "toolbar.profilePassword": "Mudar senha",
    "toolbar.profileSecurity": "Seguranca",
    "toolbar.profileLogout": "Sair",
    "toolbar.feedbackSuccess": "Sugestao enviada com sucesso.",
    "toolbar.profilePending": "Esta area ainda esta em preparacao.",
    "dashboard.headerTitle": "Painel do Cliente",
    "dashboard.headerSubtitle": "Passagem QR segura, cartao digital e leitura rapida do seu historico.",
    "dashboard.historyLink": "Historico e extrato",
    "history.headerTitle": "Historico e Extrato",
    "history.headerSubtitle": "Painel configuravel para acompanhar o comportamento do seu cartao.",
    "history.backLink": "Voltar ao painel",
    "landing.brandSubtitle": "Portal de mobilidade urbana",
    "landing.navHome": "Inicio",
    "landing.navLogin": "Login",
    "landing.navHowItWorks": "Como funciona",
    "landing.navServices": "Servicos",
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
  root.dataset.theme = theme;
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
    return "concluidas";
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
    requestBoardBody.innerHTML = '<div class="request-board__empty">Nenhuma solicitacao encontrada com esse filtro.</div>';
  } else {
    requestBoardBody.innerHTML = filteredItems.map(renderRequestRow).join("");
  }

  const filterLabel = getRequestFilterLabel(requestBoardStatusSelect?.value || "in_progress");
  const countLabel = filteredItems.length === 1 ? "solicitacao" : "solicitacoes";
  let message = filteredItems.length
    ? `Mostrando ${filteredItems.length} ${countLabel} ${filterLabel}.`
    : "Nenhuma solicitacao encontrada com esse filtro.";

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
      throw new Error(`Nao foi possivel atualizar as solicitacoes (${response.status}).`);
    }

    const payload = await response.json();
    requestBoardState.items = Array.isArray(payload.items) ? payload.items : [];
    requestBoardState.lastSyncedAt = clickedAt;
    renderRequestBoard();
  } catch (error) {
    console.error(error);
    setRequestBoardFeedback("Nao foi possivel atualizar as solicitacoes agora.", true);
    showToolbarToast("Nao foi possivel atualizar as solicitacoes.");
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
    const author = role === "agent" ? item.agent_name || "Suporte UrbPay" : "Voce";

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
    throw new Error("Endpoint do suporte nao configurado.");
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

  let errorMessage = "Nao foi possivel enviar o e-mail do suporte.";

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

const setSignupState = (open) => {
  if (!signupModal) {
    return;
  }

  signupModal.classList.toggle("is-open", open);
  signupModal.setAttribute("aria-hidden", String(!open));
  body.classList.toggle("modal-open", open);
};

const setStatusModalState = (open) => {
  if (!statusModal) {
    return;
  }

  statusModal.classList.toggle("is-open", open);
  statusModal.setAttribute("aria-hidden", String(!open));
};

if (signupModal?.classList.contains("is-open")) {
  body.classList.add("modal-open");
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

statusModalClosers.forEach((button) => {
  button.addEventListener("click", () => setStatusModalState(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setSignupState(false);
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
    const nextTheme = getStoredTheme() === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
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
    if (button.dataset.profileAction === "account") {
      window.location.href = "/dashboard";
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
      showToolbarToast(error instanceof Error ? error.message : "Nao foi possivel enviar o e-mail do suporte.");
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
  currentBalance: 0,
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
  creditState.currentBalance = 0;
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

const updateCardBalanceDisplays = (cardId, nextBalance) => {
  const normalizedBalance = Number(nextBalance.toFixed(2));

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
      node.textContent = currencyFormatter.format(normalizedBalance);
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

creditConfirmButton?.addEventListener("click", () => {
  if (!creditState.cardId || !creditState.amount) {
    showToolbarToast("Escolha um cartao e um valor antes de confirmar.");
    return;
  }

  creditState.currentBalance += creditState.amount;
  updateCardBalanceDisplays(creditState.cardId, creditState.currentBalance);
  showToolbarToast(`Saldo atualizado em ${creditState.amountLabel}.`);
  clearCreditAmountSelection();
  updateCreditSummary();
  setServicePanel("credit-home");
  scrollServiceFlowIntoView();
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

    if (panelName === "student" || panelName === "teacher") {
      showToolbarToast("Este servico entra na proxima etapa.");
      return;
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

const applyQrTimelineState = (snapshot) => {
  if (!qrSimulatorRoot) {
    return;
  }

  const createdCard = qrSimulatorRoot.querySelector('[data-qr-stage-card="created"]');
  const openedCard = qrSimulatorRoot.querySelector('[data-qr-stage-card="opened"]');
  const resultCard = qrSimulatorRoot.querySelector('[data-qr-stage-card="result"]');
  const resultHeading = qrSimulatorRoot.querySelector("[data-qr-result-heading]");
  const resultCopy = qrSimulatorRoot.querySelector("[data-qr-result-copy]");

  setQrStageState(createdCard, null);
  setQrStageState(openedCard, null);
  setQrStageState(resultCard, null);

  if (resultHeading) {
    resultHeading.textContent = "Resultado da validacao";
  }

  if (resultCopy) {
    resultCopy.textContent = "A autorizacao final aparece aqui assim que o cliente concluir a compra.";
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

  if (snapshot.code === "invalid") {
    if (resultHeading) {
      resultHeading.textContent = snapshot.title;
    }

    if (resultCopy) {
      resultCopy.textContent = snapshot.message;
    }

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

  resultHeading.textContent = snapshot.title;
  resultCopy.textContent = snapshot.message;

  if (snapshot.code === "approved") {
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
  const turnstileNode = qrSimulatorRoot.querySelector("[data-qr-turnstile]");
  const appearances = ["pending", "active", "success", "error", "warning", "muted"];

  if (labelNode) {
    labelNode.textContent = snapshot.label;
    appearances.forEach((appearance) => {
      labelNode.classList.remove(`gate-status-badge--${appearance}`);
    });
    labelNode.classList.add(`gate-status-badge--${snapshot.appearance || "muted"}`);
  }

  if (titleNode) {
    titleNode.textContent = snapshot.title;
  }

  if (messageNode) {
    messageNode.textContent = snapshot.message;
  }

  if (balanceNode) {
    balanceNode.textContent = snapshot.current_balance || snapshot.balance;
  }

  if (expiryNode) {
    const isWaiting = snapshot.code === "created" || snapshot.code === "opened";
    expiryNode.textContent = isWaiting ? formatCountdown(Number(snapshot.remaining_seconds || 0)) : snapshot.label;
  }

  if (turnstileNode) {
    appearances.forEach((appearance) => {
      turnstileNode.classList.remove(`gate-turnstile--${appearance}`);
    });
    turnstileNode.classList.add(`gate-turnstile--${snapshot.appearance || "muted"}`);
  }

  applyQrTimelineState(snapshot);
};

if (qrSimulatorRoot) {
  const simulatorStatusUrl = qrSimulatorRoot.dataset.statusUrl;

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
          throw new Error(`Nao foi possivel consultar o status (${response.status}).`);
        }

        const snapshot = await response.json();
        renderQrSimulatorStatus(snapshot);

        if (snapshot.is_final && qrSimulatorPollId) {
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
  container.innerHTML = `<div class="chart-empty">${message}</div>`;
};

const renderMonthlyChart = (container, items) => {
  if (!items?.length) {
    renderEmptyState(container, "Ainda nao ha dados suficientes para o fluxo mensal.");
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
  if (!items?.length || items.every((item) => !item.value)) {
    renderEmptyState(container, "Sem informacoes suficientes para este painel no momento.");
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

  widgetToggles.forEach((toggle) => {
    const visible = state[toggle.value] !== false;
    toggle.checked = visible;
  });
};

if (historyChartsScript) {
  const chartData = JSON.parse(historyChartsScript.textContent);
  const monthlyChart = document.querySelector("[data-chart-monthly]");
  const statusChart = document.querySelector("[data-chart-status]");
  const locationChart = document.querySelector("[data-chart-locations]");
  const timelineChart = document.querySelector("[data-chart-timeline]");

  renderMonthlyChart(monthlyChart, chartData.monthly);
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

  widgetToggles.forEach((toggle) => {
    toggle.addEventListener("change", () => {
      widgetState[toggle.value] = toggle.checked;
      window.localStorage.setItem(widgetStorageKey, JSON.stringify(widgetState));
      applyWidgetVisibility(widgetState);
    });
  });
}
