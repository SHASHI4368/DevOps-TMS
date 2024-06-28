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
        stage('Clone Repository') {
            steps {
                script {
                    sshagent([SSH_CREDENTIALS_ID]) {
                        sh """
                        ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} << EOF
                        if [ ! -d "~/${APP_NAME}" ]; then
                          git clone ${REPO_URL} ~/${APP_NAME}
                        fi
                        EOF
                        """
                    }
                }
            }
        }
        
        stage('Pull Latest Code') {
            steps {
                script {
                    sshagent([SSH_CREDENTIALS_ID]) {
                        sh """
                        ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} << EOF
                        cd ~/${APP_NAME}
                        git pull origin ${BRANCH}
                        EOF
                        """
                    }
                }
            }
        }
        
        stage('Install Docker Compose') {
            steps {
                script {
                    sshagent([SSH_CREDENTIALS_ID]) {
                        sh """
                        ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} << EOF
                        if ! command -v docker-compose &> /dev/null; then
                          sudo curl -SL https://github.com/docker/compose/releases/download/v2.28.1/docker-compose-linux-x86_64 -o /usr/local/bin/docker-compose
                          sudo chmod +x /usr/local/bin/docker-compose
                        fi
                        EOF
                        """
                    }
                }
            }
        }
        
        stage('Stop Existing Containers') {
            steps {
                script {
                    sshagent([SSH_CREDENTIALS_ID]) {
                        sh """
                        ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} << EOF
                        cd ~/${APP_NAME}
                        sudo docker-compose down
                        EOF
                        """
                    }
                }
            }
        }
        
        stage('Build and Start Containers') {
            steps {
                script {
                    sshagent([SSH_CREDENTIALS_ID]) {
                        sh """
                        ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} << EOF
                        cd ~/${APP_NAME}
                        sudo docker-compose up -d --build
                        EOF
                        """
                    }
                }
            }
        }
    }
}