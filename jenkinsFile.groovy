pipeline {
    agent any

    triggers {
        githubPush()
    }

    environment {
        REPO_URL = 'https://github.com/SHASHI4368/DevOps-TMS'
        BRANCH = 'master'
        APP_NAME = 'TMS'
        EC2_USER = 'ubuntu'
        EC2_HOST = '16.171.194.50'
        SSH_CREDENTIALS_ID = '16.171.193.179'  // Replace with your actual credentials ID
    }

    stages {
        stage('Access the Deploy Server') {
            steps {
                script {
                    sshagent([SSH_CREDENTIALS_ID]) {
                        sh """
                        ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} << EOF
                        cd ~/${APP_NAME} || git clone ${REPO_URL} ${APP_NAME}
                        cd ${APP_NAME}
                        git pull origin ${BRANCH}
                        EOF
                        """
                    }
                }
            }
        }

        stage('Clone Repository') {
            steps {
                git branch: "${BRANCH}", url: "${REPO_URL}"
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing Dependencies...'
                script {
                    sshagent([SSH_CREDENTIALS_ID]) {
                        sh """
                        ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} << EOF
                        cd ~/${APP_NAME}
                        npm install
                        EOF
                        """
                    }
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    sshagent([SSH_CREDENTIALS_ID]) {
                        sh """
                        ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} << EOF
                        cd ~/${APP_NAME}
                        docker-compose build
                        EOF
                        """
                    }
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                script {
                    sshagent([SSH_CREDENTIALS_ID]) {
                        sh """
                        ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} << EOF
                        cd ~/${APP_NAME}
                        docker-compose push
                        EOF
                        """
                    }
                }
            }
        }

        stage('Deploy Application on EC2') {
            steps {
                script {
                    sshagent([SSH_CREDENTIALS_ID]) {
                        sh """
                        ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} << EOF
                        cd ~/${APP_NAME}
                        docker-compose down
                        docker-compose up -d
                        EOF
                        """
                    }
                }
            }
        }
    }
}
