# EuRezo - Site de Orações

## Sobre o Projeto

EuRezo é uma plataforma web dedicada a disponibilizar orações de forma acessível e organizada. O site foi desenvolvido para a Diocese de São Miguel Paulista SP, oferecendo uma interface intuitiva e responsiva para acesso às orações.

## Funcionalidades

### Área Pública
- **Página Inicial**
  - Saudação dinâmica baseada no horário do dia
  - Seletor de orações com visualização formatada
  - Controles de acessibilidade para ajuste de tamanho da fonte
  - Interface responsiva para todos os dispositivos

### Área Administrativa
- **Login** (`/login`)
  - Sistema de autenticação seguro
  - Acesso restrito ao painel administrativo

- **Painel de Controle** (`/painel-de-controle`)
  - Gerenciamento completo de orações:
    - Adicionar novas orações
    - Editar orações existentes
    - Excluir orações
    - Reordenar orações
  - Editor rico (TinyMCE) para formatação de texto
  - Preview em tempo real das alterações

### Páginas Legais
- **Termos de Uso** (`/termos-de-uso`)
  - Condições de uso da plataforma
  - Direitos e responsabilidades

- **Política de Privacidade** (`/privacidade`)
  - Conformidade com LGPD
  - Políticas de proteção de dados

## Tecnologias Utilizadas

- **Frontend**
  - React
  - TypeScript
  - Tailwind CSS
  - React Router DOM
  - Lucide React (ícones)
  - TinyMCE (editor rico)

- **Backend**
  - Supabase (banco de dados e autenticação)

## Estrutura do Banco de Dados

### Tabela: prayers
- `id` (UUID, chave primária)
- `title` (texto, não nulo)
- `content` (texto, não nulo)
- `position` (inteiro, não nulo)
- `created_at` (timestamp com fuso horário)

## Desenvolvimento

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Construir para produção
npm run build

# Visualizar build de produção
npm run preview
```

## Variáveis de Ambiente

```env
VITE_SUPABASE_URL=sua_url_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima
```

## Acessibilidade

- Controles de tamanho de fonte (A+ e A-)
- Suporte a navegação por teclado
- Estrutura semântica HTML
- Cores com contraste adequado

## Responsividade

- Layout adaptativo para dispositivos móveis, tablets e desktops
- Breakpoints otimizados para diferentes tamanhos de tela
- Interface fluida e consistente em todos os dispositivos

## Manutenção

Para adicionar ou modificar orações:
1. Acesse `/login` com suas credenciais administrativas
2. Navigate até `/painel-de-controle`
3. Use o editor rico para formatar o conteúdo
4. Salve as alterações

## Créditos

Criado por: Sem.Guthierres - Diocese de São Miguel Paulista SP - 2025