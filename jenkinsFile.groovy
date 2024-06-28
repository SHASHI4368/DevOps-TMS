pipeline {
    agent any

    triggers {
        githubPush()
    }

    environment {
        REPO_URL = 'https://github.com/SHASHI4368/DevOps-TMS.git'
        BRANCH = 'master'
        APP_NAME = 'DevOps-TMS'
        DEPLOY_SERVER = '16.171.194.50'
        DEPLOY_USER = 'ubuntu'
    }

    stages {
        stage('SSH into Server and Clone Repo') {
            steps {
                script {
                    sh """
                    ssh ${DEPLOY_USER}@${DEPLOY_SERVER}
                    """
                }
            }
        }

        // stage('Install Dependencies') {
        //     steps {
        //         echo 'Installing Dependencies...'
        //         // Add any additional steps if required
        //     }
        // }

        // stage('Build Docker Images') {
        //     steps {
        //         script {
        //             sh """
        //             ssh -o StrictHostKeyChecking=no ${DEPLOY_USER}@${DEPLOY_SERVER} '
        //                 cd ${APP_NAME} &&
        //                 docker-compose build
        //             '
        //             """
        //         }
        //     }
        // }

        // stage('Push Docker Images') {
        //     steps {
        //         script {
        //             sh """
        //             ssh -o StrictHostKeyChecking=no ${DEPLOY_USER}@${DEPLOY_SERVER} '
        //                 cd ${APP_NAME} &&
        //                 docker-compose push
        //             '
        //             """
        //         }
        //     }
        // }

        // stage('Deploy Application') {
        //     steps {
        //         script {
        //             sh """
        //             ssh -o StrictHostKeyChecking=no ${DEPLOY_USER}@${DEPLOY_SERVER} '
        //                 cd ${APP_NAME} &&
        //                 docker-compose down &&
        //                 docker-compose up -d
        //             '
        //             """
        //         }
        //     }
        // }
    }
}
