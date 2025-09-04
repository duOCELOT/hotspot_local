// Guest Mobile App JavaScript

// Avatar messages for guests
const guestMessages = [
    "Bem-vindo ao Resort Fazenda 3 Pinheiros!",
    "Sua conexão Wi-Fi está funcionando perfeitamente!",
    "Aproveite sua estadia em nosso resort!",
    "Precisa de ajuda? A recepção está sempre disponível!",
    "Dica: Mantenha o Wi-Fi ativo para acompanhar seu consumo em tempo real!"
];

/**
 * Connect guest to Wi-Fi
 */
function connectGuest() {
    const room = document.getElementById('roomField').value.trim();
    const id = document.getElementById('idField').value.trim();
    
    if (!room || !id) {
        showMobileAlert('Por favor, preencha o número do quarto e o código de identificação');
        return;
    }
    
    // Validate room number (basic validation)
    if (!/^\d{1,3}$/.test(room)) {
        showMobileAlert('Número do quarto inválido');
        return;
    }
    
    try {
        // Update room display
        document.getElementById('currentRoom').textContent = room;
        
        // Show connecting animation
        showConnectingAnimation();
        
        // Simulate connection delay
        setTimeout(() => {
            hideConnectingAnimation();
            showGuestDashboard();
            clearLoginFields();
            
            // Welcome message
            setTimeout(() => {
                avatarClick();
            }, 1000);
            
        }, 2000);
        
    } catch (error) {
        console.error('Connection error:', error);
        showMobileAlert('Erro na conexão. Tente novamente.');
    }
}

/**
 * Show guest dashboard
 */
function showGuestDashboard() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('guestDashboard').classList.add('active');
    
    // Start data usage animation
    animateDataUsage();
}

/**
 * Show connecting animation
 */
