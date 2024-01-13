function check_node_version() {
    local required_version="$1"
    if command -v node >/dev/null 2>&1; then
        local node_version=$(node -v | cut -d'.' -f1,2)
        if [ "$node_version" = "$required_version" ]; then
            echo -e "\033[0;32mYour Node.js version ($node_version) matches the required version.\033[0m" # Green Color
        else
            echo -e "\033[0;31mYour Node.js version is $node_version. The required version is $required_version.\033[0m" # Red Color
        fi
    else
        echo "Node.js is not installed."
    fi
}

function check_pnpm_version() {
    local required_version="$1"
    if command -v pnpm >/dev/null 2>&1; then
        local pnpm_version=$(pnpm -v)
        if [ "$pnpm_version" = "$required_version" ]; then
            echo -e "\033[0;32mYour pnpm version ($pnpm_version) matches the required version.\033[0m" # Green Color
        else
            echo -e "\033[0;31mYour pnpm version is $pnpm_version. The required version is $required_version.\033[0m" # Red Color
        fi
    else
        echo "pnpm is not installed."
    fi
}

function check_docker_exists() {
    if command -v docker >/dev/null 2>&1; then
        local docker_version=$(docker --version)
        echo -e "\033[0;32mYour Docker version ($docker_version) is installed.\033[0m" # Green Color
    else
        echo -e "\033[0;31mDocker is not installed.\033[0m" # Red Color
    fi
}


function check_mookme_in_pre_commit() {
    local pre_commit_file=".git/hooks/pre-commit"
    if [ -f "$pre_commit_file" ]; then
        if grep -q "@escape.tech/mookme" "$pre_commit_file"; then
            echo -e "\033[0;32mThe pre-commit script contains '@escape.tech/mookme'.\033[0m" # Green Color
        else
            echo -e "\033[0;31mThe pre-commit script does not contain '@escape.tech/mookme'. Please run: npx @escape.tech/mookme init --only-hook --types pre-commit\033[0m" # Red Color
        fi
    else
        echo -e "\033[0;31mThe pre-commit script does not exist. Please run: npx @escape.tech/mookme init --only-hook --types pre-commit\033[0m" # Red Color
    fi
}

check_node_version v20.9
check_pnpm_version 8.7.0
check_docker_exists
check_mookme_in_pre_commit