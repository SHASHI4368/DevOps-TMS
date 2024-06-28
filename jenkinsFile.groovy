pipeline {
    agent any
triggers{
    githubPush()
  }
    environment {
        REPO_URL = 'https://github.com/iRajapaksha/BookMyShoot.git'
        BRANCH = 'main'
        DOCKER_REGISTRY = 'irajapaksha'
        APP_NAME = 'BookMyShoot'
        EC2_USER = 'ubuntu'
        EC2_HOST = '172.31.45.108'

    }

    stages {
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
            ssh -i ${EC2_USER}@${EC2_HOST} << EOF
            cd ~/TMS
            docker-compose down
            docker-compose up -d
            exit
            EOF
            """
        }
    }
}
    }
}



// pipeline {
//   agent any
//   triggers{
//     githubPush()
//   }
//   stages {
//     stage('Stage 1'){
//       steps {
//         echo 'This is Stage 1'
//       }
//     }
//     stage('Stage 2'){
//       steps{
//         echo 'This is Stage 2'
//       }
//     }
//     stage('Final'){
//       steps{
//         echo 'this is Final Stage'
//       }
//     }
//     stage('Deploy') {
//             steps {
//                 echo 'Deploying application...'
//             }
//         }
//     }
// }