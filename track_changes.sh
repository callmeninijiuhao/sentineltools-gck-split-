#!/bin/bash

# Function to show help
show_help() {
    echo "Usage: ./track_changes.sh [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  --file <filepath>   Show detailed history for a specific file"
    echo "  --recent <count>    Show the last N changes (default: 10)"
    echo "  --generate-report   Generate a CHANGELOG.md file from git history"
    echo "  --help              Show this help message"
    echo ""
    echo "Examples:"
    echo "  ./track_changes.sh --file services/crawlerService.ts"
    echo "  ./track_changes.sh --recent 5"
    echo "  ./track_changes.sh --generate-report"
}

# 1. Show history for a specific file
show_file_history() {
    local filepath="$1"
    if [ ! -f "$filepath" ]; then
        echo "❌ File not found: $filepath"
        exit 1
    fi
    
    echo "📜 History for: $filepath"
    echo "----------------------------------------"
    # Pretty format: Hash - Date - Message (Author)
    git log --pretty=format:"%C(yellow)%h%Creset - %C(green)%ad%Creset - %s %C(dim white)(%an)%Creset" --date=short -- "$filepath"
    echo ""
    echo "----------------------------------------"
}

# 2. Show recent global changes
show_recent_changes() {
    local count="$1"
    echo "🕒 Last $count changes to the project:"
    echo "----------------------------------------"
    git log -n "$count" --pretty=format:"%C(yellow)%h%Creset - %C(green)%ad%Creset - %C(bold)%s%Creset %C(dim white)(%an)%Creset" --date=short --stat
    echo ""
}

# 3. Generate CHANGELOG.md
generate_changelog() {
    echo "# Project Changelog" > CHANGELOG.md
    echo "Generated on $(date)" >> CHANGELOG.md
    echo "" >> CHANGELOG.md
    
    # Group changes by date
    git log --pretty=format:"### %ad%n- %s (%h)" --date=short | uniq >> CHANGELOG.md
    
    echo "✅ Generated CHANGELOG.md"
    echo "You can view it with: cat CHANGELOG.md"
}

# Parse arguments
if [ "$#" -eq 0 ]; then
    show_recent_changes 10
    exit 0
fi

case "$1" in
    --file)
        if [ -z "$2" ]; then
            echo "❌ Please specify a file path."
            exit 1
        fi
        show_file_history "$2"
        ;;
    --recent)
        count="${2:-10}"
        show_recent_changes "$count"
        ;;
    --generate-report)
        generate_changelog
        ;;
    --help)
        show_help
        ;;
    *)
        echo "❌ Unknown option: $1"
        show_help
        exit 1
        ;;
esac
