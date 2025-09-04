# Sistema Wi-Fi Hotel - Resort Fazenda 3 Pinheiros

Sistema completo de gerenciamento Wi-Fi para hotéis com hierarquia de acesso multi-nível, desenvolvido para o Resort Fazenda 3 Pinheiros.

## Visão Geral

Este projeto implementa uma solução robusta de Wi-Fi para hotéis com 80 apartamentos, oferecendo diferentes níveis de acesso para hóspedes, funcionários, administradores e visitantes. O sistema inclui tanto a documentação técnica quanto simuladores funcionais para demonstrar as capacidades.

### Características Principais

- **80 Apartamentos** com até 3 dispositivos cada (240 dispositivos máximo para hóspedes)
- **40 Access Points** distribuídos estrategicamente
- **5 Tipos de Usuários** com permissões específicas
- **3 VLANs Segregadas** para máxima segurança
- **Interface Mobile** otimizada para hóspedes
- **Interface Desktop** completa para administração

## Arquitetura do Sistema

### Segmentação de Rede

| VLAN | Rede | Usuários | Dispositivos | Controle de Acesso |
|------|------|----------|--------------|-------------------|
| **VLAN 10** | Wi-Fi Hóspedes | 80 Apartamentos | 3 por apartamento | Login obrigatório, expira no checkout |
| **VLAN 20** | Wi-Fi Staff/Corporativo | Funcionários + Visitantes | Configurável | Credenciais temp/permanentes, QR codes |
| **VLAN 30** | Rede Admin/Hosts | Administradores + Hosts | Ilimitado | Acesso backend, gerenciamento completo |

### Infraestrutura

- **Roteador Central**: MikroTik com CAPsMAN
- **40 Access Points** distribuídos por:
  - Recepção e áreas comuns
  - Apartamentos (cobertura completa)
  - Áreas de lazer (piscina, restaurante)
  - Áreas externas
- **Backend**: Node.js/PHP + MySQL/PostgreSQL
- **API Integration**: Desbravador (sistema brasileiro)

### Tipos de Usuários

#### 1. Administrador Geral
- **Acesso**: Controle total do sistema
- **VLAN**: 30 (Admin)
- **Permissões**: 
  - Criar/editar/excluir todas as contas
  - Gerenciar VLANs e Access Points
  - Configurar sistema e políticas
  - Visualizar todos os logs

#### 2. Hosts do Hotel
- **Acesso**: Gerenciamento diário
- **VLAN**: 30 (Admin)
- **Permissões**:
  - Criar contas de hóspedes/funcionários
  - Gerar códigos QR para acesso temporário
  - Visualizar logs de sessões ativas

#### 3. Hóspedes
- **Acesso**: Wi-Fi do apartamento
- **VLAN**: 10 (Hóspedes)
- **Limitações**:
  - Máximo 3 dispositivos por apartamento
  - Conta expira automaticamente no checkout
  - Isolamento entre apartamentos

#### 4. Funcionários/Corporativo
- **Acesso**: Operações internas
- **VLAN**: 20 (Staff)
- **Características**:
  - Contas permanentes ou temporárias
  - Limites opcionais de banda/tempo
  - Acesso via QR code

#### 5. Visitantes Temporários
- **Acesso**: Internet de curta duração
- **VLAN**: 20 (Staff)
- **Características**:
  - Gerado pelos hosts
  - Login via QR code
  - Expiração automática

## Estrutura do Projeto

```
hotel-wifi-system/
├── README.md                     # Este arquivo
├── index.html                    # Apresentação do projeto
└── simulator/                    # Simuladores funcionais
    ├── guest.html               # Interface mobile (hóspedes)
    ├── admin.html               # Interface desktop (administração)
    ├── css/
    │   ├── guest-mobile.css     # Estilos otimizados mobile
    │   └── admin-desktop.css    # Estilos dashboard administrativo
    ├── js/
    │   ├── guest-mobile.js      # JavaScript mobile otimizado
    │   └── admin-desktop.js     # JavaScript para administração
    └── images/
        ├── 3pin.png            # Logo do resort
        └── char.png            # Avatar do assistente
```

## Simuladores

O projeto inclui dois simuladores funcionais que demonstram as capacidades do sistema:

### Interface Mobile para Hóspedes
- **Arquivo**: `simulator/guest.html`
- **Otimização**: Mobile-first, responsivo
- **Funcionalidades**:
  - Login simplificado (quarto + código)
  - Status da conexão Wi-Fi
  - Monitoramento de dispositivos conectados
  - Visualização de consumo da estadia
  - Conta detalhada com valores
  - Avatar interativo para suporte

### Interface Desktop para Administração
- **Arquivo**: `simulator/admin.html`
- **Otimização**: Desktop, telas grandes
- **Funcionalidades**:
  - Dashboard completo com estatísticas
  - Gerenciamento de usuários e access points
  - Logs de atividade em tempo real
  - Controles administrativos avançados
  - Criação de acessos temporários
  - Sistema de suporte técnico

## Credenciais de Teste

### Administrador
- **Usuário**: `admin`
- **Senha**: `admin123`

### Recepcionista
- **Usuário**: `recepcao01`
- **Senha**: `recep123`

### Hóspedes/Visitantes
- Qualquer número de quarto (1-999) + código de identificação

## Tecnologias Utilizadas

