// ============================================
// AGRIHIDRA - SISTEMA JAVASCRIPT COMPLETO
// ============================================

// Configuración de navegación entre páginas
const pageConfig = {
  inicio: "index.html",
  reportes: "pagina2.html",
  cultivos: "pagina3.html",
  alertas: "pagina4.html",
  riego: "pagina5.html",
  sensores: "pagina4.html",
  configuracion: "pagina7.html",
};

// ============================================
// 1. SISTEMA DE NAVEGACIÓN
// ============================================
function initNavigation() {
  const menuItems = document.querySelectorAll(".menu-item, .nav-item");

  menuItems.forEach((item) => {
    item.style.cursor = "pointer";
    item.addEventListener("click", function (e) {
      e.preventDefault();
      const page = this.getAttribute("data-page");
      if (pageConfig[page]) {
        // Animación de salida
        document.body.style.opacity = "0";
        document.body.style.transition = "opacity 0.3s";

        setTimeout(() => {
          window.location.href = pageConfig[page];
        }, 300);
      }
    });
  });
}

// ============================================
// 2. ACTUALIZACIÓN DE DATOS EN TIEMPO REAL
// ============================================
function updateRealTimeData() {
  // Simular actualización de temperatura
  const tempElements = document.querySelectorAll(
    '[data-metric="temperature"]'
  );
  tempElements.forEach((el) => {
    const currentTemp = parseInt(el.textContent);
    const newTemp = currentTemp + Math.floor(Math.random() * 3 - 1);
    el.textContent = newTemp + "°C";
  });

  // Simular actualización de humedad
  const humidityElements = document.querySelectorAll(
    '[data-metric="humidity"]'
  );
  humidityElements.forEach((el) => {
    const currentHumidity = parseInt(el.textContent);
    const newHumidity = Math.max(
      0,
      Math.min(100, currentHumidity + Math.floor(Math.random() * 5 - 2))
    );
    el.textContent = newHumidity + "%";

    // Actualizar barra de progreso si existe
    const progressBar = el.closest(".metric-card")?.querySelector(".progress-fill");
    if (progressBar) {
      progressBar.style.width = newHumidity + "%";
    }
  });

  // Actualizar timestamp
  const updateElements = document.querySelectorAll(".last-update, .sidebar-footer");
  updateElements.forEach((el) => {
    const now = new Date();
    el.innerHTML = `Última actualización<br><strong>Hace ${Math.floor(
      Math.random() * 5
    )} minutos</strong>`;
  });
}

// ============================================
// 3. SISTEMA DE ALERTAS INTERACTIVO
// ============================================
function initAlertSystem() {
  // Cerrar alertas
  const closeButtons = document.querySelectorAll(".alert-close");
  closeButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const alert = this.closest(".alert-banner, .alert-item");
      if (alert) {
        alert.style.animation = "slideOut 0.3s ease-out";
        setTimeout(() => {
          alert.style.display = "none";
        }, 300);
      }
    });
  });

  // Botones de acción en alertas
  const actionButtons = document.querySelectorAll(".alert-actions .btn");
  actionButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const alertItem = this.closest(".alert-item");
      if (alertItem) {
        showNotification("Acción ejecutada correctamente", "success");
        alertItem.style.opacity = "0.5";
      }
    });
  });
}

// ============================================
// 4. CONTROL DE RIEGO INTELIGENTE
// ============================================
function initIrrigationControl() {
  const powerButton = document.querySelector(".power-button");
  const startButton = document.querySelector(".btn-start-irrigation");
  let isActive = false;

  if (powerButton) {
    powerButton.addEventListener("click", function () {
      isActive = !isActive;
      const label = this.querySelector(".power-label");
      const icon = this.querySelector(".power-icon");

      if (isActive) {
        this.style.borderColor = "#10b981";
        icon.style.color = "#10b981";
        label.textContent = "ACTIVO";
        label.style.color = "#10b981";
        showNotification("Sistema de riego activado", "success");
      } else {
        this.style.borderColor = "#10b981";
        icon.style.color = "#10b981";
        label.textContent = "INACTIVO";
        label.style.color = "#6b7280";
        showNotification("Sistema de riego desactivado", "info");
      }
    });
  }

  if (startButton) {
    startButton.addEventListener("click", function () {
      if (!isActive && powerButton) {
        powerButton.click();
      }
      showNotification("Iniciando riego...", "success");
      simulateIrrigation();
    });
  }
}

