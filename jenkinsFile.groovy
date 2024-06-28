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
                        ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} << EOF
                        if [ ! -d "~/${APP_NAME}" ]; then
                          git clone ${REPO_URL} ~/${APP_NAME}
                        fi
                        cd ~/${APP_NAME}
                        git pull origin ${BRANCH}
                        if ! command -v docker &> /dev/null; then
                          echo "Docker not found. Installing Docker..."
                          sudo apt-get update
                          sudo apt-get install ca-certificates curl
                          sudo install -m 0755 -d /etc/apt/keyrings
                          sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
                          sudo chmod a+r /etc/apt/keyrings/docker.asc
                          echo \
                            "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
                            $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
                            sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
                          sudo apt-get update

                          sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
                        fi
                        if ! command -v docker-compose &> /dev/null; then
                          sudo curl -SL https://github.com/docker/compose/releases/download/v2.28.1/docker-compose-linux-x86_64 -o /usr/local/bin/docker-compose
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