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
│
├── README.md                           # Documentação principal
├── .env.example                        # Variáveis de ambiente exemplo
├── .gitignore                          # Arquivos ignorados pelo Git
├── docker-compose.yml                  # Containerização completa
├── package.json                        # Dependências Node.js
│
├── frontend/                           # Interface do usuário
│   ├── public/
│   │   ├── index.html                  # Apresentação do projeto
│   │   ├── favicon.ico
│   │   └── images/
│   │       ├── 3pin.png               # Logo do resort
│   │       └── char.png               # Avatar assistente
│   │
│   ├── src/
│   │   ├── pages/
│   │   │   ├── guest/
│   │   │   │   ├── guest.html         # Interface mobile hóspedes
│   │   │   │   ├── guest.css          # Estilos mobile
│   │   │   │   └── guest.js           # JavaScript mobile
│   │   │   │
│   │   │   └── admin/
│   │   │       ├── admin.html         # Interface desktop admin
│   │   │       ├── admin.css          # Estilos desktop
│   │   │       └── admin.js           # JavaScript admin
│   │   │
│   │   ├── components/
│   │   │   ├── avatar/
│   │   │   │   ├── avatar.css
│   │   │   │   └── avatar.js
│   │   │   │
│   │   │   └── modals/
│   │   │       ├── qr-modal.css
│   │   │       └── qr-modal.js
│   │   │
│   │   └── utils/
│   │       ├── api.js                 # Cliente API
│   │       ├── auth.js                # Autenticação frontend
│   │       └── constants.js           # Constantes globais
│   │
│   └── dist/                          # Build de produção
│
├── backend/                           # Servidor API
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── auth.controller.js     # Autenticação
│   │   │   ├── guest.controller.js    # Gestão hóspedes
│   │   │   ├── admin.controller.js    # Administração
│   │   │   ├── network.controller.js  # Controle rede
│   │   │   └── stats.controller.js    # Estatísticas
│   │   │
│   │   ├── services/
│   │   │   ├── mikrotik.service.js    # Integração MikroTik
│   │   │   ├── desbravador.service.js # API Desbravador
│   │   │   ├── user.service.js        # Gestão usuários
│   │   │   ├── vlan.service.js        # Gestão VLANs
│   │   │   └── ap.service.js          # Access Points
│   │   │
│   │   ├── models/
│   │   │   ├── User.js                # Modelo usuário
│   │   │   ├── Guest.js               # Modelo hóspede
│   │   │   ├── Session.js             # Sessão ativa
│   │   │   ├── AccessPoint.js         # Access Point
│   │   │   └── Log.js                 # Logs sistema
│   │   │
│   │   ├── middleware/
│   │   │   ├── auth.middleware.js     # Autenticação JWT
│   │   │   ├── role.middleware.js     # Controle acesso
│   │   │   ├── rate-limit.middleware.js # Rate limiting
│   │   │   └── logging.middleware.js  # Logs requisições
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.routes.js         # Rotas autenticação
│   │   │   ├── guest.routes.js        # Rotas hóspedes
│   │   │   ├── admin.routes.js        # Rotas admin
│   │   │   ├── network.routes.js      # Rotas rede
│   │   │   └── stats.routes.js        # Rotas estatísticas
│   │   │
│   │   ├── config/
│   │   │   ├── database.js            # Configuração BD
│   │   │   ├── mikrotik.js            # Config MikroTik
│   │   │   ├── redis.js               # Config Redis
│   │   │   └── app.js                 # Config aplicação
│   │   │
│   │   ├── utils/
│   │   │   ├── logger.js              # Sistema logging
│   │   │   ├── encryption.js          # Criptografia
│   │   │   ├── validation.js          # Validação dados
│   │   │   └── qr-generator.js        # Geração QR codes
│   │   │
│   │   └── app.js                     # Entrada aplicação
│   │
│   ├── tests/                         # Testes automatizados
│   │   ├── unit/
│   │   │   ├── controllers/
│   │   │   ├── services/
│   │   │   └── utils/
│   │   │
│   │   ├── integration/
│   │   │   ├── auth.test.js
│   │   │   ├── mikrotik.test.js
│   │   │   └── api.test.js
│   │   │
│   │   └── fixtures/
│   │       ├── users.json
│   │       └── sessions.json
│   │
│   └── docs/                          # Documentação API
│       ├── swagger.yml                # Especificação OpenAPI
│       ├── postman-collection.json    # Coleção Postman
│       └── api-docs.md                # Documentação detalhada
│
├── database/                          # Scripts banco de dados
│   ├── migrations/
│   │   ├── 001_create_users_table.sql
│   │   ├── 002_create_guests_table.sql
│   │   ├── 003_create_sessions_table.sql
│   │   ├── 004_create_access_points_table.sql
│   │   └── 005_create_logs_table.sql
│   │
│   ├── seeds/
│   │   ├── admin_users.sql            # Usuários admin padrão
│   │   ├── access_points.sql          # 40 APs configurados
│   │   └── test_data.sql              # Dados de teste
│   │
│   ├── procedures/
│   │   ├── guest_cleanup.sql          # Limpeza automática
│   │   ├── session_management.sql     # Gestão sessões
│   │   └── statistics.sql             # Procedures estatísticas
│   │
│   └── schema.sql                     # Schema completo
│
├── mikrotik/                          # Configurações MikroTik
│   ├── scripts/
│   │   ├── initial_setup.rsc          # Setup inicial
│   │   ├── vlan_config.rsc            # Configuração VLANs
│   │   ├── capsman_config.rsc         # Configuração CAPsMAN
│   │   ├── hotspot_config.rsc         # Configuração Hotspot
│   │   └── firewall_rules.rsc         # Regras firewall
│   │
│   ├── templates/
│   │   ├── login_page.html            # Template login hotspot
│   │   ├── status_page.html           # Status página
│   │   └── logout_page.html           # Página logout
│   │
│   └── monitoring/
│       ├── snmp_monitoring.rsc        # Monitoramento SNMP
│       └── log_export.rsc             # Export logs
│
├── infrastructure/                    # DevOps e infraestrutura
│   ├── nginx/
│   │   ├── nginx.conf                 # Configuração Nginx
│   │   └── ssl/
│   │       ├── cert.pem
│   │       └── key.pem
│   │
│   ├── docker/
│   │   ├── backend.Dockerfile         # Container backend
│   │   ├── frontend.Dockerfile        # Container frontend
│   │   └── nginx.Dockerfile           # Container proxy
│   │
│   ├── monitoring/
│   │   ├── prometheus/
│   │   │   ├── prometheus.yml
│   │   │   └── rules.yml
│   │   │
│   │   ├── grafana/
│   │   │   ├── dashboards/
│   │   │   │   ├── network_overview.json
│   │   │   │   ├── user_statistics.json
│   │   │   │   └── ap_monitoring.json
│   │   │   │
│   │   │   └── datasources/
│   │   │       └── prometheus.yml
│   │   │
│   │   └── alertmanager/
│   │       └── config.yml
│   │
│   └── backup/
│       ├── backup_script.sh           # Script backup
│       ├── restore_script.sh          # Script restore
│       └── scheduled_backup.cron      # Agendamento backup
│
├── scripts/                           # Scripts utilitários
│   ├── deploy.sh                      # Script deployment
│   ├── setup.sh                       # Setup inicial
│   ├── migrate.sh                     # Migração BD
│   ├── seed.sh                        # Popular dados
│   ├── backup.sh                      # Backup sistema
│   ├── monitor.sh                     # Monitoramento
│   └── cleanup.sh                     # Limpeza logs antigos
│
├── config/                            # Configurações ambiente
│   ├── development.env                # Ambiente desenvolvimento
│   ├── production.env                 # Ambiente produção
│   ├── test.env                       # Ambiente testes
│   └── local.env                      # Configuração local
│
├── logs/                              # Logs sistema
│   ├── access.log                     # Logs acesso
│   ├── error.log                      # Logs erros
│   ├── mikrotik.log                   # Logs MikroTik
│   └── application.log                # Logs aplicação
│
└── docs/                              # Documentação técnica
    ├── architecture.md                # Arquitetura sistema
    ├── installation.md                # Guia instalação
    ├── configuration.md               # Configuração detalhada
    ├── api-reference.md               # Referência API
    ├── troubleshooting.md             # Solução problemas
    ├── security.md                    # Considerações segurança
    ├── performance.md                 # Otimização performance
    └── changelog.md                   # Histórico mudanças
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