function showConnectingAnimation() {
    const btn = document.querySelector('.connect-btn');
    const originalText = btn.innerHTML;
    
    btn.disabled = true;
    btn.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <div style="width: 20px; height: 20px; border: 2px solid rgba(255,255,255,0.3); border-top: 2px solid white; border-radius: 50%; animation: spin 1s linear infinite;"></div>
            Conectando...
        </div>
    `;
    
    // Add spin animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    btn._originalText = originalText;
}

/**
 * Hide connecting animation
 */
function hideConnectingAnimation() {
    const btn = document.querySelector('.connect-btn');
    if (btn._originalText) {
        btn.innerHTML = btn._originalText;
        btn.disabled = false;
    }
}

/**
 * Animate data usage bar
 */
function animateDataUsage() {
    const usageFill = document.querySelector('.usage-fill');
    if (usageFill) {
        let width = 0;
        const targetWidth = 35;
        
        const animate = () => {
            if (width < targetWidth) {
                width += 1;
                usageFill.style.width = width + '%';
                requestAnimationFrame(animate);
            }
        };
        
        animate();
    }
}

/**
 * Logout function
 */
function logout() {
    if (confirm('Tem certeza que deseja desconectar do Wi-Fi?')) {
        document.getElementById('guestDashboard').classList.remove('active');
        document.getElementById('loginScreen').style.display = 'block';
        clearLoginFields();
    }
}

/**
 * Clear login fields
 */
function clearLoginFields() {
    document.getElementById('roomField').value = '';
    document.getElementById('idField').value = '';
}

/**
 * Show mobile-optimized alert
 */
function showMobileAlert(message) {
    // Create custom alert for better mobile experience
    const alertDiv = document.createElement('div');
    alertDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 20px 25px;
        border-radius: 12px;
        z-index: 2000;
        text-align: center;
        max-width: 300px;
        font-size: 16px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    `;
    
    alertDiv.innerHTML = `
        <div style="margin-bottom: 20px;">${message}</div>
        <button onclick="this.parentElement.remove()" style="
            background: #2d5a2d;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 16px;
            cursor: pointer;
        ">OK</button>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(alertDiv)) {
            alertDiv.remove();
        }
    }, 5000);
}

/**
 * Show full bill modal
 */
function showFullBill() {
    const billModal = document.createElement('div');
    billModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        z-index: 2000;
        overflow-y: auto;
        padding: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    billModal.innerHTML = `
        <div style="
            background: #2d2d2d;
            border-radius: 16px;
            padding: 30px;
            width: 100%;
            max-width: 400px;
            color: white;
            position: relative;
        ">
            <button onclick="this.parentElement.parentElement.remove()" style="
                position: absolute;
                top: 15px;
                right: 15px;
                background: none;
                border: none;
                color: #aaa;
                font-size: 24px;
                cursor: pointer;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
            ">×</button>
            <h2 style="margin-bottom: 20px; color: #2d5a2d; text-align: center;">Conta Completa - Quarto ${document.getElementById('currentRoom').textContent || '--'}</h2>
            
            <div style="background: #333; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                <strong>Período da Estadia:</strong><br>
                Check-in: 22/09/2025 - 14:00<br>
                Check-out: 25/09/2025 - 12:00
            </div>
            
            <div style="margin-bottom: 20px;">
                <h3 style="color: #2d5a2d; margin-bottom: 10px;">Hospedagem & Serviços:</h3>
                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                    <span>Diária Apart. Luxo (3 noites)</span>
                    <span>R$ 450,00</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                    <span>Wi-Fi Premium</span>
                    <span style="color: #2d5a2d;">Grátis</span>
                </div>
                
                <h3 style="color: #2d5a2d; margin-bottom: 10px;">Consumo & Atividades:</h3>
                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                    <span>Água Mineral 500ml (3x)</span>
                    <span>R$ 15,00</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                    <span>Refrigerante Lata (2x)</span>
                    <span>R$ 12,00</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                    <span>Passeio a Cavalo (2x)</span>
                    <span>R$ 120,00</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                    <span>Cerveja Long Neck (4x)</span>
                    <span>R$ 32,00</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                    <span>Jantar Restaurante (2x)</span>
                    <span>R$ 85,00</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                    <span>Drinks no Bar (6x)</span>
                    <span>R$ 90,00</span>
                </div>
            </div>
            
            <div style="background: #2d5a2d; padding: 20px; border-radius: 8px; text-align: center;">
                <div style="display: flex; justify-content: space-between; font-size: 14px; margin-bottom: 5px;">
                    <span>Subtotal Hospedagem:</span>
                    <span>R$ 450,00</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 14px; margin-bottom: 5px;">
                    <span>Subtotal Consumo:</span>
                    <span>R$ 354,00</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 14px; margin-bottom: 10px;">
                    <span>Taxa de Serviço (10%):</span>
                    <span>R$ 35,40</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 18px; font-weight: bold; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.3);">
                    <span>TOTAL:</span>
                    <span>R$ 839,40</span>
                </div>
            </div>
            
            <div style="background: rgba(45, 90, 45, 0.2); padding: 15px; border-radius: 8px; margin-top: 15px; text-align: center; font-size: 14px;">
                💳 Cobrança automática no check-out<br>
                Cartão final 1234
            </div>
        </div>
    `;
    
    document.body.appendChild(billModal);
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
        } else {
            avatar.classList.add('show');
            toggleBtn.textContent = '❌';
        }
    } catch (error) {
        console.error('Error toggling avatar:', error);
    }
}

/**
 * Avatar click handler
 */
function avatarClick() {
    try {
        const message = guestMessages[Math.floor(Math.random() * guestMessages.length)];
        showAvatarMessage(message);
    } catch (error) {
        console.error('Error in avatar click:', error);
    }
}

/**
 * Show avatar message
 */
function showAvatarMessage(message) {
    const bubble = document.createElement('div');
    bubble.style.cssText = `
        position: fixed;
        bottom: 130px;
        right: 20px;
        background: rgba(45, 90, 45, 0.95);
        color: white;
        padding: 15px 20px;
        border-radius: 16px;
        max-width: 250px;
        font-size: 14px;
        z-index: 1001;
        box-shadow: 0 8px 25px rgba(0,0,0,0.3);
        transform: translateY(20px);
        opacity: 0;
        transition: all 0.3s ease;
        word-wrap: break-word;
        backdrop-filter: blur(10px);
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
 * Initialize mobile app
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Guest Mobile App initialized');
    
    // Add enter key support
    const inputs = document.querySelectorAll('.input-field');
    inputs.forEach((input, index) => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                if (index < inputs.length - 1) {
                    inputs[index + 1].focus();
                } else {
                    connectGuest();
                }
            }
        });
    });
    
    // Touch feedback for buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.opacity = '0.8';
        });
        
        button.addEventListener('touchend', function() {
            this.style.opacity = '1';
        });
    });
    
    // Prevent zoom on input focus (iOS Safari)
    const viewport = document.querySelector('meta[name=viewport]');
    if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    }
});

// Auto-update data usage simulation
setInterval(() => {
    const usageFill = document.querySelector('.usage-fill');
    if (usageFill && document.getElementById('guestDashboard') && document.getElementById('guestDashboard').classList.contains('active')) {
        const currentWidth = parseInt(usageFill.style.width) || 35;
        if (currentWidth < 45) {
            usageFill.style.width = (currentWidth + Math.random() * 2) + '%';
            
            // Update usage text
            const newUsage = Math.floor(350 + (currentWidth - 35) * 10);
            const usageAmount = document.querySelector('.usage-amount');
            if (usageAmount) {
                usageAmount.textContent = `${newUsage}MB / 1GB`;
            }
        }
    }
}, 30000);

// Handle orientation change
window.addEventListener('orientationchange', function() {
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 100);
});

// Service Worker registration for PWA-like experience
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // PWA features can be added here
        console.log('App ready for PWA features');
    });
}