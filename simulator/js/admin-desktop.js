// Admin Desktop JavaScript

// User credentials
const adminUsers = {
    administrator: { 
        admin: 'admin123',
        admin2: 'admin456' 
    },
    receptionist: { 
        recepcao01: 'recep123',
        recepcao02: 'recep456'
    }
};

// Current user state
let currentUserType = 'administrator';
let currentUser = null;

/**
 * Select access type (administrator or receptionist)
 */
function selectAccess(type) {
    currentUserType = type;
    
    // Update UI
    document.querySelectorAll('.access-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-type="${type}"]`).classList.add('active');
    
    // Clear form
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}

/**
 * Sign in function
 */
function signIn() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    
    if (!username || !password) {
        showAlert('Por favor, preencha usuário e senha');
        return;
    }
    
    // Check credentials
    if (adminUsers[currentUserType] && adminUsers[currentUserType][username] === password) {
        currentUser = username;
        showDashboard(currentUserType);
        updateUserInfo(username, currentUserType);
    } else {
        showAlert('Credenciais inválidas');
    }
}

/**
 * Show dashboard based on user type
 */
function showDashboard(userType) {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById(userType + 'Dashboard').classList.add('active');
    
    // Start real-time updates
    startRealTimeUpdates();
}

/**
 * Update user info in header
 */
function updateUserInfo(username, userType) {
    if (userType === 'administrator') {
        document.getElementById('adminUserName').textContent = username;
    } else {
        document.getElementById('receptionUserName').textContent = username;
    }
}

/**
 * Logout function
 */
function logout() {
    if (confirm('Tem certeza que deseja sair do sistema?')) {
        // Hide all dashboards
        document.querySelectorAll('.dashboard').forEach(dashboard => {
            dashboard.classList.remove('active');
        });
        
        // Show login screen
        document.getElementById('loginScreen').style.display = 'flex';
        
        // Clear form
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        
        // Reset state
        currentUser = null;
        currentUserType = 'administrator';
        selectAccess('administrator');
        
        // Stop updates
        stopRealTimeUpdates();
    }
}

/**
 * Show alert
 */
function showAlert(message) {
    const alertDiv = document.createElement('div');
    alertDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #e74c3c;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 3000;
        font-size: 14px;
        font-weight: 600;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        animation: slideIn 0.3s ease;
    `;
    
    alertDiv.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <span>⚠️</span>
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: none;
                border: none;
                color: white;
                font-size: 18px;
                cursor: pointer;
                margin-left: 10px;
            ">×</button>
        </div>
    `;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(alertDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(alertDiv)) {
            alertDiv.remove();
        }
    }, 5000);
}

// Admin Functions
function manageUsers() {
    showAlert('Módulo de Gerenciamento de Usuários em desenvolvimento');
}

function configureNetwork() {
    showAlert('Módulo de Configuração de Rede em desenvolvimento');
}

function viewLogs() {
    showAlert('Módulo de Logs do Sistema em desenvolvimento');
}

function systemSettings() {
    showAlert('Módulo de Configurações em desenvolvimento');
}

function manageVLANs() {
    showAlert('Módulo de Gerenciamento de VLANs em desenvolvimento');
}

function backupSystem() {
    if (confirm('Deseja iniciar um backup completo do sistema?')) {
        showAlert('Backup iniciado. Você será notificado quando concluído.');
    }
}

function refreshActivity() {
    showAlert('Atividades atualizadas');
    
    // Simulate refresh with animation
    const refreshBtn = document.querySelector('.refresh-btn');
    const originalText = refreshBtn.innerHTML;
    
    refreshBtn.innerHTML = '🔄';
    refreshBtn.style.animation = 'spin 1s linear';
    
    setTimeout(() => {
        refreshBtn.innerHTML = originalText;
        refreshBtn.style.animation = '';
    }, 1000);
}

// Receptionist Functions
function createGuestAccess() {
    const room = document.getElementById('newGuestRoom').value.trim();
    const name = document.getElementById('newGuestName').value.trim();
    
    if (!room || !name) {
        showAlert('Por favor, preencha o número do quarto e nome do hóspede');
        return;
    }
    
    if (!/^\d{1,3}$/.test(room)) {
        showAlert('Número do quarto deve ser numérico (1-999)');
        return;
    }
    
    // Simulate creation
    showSuccessAlert(`Acesso criado para ${name} - Quarto ${room}`);
    
    // Clear form
    document.getElementById('newGuestRoom').value = '';
    document.getElementById('newGuestName').value = '';
}

function createVisitorAccess() {
    const name = document.getElementById('newVisitorName').value.trim();
    const duration = document.getElementById('visitorDuration').value;
    
    if (!name) {
        showAlert('Por favor, digite o nome do visitante');
        return;
    }
    
    // Generate QR code modal
    showQRCodeModal(name, duration);
    
    // Clear form
    document.getElementById('newVisitorName').value = '';
}

