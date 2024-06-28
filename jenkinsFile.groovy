pipeline {
    agent any

    triggers {
        githubPush()
    }

    environment {
        REPO_URL = 'https://github.com/SHASHI4368/DevOps-TMS.git'
        BRANCH = 'master'
        APP_NAME = 'TMS'
        EC2_USER = 'ubuntu'
        EC2_HOST = '54.191.239.161'
        SSH_CREDENTIALS_ID = '54.191.239.161'  // Replace with your actual credentials ID
    }

    stages {
        stage('Access the Deploy Server') {
            steps {
                script {
                    sshagent([SSH_CREDENTIALS_ID]) {
                        sh """
                        ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} << 'EOF'
                        if [ ! -d "${APP_NAME}" ]; then
                            git clone ${REPO_URL} ${APP_NAME}
                        fi
                        cd ${APP_NAME}
                        git pull origin ${BRANCH}
                        if ! command -v docker &> /dev/null; then
                            echo "Docker not found. Installing Docker..."
                            sudo apt-get update
                            sudo apt-get install -y \
                                apt-transport-https \
                                ca-certificates \
                                curl \
                                gnupg \
                                lsb-release
                            curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
                            echo \
                                "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
                                $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
                            sudo apt-get update
                            sudo apt-get install -y docker-ce docker-ce-cli containerd.io
                        fi
                        if ! command -v docker-compose &> /dev/null; then
                            echo "Docker Compose not found. Installing Docker Compose..."
                            sudo curl -sSL https://github.com/docker/compose/releases/download/v2.28.1/docker-compose-Linux-x86_64 -o /usr/local/bin/docker-compose
                            sudo chmod +x /usr/local/bin/docker-compose
                        fi
                        sudo docker-compose down
                        sudo docker-compose up -d --build
                        docker image prune -f
                        exit
                        EOF
                        """
                    }
                }
            }
        }
    }
}
