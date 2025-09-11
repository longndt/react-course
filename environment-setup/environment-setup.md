# Development Environment Setup Guide

This guide provides comprehensive instructions for setting up your React development environment. We'll focus on using Visual Studio Code as our primary IDE.

## Required Software

### 1. Node.js Setup (Required)

1. **Download and Install Node.js**

   - Visit [nodejs.org](https://nodejs.org)
   - Download the LTS (Long Term Support) version
   - Follow the installation wizard
   - ⚠️ Make sure to check the option to install necessary tools and chocolatey (Windows)

2. **Verify Installation**

   ```bash
   # Open terminal and run:
   node --version  # Should show v18.x or higher
   npm --version   # Should show v9.x or higher
   ```

3. **Install Essential Global Packages**

   ```bash
   # Install Yarn (alternative to npm)
   npm install -g yarn

   # Install Vite (for project creation)
   npm install -g vite
   ```

### 2. Git Setup (Required)

1. **Install Git**

   - **Windows**: Download from [git-scm.com](https://git-scm.com/download/win)
   - **macOS**:

     ```bash
     # Install Homebrew first if you haven't
     /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

     # Then install Git
     brew install git
     ```

2. **Configure Git**

   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```

3. **Set up SSH Key (Recommended)**

   ```bash
   # Generate SSH key
   ssh-keygen -t ed25519 -C "your.email@example.com"

   # Start SSH agent
   eval "$(ssh-agent -s)"

   # Add SSH key to agent
   ssh-add ~/.ssh/id_ed25519

   # Copy public key (use this for GitHub)
   # On Windows (Git Bash):
   cat ~/.ssh/id_ed25519.pub
   # On macOS:
   pbcopy < ~/.ssh/id_ed25519.pub
   ```

   - Go to GitHub → Settings → SSH and GPG keys
   - Click "New SSH key"
   - Paste your public key

## 2. Visual Studio Code Setup

1. **Install VS Code**

   - Download from [https://code.visualstudio.com](https://code.visualstudio.com)
   - Run the installer
   - On macOS, drag to Applications folder

2. **Essential Extensions**

   - Git Graph
   - GitLens
   - GitHub Pull Requests and Issues
   - React/Redux/React-Native snippets
   - ESLint
   - Prettier
   - Auto Rename Tag
   - Path Intellisense
   - Thunder Client (API testing)

3. **Configure Git in VS Code**

   - Open Command Palette (Ctrl+Shift+P or Cmd+Shift+P)
   - Type "Git: Clone"
   - Test with a repository

4. **Recommended Settings**
   ```json
   {
     "editor.formatOnSave": true,
     "editor.defaultFormatter": "esbenp.prettier-vscode",
     "editor.codeActionsOnSave": {
       "source.fixAll.eslint": true
     },
     "git.enableSmartCommit": true,
     "git.confirmSync": false,
     "git.autofetch": true
   }
   ```

## 3. Additional Development Tools

### Node.js Setup

1. **Install Node.js**

   - Download LTS version from [nodejs.org](https://nodejs.org)
   - Or use version manager:

     ```bash
     # For Windows:
     winget install CoreyButler.NVMforWindows

     # For macOS:
     brew install nvm
     ```

2. **Verify Installation**

   ```bash
   node --version
   npm --version
   ```

3. **Configure npm**

   ```bash
   # Set defaults
   npm config set init.author.name "Your Name"
   npm config set init.author.email "your.email@example.com"
   npm config set init.license "MIT"

   # Add global packages
   npm install -g npm@latest
   npm install -g yarn
   ```

### Docker Setup (Optional)

1. **Install Docker Desktop**

   - [Download for Windows](https://www.docker.com/products/docker-desktop)
   - [Download for Mac](https://www.docker.com/products/docker-desktop)

2. **Verify Installation**
   ```bash
   docker --version
   docker-compose --version
   ```

### Database Tools

1. **MongoDB**

   - Install MongoDB Compass
   - Or Studio 3T
   - MongoDB Shell

2. **MySQL/PostgreSQL**
   - DBeaver Community
   - MySQL Workbench
   - pgAdmin

### API Testing Tools

1. **Postman**

   - Download from [postman.com](https://www.postman.com/downloads/)
   - Create account for sync

2. **VS Code Alternative**
   - Thunder Client extension
   - REST Client extension

### Browser Development Tools

1. **Chrome Extensions**

   - React Developer Tools
   - Redux DevTools
   - Lighthouse
   - Web Vitals
   - JSON Viewer

2. **Firefox Extensions**
   - React Developer Tools
   - Redux DevTools
   - Web Developer

### Git Tools

1. **GUI Clients**

   - GitHub Desktop
   - GitKraken
   - Sourcetree

2. **Command Line Tools**
   - Hub (GitHub CLI)
   - Git Flow

### Terminal Enhancements

**Windows:**

1. **Windows Terminal**

   ```powershell
   winget install Microsoft.WindowsTerminal
   ```

2. **PowerShell 7**
   ```powershell
   winget install Microsoft.PowerShell
   ```

**macOS:**

1. **Homebrew**

   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

2. **iTerm2**

   ```bash
   brew install --cask iterm2
   ```

3. **Oh My Zsh**
   ```bash
   sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
   ```

### Code Quality Tools

1. **Global Installation**

   ```bash
   npm install -g eslint prettier typescript
   ```

2. **Configuration Files**

   **.prettierrc:**

   ```json
   {
     "semi": true,
     "trailingComma": "es5",
     "singleQuote": true,
     "printWidth": 80,
     "tabWidth": 2
   }
   ```

   **.eslintrc:**

   ```json
   {
     "extends": [
       "eslint:recommended",
       "plugin:react/recommended",
       "plugin:@typescript-eslint/recommended",
       "prettier"
     ],
     "plugins": ["react", "@typescript-eslint", "prettier"],
     "rules": {
       "prettier/prettier": "error"
     }
   }
   ```

## Additional Tips

### Git Global Ignore

Create a global `.gitignore`:

```bash
git config --global core.excludesfile ~/.gitignore_global
```

Add common files to ignore:

```
# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# IDE files
.idea/
.vscode/
*.sublime-workspace
*.sublime-project

# Node
node_modules/
npm-debug.log
yarn-error.log
```

### Terminal Setup (Optional)

**Windows:**

- Install Windows Terminal from Microsoft Store
- Consider using WSL2 for Linux environment

**macOS:**

- Consider using iTerm2
- Install Oh My Zsh:
  ```bash
  sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
  ```

## Verification

Test your setup:

```bash
# Clone a test repository
git clone https://github.com/your-username/test-repo

# Create and switch to a new branch
git checkout -b feature/test

# Make changes and commit
git add .
git commit -m "test commit"

# Push to GitHub
git push origin feature/test
```

## Troubleshooting

### Common Issues and Solutions

#### Git Issues

1. **Authentication Failed**

   ```bash
   remote: Invalid username or password
   fatal: Authentication failed for 'https://github.com/...'
   ```

   Solutions:

   - Check GitHub credentials
   - Use SSH instead of HTTPS
   - Create new Personal Access Token

2. **SSL Certificate Error**

   ```bash
   fatal: unable to access 'https://github.com/...': SSL certificate problem
   ```

   Solutions:

   ```bash
   git config --global http.sslVerify false
   # Or update certificates:
   npm config set strict-ssl false
   ```

3. **Line Ending Issues**
   ```bash
   warning: CRLF will be replaced by LF
   ```
   Solutions:
   ```bash
   # Windows:
   git config --global core.autocrlf true
   # macOS/Linux:
   git config --global core.autocrlf input
   ```

#### Node.js Issues

1. **EACCES Error**

   ```bash
   Error: EACCES: permission denied
   ```

   Solutions:

   ```bash
   # Fix npm permissions
   sudo chown -R $USER ~/.npm
   sudo chown -R $USER /usr/local/lib/node_modules
   ```

2. **Node Version Conflicts**
   Solutions:
   ```bash
   # Install nvm
   nvm install node
   nvm use node
   ```

#### VS Code Issues

1. **Extensions Not Working**

   - Reload VS Code
   - Check extension settings
   - Reinstall extension

2. **Git Integration Issues**
   - Check Git installation
   - Reset Git settings
   - Clear VS Code cache

### Environment Verification Checklist

```bash
# 1. Git Setup
git --version
git config --list

# 2. Node.js Setup
node --version
npm --version
npx --version

# 3. Development Tools
code --version  # VS Code
docker --version
mongo --version

# 4. SSH Setup
ssh -T git@github.com

# 5. Global NPM Packages
npm list -g --depth=0
```

### Common Issues

1. **Git not found**

   - Check PATH environment variables
   - Reinstall Git

2. **SSH key issues**

   - Verify key is added to ssh-agent
   - Check GitHub SSH key settings
   - Test connection: `ssh -T git@github.com`

3. **VS Code Git integration not working**
   - Verify Git installation path
   - Check VS Code Git settings
   - Restart VS Code