function showQRCodeModal(name, duration) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3000;
    `;
    
    modal.innerHTML = `
        <div style="
            background: white;
            border-radius: 16px;
            padding: 40px;
            text-align: center;
            max-width: 400px;
            width: 90%;
        ">
            <h2 style="margin-bottom: 20px; color: #2c3e50;">QR Code Gerado</h2>
            <div style="
                background: #f8f9fa;
                width: 200px;
                height: 200px;
                margin: 20px auto;
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 2px solid #ecf0f1;
            ">
                <div style="text-align: center;">
                    <div style="font-size: 60px; margin-bottom: 10px;">📱</div>
                    <div style="font-weight: bold; color: #2c3e50;">QR CODE</div>
                </div>
            </div>
            <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <strong>Visitante:</strong> ${name}<br>
                <strong>Duração:</strong> ${duration} hora(s)<br>
                <strong>Código:</strong> VIS-${Math.floor(Math.random() * 10000)}
            </div>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: #27ae60;
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 8px;
                font-size: 16px;
                cursor: pointer;
            ">Fechar</button>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function resolveIssue(roomOrLocation) {
    if (confirm(`Marcar problema do ${typeof roomOrLocation === 'number' ? 'Quarto ' + roomOrLocation : roomOrLocation} como resolvido?`)) {
        showSuccessAlert('Problema marcado como resolvido');
        
        // Update notification badge
        const badge = document.querySelector('.notification-badge');
        if (badge) {
            const current = parseInt(badge.textContent);
            if (current > 1) {
                badge.textContent = current - 1;
            } else {
                badge.style.display = 'none';
            }
        }
    }
}

function showSuccessAlert(message) {
    const alertDiv = document.createElement('div');
    alertDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 3000;
        font-size: 14px;
        font-weight: 600;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        animation: slideIn 0.3s ease;
    `;
    
    alertDiv.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <span>✅</span>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        if (document.body.contains(alertDiv)) {
            alertDiv.remove();
        }
    }, 3000);
}

// Real-time updates
let updateInterval;

function startRealTimeUpdates() {
    updateInterval = setInterval(() => {
        updateStats();
        updateActivity();
    }, 30000); // Update every 30 seconds
}

function stopRealTimeUpdates() {
    if (updateInterval) {
        clearInterval(updateInterval);
    }
}

function updateStats() {
    // Simulate stat updates
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const currentValue = parseInt(stat.textContent);
        if (!isNaN(currentValue)) {
            // Small random variation to simulate real-time updates
            const variation = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
            const newValue = Math.max(0, currentValue + variation);
            
            if (stat.textContent.includes('%')) {
                stat.textContent = Math.min(100, newValue) + '%';
            } else if (stat.textContent.includes('GB')) {
                stat.textContent = (newValue / 10).toFixed(1) + 'GB';
            } else {
                stat.textContent = newValue;
            }
        }
    });
}

function updateActivity() {
    // Simulate new activity (low frequency)
    if (Math.random() < 0.1) { // 10% chance
        const activities = [
            'Novo hóspede conectado - Quarto ' + Math.floor(Math.random() * 300 + 100),
            'AP-0' + Math.floor(Math.random() * 6 + 1) + ' status atualizado',
            'Backup automático em andamento',
            'Sistema de logs rotacionado',
            'Visitante temporário criado'
        ];
        
        const newActivity = activities[Math.floor(Math.random() * activities.length)];
        console.log('Nova atividade simulada:', newActivity);
    }
}

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    console.log('Admin Desktop App initialized');
    
    // Set default access type
    selectAccess('administrator');
    
    // Add enter key support for login
    document.getElementById('username').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.getElementById('password').focus();
        }
    });
    
    document.getElementById('password').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            signIn();
        }
    });
    
    // Add loading states to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Add subtle loading effect
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
        });
    });
});

// Handle window resize for responsive design
window.addEventListener('resize', function() {
    // Adjust layouts if needed
    const dashboards = document.querySelectorAll('.dashboard.active');
    if (dashboards.length > 0) {
        // Trigger reflow for better responsive behavior
        dashboards.forEach(dashboard => {
            dashboard.style.display = 'none';
            setTimeout(() => {
                dashboard.style.display = 'flex';
            }, 1);
        });
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl+L or Cmd+L to focus on login
    if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        const usernameField = document.getElementById('username');
        if (usernameField && usernameField.offsetParent !== null) {
            usernameField.focus();
        }
    }
    
    // Escape to logout (when logged in)
    if (e.key === 'Escape') {
        const activeDashboard = document.querySelector('.dashboard.active');
        if (activeDashboard) {
            logout();
        }
    }
});

// Prevent right-click context menu for security
document.addEventListener('contextmenu', function(e) {
    if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
    }
});

// Auto-logout after inactivity (30 minutes)
let inactivityTimer;

function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
        const activeDashboard = document.querySelector('.dashboard.active');
        if (activeDashboard) {
            alert('Sessão expirada por inatividade. Você será desconectado.');
            logout();
        }
    }, 30 * 60 * 1000); // 30 minutes
}

// Track user activity
['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
    document.addEventListener(event, resetInactivityTimer, true);
});

// Export functions for global access
if (typeof window !== 'undefined') {
    window.adminApp = {
        selectAccess,
        signIn,
        logout,
        manageUsers,
        configureNetwork,
        viewLogs,
        systemSettings,
        manageVLANs,
        backupSystem,
        refreshActivity,
        createGuestAccess,
        createVisitorAccess,
        resolveIssue
    };
}