### Frontend
- **HTML5** - Estrutura semântica
- **CSS3** - Design responsivo e moderno
- **JavaScript ES6+** - Interatividade e funcionalidades
- **Mobile-First Design** - Otimização para dispositivos móveis

### Backend (Especificado)
- **Node.js/PHP** - Servidor de aplicação
- **MySQL/PostgreSQL** - Banco de dados
- **MikroTik RouterOS** - Gerenciamento de rede
- **API Desbravador** - Integração com sistema hoteleiro

### Segurança
- **WPA3/WPA2** - Criptografia Wi-Fi
- **Isolamento VLAN** - Segmentação de rede
- **Firewall** - Controle de tráfego entre VLANs
- **Logs Auditáveis** - Registro de todas as atividades

## Fluxos de Trabalho

### Check-in do Hóspede
1. Hóspede faz check-in no sistema hoteleiro
2. API Desbravador fornece credenciais do apartamento
3. Backend cria conta hotspot automaticamente
4. Hóspede conecta até 3 dispositivos
5. Conta expira automaticamente no checkout

### Criação de Acesso Temporário
1. Host/Recepcionista acessa o painel administrativo
2. Cria conta temporária com duração específica
3. Sistema gera QR code automaticamente
4. Visitante escaneia QR code para conectar
5. Acesso expira automaticamente

### Administração do Sistema
1. Administrador acessa dashboard completo
2. Monitora estatísticas em tempo real
3. Gerencia usuários e access points
4. Configura políticas e limitações
5. Visualiza logs e relatórios detalhados

## Benefícios de Segurança

### Segmentação de Rede
- Isolamento completo entre diferentes tipos de usuários
- Prevenção de acesso não autorizado
- Controle granular de políticas por VLAN

### Gestão de Acesso
- Credenciais automáticas com expiração
- Limitação de dispositivos por conta
- Rastreamento completo de atividades

### Monitoramento
- Logs detalhados de conexões/desconexões
- Alertas automáticos para problemas
- Relatórios de uso por período

## Requisitos do Sistema

### Hardware
- **Roteador Central**: MikroTik com CAPsMAN
- **40 Access Points**: Distribuição por todo o hotel
- **Servidor**: Mínimo 4GB RAM, processador quad-core
- **Switch Gerenciável**: Suporte a VLANs

### Software
- **Sistema Operacional**: Linux (recomendado)
- **Banco de Dados**: MySQL 8.0+ ou PostgreSQL 12+
- **Runtime**: Node.js 16+ ou PHP 8.0+
- **Proxy Reverso**: Nginx (recomendado)

## Instalação e Configuração

### 1. Preparação do Ambiente
```bash
# Clone o repositório
git clone [repository-url]
cd hotel-wifi-system

# Instale as dependências
npm install  # ou composer install para PHP
```

### 2. Configuração do Banco de Dados
```sql
-- Criar banco de dados
CREATE DATABASE hotel_wifi;

-- Configurar tabelas (schema fornecido separadamente)
```

### 3. Configuração do MikroTik
```bash
# Configurar VLANs
/interface vlan add name=guests vlan-id=10 interface=bridge
/interface vlan add name=staff vlan-id=20 interface=bridge
/interface vlan add name=admin vlan-id=30 interface=bridge

# Configurar CAPsMAN para 40 APs
/caps-man manager set enabled=yes
```

### 4. Configuração da API
```javascript
// config/database.js
module.exports = {
  host: 'localhost',
  user: 'hotel_wifi',
  password: 'secure_password',
  database: 'hotel_wifi'
};
```

## Performance e Escalabilidade

### Capacidade
- **Hóspedes**: 80 apartamentos × 3 dispositivos = 240 dispositivos simultâneos
- **Staff**: 50+ dispositivos simultâneos
- **Visitantes**: 20+ acessos temporários simultâneos
- **Total**: ~300 dispositivos conectados simultaneamente

### Otimizações
- **Load Balancing**: Entre os 40 access points
- **QoS**: Priorização de tráfego por tipo de usuário
- **Cache**: Redis para sessões e dados frequentes
- **CDN**: Para assets estáticos do portal

## Monitoramento e Manutenção

### Métricas Monitoradas
- Número de usuários conectados por VLAN
- Uso de banda por access point
- Status e saúde dos 40 access points
- Logs de autenticação e erros

### Backups
- **Configurações**: Backup diário automático
- **Banco de Dados**: Backup incremental a cada 6h
- **Logs**: Rotação semanal, retenção de 3 meses

## Suporte e Manutenção

### Logs do Sistema
- Conexões/desconexões de usuários
- Alterações de configuração
- Problemas de rede e access points
- Tentativas de acesso não autorizado

### Troubleshooting Comum
1. **AP Offline**: Verificar conectividade física
2. **Autenticação Falhando**: Verificar integração com Desbravador
3. **Performance Baixa**: Analisar distribuição de load entre APs
4. **VLAN Issues**: Verificar configuração de switches

## Licença e Uso

Este projeto foi desenvolvido especificamente para o Resort Fazenda 3 Pinheiros. O código dos simuladores pode ser usado como referência para implementações similares.

---

**Desenvolvido para Resort Fazenda 3 Pinheiros**  
Sistema Wi-Fi Multi-Nível com 40 Access Points  
Capacidade: 300+ dispositivos simultâneos