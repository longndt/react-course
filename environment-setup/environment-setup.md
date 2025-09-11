# Development Environment Setup Guide

This guide provides comprehensive instructions for setting up your development environment for React development on Windows and macOS.

## Table of Contents

- [Git and GitHub Setup](#1-git-and-github-setup)
- [Visual Studio Code Setup](#2-option-a-visual-studio-code-setup)
- [WebStorm Setup](#2-option-b-webstorm-setup)
- [Additional Tools](#3-additional-development-tools)
- [Troubleshooting](#troubleshooting)

## 1. Git and GitHub Setup

### Windows

1. **Install Git**

   - Download Git from [https://git-scm.com/download/win](https://git-scm.com/download/win)
   - Run the installer
   - Choose default options during installation
   - During installation, choose:
     - Use Git from Git Bash only
     - Use OpenSSL library
     - Checkout Windows-style, commit Unix-style line endings
     - Use MinTTY

2. **Verify Installation**
   ```bash
   git --version
   ```

### macOS

1. **Install Git**

   - If you have Homebrew:
     ```bash
     brew install git
     ```
   - Without Homebrew:
     - Download Git from [https://git-scm.com/download/mac](https://git-scm.com/download/mac)
     - Or install Xcode Command Line Tools:
       ```bash
       xcode-select --install
       ```

2. **Verify Installation**
   ```bash
   git --version
   ```

### GitHub Account Setup

1. **Create GitHub Account**

   - Go to [GitHub.com](https://github.com)
   - Click "Sign up"
   - Choose a username, email, and password
   - Verify your email address

2. **Configure Git with GitHub**

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

## 2. Option A: Visual Studio Code Setup

### Windows & macOS

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

## 2. Option B: WebStorm Setup

### Windows & macOS

1. **Install WebStorm**

   - Download from [JetBrains website](https://www.jetbrains.com/webstorm/download)
   - Run the installer
   - For students: Get free license with university email

2. **Initial Setup**

   - Choose UI theme
   - Install recommended plugins:
     - Git Flow Integration
     - Rainbow Brackets
     - Prettier
     - ESLint

3. **Configure Git**

   - Go to Settings/Preferences → Version Control → Git
   - WebStorm should auto-detect Git path
   - Test connection

4. **Recommended Settings**

   - Enable Auto-Import
   - Enable Format on Save
   - Configure JavaScript/TypeScript linting

   ```
   Settings → Languages & Frameworks → JavaScript
   - Set language version to React JSX
   - Enable ESLint
   ```

5. **Key Shortcuts to Remember**
   - Double Shift: Search Everywhere
   - Ctrl+Shift+A (Cmd+Shift+A): Find Action
   - Alt+Enter (Option+Enter): Show Intention Actions

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

#### WebStorm Issues

1. **Performance Issues**

   - Increase memory allocation
   - Exclude large directories
   - Clear caches

2. **Indexing Never Ends**
   - Invalid cache
   - Too many files
   - Solution: File → Invalidate Caches

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

### Online Resources

1. **Documentation**

   - [Git Documentation](https://git-scm.com/doc)
   - [VS Code Docs](https://code.visualstudio.com/docs)
   - [WebStorm Guide](https://www.jetbrains.com/webstorm/guide/)
   - [React Documentation](https://reactjs.org/docs/getting-started.html)

2. **Community Support**

   - [Stack Overflow](https://stackoverflow.com)
   - [GitHub Community](https://github.community)
   - [React Discord](https://discord.gg/react)

3. **Video Tutorials**
   - [Git & GitHub Crash Course](https://www.youtube.com/watch?v=RGOj5yH7evk)
   - [VS Code Tutorials](https://code.visualstudio.com/docs/getstarted/introvideos)
   - [WebStorm Essentials](https://www.jetbrains.com/webstorm/learn/)

### Regular Maintenance

1. **Weekly Updates**

   ```bash
   # Update npm & global packages
   npm update -g

   # Update VS Code extensions
   code --list-extensions | xargs -L 1 code --install-extension

   # Update Git
   git update-git-for-windows  # Windows
   brew upgrade git  # macOS
   ```

2. **Monthly Cleanup**

   ```bash
   # Clear npm cache
   npm cache clean --force

   # Clear Git maintenance
   git maintenance run --auto

   # Update all tools
   winget upgrade --all  # Windows
   brew upgrade  # macOS
   ```

### Common Issues

1. **Git not found**

   - Check PATH environment variables
   - Reinstall Git

2. **SSH key issues**

   - Verify key is added to ssh-agent
   - Check GitHub SSH key settings
   - Test connection: `ssh -T git@github.com`

3. **IDE Git integration not working**
   - Verify Git installation path
   - Check IDE Git settings
   - Restart IDE

For additional help:

- [Git Documentation](https://git-scm.com/doc)
- [VS Code Documentation](https://code.visualstudio.com/docs)
- [WebStorm Documentation](https://www.jetbrains.com/webstorm/learn/)