function simulateIrrigation() {
  let duration = 0;
  const maxDuration = 30;
  const interval = setInterval(() => {
    duration++;
    const infoRow = document.querySelector(".info-row .info-value");
    if (infoRow) {
      infoRow.textContent = `En progreso (${duration}s)`;
    }

    if (duration >= maxDuration) {
      clearInterval(interval);
      showNotification("Riego completado", "success");
      if (infoRow) {
        infoRow.textContent = "Hace 0 minutos";
      }
    }
  }, 1000);
}

// ============================================
// 5. MAPA DE PARCELAS INTERACTIVO
// ============================================
function initParcelMap() {
  const parcels = document.querySelectorAll(".parcel, .zone");

  parcels.forEach((parcel, index) => {
    // Asignar colores aleatorios según estado
    const states = ["optimal", "moderate", "critical"];
    const colors = {
      optimal: "#10b981",
      moderate: "#f59e0b",
      critical: "#ef4444",
    };

    const randomState = states[Math.floor(Math.random() * states.length)];
    const stateData = {
      optimal: {
        bg: "#d1fae5",
        color: "#065f46",
        humidity: Math.floor(Math.random() * 20 + 70),
      },
      moderate: {
        bg: "#fef3c7",
        color: "#92400e",
        humidity: Math.floor(Math.random() * 20 + 40),
      },
      critical: {
        bg: "#fee2e2",
        color: "#991b1b",
        humidity: Math.floor(Math.random() * 20 + 20),
      },
    };

    parcel.addEventListener("click", function () {
      const state = stateData[randomState];
      showParcelDetails(this.textContent, state.humidity, randomState);
    });

    parcel.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.1)";
      this.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
      this.style.zIndex = "10";
    });

    parcel.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
      this.style.boxShadow = "none";
      this.style.zIndex = "1";
    });
  });
}

function showParcelDetails(parcelName, humidity, state) {
  const stateText = {
    optimal: "Óptimo",
    moderate: "Moderado",
    critical: "Crítico",
  };

  const modal = document.createElement("div");
  modal.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.3);
    z-index: 10000;
    min-width: 300px;
  `;

  modal.innerHTML = `
    <h3 style="margin-bottom: 15px; color: #1f2937;">Detalles de ${parcelName}</h3>
    <p style="margin-bottom: 10px;"><strong>Humedad:</strong> ${humidity}%</p>
    <p style="margin-bottom: 15px;"><strong>Estado:</strong> ${stateText[state]}</p>
    <button onclick="this.parentElement.remove(); document.querySelector('.modal-overlay').remove();" 
            style="width: 100%; padding: 10px; background: #10b981; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600;">
      Cerrar
    </button>
  `;

  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    z-index: 9999;
  `;
  overlay.onclick = () => {
    modal.remove();
    overlay.remove();
  };

  document.body.appendChild(overlay);
  document.body.appendChild(modal);
}

// ============================================
// 6. FILTROS Y BÚSQUEDA
// ============================================
function initFilters() {
  const filterButton = document.querySelector(".btn-filter");
  const filterDropdown = document.querySelector(".filter-dropdown");

  if (filterButton) {
    filterButton.addEventListener("click", function () {
      showNotification("Aplicando filtros...", "info");
      setTimeout(() => {
        showNotification("Filtros aplicados correctamente", "success");
      }, 1000);
    });
  }

  if (filterDropdown) {
    filterDropdown.addEventListener("change", function () {
      showNotification(`Región seleccionada: ${this.value}`, "info");
    });
  }
}

// ============================================
// 7. TOGGLE SWITCHES
// ============================================
function initToggleSwitches() {
  const toggles = document.querySelectorAll(".toggle-switch");

  toggles.forEach((toggle) => {
    toggle.addEventListener("click", function () {
      this.classList.toggle("on");
      this.classList.toggle("off");

      const label =
        this.previousElementSibling?.querySelector(".alert-item-label")
          ?.textContent || "Configuración";
      const isOn = this.classList.contains("on");

      showNotification(
        `${label} ${isOn ? "activada" : "desactivada"}`,
        isOn ? "success" : "info"
      );
    });
  });
}

// ============================================
// 8. TABLA DE AGRICULTORES INTERACTIVA
// ============================================
function initFarmersTable() {
  const tableRows = document.querySelectorAll(".table-row");

  tableRows.forEach((row) => {
    const actionButtons = row.querySelectorAll(".action-btn");

    actionButtons.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        const farmerName =
          row.querySelector(".farmer-name")?.textContent || "Agricultor";
        const action = this.title;
        showNotification(`${action}: ${farmerName}`, "info");
      });
    });

    row.addEventListener("click", function () {
      const farmerName =
        this.querySelector(".farmer-name")?.textContent || "Agricultor";
      const parcels =
        this.querySelector(".parcel-tags")?.textContent || "Sin parcelas";
      showFarmerDetails(farmerName, parcels);
    });
  });
}

