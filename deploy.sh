#!/bin/bash

# ========================================
# DEPLOYMENT SCRIPT - SISTEM CAFE
# ========================================

echo "🚀 Sistem Cafe Management - Deployment Script"
echo "=============================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if git is initialized
if [ ! -d .git ]; then
    echo "${YELLOW}⚠️  Git belum diinisialisasi${NC}"
    echo "Inisialisasi git repository..."
    git init
    echo "${GREEN}✅ Git initialized${NC}"
fi

# Check for uncommitted changes
if [[ -n $(git status -s) ]]; then
    echo "${YELLOW}📝 Ada perubahan yang belum di-commit${NC}"
    echo ""
    
    # Show changes
    echo "Perubahan:"
    git status -s
    echo ""
    
    # Ask for commit message
    echo "Masukkan commit message (atau tekan Enter untuk skip):"
    read commit_message
    
    if [ -z "$commit_message" ]; then
        commit_message="Update: $(date '+%Y-%m-%d %H:%M:%S')"
    fi
    
    # Add all changes
    echo "Adding all changes..."
    git add .
    
    # Commit
    echo "Committing changes..."
    git commit -m "$commit_message"
    echo "${GREEN}✅ Changes committed${NC}"
else
    echo "${GREEN}✅ No uncommitted changes${NC}"
fi

echo ""

# Check if remote exists
if ! git remote | grep -q origin; then
    echo "${YELLOW}⚠️  Remote 'origin' belum ditambahkan${NC}"
    echo "Masukkan URL GitHub repository:"
    read repo_url
    
    if [ ! -z "$repo_url" ]; then
        git remote add origin "$repo_url"
        echo "${GREEN}✅ Remote added${NC}"
    else
        echo "${RED}❌ URL repository tidak boleh kosong${NC}"
        exit 1
    fi
fi

echo ""

# Push to GitHub
echo "📤 Pushing to GitHub..."
if git push -u origin main 2>/dev/null || git push -u origin master 2>/dev/null; then
    echo "${GREEN}✅ Successfully pushed to GitHub${NC}"
else
    echo "${YELLOW}⚠️  Push failed. Trying to set upstream...${NC}"
    
    # Try to rename branch to main if needed
    current_branch=$(git branch --show-current)
    if [ "$current_branch" != "main" ]; then
        echo "Renaming branch to 'main'..."
        git branch -M main
    fi
    
    # Try push again
    if git push -u origin main; then
        echo "${GREEN}✅ Successfully pushed to GitHub${NC}"
    else
        echo "${RED}❌ Push failed. Please check your GitHub credentials and repository URL${NC}"
        exit 1
    fi
fi

echo ""
echo "${GREEN}🎉 Deployment ke GitHub berhasil!${NC}"
echo ""
echo "Next steps:"
echo "1. Buka https://vercel.com"
echo "2. Import repository dari GitHub"
echo "3. Setup environment variables"
echo "4. Deploy!"
echo ""
echo "Atau jalankan: npm run deploy"
