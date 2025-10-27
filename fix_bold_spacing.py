#!/usr/bin/env python3
"""
Fix bold markdown spacing issues: ** Text:** → **Text:**
"""

import re
from pathlib import Path

def fix_bold_spacing(file_path):
    """Fix spacing in bold markdown"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original = content
        
        # Pattern: ** Text:** → **Text:**
        # Remove space after opening **
        pattern = r'\*\* ([A-Za-z][^\*]+:\*\*)'
        content = re.sub(pattern, r'**\1', content)
        
        if content != original:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        return False
    except Exception as e:
        print(f"Error: {file_path}: {e}")
        return False

def main():
    root = Path('.')
    md_files = list(root.glob('**/*.md'))
    
    fixed = 0
    for md_file in md_files:
        if 'node_modules' in str(md_file):
            continue
        if fix_bold_spacing(md_file):
            fixed += 1
            print(f"✅ {md_file}")
    
    print(f"\n🎯 Total fixed: {fixed} files")

if __name__ == "__main__":
    main()