function showFarmerDetails(name, parcels) {
  const modal = document.createElement("div");
  modal.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.3);
    z-index: 10000;
    min-width: 350px;
  `;

  modal.innerHTML = `
    <h3 style="margin-bottom: 15px; color: #1f2937;">Detalles del Agricultor</h3>
    <p style="margin-bottom: 10px;"><strong>Nombre:</strong> ${name}</p>
    <p style="margin-bottom: 10px;"><strong>Parcelas:</strong> ${parcels}</p>
    <p style="margin-bottom: 15px;"><strong>Contacto:</strong> +51 999 888 777</p>
    <button onclick="this.parentElement.remove(); document.querySelector('.modal-overlay').remove();" 
            style="width: 100%; padding: 10px; background: #10b981; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600;">
      Cerrar
    </button>
  `;

  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    z-index: 9999;
  `;
  overlay.onclick = () => {
    modal.remove();
    overlay.remove();
  };

  document.body.appendChild(overlay);
  document.body.appendChild(modal);
}

// ============================================
// 9. SISTEMA DE NOTIFICACIONES
// ============================================
function showNotification(message, type = "info") {
  const colors = {
    success: "#10b981",
    error: "#ef4444",
    warning: "#f59e0b",
    info: "#3b82f6",
  };

  const notification = document.createElement("div");
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${colors[type]};
    color: white;
    padding: 15px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    z-index: 10001;
    animation: slideInRight 0.3s ease-out;
    max-width: 300px;
    font-size: 14px;
    font-weight: 500;
  `;

  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.3s ease-out";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// ============================================
// 10. GRÁFICOS ANIMADOS
// ============================================
function initCharts() {
  const chartTabs = document.querySelectorAll(".chart-tab");

  chartTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      // Remover active de todos
      chartTabs.forEach((t) => t.classList.remove("active"));
      // Agregar active al clickeado
      this.classList.add("active");
      showNotification(`Cargando datos de ${this.textContent}`, "info");
    });
  });
}

// ============================================
// 11. GUARDAR CONFIGURACIÓN
// ============================================
function initConfigSave() {
  const saveButton = document.querySelector(".btn-save");

  if (saveButton) {
    saveButton.addEventListener("click", function () {
      this.textContent = "💾 Guardando...";
      this.disabled = true;

      setTimeout(() => {
        this.textContent = "✓ Guardado";
        showNotification("Configuración guardada correctamente", "success");

        setTimeout(() => {
          this.textContent = "💾 Guardar Configuración";
          this.disabled = false;
        }, 2000);
      }, 1500);
    });
  }
}

// ============================================
// 12. ANIMACIONES CSS DINÁMICAS
// ============================================
function addAnimations() {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes slideInRight {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    @keyframes slideOutRight {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(400px);
        opacity: 0;
      }
    }

    @keyframes slideOut {
      from {
        transform: translateY(0);
        opacity: 1;
      }
      to {
        transform: translateY(-20px);
        opacity: 0;
      }
    }

    .menu-item, .nav-item {
      transition: all 0.2s ease;
    }

    .menu-item:active, .nav-item:active {
      transform: scale(0.95);
    }
  `;
  document.head.appendChild(style);
}

// ============================================
// INICIALIZACIÓN PRINCIPAL
// ============================================
document.addEventListener("DOMContentLoaded", function () {
  console.log("🌱 AgriHidra System Initialized");

  // Inicializar todos los módulos
  initNavigation();
  initAlertSystem();
  initIrrigationControl();
  initParcelMap();
  initFilters();
  initToggleSwitches();
  initFarmersTable();
  initCharts();
  initConfigSave();
  addAnimations();

  // Actualizar datos cada 30 segundos
  setInterval(updateRealTimeData, 30000);

  // Animación de entrada
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s";
  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);

  // Mostrar notificación de bienvenida
  setTimeout(() => {
    showNotification("Sistema AgriHidra cargado correctamente", "success");
  }, 500);
});

// Exportar funciones para uso global
window.AgriHidra = {
  showNotification,
  updateRealTimeData,
  showParcelDetails,
  showFarmerDetails,
};
