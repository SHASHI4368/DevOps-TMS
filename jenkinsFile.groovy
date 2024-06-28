pipeline {
    agent any
triggers{
    githubPush()
  }
    environment {
        REPO_URL = 'https://github.com/SHASHI4368/DevOps-TMS'
        BRANCH = 'master' 
        APP_NAME = 'TMS'
        EC2_USER = 'ubuntu'
        EC2_HOST = '16.171.194.50'

    }

    stages {

        stage('Access the Deploy Server') {
        steps {
        script {
            sh """
            ssh ${EC2_USER}@${EC2_HOST} << EOF
            cd ~/TMS
            EOF
            """
        }
    }
}
        stage('Clone Repository') {
            steps {
                git branch: "${BRANCH}", url: "${REPO_URL}"
            }
        }
        stage('Install Dependencies'){
            steps{
                echo 'Installing Dependencies...'

            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    sh 'docker-compose build'
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                script {
                    sh '''
                    docker-compose push
                    '''
                }
            }
        }

    stage('Deploy Application on EC2') {
        steps {
        script {
            sh """
            docker-compose down
            docker-compose up -d
            exit
            """
        }
    }
}
    }
}
