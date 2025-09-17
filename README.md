# Dashboard Logística - BI

Dashboard interativo para visualização de relatórios de desempenho e eficiência logística, com suporte aos temas claro e escuro.

## 📋 Funcionalidades

- **Tema Claro/Escuro**: Alternância entre modos de visualização
- **Design Responsivo**: Adaptado para desktop e dispositivos móveis
- **Relatórios Interativos**: Cards com links para relatórios Power BI
- **Sistema de Partículas**: Fundo animado com efeito de partículas
- **Efeito de Digitação**: Texto animado no rodapé
- **Persistência de Tema**: Lembra a preferência do usuário

## 🚀 Como Usar

1. Acesse o dashboard através do GitHub Pages
2. Use o botão no canto superior direito para alternar entre temas
3. Clique em qualquer card para acessar o relatório correspondente
4. Use o botão "Explorar Relatórios" para rolar até a seção de relatórios

## 📊 Relatórios Disponíveis

- Controle Diário de Pedidos
- Gestão de Validade
- Produtividade - BA (Bahia)
- Produtividade - SE (Sergipe)
- OTIF - BA (On Time In Full - Bahia)
- OTIF - SE (On Time In Full - Sergipe)

## 🛠️ Tecnologias Utilizadas

- HTML5
- CSS3 (com Variáveis CSS e Grid Layout)
- JavaScript (ES6+)
- SVG para ícones
- API Canvas para efeito de partículas

## 📁 Estrutura do Projeto
├── index.html # Arquivo principal HTML
├── style.css # Estilos CSS
├── script.js # Lógica JavaScript
└── README.md # Documentação do projeto


## 🌐 Deploy no GitHub Pages

1. Faça o upload dos arquivos para seu repositório GitHub
2. Vá em Settings > Pages
3. Selecione a branch principal (main/master)
4. Selecione a pasta raiz (/)
5. Salve e aguarde alguns minutos para o deploy

## 🎨 Personalização

Para alterar as cores do tema, edite as variáveis CSS no arquivo `style.css`:

```css
:root {
    --primary: #00ff00;
    /* Adicione outras variáveis conforme necessário */
}

[data-theme="light"] {
    --primary: #007bff;
    /* Adicione outras variáveis conforme necessário */
}   

Desenvolvido por G. Hebreus