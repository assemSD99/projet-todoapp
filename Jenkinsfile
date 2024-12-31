pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('docker-hub-token') // Remplacez par l'ID réel de vos credentials
        DOCKER_IMAGE = "assemsaadaoui/projet" // Nom de l'image Docker (Docker Hub)
        DOCKER_TAG = "latest" // Tag de l'image Docker (modifiable)
    }

    stages {
        stage('Checkout') {
            steps {
                // Récupération du code source
                checkout scm
            }
        }
        
        stage('Build') {
            steps {
                dir('backend') {
                    bat 'chmod +x mvnw' // Rendre mvnw exécutable
                    bat './mvnw clean install' // Construire le projet backend
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                bat "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} -f backend/Dockerfile backend"
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    // Se connecter à Docker Hub
                    bat "echo ${DOCKERHUB_CREDENTIALS_PSW} | docker login -u ${DOCKERHUB_CREDENTIALS_USR} --password-stdin"
                    
                    // Pousser l'image Docker vers Docker Hub
                    bat "docker push ${DOCKER_IMAGE}:${DOCKER_TAG}"
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline terminé.'
        }
        success {
            echo 'Pipeline exécuté avec succès.'
        }
        failure {
            echo 'Pipeline échoué.'
        }
    }
}
