#!/bin/bash

# React Course Setup Script
# This script installs dependencies for all demo projects

echo "🚀 Setting up React Course demo projects..."
echo "This will install dependencies for all demo projects."
echo ""

# Function to install dependencies in a directory
install_deps() {
    if [ -f "$1/package.json" ]; then
        echo "📦 Installing dependencies in $1..."
        cd "$1"
        npm install
        cd - > /dev/null
        echo "✅ Completed $1"
        echo ""
    else
        echo "⚠️  No package.json found in $1, skipping..."
    fi
}

# Install for all demo projects
echo "Installing dependencies for all demo projects..."
echo ""

install_deps "lesson1-setup/demo/cra-demo"
install_deps "lesson1-setup/demo/vite-demo"
install_deps "lesson2-components/demo"
install_deps "lesson3-data/demo"
install_deps "lesson4-routing-auth/demo"
install_deps "lesson5-fullstack/demo"

echo "🎉 All demo projects are ready!"
echo ""
echo "To run a specific demo:"
echo "  1. Navigate to the demo folder: cd lesson1-setup/demo/vite-demo"
echo "  2. Start the development server: npm run dev"
echo ""
echo "For lesson3-data demo, also run the backend server:"
echo "  npm run server (in a separate terminal)"
echo ""
echo "Happy coding! 🚀"