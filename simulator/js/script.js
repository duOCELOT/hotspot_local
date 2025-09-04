// User credentials database
const users = {
    administrator: { 
        admin: 'admin123' 
    },
    receptionist: { 
        recepcao01: 'recep123',
        recepcao02: 'recep456'
    }
};

// Avatar messages
const avatarMessages = [
    "Olá! Bem-vindo ao Resort Fazenda 3 Pinheiros!",
    "Precisa de ajuda com a conexão Wi-Fi?",
    "Aproveite sua estadia no resort!",
    "Se tiver problemas, entre em contato com a recepção!",
    "Nosso sistema Wi-Fi está funcionando perfeitamente!",
    "Dica: Mantenha seus dispositivos atualizados para melhor conexão!"
];

/**
 * Main sign-in function
 * Handles authentication for all user types
 */
function signIn(type) {
    const field1 = document.getElementById('field1').value.trim();
    const field2 = document.getElementById('field2').value.trim();
    
    if (!field1 || !field2) {
        showAlert('Por favor, preencha todos os campos');
        return;
    }
    
    let isValid = false;
    
    try {
        switch(type) {
            case 'guest':
                document.getElementById('currentRoom').textContent = field1;
                isValid = true;
                break;
                
            case 'event':
                document.getElementById('eventParticipant').textContent = field2;
                isValid = true;
                break;
                
            case 'visitor':
                document.getElementById('visitorCurrentName').textContent = field1;
                isValid = true;
                break;
                
            case 'administrator':
                if (users.administrator[field1] === field2) {
                    document.getElementById('adminCurrentUser').textContent = field1;
                    isValid = true;
                } else {
                    showAlert('Credenciais inválidas para administrador');
                    return;
                }
                break;
                
            case 'receptionist':
                if (users.receptionist[field1] === field2) {
                    document.getElementById('receptionCurrentUser').textContent = field1;
                    isValid = true;
                } else {
                    showAlert('Credenciais inválidas para recepcionista');
                    return;
                }
                break;
                
            default:
                showAlert('Tipo de acesso inválido');
                return;
        }
        
        if (isValid) {
            showDashboard(type);
            clearLoginFields();
        }
        
    } catch (error) {
        console.error('Error during sign in:', error);
        showAlert('Erro interno. Tente novamente.');
    }
}

/**
 * Display the appropriate dashboard
 */
function showDashboard(type) {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById(type + 'Dashboard').classList.add('active');
}

/**
 * Logout function - return to login screen
 */
function logout() {
    try {
        // Hide all dashboards
        document.querySelectorAll('.dashboard').forEach(dashboard => {
            dashboard.classList.remove('active');
        });
        
        // Show login screen
        document.getElementById('loginScreen').style.display = 'block';
        
        // Clear login fields
        clearLoginFields();
        
    } catch (error) {
        console.error('Error during logout:', error);
    }
}

/**
 * Clear login input fields
 */
function clearLoginFields() {
    document.getElementById('field1').value = '';
    document.getElementById('field2').value = '';
}

/**
 * Show alert message
 */
function showAlert(message) {
    alert(message);
}

/**
 * Toggle avatar visibility
 */
function toggleAvatar() {
    try {
        const avatar = document.getElementById('avatar');
        const toggleBtn = document.getElementById('avatarToggle');
        
        if (avatar.classList.contains('show')) {
            avatar.classList.remove('show');
            toggleBtn.textContent = '🦆';
            toggleBtn.title = 'Mostrar assistente';
        } else {
            avatar.classList.add('show');
            toggleBtn.textContent = '❌';
            toggleBtn.title = 'Esconder assistente';
        }
    } catch (error) {
        console.error('Error toggling avatar:', error);
    }
}

/**
 * Avatar click handler - show random message
 */
function avatarClick() {
    try {
        const message = avatarMessages[Math.floor(Math.random() * avatarMessages.length)];
        showAvatarMessage(message);
    } catch (error) {
        console.error('Error in avatar click:', error);
    }
}

/**
 * Display avatar message bubble
 */
function showAvatarMessage(message) {
    const bubble = document.createElement('div');
    bubble.style.cssText = `
        position: fixed;
        bottom: 110px;
        right: 20px;
        background: rgba(45, 90, 45, 0.95);
        color: white;
        padding: 12px 16px;
        border-radius: 15px;
        max-width: 250px;
        font-size: 14px;
        z-index: 1001;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        transform: translateY(20px);
        opacity: 0;
        transition: all 0.3s ease;
        word-wrap: break-word;
    `;
    bubble.textContent = message;
    
    document.body.appendChild(bubble);
    
    // Animate in
    setTimeout(() => {
        bubble.style.transform = 'translateY(0)';
        bubble.style.opacity = '1';
    }, 10);
    
    // Animate out and remove
    setTimeout(() => {
        bubble.style.opacity = '0';
        bubble.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            if (document.body.contains(bubble)) {
                document.body.removeChild(bubble);
            }
        }, 300);
    }, 4000);
}

/**
 * Initialize application when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Hotel Wi-Fi System initialized');
    
    // Add enter key support for login fields
    const loginFields = document.querySelectorAll('.input-field');
    loginFields.forEach(field => {
        field.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                // Focus next field or trigger default action
                const nextField = field.nextElementSibling;
                if (nextField && nextField.classList.contains('input-field')) {
                    nextField.focus();
                }
            }
        });
    });
});

/**
 * Admin functions
 */
function manageUsers() {
    showAlert('Função de gerenciamento de usuários em desenvolvimento');
}

function configureNetwork() {
    showAlert('Função de configuração de rede em desenvolvimento');
}

function viewLogs() {
    showAlert('Função de visualização de logs em desenvolvimento');
}

function systemSettings() {
    showAlert('Função de configurações do sistema em desenvolvimento');
}

/**
 * Receptionist functions
 */
function createGuestAccess() {
    const guestName = prompt('Digite o nome do hóspede:');
    if (guestName) {
        const roomNumber = prompt('Digite o número do quarto:');
        if (roomNumber) {
            showAlert(`Acesso criado para ${guestName} - Quarto ${roomNumber}`);
        }
    }
}

function technicalSupport() {
    showAlert('Entrando em contato com suporte técnico...');
}

// Export functions for global access (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        signIn,
        logout,
        toggleAvatar,
        avatarClick,
        manageUsers,
        configureNetwork,
        viewLogs,
        systemSettings,
        createGuestAccess,
        technicalSupport
    };
}